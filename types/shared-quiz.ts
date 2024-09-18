export interface SharedQuizDetails {
  id: number;
  quiz_id: number;
  shared_with_user_id: number;
  shared_by_user_id: number;
  created_at: string;
  updated_at: string;
  quiz: Quiz;
  shared_by_user: User;
  shared_with_user: User;
}

export interface Quiz {
  id: number;
  user_id: number;
  title: string;
  description: string;
  questions_count: number;
  created_at: string;
  updated_at: string;
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
