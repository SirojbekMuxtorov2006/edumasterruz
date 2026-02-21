export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswerId: string;
  type?: 'text' | 'formula'; // distinct rendering hint
}

export type OlympiadLevel = 'A' | 'B' | 'C';

export interface Olympiad {
  id: string;
  title: string;
  subject: 'Math' | 'English';
  grade: string;
  targetLevel: OlympiadLevel;
  startTime: string; // ISO String
  duration: number; // in minutes
  participantCount: number;
  questions: Question[];
}

// Helper to get a date relative to now
const getFutureDate = (hours: number) => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date.toISOString();
};

const getPastDate = (hours: number) => {
    const date = new Date();
    date.setHours(date.getHours() - hours);
    return date.toISOString();
};

export const activeOlympiads: Olympiad[] = [
  // --- LEVEL A (Grades 9-11) ---
  {
    id: "math-lvl-a-1",
    title: "Advanced Algebra Challenge",
    subject: "Math",
    grade: "Level A (9-11 Grades)",
    targetLevel: "A",
    startTime: getPastDate(1), // Started 1 hour ago (Active)
    duration: 60,
    participantCount: 542,
    questions: [
      {
        id: "m1",
        type: "formula",
        text: "Solve for x: \n log_2(x) + log_2(x-2) = 3",
        options: [
          { id: "A", text: "x = 4" },
          { id: "B", text: "x = -2" },
          { id: "C", text: "x = 6" },
          { id: "D", text: "x = 3" },
        ],
        correctAnswerId: "A",
      },
      {
        id: "m2",
        type: "formula",
        text: "Find the limit: \n lim(x->0) (sin x / x)",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "1" },
          { id: "C", text: "Infinity" },
          { id: "D", text: "Undefined" },
        ],
        correctAnswerId: "B",
      },
    ],
  },
  {
    id: "eng-lvl-a-1",
    title: "Senior English Proficiency",
    subject: "English",
    grade: "Level A (9-11 Grades)",
    targetLevel: "A",
    startTime: getFutureDate(24), // Starts in 24 hours (Locked)
    duration: 90,
    participantCount: 0,
    questions: [
        {
            id: "e1",
            type: "text",
            text: "Identify the figure of speech: 'The world is a stage.'",
            options: [
                {id: "A", text: "Simile"},
                {id: "B", text: "Metaphor"},
                {id: "C", text: "Hyperbole"},
                {id: "D", text: "Personification"}
            ],
            correctAnswerId: "B"
        }
    ],
  },

  // --- LEVEL B (Grades 7-8) ---
  {
    id: "math-lvl-b-1",
    title: "Intermediate Geometry",
    subject: "Math",
    grade: "Level B (7-8 Grades)",
    targetLevel: "B",
    startTime: getPastDate(2), // Active
    duration: 45,
    participantCount: 310,
    questions: [
       {
        id: "mb1",
        type: "formula",
        text: "Calculate the area of a circle with radius 7 (π ≈ 22/7)",
        options: [
          { id: "A", text: "144" },
          { id: "B", text: "154" },
          { id: "C", text: "49" },
          { id: "D", text: "22" },
        ],
        correctAnswerId: "B",
      },
    ]
  },

   // --- LEVEL C (Grades 5-6) ---
   {
    id: "math-lvl-c-1",
    title: "Junior Math Fun",
    subject: "Math",
    grade: "Level C (5-6 Grades)",
    targetLevel: "C",
    startTime: getPastDate(0.5), // Active
    duration: 30,
    participantCount: 120,
    questions: [
       {
        id: "mc1",
        type: "formula",
        text: "What is 15 * 12?",
        options: [
          { id: "A", text: "180" },
          { id: "B", text: "150" },
          { id: "C", text: "160" },
          { id: "D", text: "200" },
        ],
        correctAnswerId: "A",
      },
    ]
  },
];
