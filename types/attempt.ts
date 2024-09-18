export interface AttemptOption {
  id: number;
  option: string;
  is_correct: number;
  is_selected: boolean;
  user_is_correct: boolean;
}

export interface AttemptQuestion {
  id: number;
  question: string;
  options: AttemptOption[];
}

export interface AttemptDetails {
  quiz_title: string;
  quiz_description: string | null;
  questions_count: number;
  score: number;
  created_at: string;
  questions: AttemptQuestion[];
}
