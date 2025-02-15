class Api::SunsetSunriseController < ApplicationController
  def index
    location = params[:location]
    start_date = params[:start_date]
    end_date = params[:end_date]

    if location.blank?
      render json: { success: false, error: "Location is required" }, status: 400
      return
    end

    if start_date.blank?
      render json: { success: false, error: "Start date and End date are required" }, status: 400
      return
    end

    service = SunsetSunriseService.new(location, start_date, end_date)
    result = service.fetch_data

    render json: result, status: result[:success] ? 200 : 500
  end
end