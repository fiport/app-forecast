import { WeatherCurrentType } from './WeatherCurrentType';

export interface WeatherType {
  id: number;
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
  created_at: string;
  updated_at: string;
  pivot: {
    address_id: number;
    weather_id: number;
    created_at: string;
    updated_at: string;
  };
  weather_current: WeatherCurrentType;
}
