import React from 'react';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Flame,
  Zap,
  RefreshCw,
  UserCheck,
  LogIn,
  Car
} from 'lucide-react';
import { UserProfile, AppUpdateInfo } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  userProfile: UserProfile | null;
  onOpenAuthModal: () => void;
  updateInfo: AppUpdateInfo;
  onOpenUpdateModal: () => void;
  hasPendingUpdate: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  soundMuted,
  onToggleSound,
  userProfile,
  onOpenAuthModal,
  updateInfo,
  onOpenUpdateModal,
  hasPendingUpdate
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                AvtoMaktab <span className="text-blue-600 dark:text-blue-400">YHQ</span>
              </h1>
              <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                2026
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Muallif:
              </span>
              <span className="text-[10px] sm:text-[11px] font-black text-blue-600 dark:text-blue-400 px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                Juraboyev Halilullo
              </span>
            </div>
          </div>
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Streak pill */}
          <div
            title="Kunlik ketma-ketlik seriyasi"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/40 text-xs font-bold"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{userProfile?.streak || 1} kun</span>
          </div>

          {/* XP pill */}
          <div
            title="To'plangan tajriba ballari (XP)"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40 text-xs font-bold"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{userProfile?.xp || 0} XP</span>
          </div>

          {/* Update Checker Button */}
          <button
            onClick={onOpenUpdateModal}
            title="Ilova yangilanishlarini tekshirish"
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              hasPendingUpdate
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse shadow-md shadow-emerald-500/20'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${hasPendingUpdate ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">
              {hasPendingUpdate ? 'Yangi versiya!' : `v${updateInfo.version}`}
            </span>
            {hasPendingUpdate && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle sound"
          >
            {soundMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? "Yorug' rejimga o'tish (Oq fon)" : "Qorong'i rejimga o'tish (Qora fon)"}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* User Account Button (Google Account) */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50 dark:bg-slate-800 transition-colors ml-1"
            title={userProfile?.displayName ? userProfile.displayName : "Google akkaunt bilan kirish"}
          >
            {userProfile?.photoURL ? (
              <img
                src={userProfile.photoURL}
                alt={userProfile.displayName || 'User'}
                className="w-6 h-6 rounded-full object-cover border border-blue-500"
              />
            ) : userProfile?.displayName ? (
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {userProfile.displayName.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <LogIn className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 hidden sm:inline max-w-[90px] truncate">
              {userProfile?.displayName ? userProfile.displayName.split(' ')[0] : 'Kirish'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
