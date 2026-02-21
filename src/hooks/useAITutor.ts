import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

interface TutorRequest {
  type: "hint" | "feedback" | "explain";
  question: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  skillName: string;
  isCorrect?: boolean;
}

export const useAITutor = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const askTutor = async (request: TutorRequest): Promise<string | null> => {
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-tutor", {
        body: request,
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Xatolik",
          description: data.error,
          variant: "destructive",
        });
        return null;
      }

      setMessage(data.message);
      return data.message;
    } catch (error) {
      console.error("AI Tutor error:", error);
      toast({
        title: "Xatolik",
        description: "AI o'qituvchi bilan bog'lanishda xatolik yuz berdi",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getHint = async (question: string, options: string[], skillName: string) => {
    return askTutor({
      type: "hint",
      question,
      options,
      skillName,
    });
  };

  const getFeedback = async (
    question: string,
    correctAnswer: string,
    userAnswer: string,
    isCorrect: boolean,
    skillName: string
  ) => {
    return askTutor({
      type: "feedback",
      question,
      correctAnswer,
      userAnswer,
      isCorrect,
      skillName,
    });
  };

  const getExplanation = async (question: string, correctAnswer: string, skillName: string) => {
    return askTutor({
      type: "explain",
      question,
      correctAnswer,
      skillName,
    });
  };

  const clearMessage = () => setMessage(null);

  return {
    loading,
    message,
    getHint,
    getFeedback,
    getExplanation,
    clearMessage,
  };
};
