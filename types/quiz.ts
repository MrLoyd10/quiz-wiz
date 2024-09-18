// Home (Displaying all the quiz)
export type QuizDetails = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  questions_count: number;
  created_at: string;
  updated_at: string;
};

// For taking a quiz (Starting to take a quiz)
export interface Quiz {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  questions_count: number;
  created_at: string;
  updated_at: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question: string;
  created_at: string;
  updated_at: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: number;
  question_id: number;
  option: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}
// ---
