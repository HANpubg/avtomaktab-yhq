import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Zap,
  Play,
  Search,
  Filter,
  Flame,
  ListOrdered
} from 'lucide-react';
import { Ticket, Question } from '../types';
import {
  ALL_TICKETS,
  getQuestionsByTicket,
  getAll1270Questions,
  TOTAL_OFFICIAL_QUESTIONS
} from '../data/questionBankEngine';
import { TrafficSituationVisual } from './TrafficSituationVisual';
import { soundManager } from '../utils/sound';

interface TicketViewProps {
  onBackToDashboard: () => void;
  onRecordResult: (ticketId: string, score: number, total: number, passed: boolean) => void;
  onRecordMistake: (question: Question) => void;
  onAddXp: (amount: number) => void;
  completedTickets: Record<string, { score: number; total: number; passed: boolean }>;
}

export const TicketView: React.FC<TicketViewProps> = ({
  onBackToDashboard,
  onRecordResult,
  onRecordMistake,
  onAddXp,
  completedTickets
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Search & Filter
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'passed' | 'unpassed' | 'new'>('all');

  // Jump by global question number (1 to 1270)
  const [jumpQuestionNum, setJumpQuestionNum] = useState('');

  // Marathon Mode state (100 questions continuous drill)
  const [isMarathon, setIsMarathon] = useState(false);
  const [marathonQuestions, setMarathonQuestions] = useState<Question[]>([]);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('avto_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Questions for active session (Ticket or Marathon)
  const activeQuestions: Question[] = isMarathon
    ? marathonQuestions
    : selectedTicket
    ? getQuestionsByTicket(selectedTicket.id)
    : [];

  const currentQ = activeQuestions[currentQuestionIdx];

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsMarathon(false);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    soundManager.playClick();
  };

  const handleStartMarathon = (count: number = 100) => {
    const all = getAll1270Questions();
    const shuffled = [...all].sort(() => 0.5 - Math.random()).slice(0, count);
    setMarathonQuestions(shuffled);
    setIsMarathon(true);
    setSelectedTicket({
      id: 'marathon',
      number: 0,
      title: `${count} ta Savol Marafoni`,
      questionCount: count
    });
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    soundManager.playClick();
  };

  const handleJumpToQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const qNum = parseInt(jumpQuestionNum, 10);
    if (!isNaN(qNum) && qNum >= 1 && qNum <= TOTAL_OFFICIAL_QUESTIONS) {
      // Find which ticket this question belongs to
      const ticketNum = Math.min(Math.floor((qNum - 1) / 18) + 1, ALL_TICKETS.length);
      const targetTicket = ALL_TICKETS.find((t) => t.number === ticketNum) || ALL_TICKETS[0];
      const qInTicket = ((qNum - 1) % 18);

      setSelectedTicket(targetTicket);
      setIsMarathon(false);
      setCurrentQuestionIdx(qInTicket);
      setUserAnswers({});
      setShowExplanation(false);
      setIsCompleted(false);
      soundManager.playClick();
    }
  };

  const handleSelectAnswer = (optionIdx: number) => {
    if (!currentQ || userAnswers[currentQuestionIdx] !== undefined) return;

    const isCorrect = optionIdx === currentQ.correctAnswerIndex;
    const newAnswers = { ...userAnswers, [currentQuestionIdx]: optionIdx };
    setUserAnswers(newAnswers);

    if (isCorrect) {
      soundManager.playCorrect();
      onAddXp(15);
    } else {
      soundManager.playWrong();
      onRecordMistake(currentQ);
    }

    setShowExplanation(true);

    // If all questions in session answered, finish ticket
    if (Object.keys(newAnswers).length === activeQuestions.length) {
      setTimeout(() => {
        finishTicket(newAnswers);
      }, 700);
    }
  };

  const finishTicket = (answers: Record<number, number>) => {
    let score = 0;
    activeQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) score++;
    });

    const passed = score >= Math.ceil(activeQuestions.length * 0.85); // 85% passing threshold
    setIsCompleted(true);
    if (selectedTicket) {
      onRecordResult(selectedTicket.id, score, activeQuestions.length, passed);
    }
    soundManager.playComplete();
  };

  const toggleBookmark = (qId: string) => {
    const updated = bookmarkedIds.includes(qId)
      ? bookmarkedIds.filter((id) => id !== qId)
      : [...bookmarkedIds, qId];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('avto_bookmarks', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    soundManager.playClick();
  };

  // Filtered tickets
  const filteredTickets = ALL_TICKETS.filter((ticket) => {
    const matchesSearch =
      ticket.number.toString().includes(ticketSearch) ||
      ticket.title.toLowerCase().includes(ticketSearch.toLowerCase());

    const result = completedTickets[ticket.id];
    if (ticketFilter === 'passed') return matchesSearch && result?.passed;
    if (ticketFilter === 'unpassed') return matchesSearch && result && !result.passed;
    if (ticketFilter === 'new') return matchesSearch && !result;

    return matchesSearch;
  });

  // Count stats
  const totalPassedTickets = Object.values(completedTickets).filter((r) => r.passed).length;

  // 1. TICKET CATALOG OVERVIEW
  if (!selectedTicket) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200 space-y-6">
        {/* Banner with 1270 Questions & Marathon options */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>To‘liq 1270 ta rasmiy testlar bazasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              70 ta Rasmiy Imtihon Biletlari
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              IIV JXD YHXX va Oson Prava imtihon bazasidagi barcha biletlar to‘liq kiritilgan. Har bir savol aniq grafik tasvirlangan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleStartMarathon(100)}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition flex items-center gap-2 hover:scale-105"
            >
              <Flame className="w-4 h-4 fill-slate-900" />
              <span>100 ta Savol Marafoni</span>
            </button>

            <button
              onClick={() => {
                const randomTicket = ALL_TICKETS[Math.floor(Math.random() * ALL_TICKETS.length)];
                handleSelectTicket(randomTicket);
              }}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Tasodifiy bilet</span>
            </button>
          </div>
        </div>

        {/* Search, Question Jump, and Filter controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search by Ticket # */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Bilet raqami bo‘yicha izlash (1 - 70)..."
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Jump to specific Question Number (1 to 1270) */}
          <form onSubmit={handleJumpToQuestion} className="flex items-center gap-2">
            <div className="relative">
              <ListOrdered className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="number"
                min="1"
                max={TOTAL_OFFICIAL_QUESTIONS}
                placeholder="Savol № (1-1270)"
                value={jumpQuestionNum}
                onChange={(e) => setJumpQuestionNum(e.target.value)}
                className="w-36 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              O‘tish
            </button>
          </form>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: `Barchasi (${ALL_TICKETS.length})` },
                { id: 'passed', label: `O‘tilgan (${totalPassedTickets})` },
                { id: 'unpassed', label: 'Qayta topshirish' },
                { id: 'new', label: 'Yangi' }
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setTicketFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  ticketFilter === f.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Grid (All 70 Tickets) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredTickets.map((ticket) => {
            const result = completedTickets[ticket.id];
            const isPassed = result?.passed;
            const hasAttempted = !!result;

            return (
              <div
                key={ticket.id}
                onClick={() => handleSelectTicket(ticket)}
                className={`p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 group ${
                  isPassed
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                    : hasAttempted
                    ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                    : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      № {ticket.number}
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : hasAttempted ? (
                      <XCircle className="w-4 h-4 text-amber-500" />
                    ) : null}
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ticket.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {ticket.questionCount} ta savol
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold">
                  {result ? (
                    <span className={isPassed ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {result.score}/{result.total}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">Boshlash</span>
                  )}
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. TICKET COMPLETION RESULT CARD
  if (isCompleted) {
    let score = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) score++;
    });
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const passed = score >= Math.ceil(activeQuestions.length * 0.85);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-in zoom-in-95 duration-200">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              passed
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500'
                : 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border-2 border-red-500'
            }`}
          >
            {passed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 ${
              passed
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
            }`}
          >
            {passed ? 'Bilet muvaffaqiyatli topshirildi!' : 'Bilet topshirilmadi'}
          </span>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {selectedTicket.title} Natijasi
          </h3>

          <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 grid grid-cols-3 gap-2">
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {score} / {activeQuestions.length}
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">To‘g‘ri javob</div>
            </div>
            <div>
              <div className={`text-2xl font-black ${passed ? 'text-emerald-500' : 'text-red-500'}`}>
                {percentage}%
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">Ko‘rsatkich</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5 fill-amber-500" />
                +{score * 15}
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">XP yutug‘i</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                setUserAnswers({});
                setCurrentQuestionIdx(0);
                setIsCompleted(false);
                setShowExplanation(false);
              }}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Qaytadan ishlash
            </button>
            <button
              onClick={() => {
                const nextNumber = selectedTicket.number + 1;
                const nextTicket = ALL_TICKETS.find((t) => t.number === nextNumber);
                if (nextTicket) {
                  handleSelectTicket(nextTicket);
                } else {
                  setSelectedTicket(null);
                }
              }}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Keyingi bilet</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. ACTIVE QUESTION SOLVING VIEW
  const hasAnsweredCurrent = userAnswers[currentQuestionIdx] !== undefined;
  const isBookmarked = bookmarkedIds.includes(currentQ.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-150">
      {/* Top Header of Ticket Session */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
        <button
          onClick={() => setSelectedTicket(null)}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Barcha biletlar</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
            {selectedTicket.title} • {currentQuestionIdx + 1}/{activeQuestions.length}
          </span>
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            title="Savolni saqlab qo‘yish"
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-500 transition"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Question Indicator Numbers */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {activeQuestions.map((q, idx) => {
          const ans = userAnswers[idx];
          const isCurrent = currentQuestionIdx === idx;
          let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

          if (ans !== undefined) {
            if (ans === q.correctAnswerIndex) {
              btnStyle = 'bg-emerald-500 text-white font-bold shadow-sm shadow-emerald-500/20';
            } else {
              btnStyle = 'bg-red-500 text-white font-bold shadow-sm shadow-red-500/20';
            }
          }

          if (isCurrent) {
            btnStyle += ' ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900';
          }

          return (
            <button
              key={idx}
              onClick={() => {
                setCurrentQuestionIdx(idx);
                setShowExplanation(userAnswers[idx] !== undefined);
                soundManager.playClick();
              }}
              className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-transform ${btnStyle}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Traffic Visual Diagram (EVERY question has visual situation!) */}
      <TrafficSituationVisual question={currentQ} />

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm my-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-5">
          {currentQ.questionText}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isUserSelected = userAnswers[currentQuestionIdx] === optIdx;
            const isCorrectOption = optIdx === currentQ.correctAnswerIndex;

            let optionStyle =
              'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100';

            if (hasAnsweredCurrent) {
              if (isCorrectOption) {
                optionStyle =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isUserSelected && !isCorrectOption) {
                optionStyle =
                  'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 line-through opacity-80';
              } else {
                optionStyle =
                  'border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-800/20 text-slate-400 opacity-60';
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

        {/* Explanation Card */}
        {hasAnsweredCurrent && (
          <div className="mt-5 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-xs sm:text-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-300 mb-1">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Qoida tushuntirishi ({currentQ.ruleReference})
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Nav Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            if (currentQuestionIdx > 0) {
              setCurrentQuestionIdx(currentQuestionIdx - 1);
              setShowExplanation(userAnswers[currentQuestionIdx - 1] !== undefined);
            }
          }}
          disabled={currentQuestionIdx === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Oldingi savol</span>
        </button>

        <button
          onClick={() => {
            if (currentQuestionIdx < activeQuestions.length - 1) {
              setCurrentQuestionIdx(currentQuestionIdx + 1);
              setShowExplanation(userAnswers[currentQuestionIdx + 1] !== undefined);
            } else if (hasAnsweredCurrent) {
              finishTicket(userAnswers);
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center gap-1.5"
        >
          <span>
            {currentQuestionIdx === activeQuestions.length - 1
              ? 'Natijani ko‘rish'
              : 'Keyingi savol'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
