export interface IAthlete {
  badge_type_id: number;
  bio: string;
  city: string;
  country: string;
  created_at: string;
  firstname: string;
  follower: number | null;
  friend: number | null;
  id: string;
  lastname: string;
  premium: boolean;
  profile: string;
  profile_medium: string;
  resource_state: number;
  sex: 'M' | 'F';
  state: string;
  summit: boolean;
  updated_at: string;
  username: null | string;
  weight: number;
}

export interface ISummary {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface IStravaToken {
  access_token: string;
  expires_at: number;
  refresh_token: string;
  expires_in: number;
}

export interface ISummaryType {
  recent_ride_totals: ISummary & {achievement_count: number};
  all_ride_totals: ISummary;
  ytd_ride_totals: ISummary;
}

export interface IAccount {
  id: string;
  name: string;
  avatar: string;
  city: string;
  country: string;
  sex: 'M' | 'F';
  weight: number;
  token?: IStravaToken;
  summary: ISummaryType;
}
