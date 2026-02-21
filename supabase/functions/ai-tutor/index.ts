import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TutorRequest {
  type: "hint" | "feedback" | "explain";
  question: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  skillName: string;
  isCorrect?: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, question, options, correctAnswer, userAnswer, skillName, isCorrect }: TutorRequest = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = `Sen o'zbek tilidagi matematika o'qituvchisissan. Sen bolalar bilan ishlaysan va ularga matematikani tushuntirishda yordam berasan. 
Javoblaringni qisqa, tushunarli va rag'batlantiruvchi tarzda ber.
Har doim o'zbek tilida javob ber.
Ko'nikma: ${skillName}`;

    let userPrompt = "";

    switch (type) {
      case "hint":
        userPrompt = `Savol: "${question}"
Javob variantlari: ${options?.join(", ")}
        
O'quvchiga bu savolni yechishda yordam beradigan bitta maslahat ber. To'g'ri javobni aytma, faqat yo'nalish ko'rsat. Maslahatni 1-2 gapda ber.`;
        break;

      case "feedback":
        userPrompt = `Savol: "${question}"
To'g'ri javob: ${correctAnswer}
O'quvchi javobi: ${userAnswer}
Natija: ${isCorrect ? "To'g'ri" : "Noto'g'ri"}

${isCorrect 
  ? "O'quvchini maqta va qisqacha tushuntir nima uchun bu javob to'g'ri. 2-3 gap bilan javob ber."
  : "O'quvchini rag'batlantirib, nima uchun bu javob noto'g'ri ekanligini va to'g'ri javobni qisqacha tushuntir. 3-4 gap bilan javob ber."}`;
        break;

      case "explain":
        userPrompt = `Savol: "${question}"
To'g'ri javob: ${correctAnswer}

Bu savolni va uning yechimini batafsil tushuntir. O'quvchi tushunishi uchun oddiy so'zlar va misollar ishlatib, 4-5 gap bilan javob ber.`;
        break;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Juda ko'p so'rov yuborildi. Iltimos, biroz kuting." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI xizmati uchun kredit tugagan." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI xizmatida xatolik" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "Tushuntirish mavjud emas.";

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI tutor error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Noma'lum xatolik" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
