export interface WeatherCurrentType {
  id: number;
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string;
  weather_descriptions: string;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
  weather_id: number;
  created_at: string;
  updated_at: string;
}
