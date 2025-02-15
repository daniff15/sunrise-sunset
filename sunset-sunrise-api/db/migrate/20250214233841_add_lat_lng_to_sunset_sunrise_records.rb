class AddLatLngToSunsetSunriseRecords < ActiveRecord::Migration[8.0]
  def change
    add_column :sunset_sunrise_records, :latitude, :float
    add_column :sunset_sunrise_records, :longitude, :float
  end
end
