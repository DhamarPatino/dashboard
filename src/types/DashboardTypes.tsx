export interface OpenMeteoResponse {

  latitude: number;

  longitude: number;

  generationtime_ms: number;

  utc_offset_seconds: number;

  timezone: string;

  timezone_abbreviation: string;

  elevation: number;

  current_units: Currentunits;

  current: Current;

  hourly_units: Hourlyunits;

  hourly: Hourly;

  daily_units: Dailyunits;

  daily: Daily;

}


export interface Daily {

  time: string[];

  temperature_2m_max: number[];

  temperature_2m_min: number[];

  wind_speed_10m_max: number[];

  uv_index_max: number[];

  rain_sum: number[];

}


export interface Dailyunits {

  time: string;

  temperature_2m_max: string;

  temperature_2m_min: string;

  wind_speed_10m_max: string;

  uv_index_max: string;

  rain_sum: string;

}


export interface Hourly {

  time: string[];

  temperature_2m: number[];

  relative_humidity_2m: number[];

  precipitation_probability: number[];

  surface_pressure: number[];

  visibility: number[];

  wind_speed_10m: number[];

  wind_direction_10m: number[];

}


export interface Hourlyunits {

  time: string;

  temperature_2m: string;

  relative_humidity_2m: string;

  precipitation_probability: string;

  surface_pressure: string;

  visibility: string;

  wind_speed_10m: string;

  wind_direction_10m: string;

}


export interface Current {

  time: string;

  interval: number;

  wind_speed_10m: number;

  wind_direction_10m: number;

  relative_humidity_2m: number;

  temperature_2m: number;

  surface_pressure: number;

  weather_code: number;

  precipitation: number;

}


export interface Currentunits {

  time: string;

  interval: string;

  wind_speed_10m: string;

  wind_direction_10m: string;

  relative_humidity_2m: string;

  temperature_2m: string;

  surface_pressure: string;

  weather_code: string;

  precipitation: string;

}