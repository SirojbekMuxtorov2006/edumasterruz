// src/modules/olympiad/data/olympiadData.ts

export type OlympiadLevel = 'A' | 'B' | 'C';
export type Subject = 'Math' | 'English';

export interface Option {
	id: string;
	text: string;
}

export interface Question {
	id: string;
	text: string;
	options: Option[];
	correctAnswerId: string;
	type?: 'text' | 'formula';
}

export interface Olympiad {
	id: string;
	title: string;
	subject: Subject;
	grade: string; // "9–11 sinf" | "7–8 sinf" | "5–6 sinf"
	targetLevel: OlympiadLevel;
	startTime: string; // ISO string
	duration: number; // daqiqa
	participantCount: number;
	price: number; // so'm (0 = bepul)
	spotsTotal: number; // jami joylar
	spotsTaken: number; // band qilingan joylar
	questions: Question[];
}

// ─── Vaqt yordamchilari ───────────────────────────────────────────────────────
const past = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
const future = (h: number) => new Date(Date.now() + h * 3600_000).toISOString();

// ═══════════════════════════════════════════════════════════════════════════════
// MATEMATIKA SAVOLLARI
// ═══════════════════════════════════════════════════════════════════════════════

// ── Level A (9–11 sinf) — 10 ta savol ────────────────────────────────────────
const mathA: Question[] = [
	{
		id: 'mA1',
		type: 'formula',
		text: "x² − 5x + 6 = 0 tenglamaning ildizlari yig'indisi:",
		options: [
			{ id: 'A', text: '2' },
			{ id: 'B', text: '3' },
			{ id: 'C', text: '5' },
			{ id: 'D', text: '6' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mA2',
		type: 'formula',
		text: 'log₂(64) = ?',
		options: [
			{ id: 'A', text: '4' },
			{ id: 'B', text: '5' },
			{ id: 'C', text: '6' },
			{ id: 'D', text: '8' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mA3',
		type: 'formula',
		text: 'sin²α + cos²α = ?',
		options: [
			{ id: 'A', text: '0' },
			{ id: 'B', text: '2' },
			{ id: 'C', text: 'α' },
			{ id: 'D', text: '1' },
		],
		correctAnswerId: 'D',
	},
	{
		id: 'mA4',
		text: 'Arifmetik progressiya: a₁ = 3, d = 4. 10-had qiymati:',
		options: [
			{ id: 'A', text: '36' },
			{ id: 'B', text: '39' },
			{ id: 'C', text: '40' },
			{ id: 'D', text: '43' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mA5',
		type: 'formula',
		text: '2¹⁰ = ?',
		options: [
			{ id: 'A', text: '512' },
			{ id: 'B', text: '1000' },
			{ id: 'C', text: '1024' },
			{ id: 'D', text: '2048' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mA6',
		type: 'formula',
		text: "f(x) = x² + 2x − 3 bo'lsa, f(2) = ?",
		options: [
			{ id: 'A', text: '3' },
			{ id: 'B', text: '5' },
			{ id: 'C', text: '7' },
			{ id: 'D', text: '9' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mA7',
		text: "Tomonlari 3, 4, 5 bo'lgan uchburchak turi:",
		options: [
			{ id: 'A', text: "O'tkir burchakli" },
			{ id: 'B', text: "To'mto'q" },
			{ id: 'C', text: "To'g'ri burchakli" },
			{ id: 'D', text: 'Teng tomonli' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mA8',
		type: 'formula',
		text: '(a + b)² tenglik:',
		options: [
			{ id: 'A', text: 'a² + b²' },
			{ id: 'B', text: 'a² + ab + b²' },
			{ id: 'C', text: 'a² + 2ab + b²' },
			{ id: 'D', text: '2a + 2b' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mA9',
		type: 'formula',
		text: "Doira yuzasi r = 5 bo'lsa? (π ≈ 3.14)",
		options: [
			{ id: 'A', text: '31.4' },
			{ id: 'B', text: '62.8' },
			{ id: 'C', text: '78.5' },
			{ id: 'D', text: '157' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mA10',
		text: 'Geometrik progressiya: 2, 6, 18, ... ning 5-hadi:',
		options: [
			{ id: 'A', text: '54' },
			{ id: 'B', text: '108' },
			{ id: 'C', text: '162' },
			{ id: 'D', text: '486' },
		],
		correctAnswerId: 'C',
	},
];

// ── Level B (7–8 sinf) — 10 ta savol ─────────────────────────────────────────
const mathB: Question[] = [
	{
		id: 'mB1',
		text: '15 ning 40% i necha?',
		options: [
			{ id: 'A', text: '4' },
			{ id: 'B', text: '6' },
			{ id: 'C', text: '8' },
			{ id: 'D', text: '10' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mB2',
		text: "To'g'ri to'rtburchak: kenglik 6 sm, uzunlik 10 sm. Yuzasi:",
		options: [
			{ id: 'A', text: '32 sm²' },
			{ id: 'B', text: '48 sm²' },
			{ id: 'C', text: '60 sm²' },
			{ id: 'D', text: '72 sm²' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mB3',
		type: 'formula',
		text: '√144 = ?',
		options: [
			{ id: 'A', text: '10' },
			{ id: 'B', text: '11' },
			{ id: 'C', text: '12' },
			{ id: 'D', text: '14' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mB4',
		type: 'formula',
		text: "x + 7 = 15 bo'lsa, x = ?",
		options: [
			{ id: 'A', text: '6' },
			{ id: 'B', text: '7' },
			{ id: 'C', text: '8' },
			{ id: 'D', text: '9' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mB5',
		type: 'formula',
		text: '3/4 + 1/4 = ?',
		options: [
			{ id: 'A', text: '1/2' },
			{ id: 'B', text: '4/8' },
			{ id: 'C', text: '1' },
			{ id: 'D', text: '2' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mB6',
		text: "Uchburchak ichki burchaklari yig'indisi:",
		options: [
			{ id: 'A', text: '90°' },
			{ id: 'B', text: '180°' },
			{ id: 'C', text: '270°' },
			{ id: 'D', text: '360°' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mB7',
		type: 'formula',
		text: '48 ÷ 6 × 2 = ?',
		options: [
			{ id: 'A', text: '4' },
			{ id: 'B', text: '8' },
			{ id: 'C', text: '16' },
			{ id: 'D', text: '24' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mB8',
		text: 'Kubning qirralari soni:',
		options: [
			{ id: 'A', text: '6' },
			{ id: 'B', text: '8' },
			{ id: 'C', text: '10' },
			{ id: 'D', text: '12' },
		],
		correctAnswerId: 'D',
	},
	{
		id: 'mB9',
		type: 'formula',
		text: '2x − 4 = 10 tenglamani yeching:',
		options: [
			{ id: 'A', text: 'x = 3' },
			{ id: 'B', text: 'x = 5' },
			{ id: 'C', text: 'x = 7' },
			{ id: 'D', text: 'x = 9' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mB10',
		text: "Muntazam olti burchakning burchaklari yig'indisi:",
		options: [
			{ id: 'A', text: '540°' },
			{ id: 'B', text: '720°' },
			{ id: 'C', text: '900°' },
			{ id: 'D', text: '360°' },
		],
		correctAnswerId: 'B',
	},
];

// ── Level C (5–6 sinf) — 10 ta savol ─────────────────────────────────────────
const mathC: Question[] = [
	{
		id: 'mC1',
		text: '125 + 375 = ?',
		options: [
			{ id: 'A', text: '490' },
			{ id: 'B', text: '500' },
			{ id: 'C', text: '510' },
			{ id: 'D', text: '525' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mC2',
		text: '7 × 8 = ?',
		options: [
			{ id: 'A', text: '48' },
			{ id: 'B', text: '54' },
			{ id: 'C', text: '56' },
			{ id: 'D', text: '64' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mC3',
		text: '1 soat necha daqiqa?',
		options: [
			{ id: 'A', text: '30' },
			{ id: 'B', text: '45' },
			{ id: 'C', text: '60' },
			{ id: 'D', text: '100' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mC4',
		text: '200 − 67 = ?',
		options: [
			{ id: 'A', text: '123' },
			{ id: 'B', text: '133' },
			{ id: 'C', text: '143' },
			{ id: 'D', text: '153' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mC5',
		type: 'formula',
		text: '3² + 4² = ?',
		options: [
			{ id: 'A', text: '14' },
			{ id: 'B', text: '25' },
			{ id: 'C', text: '49' },
			{ id: 'D', text: '56' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mC6',
		text: '1 km necha metr?',
		options: [
			{ id: 'A', text: '100' },
			{ id: 'B', text: '500' },
			{ id: 'C', text: '1000' },
			{ id: 'D', text: '10000' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mC7',
		text: '45 ÷ 9 = ?',
		options: [
			{ id: 'A', text: '4' },
			{ id: 'B', text: '5' },
			{ id: 'C', text: '6' },
			{ id: 'D', text: '7' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'mC8',
		text: 'Kvadratning tomonlari 5 sm. Yuzasi necha sm²?',
		options: [
			{ id: 'A', text: '10' },
			{ id: 'B', text: '20' },
			{ id: 'C', text: '25' },
			{ id: 'D', text: '30' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mC9',
		text: '1/2 + 1/4 = ?',
		options: [
			{ id: 'A', text: '1/6' },
			{ id: 'B', text: '1/3' },
			{ id: 'C', text: '3/4' },
			{ id: 'D', text: '2/6' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'mC10',
		text: '6 × 7 − 12 = ?',
		options: [
			{ id: 'A', text: '28' },
			{ id: 'B', text: '30' },
			{ id: 'C', text: '32' },
			{ id: 'D', text: '34' },
		],
		correctAnswerId: 'B',
	},
];

// ═══════════════════════════════════════════════════════════════════════════════
// INGLIZ TILI SAVOLLARI
// ═══════════════════════════════════════════════════════════════════════════════

// ── Level A (9–11 sinf) — 10 ta savol ────────────────────────────────────────
const engA: Question[] = [
	{
		id: 'eA1',
		type: 'text',
		text: 'Choose the correct form:\n"She ___ to school every day."',
		options: [
			{ id: 'A', text: 'go' },
			{ id: 'B', text: 'goes' },
			{ id: 'C', text: 'going' },
			{ id: 'D', text: 'gone' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eA2',
		type: 'text',
		text: 'Past tense of "write":',
		options: [
			{ id: 'A', text: 'writed' },
			{ id: 'B', text: 'written' },
			{ id: 'C', text: 'wrote' },
			{ id: 'D', text: 'writ' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eA3',
		type: 'text',
		text: 'Correct article:\n"___ apple a day keeps the doctor away."',
		options: [
			{ id: 'A', text: 'A' },
			{ id: 'B', text: 'An' },
			{ id: 'C', text: 'The' },
			{ id: 'D', text: '(no article)' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eA4',
		type: 'text',
		text: 'Synonym of "happy":',
		options: [
			{ id: 'A', text: 'Sad' },
			{ id: 'B', text: 'Angry' },
			{ id: 'C', text: 'Joyful' },
			{ id: 'D', text: 'Tired' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eA5',
		type: 'text',
		text: '"If I ___ rich, I would travel the world."',
		options: [
			{ id: 'A', text: 'am' },
			{ id: 'B', text: 'was' },
			{ id: 'C', text: 'were' },
			{ id: 'D', text: 'be' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eA6',
		type: 'text',
		text: 'Correct passive:\n"The book ___ by millions."',
		options: [
			{ id: 'A', text: 'reads' },
			{ id: 'B', text: 'is read' },
			{ id: 'C', text: 'reading' },
			{ id: 'D', text: 'was reading' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eA7',
		type: 'text',
		text: 'Grammatically correct sentence:',
		options: [
			{ id: 'A', text: "He don't like coffee." },
			{ id: 'B', text: "He doesn't likes coffee." },
			{ id: 'C', text: "He doesn't like coffee." },
			{ id: 'D', text: 'He not like coffee.' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eA8',
		type: 'text',
		text: '"Despite ___ tired, she finished the race."',
		options: [
			{ id: 'A', text: 'be' },
			{ id: 'B', text: 'been' },
			{ id: 'C', text: 'being' },
			{ id: 'D', text: 'was' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eA9',
		type: 'text',
		text: 'Antonym of "ancient":',
		options: [
			{ id: 'A', text: 'Old' },
			{ id: 'B', text: 'Modern' },
			{ id: 'C', text: 'Historic' },
			{ id: 'D', text: 'Vintage' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eA10',
		type: 'text',
		text: '"She has been studying for ___ hours."',
		options: [
			{ id: 'A', text: 'a' },
			{ id: 'B', text: 'an' },
			{ id: 'C', text: 'the' },
			{ id: 'D', text: 'some' },
		],
		correctAnswerId: 'D',
	},
];

// ── Level B (7–8 sinf) — 10 ta savol ─────────────────────────────────────────
const engB: Question[] = [
	{
		id: 'eB1',
		type: 'text',
		text: 'Plural of "child":',
		options: [
			{ id: 'A', text: 'childs' },
			{ id: 'B', text: 'childes' },
			{ id: 'C', text: 'children' },
			{ id: 'D', text: 'childrens' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eB2',
		type: 'text',
		text: '"There ___ many students in the hall."',
		options: [
			{ id: 'A', text: 'is' },
			{ id: 'B', text: 'are' },
			{ id: 'C', text: 'was' },
			{ id: 'D', text: 'am' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eB3',
		type: 'text',
		text: 'What does "enormous" mean?',
		options: [
			{ id: 'A', text: 'Very small' },
			{ id: 'B', text: 'Very fast' },
			{ id: 'C', text: 'Very large' },
			{ id: 'D', text: 'Very old' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eB4',
		type: 'text',
		text: '"He ___ football every Saturday."',
		options: [
			{ id: 'A', text: 'play' },
			{ id: 'B', text: 'plays' },
			{ id: 'C', text: 'playing' },
			{ id: 'D', text: 'played' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eB5',
		type: 'text',
		text: 'Opposite of "expensive":',
		options: [
			{ id: 'A', text: 'Cheap' },
			{ id: 'B', text: 'Beautiful' },
			{ id: 'C', text: 'Heavy' },
			{ id: 'D', text: 'Large' },
		],
		correctAnswerId: 'A',
	},
	{
		id: 'eB6',
		type: 'text',
		text: 'Which word is a verb?',
		options: [
			{ id: 'A', text: 'Quickly' },
			{ id: 'B', text: 'Beautiful' },
			{ id: 'C', text: 'Jump' },
			{ id: 'D', text: 'Happiness' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eB7',
		type: 'text',
		text: '"I ___ my homework yesterday."',
		options: [
			{ id: 'A', text: 'do' },
			{ id: 'B', text: 'does' },
			{ id: 'C', text: 'did' },
			{ id: 'D', text: 'done' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eB8',
		type: 'text',
		text: 'Letters in the English alphabet:',
		options: [
			{ id: 'A', text: '24' },
			{ id: 'B', text: '25' },
			{ id: 'C', text: '26' },
			{ id: 'D', text: '27' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eB9',
		type: 'text',
		text: '"She is ___ than her sister." (tall)',
		options: [
			{ id: 'A', text: 'tall' },
			{ id: 'B', text: 'taller' },
			{ id: 'C', text: 'tallest' },
			{ id: 'D', text: 'more tall' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eB10',
		type: 'text',
		text: 'Choose the correct question tag:\n"She can swim, ___?"',
		options: [
			{ id: 'A', text: 'can she' },
			{ id: 'B', text: "can't she" },
			{ id: 'C', text: 'does she' },
			{ id: 'D', text: "doesn't she" },
		],
		correctAnswerId: 'B',
	},
];

// ── Level C (5–6 sinf) — 10 ta savol ─────────────────────────────────────────
const engC: Question[] = [
	{
		id: 'eC1',
		type: 'text',
		text: 'Sky color on a clear day:',
		options: [
			{ id: 'A', text: 'Green' },
			{ id: 'B', text: 'Blue' },
			{ id: 'C', text: 'Red' },
			{ id: 'D', text: 'Yellow' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eC2',
		type: 'text',
		text: '"I ___ a student."',
		options: [
			{ id: 'A', text: 'is' },
			{ id: 'B', text: 'are' },
			{ id: 'C', text: 'am' },
			{ id: 'D', text: 'be' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eC3',
		type: 'text',
		text: '3 + 4 in English:',
		options: [
			{ id: 'A', text: 'Six' },
			{ id: 'B', text: 'Seven' },
			{ id: 'C', text: 'Eight' },
			{ id: 'D', text: 'Nine' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eC4',
		type: 'text',
		text: 'Which animal says "meow"?',
		options: [
			{ id: 'A', text: 'Dog' },
			{ id: 'B', text: 'Cat' },
			{ id: 'C', text: 'Cow' },
			{ id: 'D', text: 'Bird' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eC5',
		type: 'text',
		text: '"Good ___!" (ertalab aytiladi)',
		options: [
			{ id: 'A', text: 'night' },
			{ id: 'B', text: 'evening' },
			{ id: 'C', text: 'morning' },
			{ id: 'D', text: 'afternoon' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eC6',
		type: 'text',
		text: '"Kitob" inglizcha:',
		options: [
			{ id: 'A', text: 'Pen' },
			{ id: 'B', text: 'Desk' },
			{ id: 'C', text: 'Book' },
			{ id: 'D', text: 'Chair' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eC7',
		type: 'text',
		text: 'How many days in a week?',
		options: [
			{ id: 'A', text: 'Five' },
			{ id: 'B', text: 'Six' },
			{ id: 'C', text: 'Seven' },
			{ id: 'D', text: 'Eight' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eC8',
		type: 'text',
		text: '"Uy" inglizcha:',
		options: [
			{ id: 'A', text: 'Car' },
			{ id: 'B', text: 'House' },
			{ id: 'C', text: 'Tree' },
			{ id: 'D', text: 'Street' },
		],
		correctAnswerId: 'B',
	},
	{
		id: 'eC9',
		type: 'text',
		text: 'Opposite of "big":',
		options: [
			{ id: 'A', text: 'Tall' },
			{ id: 'B', text: 'Old' },
			{ id: 'C', text: 'Small' },
			{ id: 'D', text: 'Fast' },
		],
		correctAnswerId: 'C',
	},
	{
		id: 'eC10',
		type: 'text',
		text: '"Red" o\'zbekcha:',
		options: [
			{ id: 'A', text: 'Yashil' },
			{ id: 'B', text: "Ko'k" },
			{ id: 'C', text: 'Sariq' },
			{ id: 'D', text: 'Qizil' },
		],
		correctAnswerId: 'D',
	},
];

// ═══════════════════════════════════════════════════════════════════════════════
// OLIMPIADALAR (STATIC)
// ═══════════════════════════════════════════════════════════════════════════════
export const activeOlympiads: Olympiad[] = [
	// ── MATEMATIKA ─────────────────────────────────────────────────────────────

	// A daraja — 9–11 sinf — FAOL
	{
		id: 'math-A',
		title: 'Matematika Olimpiadasi — A Daraja',
		subject: 'Math',
		grade: '9–11 sinf',
		targetLevel: 'A',
		startTime: past(1),
		duration: 60,
		participantCount: 1240,
		price: 25000,
		spotsTotal: 500,
		spotsTaken: 312,
		questions: mathA,
	},

	// B daraja — 7–8 sinf — FAOL
	{
		id: 'math-B',
		title: 'Matematika Olimpiadasi — B Daraja',
		subject: 'Math',
		grade: '7–8 sinf',
		targetLevel: 'B',
		startTime: past(2),
		duration: 45,
		participantCount: 680,
		price: 20000,
		spotsTotal: 400,
		spotsTaken: 178,
		questions: mathB,
	},

	// C daraja — 5–6 sinf — FAOL
	{
		id: 'math-C',
		title: 'Matematika Olimpiadasi — C Daraja',
		subject: 'Math',
		grade: '5–6 sinf',
		targetLevel: 'C',
		startTime: past(0.5),
		duration: 35,
		participantCount: 540,
		price: 15000,
		spotsTotal: 300,
		spotsTaken: 95,
		questions: mathC,
	},

	// ── INGLIZ TILI ────────────────────────────────────────────────────────────

	// A daraja — 9–11 sinf — FAOL
	{
		id: 'eng-A',
		title: 'English Language Olympiad — Level A',
		subject: 'English',
		grade: '9–11 sinf',
		targetLevel: 'A',
		startTime: past(0.5),
		duration: 45,
		participantCount: 870,
		price: 25000,
		spotsTotal: 500,
		spotsTaken: 401,
		questions: engA,
	},

	// B daraja — 7–8 sinf — TEZ KUNDA
	{
		id: 'eng-B',
		title: 'English Language Olympiad — Level B',
		subject: 'English',
		grade: '7–8 sinf',
		targetLevel: 'B',
		startTime: future(24),
		duration: 40,
		participantCount: 390,
		price: 20000,
		spotsTotal: 350,
		spotsTaken: 120,
		questions: engB,
	},

	// C daraja — 5–6 sinf — TEZ KUNDA
	{
		id: 'eng-C',
		title: 'English Language Olympiad — Level C',
		subject: 'English',
		grade: '5–6 sinf',
		targetLevel: 'C',
		startTime: future(48),
		duration: 30,
		participantCount: 310,
		price: 15000,
		spotsTotal: 300,
		spotsTaken: 88,
		questions: engC,
	},
];
