import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  AlertTriangle,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Share2,
  FileBadge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, UserProfile } from '../types';
import { getRandomExamQuestions, TOTAL_OFFICIAL_QUESTIONS } from '../data/questionBankEngine';
import { TrafficSituationVisual } from './TrafficSituationVisual';
import { soundManager } from '../utils/sound';

interface ExamViewProps {
  userProfile: UserProfile | null;
  onRecordResult: (examId: string, score: number, total: number, passed: boolean) => void;
  onRecordMistake: (question: Question) => void;
  onAddXp: (amount: number) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  userProfile,
  onRecordResult,
  onRecordMistake,
  onAddXp
}) => {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate 20 randomized questions across all 1270 questions
  const startExam = () => {
    const selected = getRandomExamQuestions();

    setExamQuestions(selected);
    setCurrentIdx(0);
    setUserAnswers({});
    setTimeLeft(20 * 60);
    setExamFinished(false);
    setExamStarted(true);
    soundManager.playClick();
  };

  // Timer countdown
  useEffect(() => {
    if (examStarted && !examFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, examFinished, timeLeft]);

  const handleSelectAnswer = (optIdx: number) => {
    if (examFinished || userAnswers[currentIdx] !== undefined) return;

    const newAnswers = { ...userAnswers, [currentIdx]: optIdx };
    setUserAnswers(newAnswers);
    soundManager.playClick();

    // Check if 3rd mistake reached (instant failure in real exam)
    let mistakes = 0;
    Object.entries(newAnswers).forEach(([idxStr, a]) => {
      const q = examQuestions[parseInt(idxStr, 10)];
      if (q && a !== q.correctAnswerIndex) mistakes++;
    });

    if (mistakes >= 3) {
      // 3 mistakes = Failed
      setTimeout(() => {
        finishExam(newAnswers);
      }, 500);
      return;
    }

    // If last question answered
    if (Object.keys(newAnswers).length === examQuestions.length) {
      setTimeout(() => {
        finishExam(newAnswers);
      }, 500);
    }
  };

  const finishExam = (answers = userAnswers) => {
    if (timerRef.current) clearInterval(timerRef.current);

    let score = 0;
    let mistakes = 0;

    examQuestions.forEach((q, idx) => {
      const ans = answers[idx];
      if (ans === q.correctAnswerIndex) {
        score++;
      } else {
        mistakes++;
        onRecordMistake(q);
      }
    });

    const passed = mistakes <= 2; // Real standard: max 2 mistakes
    setExamFinished(true);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      soundManager.playComplete();
      onAddXp(250);
    } else {
      soundManager.playWrong();
    }

    onRecordResult('state-exam-' + Date.now(), score, examQuestions.length, passed);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate current mistakes count
  let currentMistakes = 0;
  Object.entries(userAnswers).forEach(([idxStr, a]) => {
    const q = examQuestions[parseInt(idxStr, 10)];
    if (q && a !== q.correctAnswerIndex) currentMistakes++;
  });

  // 1. INTRO / WELCOME SCREEN
  if (!examStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
            <Timer className="w-10 h-10" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              O'zbekiston Davlat YHQ Imtihon Simulyatori
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 tracking-tight">
              Haqiqiy Imtihon Sharoiti
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
              IIV JXD YHXX Davlat imtihon markazlaridagi kompyuterlashtirilgan haqiqiy test sinovi qoidalari asosida tuzilgan.
            </p>
          </div>

          {/* Exam Rules Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-blue-600 dark:text-blue-400 font-extrabold text-lg mb-1">
                20 ta savol
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Barcha YHQ mavzulari bo'yicha tasodifiy tanlangan rasmiy testlar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-indigo-600 dark:text-indigo-400 font-extrabold text-lg mb-1">
                20 daqiqa
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Haqiqiy vaqt hisoblagichi, har bir savol uchun o'rtacha 1 daqiqa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/60">
              <div className="text-red-600 dark:text-red-400 font-extrabold text-lg mb-1 flex items-center gap-1">
                <ShieldAlert className="w-5 h-5" />
                Maks. 2 ta xato
              </div>
              <p className="text-xs text-red-900/80 dark:text-red-300 leading-relaxed">
                3-xatoda imtihon avtomatik to'xtatiladi va topshirilmagan hisoblanadi.
              </p>
            </div>
          </div>

          {/* Start Exam Button */}
          <button
            onClick={startExam}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition hover:scale-[1.02] flex items-center justify-center gap-3 mx-auto"
          >
            <span>Imtihonni Boshlash</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // 2. EXAM RESULT & CERTIFICATE
  if (examFinished) {
    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) score++;
    });
    const mistakesCount = examQuestions.length - score;
    const passed = mistakesCount <= 2;

    return (
      <div className="max-w-2xl mx-auto px-4 py-10 animate-in zoom-in-95 duration-200">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl text-center">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              passed
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500'
                : 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border-2 border-red-500'
            }`}
          >
            {passed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {passed ? 'Imtihondan Muvaffaqiyatli O‘tdingiz!' : 'Imtihondan O‘ta Olmadingiz'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {passed
              ? 'Siz davlat YHQ nazariy imtihon me’yorini to‘liq bajardingiz.'
              : 'Ruxsat etilgan xatolar chegarasidan (2 ta) oshib ketdingiz.'}
          </p>

          {/* Certificate style box */}
          {passed && (
            <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-50/40 dark:from-amber-950/20 dark:to-slate-800/40 border-2 border-amber-300 dark:border-amber-700/60 relative text-left">
              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-800/60 pb-3 mb-3">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <FileBadge className="w-4 h-4" />
                  Imtihon Muvaffaqiyat Sertifikati
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  {new Date().toLocaleDateString('uz-UZ')}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Haydovchilikka nomzod:
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white mb-2">
                {userProfile?.displayName || 'Bo‘lg‘usi Haydovchi'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>• To‘g‘ri javoblar: <span className="font-bold text-emerald-600">{score} / 20</span></div>
                <div>• Qilingan xatolar: <span className="font-bold text-amber-600">{mistakesCount} ta</span> (Maks. 2)</div>
                <div>• Qolgan vaqt: <span className="font-bold">{formatTime(timeLeft)}</span></div>
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-white">
                {score} / 20
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">To'g'ri</div>
            </div>
            <div>
              <div
                className={`text-xl font-black ${
                  mistakesCount <= 2 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {mistakesCount} ta
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Xato</div>
            </div>
            <div>
              <div className="text-xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 fill-amber-500" />
                {passed ? '+250 XP' : '+30 XP'}
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Mukofot</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={startExam}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta topshirish
            </button>
            <button
              onClick={() => setExamStarted(false)}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Bosh sahifaga qaytish</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. RUNNING EXAM QUESTION SCREEN
  const currentQ = examQuestions[currentIdx];
  const isTimeCritical = timeLeft < 180; // less than 3 minutes

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-150">
      {/* Top HUD with Timer & Mistake Gauge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
        {/* Mistakes counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Xatolar:
          </span>
          <div className="flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                currentMistakes >= 1 ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                currentMistakes >= 2 ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                currentMistakes >= 3 ? 'bg-red-600 animate-ping' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          </div>
          <span className="text-xs font-extrabold text-red-500 ml-1">
            {currentMistakes}/2
          </span>
        </div>

        {/* 20 Min Timer */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-black font-mono transition-colors ${
            isTimeCritical
              ? 'bg-red-50 text-red-600 border-red-300 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800 animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Indicators Grid */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {examQuestions.map((q, idx) => {
          const ans = userAnswers[idx];
          const isCurrent = currentIdx === idx;
          let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

          if (ans !== undefined) {
            btnStyle = 'bg-blue-600 text-white font-bold';
          }

          if (isCurrent) {
            btnStyle += ' ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900';
          }

          return (
            <button
              key={idx}
              onClick={() => {
                setCurrentIdx(idx);
                soundManager.playClick();
              }}
              className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-transform ${btnStyle}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Visual Diagram */}
      <TrafficSituationVisual question={currentQ} />

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm my-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Savol № {currentIdx + 1} / {examQuestions.length}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-5">
          {currentQ.questionText}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isUserSelected = userAnswers[currentIdx] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectAnswer(optIdx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 select-none ${
                  isUserSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black mt-0.5 ${
                    isUserSelected
                      ? 'bg-blue-600 text-white shadow-sm'
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
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
          }}
          disabled={currentIdx === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Oldingi savol</span>
        </button>

        <div className="flex items-center gap-2">
          {currentIdx === examQuestions.length - 1 ? (
            <button
              onClick={() => finishExam()}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition"
            >
              Imtihonni topshirish
            </button>
          ) : (
            <button
              onClick={() => {
                if (currentIdx < examQuestions.length - 1) setCurrentIdx(currentIdx + 1);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center gap-1.5"
            >
              <span>Keyingi savol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
