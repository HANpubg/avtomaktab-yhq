import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { RoadSign } from '../types';
import { ROAD_SIGNS } from '../data/roadSignsData';
import { SignGraphic } from './SignGraphic';
import { soundManager } from '../utils/sound';

interface RoadSignsViewProps {
  onAddXp: (amount: number) => void;
}

export const RoadSignsView: React.FC<RoadSignsViewProps> = ({ onAddXp }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSign, setSelectedSign] = useState<RoadSign | null>(null);

  // Quiz Mode State
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<
    { sign: RoadSign; options: string[]; correctIdx: number }[]
  >([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'warning', label: 'Ogohlantiruvchi' },
    { id: 'priority', label: 'Imtiyoz' },
    { id: 'prohibitory', label: "Ta'qiqlovchi" },
    { id: 'mandatory', label: 'Buyuruvchi' },
    { id: 'informative', label: "Axborot-ko'rsatkich" },
    { id: 'service', label: 'Servis' }
  ];

  const filteredSigns = ROAD_SIGNS.filter((sign) => {
    const matchesCategory =
      selectedCategory === 'all' || sign.category === selectedCategory;
    const matchesSearch =
      sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Start Sign Quiz
  const startQuiz = () => {
    const shuffled = [...ROAD_SIGNS].sort(() => 0.5 - Math.random()).slice(0, 8);
    const prepared = shuffled.map((sign) => {
      // Pick 3 wrong names from other signs
      const otherNames = ROAD_SIGNS.filter((s) => s.id !== sign.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((s) => s.name);
      const options = [...otherNames, sign.name].sort(() => 0.5 - Math.random());
      const correctIdx = options.indexOf(sign.name);
      return { sign, options, correctIdx };
    });

    setQuizQuestions(prepared);
    setQuizIdx(0);
    setQuizScore(0);
    setQuizAnswers({});
    setIsQuizMode(true);
    soundManager.playClick();
  };

  const handleQuizAnswer = (optIdx: number) => {
    if (quizAnswers[quizIdx] !== undefined) return;

    const currentQ = quizQuestions[quizIdx];
    const isCorrect = optIdx === currentQ.correctIdx;

    const newAnswers = { ...quizAnswers, [quizIdx]: optIdx };
    setQuizAnswers(newAnswers);

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      soundManager.playCorrect();
      onAddXp(10);
    } else {
      soundManager.playWrong();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Yo'l Belgilari Katalogi va Viktorina
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            O'zbekiston Respublikasi Yo'l Harakati Qoidalaridagi barcha rasmiy belgilar.
          </p>
        </div>

        <button
          onClick={() => {
            if (isQuizMode) {
              setIsQuizMode(false);
            } else {
              startQuiz();
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>{isQuizMode ? 'Katalogga qaytish' : 'Belgilar bo‘yicha Viktorina'}</span>
        </button>
      </div>

      {/* QUIZ MODE */}
      {isQuizMode ? (
        <div className="max-w-xl mx-auto py-4">
          {quizIdx >= quizQuestions.length ? (
            // Quiz Complete
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border-2 border-amber-500">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Viktorina Yakunlandi!
              </h3>
              <p className="text-xs text-slate-500">
                Siz {quizQuestions.length} tadan {quizScore} ta belgini to'g'ri topdingiz.
              </p>
              <div className="text-2xl font-black text-amber-500">
                +{quizScore * 10} XP
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={startQuiz}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  Qayta boshlash
                </button>
                <button
                  onClick={() => setIsQuizMode(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
                >
                  Katalogga qaytish
                </button>
              </div>
            </div>
          ) : (
            // Active Quiz Card
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-4">
                <span>Belgilar Viktorinasi</span>
                <span>{quizIdx + 1} / {quizQuestions.length}</span>
              </div>

              {/* Graphic Sign Display */}
              <div className="py-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 mb-6">
                <SignGraphic sign={quizQuestions[quizIdx].sign} size={110} />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-3 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                  Belgi kodi: {quizQuestions[quizIdx].sign.code}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">
                Ushbu yo'l belgisi qanday nomlanadi?
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {quizQuestions[quizIdx].options.map((option, optIdx) => {
                  const hasAnswered = quizAnswers[quizIdx] !== undefined;
                  const isCorrect = optIdx === quizQuestions[quizIdx].correctIdx;
                  const isSelected = quizAnswers[quizIdx] === optIdx;

                  let style =
                    'border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200';

                  if (hasAnswered) {
                    if (isCorrect) {
                      style =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected) {
                      style =
                        'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 line-through';
                    } else {
                      style = 'opacity-50 border-slate-200 dark:border-slate-800';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizAnswer(optIdx)}
                      disabled={hasAnswered}
                      className={`w-full p-3.5 rounded-xl border-2 text-xs sm:text-sm text-left transition flex items-center justify-between ${style}`}
                    >
                      <span>{option}</span>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizAnswers[quizIdx] !== undefined && (
                <button
                  onClick={() => setQuizIdx((prev) => prev + 1)}
                  className="w-full mt-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
                >
                  {quizIdx === quizQuestions.length - 1 ? 'Natijani ko‘rish' : 'Keyingi belgi'}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        // CATALOG HANDBOOK MODE
        <>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Belgi nomi yoki kodini izlash (masalan: 3.27, Bosh yo'l, STOP)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Road Signs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-150 cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 flex items-center justify-center my-2">
                  <SignGraphic sign={sign} size={76} />
                </div>

                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-2">
                  № {sign.code}
                </span>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sign.name}
                </h4>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sign.description}
                </p>
              </div>
            ))}
          </div>

          {filteredSigns.length === 0 && (
            <div className="py-16 text-center text-slate-400 text-sm">
              Qidiruv bo'yicha hech qanday belgi topilmadi.
            </div>
          )}
        </>
      )}

      {/* Sign Details Modal */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="py-4 flex justify-center">
              <SignGraphic sign={selectedSign} size={110} />
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
              Belgi {selectedSign.code} • {selectedSign.categoryUz}
            </span>

            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {selectedSign.name}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-left bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              {selectedSign.description}
            </p>

            <button
              onClick={() => setSelectedSign(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
