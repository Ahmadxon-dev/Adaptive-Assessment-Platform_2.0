import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const normalizeAnswer = (answer) => {
  return String(answer ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

export const isAnswerCorrect = (question, questionType) => {
  const { selectedAnswer, correctAnswer } = question;

  if (selectedAnswer == null || correctAnswer == null) {
    return false;
  }

  if (questionType === "multiple-choice") {
    return selectedAnswer === correctAnswer;
  }

  const userAnswer = normalizeAnswer(selectedAnswer);
  const expectedAnswer = normalizeAnswer(correctAnswer);

  if (!userAnswer || !expectedAnswer) return false;

  if (userAnswer === expectedAnswer) return true;

  const numericPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;

  if (
    numericPattern.test(userAnswer) &&
    numericPattern.test(expectedAnswer)
  ) {
    return Number(userAnswer) === Number(expectedAnswer);
  }

  return false;
};