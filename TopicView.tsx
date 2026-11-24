import React, { useState } from 'react';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Sparkles,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Ban,
  Info,
  Layers,
  MoveHorizontal
} from 'lucide-react';
import { Topic, Question } from '../types';
import { TOPICS, SIGN_TOPICS } from '../data/questionsData';
import { getQuestionsByTopic } from '../data/questionBankEngine';
import { TrafficSituationVisual } from './TrafficSituationVisual';
import { SignGraphic } from './SignGraphic';
import { soundManager } from '../utils/sound';

interface TopicViewProps {
  onRecordMistake: (question: Question) => void;
  onAddXp: (amount: number) => void;
}

export const TopicView: React.FC<TopicViewProps> = ({
  onRecordMistake,
  onAddXp
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'signs'>('rules');
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('avto_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const topicQuestions = activeTopic
    ? getQuestionsByTopic(activeTopic.id)
    : [];

  const currentQ = topicQuestions[currentIdx];

  const handleSelectAnswer = (optIdx: number) => {
    if (!currentQ || userAnswers[currentIdx] !== undefined) return;

    const isCorrect = optIdx === currentQ.correctAnswerIndex;
    setUserAnswers({ ...userAnswers, [currentIdx]: optIdx });

    if (isCorrect) {
      soundManager.playCorrect();
      onAddXp(15);
    } else {
      soundManager.playWrong();
      onRecordMistake(currentQ);
    }
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

  // 1. TOPIC CATALOG VIEW
  if (!activeTopic) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Mavzulashtirilgan Testlar
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Yo'l harakati qoidalari boblari va yo'l belgilari guruhlari bo'yicha maxsus testlar
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit shrink-0">
            <button
              onClick={() => {
                setActiveTab('rules');
                soundManager.playClick();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'rules'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>YHQ Qoidalari (16 bob)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('signs');
                soundManager.playClick();
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activeTab === 'signs'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Yo'l Belgilari (8 guruh)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: YHQ RULES (16 CHAPTERS) */}
        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-150">
            {TOPICS.map((topic) => {
              const count = getQuestionsByTopic(topic.id).length;

              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    setActiveTopic(topic);
                    setCurrentIdx(0);
                    setUserAnswers({});
                    soundManager.playClick();
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        Bob #{topic.number}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {count} ta savol
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>Mavzuni boshlash</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: ROAD SIGN GROUPS (8 GROUPS) */}
        {activeTab === 'signs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 animate-in fade-in duration-150">
            {SIGN_TOPICS.map((topic) => {
              const count = getQuestionsByTopic(topic.id).length;

              // Representative sign previews for each sign group
              const previewSigns: Record<string, string[]> = {
                't-sign-warning': ['1.23', '1.25', '1.1'],
                't-sign-priority': ['2.1', '2.4', '2.5'],
                't-sign-prohibitory': ['3.1', '3.20', '3.24'],
                't-sign-mandatory': ['4.1.1', '4.1.2', '4.3'],
                't-sign-informative': ['5.1', '5.15', '5.22'],
                't-sign-service': ['6.1', '6.3', '6.11'],
                't-sign-additional': ['7.13', '7.2.1', '7.1.1'],
                't-sign-markings': ['1.3', '1.11', '1.12']
              };

              const signs = previewSigns[topic.id] || ['1.1', '2.1'];

              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    setActiveTopic(topic);
                    setCurrentIdx(0);
                    setUserAnswers({});
                    soundManager.playClick();
                  }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Top Group Meta & Sign Preview */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {topic.title.split('.')[0]}
                      </span>

                      {/* Vector Signs Preview */}
                      <div className="flex items-center gap-2">
                        {signs.map((code, idx) => (
                          <SignGraphic key={idx} signCode={code} size={36} className="shadow-sm" />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {topic.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 dark:text-slate-400">
                      {count} ta mavzulashtirilgan savol
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 group-hover:translate-x-1 transition-transform">
                      <span>Testni ishlash</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // 2. ACTIVE TOPIC PRACTICE
  if (topicQuestions.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Ushbu mavzu bo'yicha savollar tez orada qo'shiladi
        </h3>
        <button
          onClick={() => setActiveTopic(null)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Barcha mavzularga qaytish
        </button>
      </div>
    );
  }

  const hasAnsweredCurrent = userAnswers[currentIdx] !== undefined;
  const isBookmarked = bookmarkedIds.includes(currentQ.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
        <button
          onClick={() => setActiveTopic(null)}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Mavzular ro'yxatiga qaytish</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {activeTopic.title} • {currentIdx + 1}/{topicQuestions.length}
          </span>
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            title="Savolni saqlab qo'yish"
            className="p-1.5 rounded-xl text-slate-500 hover:text-amber-500 transition"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Progress navigation pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {topicQuestions.map((q, idx) => {
          const ans = userAnswers[idx];
          const isCurrent = currentIdx === idx;
          let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

          if (ans !== undefined) {
            btnStyle =
              ans === q.correctAnswerIndex
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-red-500 text-white font-bold';
          }

          if (isCurrent) {
            btnStyle += ' ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900';
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

      {/* High-Definition Visual Diagram */}
      <TrafficSituationVisual question={currentQ} />

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm my-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug mb-5">
          {currentQ.questionText}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isUserSelected = userAnswers[currentIdx] === optIdx;
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

        {/* Detailed YHQ Explanation */}
        {hasAnsweredCurrent && (
          <div className="mt-5 p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/90 dark:border-blue-800/70 text-xs sm:text-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-black text-blue-900 dark:text-blue-300 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>YHQ {currentQ.ruleReference} bo'yicha rasmiy izoh</span>
            </div>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Nav Controls */}
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

        <button
          onClick={() => {
            if (currentIdx < topicQuestions.length - 1) {
              setCurrentIdx(currentIdx + 1);
            } else {
              setActiveTopic(null);
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center gap-1.5"
        >
          <span>
            {currentIdx === topicQuestions.length - 1 ? 'Mavzularga qaytish' : 'Keyingi savol'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
