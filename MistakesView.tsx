import React, { useState } from 'react';
import {
  AlertOctagon,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { Question } from '../types';
import { getAll1270Questions } from '../data/questionBankEngine';
import { TrafficSituationVisual } from './TrafficSituationVisual';
import { soundManager } from '../utils/sound';

interface MistakesViewProps {
  mistakeIds: string[];
  onCorrectMistake: (questionId: string) => void;
  onAddXp: (amount: number) => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  mistakeIds,
  onCorrectMistake,
  onAddXp
}) => {
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const allQuestions = getAll1270Questions();
  const mistakeQuestions = allQuestions.filter((q) => mistakeIds.includes(q.id));
  const currentQ = mistakeQuestions[currentIdx];

  const handleSelectAnswer = (optIdx: number) => {
    if (!currentQ || userAnswers[currentIdx] !== undefined) return;

    const isCorrect = optIdx === currentQ.correctAnswerIndex;
    setUserAnswers({ ...userAnswers, [currentIdx]: optIdx });

    if (isCorrect) {
      soundManager.playCorrect();
      onAddXp(20);
      onCorrectMistake(currentQ.id);
    } else {
      soundManager.playWrong();
    }
  };

  // 1. EMPTY STATE - NO MISTAKES
  if (mistakeQuestions.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          Xatolar daftari bo‘sh!
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
          Ajoyib natija! Siz barcha ishlangan testlarni to‘g‘ri bajardingiz yoki barcha xatolaringizni to‘liq tuzatib chiqdingiz.
        </p>
      </div>
    );
  }

  // 2. ACTIVE PRACTICE OF MISTAKES
  if (practiceMode && currentQ) {
    const hasAnsweredCurrent = userAnswers[currentIdx] !== undefined;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
          <button
            onClick={() => setPracticeMode(false)}
            className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            ← Ro'yxatga qaytish
          </button>
          <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-lg border border-red-200 dark:border-red-900/40">
            Xatolarni tuzatish • {currentIdx + 1}/{mistakeQuestions.length}
          </span>
        </div>

        {/* Visual Diagram */}
        <TrafficSituationVisual question={currentQ} />

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm my-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-5">
            {currentQ.questionText}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isUserSelected = userAnswers[currentIdx] === optIdx;
              const isCorrectOption = optIdx === currentQ.correctAnswerIndex;

              let optionStyle =
                'border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100';

              if (hasAnsweredCurrent) {
                if (isCorrectOption) {
                  optionStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isUserSelected) {
                  optionStyle =
                    'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 line-through';
                } else {
                  optionStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 select-none ${optionStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black mt-0.5 ${
                      hasAnsweredCurrent && isCorrectOption
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : hasAnsweredCurrent && isUserSelected
                        ? 'bg-red-500 text-white shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-sm font-bold leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {hasAnsweredCurrent && (
            <div className="mt-5 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Qoida tushuntirishi ({currentQ.ruleReference})</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Next Question Button */}
        {hasAnsweredCurrent && (
          <button
            onClick={() => {
              if (currentIdx < mistakeQuestions.length - 1) {
                setCurrentIdx(currentIdx + 1);
              } else {
                setPracticeMode(false);
              }
            }}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            {currentIdx === mistakeQuestions.length - 1
              ? 'Mashg‘ulotni yakunlash'
              : 'Keyingi savolga o‘tish'}
          </button>
        )}
      </div>
    );
  }

  // 3. MISTAKES OVERVIEW LIST
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Xatolar Ustida Ishlash
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Siz xato qilgan {mistakeQuestions.length} ta savol. Ularni qayta ishlab mustahkamlab oling.
          </p>
        </div>

        <button
          onClick={() => {
            setPracticeMode(true);
            setCurrentIdx(0);
            setUserAnswers({});
            soundManager.playClick();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs shadow-md shadow-red-500/20 transition shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Xatolar bo‘yicha test ishlash</span>
        </button>
      </div>

      <div className="space-y-4">
        {mistakeQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-red-200 dark:border-red-950/60 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                Savol #{idx + 1} • {q.ruleReference}
              </span>
              <span className="text-[11px] text-slate-400">
                To'g'ri javob: {q.options[q.correctAnswerIndex]}
              </span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              {q.questionText}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-blue-600 dark:text-blue-400 mr-1">Tushuntirish:</span>
              {q.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
