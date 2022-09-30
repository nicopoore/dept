import { Rocket } from "./rocket";

export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_unix: number;
  details: string;
  mission_patch: string;
  rocket: Rocket;
  favorite: boolean;
}
