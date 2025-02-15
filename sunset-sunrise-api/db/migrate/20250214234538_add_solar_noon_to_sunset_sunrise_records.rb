class AddSolarNoonToSunsetSunriseRecords < ActiveRecord::Migration[8.0]
  def change
    add_column :sunset_sunrise_records, :solar_noon, :string
  end
end
