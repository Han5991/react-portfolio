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

export interface IAccount {
  id: string;
  name: string;
  avatar: string;
  city: string;
  country: string;
  sex: 'M' | 'F';
  weight: number;
}
