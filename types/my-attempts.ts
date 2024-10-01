export type MyAttempt = {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  created_at: string;
  updated_at: string;
  quiz: Quiz;
};

export type Quiz = {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  questions_count: number;
  created_at: string;
  updated_at: string;
};
