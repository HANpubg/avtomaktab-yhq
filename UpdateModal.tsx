import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  DownloadCloud,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AppUpdateInfo } from '../types';
import { soundManager } from '../utils/sound';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateInfo: AppUpdateInfo;
  onApplyUpdate: (newVersion: string) => void;
  onCheckUpdates: () => void;
  isChecking: boolean;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  updateInfo,
  onApplyUpdate,
  onCheckUpdates,
  isChecking
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStep, setUpdateStep] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  if (!isOpen) return null;

  const handleStartUpdateWithPermission = () => {
    setIsUpdating(true);
    setProgress(15);
    setUpdateStep("Serverdan 2026-yilgi yangi YHQ o'zgarishlari yuklab olinmoqda...");

    setTimeout(() => {
      setProgress(45);
      setUpdateStep("Mavzulashtirilgan testlar va yangi biletlar bazasi tekshirilmoqda...");
    }, 900);

    setTimeout(() => {
      setProgress(75);
      setUpdateStep("Yo'l belgilari katalogi va tushuntirishlar yangilanmoqda...");
    }, 1800);

    setTimeout(() => {
      setProgress(100);
      setUpdateStep("Yangilanish to'liq o'rnatildi!");
      setIsUpdating(false);
      setUpdateSuccess(true);
      soundManager.playComplete();
      onApplyUpdate('2.5.0');
    }, 2700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isUpdating}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
            <RefreshCw className={`w-6 h-6 ${isChecking || isUpdating ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Ilovani Yangilash Markazi
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Joriy versiya: <span className="font-semibold text-slate-700 dark:text-slate-300">v{updateInfo.version}</span>
            </p>
          </div>
        </div>

        {/* Security & User Consent Guarantee Notice */}
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <span className="font-bold block">Faqat sizning ruxsatingiz bilan yangilanadi:</span>
            Ilova hech qanday avtomatik majburiy yangilanmaydi. Siz tekshiruvdan o'tkazib, ruxsat berganingizdan so'nggina yangi qoidalar va biletlar yuklanadi.
          </div>
        </div>

        {/* Content based on state */}
        {updateSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ilova Muvaffaqiyatli Yangilandi!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              2026-yilgi eng so'nggi YHQ qoidalari, yangilangan savollar va tushuntirishlar bazasi xotiraga yuklandi.
            </p>
            <button
              onClick={() => {
                setUpdateSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition"
            >
              Tushunarli, davom etish
            </button>
          </div>
        ) : isUpdating ? (
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-2">
                <DownloadCloud className="w-4 h-4 text-blue-500 animate-bounce" />
                {updateStep}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Iltimos kuting, yangi ma'lumotlar sinxronlanmoqda...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Update details card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  {updateInfo.isAvailable ? 'Yangi versiya: v2.5.0' : 'Versiya: v' + updateInfo.version}
                </span>
                <span className="text-[11px] text-slate-400">
                  {updateInfo.releaseDate}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {updateInfo.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {updateInfo.description}
              </p>

              <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-700 pt-3">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Ushbu yangilanishdagi o'zgarishlar:
                </p>
                {updateInfo.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                onClick={onCheckUpdates}
                disabled={isChecking}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                {isChecking ? 'Tekshirilmoqda...' : 'Qayta tekshirish'}
              </button>

              <button
                onClick={handleStartUpdateWithPermission}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
              >
                <DownloadCloud className="w-4 h-4" />
                Ha, yangilansin (Ruxsat)
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
