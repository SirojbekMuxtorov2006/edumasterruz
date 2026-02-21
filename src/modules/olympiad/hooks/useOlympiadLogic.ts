import { useState, useEffect, useCallback } from 'react';
import { Olympiad, Question } from '../data/olympiadData';
import { useNavigate } from 'react-router-dom';

interface UseOlympiadLogicProps {
  olympiad: Olympiad;
}

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> selectedOptionId
  timeLeft: number; // in seconds
  isFinished: boolean;
  score: number;
  correctCount: number;
  incorrectCount: number;
}

export const useOlympiadLogic = ({ olympiad }: UseOlympiadLogicProps) => {
  const navigate = useNavigate();
  
  // Initialize state
  const [state, setState] = useState<QuizState>(() => {
    // Try to load from localStorage to persist progress on reload
    // For a real app, you might want more robust persistence or server-sync
    const saved = localStorage.getItem(`olympiad_progress_${olympiad.id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentQuestionIndex: 0,
      answers: {},
      timeLeft: olympiad.duration * 60,
      isFinished: false,
      score: 0,
      correctCount: 0,
      incorrectCount: 0,
    };
  });

  // Timer effect
  useEffect(() => {
    if (state.isFinished || state.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          finishQuiz();
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isFinished, state.timeLeft]);

  // Save progress to local storage on state change
  useEffect(() => {
    localStorage.setItem(`olympiad_progress_${olympiad.id}`, JSON.stringify(state));
  }, [state, olympiad.id]);

  const selectAnswer = (questionId: string, optionId: string) => {
    if (state.isFinished) return;
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionId },
    }));
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < olympiad.questions.length - 1) {
      setState((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };

  const prevQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      setState((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };

  const calculateScore = useCallback(() => {
    let correct = 0;
    let incorrect = 0;
    
    olympiad.questions.forEach((q) => {
      const selected = state.answers[q.id];
      if (selected) {
        if (selected === q.correctAnswerId) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    return { correct, incorrect, total: correct }; // Simple scoring: 1 point per correct answer
  }, [olympiad.questions, state.answers]);

  const finishQuiz = useCallback(() => {
    const { correct, incorrect, total } = calculateScore();
    
    const finalState = {
      ...state,
      isFinished: true,
      score: total,
      correctCount: correct,
      incorrectCount: incorrect,
    };
    
    setState(finalState);
    localStorage.setItem(`olympiad_progress_${olympiad.id}`, JSON.stringify(finalState));
    
    // Navigate to result page
    navigate(`/olympiad/${olympiad.id}/result`);
  }, [calculateScore, navigate, olympiad.id, state]);

  // Timer effect
  useEffect(() => {
    if (state.isFinished || state.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          finishQuiz();
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isFinished, state.timeLeft, finishQuiz]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return {
    currentQuestionIndex: state.currentQuestionIndex,
    currentQuestion: olympiad.questions[state.currentQuestionIndex],
    answers: state.answers,
    timeLeft: state.timeLeft,
    isFinished: state.isFinished,
    score: state.score,
    correctCount: state.correctCount,
    incorrectCount: state.incorrectCount,
    totalQuestions: olympiad.questions.length,
    formatTime,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    finishQuiz,
  };
};
