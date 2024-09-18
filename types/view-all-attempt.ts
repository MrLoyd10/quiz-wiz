export interface AttemptDetails {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}
