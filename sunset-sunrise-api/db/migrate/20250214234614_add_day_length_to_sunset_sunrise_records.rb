class AddDayLengthToSunsetSunriseRecords < ActiveRecord::Migration[8.0]
  def change
    add_column :sunset_sunrise_records, :day_length, :string
  end
end
