require 'net/http'
require 'json'
require 'date'

class SunsetSunriseService
  def initialize(location, start_date, end_date)
    @location = location
    @start_date = start_date
    @end_date = end_date
  end

  def fetch_data
    coordinates = get_coordinates(@location)
    if coordinates.nil?
      return { success: false, error: "Unable to fetch coordinates for the given location", status: 500 }
    end

    @lat = coordinates[:lat]
    @lng = coordinates[:lng]

    existing_data = SunsetSunriseRecord.where(latitude: @lat, longitude: @lng, date: @start_date..@end_date)
    return { success: true, data: existing_data } if existing_data.any?

    api_data = fetch_from_api(@lat, @lng)

    if api_data[:success]
      save_data_to_db(api_data[:data])
      return { success: true, data: api_data[:data] }
    else
      return { success: false, error: api_data[:error], status: 500 }
    end
  end

  private

  def get_coordinates(location)
    base_url = "https://nominatim.openstreetmap.org/search"
    url = "#{base_url}?q=#{location}&format=json&addressdetails=1&limit=1"
    uri = URI(url)

    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    if data.any?
      lat = data[0]["lat"]
      lon = data[0]["lon"]
      { lat: lat, lng: lon }
    else
      nil
    end
  rescue StandardError => e
    Rails.logger.error "Error fetching coordinates: #{e.message}"
    nil
  end

  def fetch_from_api(lat, lng)
    @end_date = @end_date.presence || Date.today.to_s
  
    begin
      base_url = "https://api.sunrisesunset.io/json"
      url = "#{base_url}?lat=#{lat}&lng=#{lng}&date_start=#{@start_date}&date_end=#{@end_date}"
      uri = URI(url)
  
      response = Net::HTTP.get(uri)
      data = JSON.parse(response)
  
      if data["status"] == "OK"
        results = data["results"].map do |result|
          if result["sunrise"].nil? || result["sunset"].nil?
            result.merge!({
              "sunrise" => "No sunrise",
              "sunset" => "No sunset",
              "message" => "This date falls within a period of perpetual daylight or night."
            })
          end
          result
        end
  
        { success: true, data: results }
      else
        { success: false, error: "Error while fetching data from Sunrise API" }
      end
    rescue => e
      { success: false, error: e.message }
    end
  end

  def save_data_to_db(data)
    data.each do |entry|
      SunsetSunriseRecord.find_or_create_by(
        latitude: @lat,
        longitude: @lng,
        date: entry["date"]
      ) do |record|
        record.latitude = @lat      
        record.longitude = @lng 
        record.location = @location
        record.sunrise = entry["sunrise"]
        record.sunset = entry["sunset"]
        record.golden_hour = entry["golden_hour"]
        record.solar_noon = entry["solar_noon"]
        record.day_length = entry["day_length"]
      end
    end
  end
end