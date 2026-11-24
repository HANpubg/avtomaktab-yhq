import React, { useState } from 'react';
import {
  X,
  LogIn,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  Flame,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onProfileUpdated: (profile: UserProfile | null) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onProfileUpdated
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      const profile: UserProfile = {
        userId: user.uid,
        email: user.email || undefined,
        displayName: user.displayName || 'Haydovchi',
        photoURL: user.photoURL || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        xp: userProfile?.xp || 150,
        streak: userProfile?.streak || 1,
        testsPassed: userProfile?.testsPassed || 0,
        testsFailed: userProfile?.testsFailed || 0
      };

      onProfileUpdated(profile);
      onClose();
    } catch (err: unknown) {
      console.error('Google Sign In error:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Google akkaunti orqali kirishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      onProfileUpdated(null);
      onClose();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {userProfile ? (
          // Authenticated Profile State
          <div className="text-center space-y-4">
            <div className="relative inline-block mx-auto mt-2">
              {userProfile.photoURL ? (
                <img
                  src={userProfile.photoURL}
                  alt={userProfile.displayName || 'User'}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg mx-auto"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center border-4 border-blue-400 shadow-lg mx-auto">
                  {userProfile.displayName?.charAt(0) || 'H'}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white" title="Google orqali tasdiqlangan">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {userProfile.displayName || 'Google Foydalanuvchisi'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {userProfile.email}
              </p>
            </div>

            {/* Profile Statistics Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-center text-amber-500 mb-1">
                  <Zap className="w-4 h-4 fill-amber-500" />
                </div>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {userProfile.xp}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">
                  Tajriba (XP)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-center text-orange-500 mb-1">
                  <Flame className="w-4 h-4 fill-orange-500" />
                </div>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {userProfile.streak} kun
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">
                  Seriya
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-center text-emerald-500 mb-1">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  {userProfile.testsPassed}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">
                  Topshirilgan
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/40 text-xs text-blue-900 dark:text-blue-300 text-left flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                Barcha ishlangan biletlar, imtihon natijalari va xatolar daftari xavfsiz Google hisobingizga sinxronlanmoqda.
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {loading ? 'Chiqilmoqda...' : 'Google akkauntdan chiqish'}
            </button>
          </div>
        ) : (
          // Unauthenticated State (Prompt to Sign In)
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
              <LogIn className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Google Akkaunt orqali Kirish
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                Shaxsiy natijalaringiz, topshirilgan biletlar va xatolar daftari doim saqlanib turishi uchun hisobingizga kiring.
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-2 text-left bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Natijalar va imtihon statistikasi yo'qolmaydi</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Qurilmani almashtirganda ham o'rganish davom etadi</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Kunlik seriya va yutuq nishonlari saqlanadi</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 text-left flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-md transition flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Ulanmoqda...' : 'Google akkaunti bilan kirish'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-slate-500 dark:text-slate-400 hover:underline pt-1"
            >
              Hozircha mehmon sifatida davom ettirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
