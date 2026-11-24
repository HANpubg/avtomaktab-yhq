import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { StatsDashboard } from './components/StatsDashboard';
import { TicketView } from './components/TicketView';
import { TopicView } from './components/TopicView';
import { ExamView } from './components/ExamView';
import { RoadSignsView } from './components/RoadSignsView';
import { MistakesView } from './components/MistakesView';
import { UpdateModal } from './components/UpdateModal';
import { AuthModal } from './components/AuthModal';
import { soundManager } from './utils/sound';
import { UserProfile, AppUpdateInfo, Question } from './types';

export default function App() {
  // 1. Theme State (Dark / Light)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('avto_theme');
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('avto_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('avto_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    soundManager.playClick();
  };

  // 2. Sound state
  const [soundMuted, setSoundMuted] = useState(soundManager.getMuted());
  const toggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setSoundMuted(isMuted);
  };

  // 3. User Authentication & Profile
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('avto_local_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 4. Test Progress & History
  const [completedTickets, setCompletedTickets] = useState<
    Record<string, { score: number; total: number; passed: boolean }>
  >(() => {
    try {
      const saved = localStorage.getItem('avto_completed_tickets');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [mistakeIds, setMistakeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('avto_mistakes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // 6. App Updates (User Permission Controlled)
  const [updateInfo, setUpdateInfo] = useState<AppUpdateInfo>({
    version: '2.5.0',
    releaseDate: '2026-10-22',
    title: "2026-yilgi 1270 ta Rasmiy Testlar va HD Vektor Vaziyatlar",
    description:
      "Davlat imtihoni talablariga to‘liq mos keluvchi 1270 ta savol, 70 ta bilet, yo‘l belgilari guruhlari testlari va HD tasvirlar to‘plami.",
    features: [
      "1270 ta rasmiy savol va 70 ta to‘liq biletlar to‘plami",
      "Yo‘l belgilari guruhlari (8 ta guruh) bo‘yicha alohida mavzulashtirilgan testlar",
      "Har bir vaziyat uchun yuqori aniqlikdagi HD vektor diagrammalar va ekranni kattalashtirish (Zoom)",
      "Loyiha muallifi: Juraboyev Halilullo",
      "Yangi tashrif buyuruvchilar uchun keshsiz toza eng so‘nggi versiyani yuklash tizimi"
    ],
    isAvailable: false
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [hasPendingUpdate, setHasPendingUpdate] = useState(true);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

  // Sync with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            setUserProfile(data);
            localStorage.setItem('avto_local_profile', JSON.stringify(data));
          } else {
            const newProfile: UserProfile = {
              userId: firebaseUser.uid,
              email: firebaseUser.email || undefined,
              displayName: firebaseUser.displayName || 'Haydovchi',
              photoURL: firebaseUser.photoURL || undefined,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              xp: userProfile?.xp || 150,
              streak: userProfile?.streak || 1,
              testsPassed: userProfile?.testsPassed || 0,
              testsFailed: userProfile?.testsFailed || 0,
              lastActiveDate: new Date().toISOString().split('T')[0]
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
            localStorage.setItem('avto_local_profile', JSON.stringify(newProfile));
          }
        } catch (err) {
          console.error('Firestore user profile sync error:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Periodic simulated check for updates (only alerts user with permission)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate periodic update discovery after study session
      const savedVersion = localStorage.getItem('avto_app_version');
      if (savedVersion !== '2.5.0') {
        setHasPendingUpdate(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for Test Results & XP
  const handleRecordResult = async (
    ticketId: string,
    score: number,
    total: number,
    passed: boolean
  ) => {
    const updated = {
      ...completedTickets,
      [ticketId]: { score, total, passed }
    };
    setCompletedTickets(updated);
    localStorage.setItem('avto_completed_tickets', JSON.stringify(updated));

    // Save to daily test activity history for weekly charts
    try {
      const todayKey = new Date().toISOString().split('T')[0];
      const dailyMap = JSON.parse(localStorage.getItem('avto_daily_activity') || '{}');
      const prevDay = dailyMap[todayKey] || { correct: 0, wrong: 0 };
      dailyMap[todayKey] = {
        correct: prevDay.correct + score,
        wrong: prevDay.wrong + (total - score)
      };
      localStorage.setItem('avto_daily_activity', JSON.stringify(dailyMap));
    } catch {
      // Ignore localStorage errors
    }

    // Update User Profile stats
    if (userProfile) {
      const updatedProfile: UserProfile = {
        ...userProfile,
        xp: userProfile.xp + (passed ? 100 : 30),
        testsPassed: userProfile.testsPassed + (passed ? 1 : 0),
        testsFailed: userProfile.testsFailed + (!passed ? 1 : 0),
        updatedAt: new Date().toISOString()
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('avto_local_profile', JSON.stringify(updatedProfile));

      // Sync to Firestore if authenticated
      if (auth.currentUser) {
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            xp: updatedProfile.xp,
            testsPassed: updatedProfile.testsPassed,
            testsFailed: updatedProfile.testsFailed,
            updatedAt: updatedProfile.updatedAt
          });
        } catch (err) {
          console.warn('Could not sync progress to Firestore:', err);
        }
      }
    }
  };

  const handleRecordMistake = (q: Question) => {
    if (!mistakeIds.includes(q.id)) {
      const updated = [...mistakeIds, q.id];
      setMistakeIds(updated);
      localStorage.setItem('avto_mistakes', JSON.stringify(updated));
    }
    try {
      const todayKey = new Date().toISOString().split('T')[0];
      const dailyMap = JSON.parse(localStorage.getItem('avto_daily_activity') || '{}');
      const prevDay = dailyMap[todayKey] || { correct: 0, wrong: 0 };
      dailyMap[todayKey] = {
        correct: prevDay.correct,
        wrong: prevDay.wrong + 1
      };
      localStorage.setItem('avto_daily_activity', JSON.stringify(dailyMap));
    } catch {
      // Ignore
    }
  };

  const handleCorrectMistake = (qId: string) => {
    const updated = mistakeIds.filter((id) => id !== qId);
    setMistakeIds(updated);
    localStorage.setItem('avto_mistakes', JSON.stringify(updated));
  };

  const handleAddXp = (amount: number) => {
    if (userProfile) {
      const updated = { ...userProfile, xp: userProfile.xp + amount };
      setUserProfile(updated);
      localStorage.setItem('avto_local_profile', JSON.stringify(updated));
    } else {
      const defaultProfile: UserProfile = {
        userId: 'guest-' + Date.now(),
        displayName: 'Mehmon Haydovchi',
        createdAt: new Date().toISOString(),
        xp: amount,
        streak: 1,
        testsPassed: 0,
        testsFailed: 0
      };
      setUserProfile(defaultProfile);
      localStorage.setItem('avto_local_profile', JSON.stringify(defaultProfile));
    }
  };

  // Check updates handler
  const handleCheckUpdates = () => {
    setIsCheckingUpdates(true);
    setTimeout(() => {
      setIsCheckingUpdates(false);
      const savedVersion = localStorage.getItem('avto_app_version');
      if (savedVersion !== '2.5.0') {
        setHasPendingUpdate(true);
      }
      soundManager.playCorrect();
    }, 1200);
  };

  // Apply update when user gives permission
  const handleApplyUpdate = (newVersion: string) => {
    setUpdateInfo((prev) => ({
      ...prev,
      version: newVersion,
      isAvailable: false
    }));
    setHasPendingUpdate(false);
    localStorage.setItem('avto_app_version', newVersion);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200 flex flex-col">
      {/* App Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        soundMuted={soundMuted}
        onToggleSound={toggleSound}
        userProfile={userProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        updateInfo={updateInfo}
        onOpenUpdateModal={() => setIsUpdateModalOpen(true)}
        hasPendingUpdate={hasPendingUpdate}
      />

      {/* Primary Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          soundManager.playClick();
        }}
        mistakesCount={mistakeIds.length}
      />

      {/* Main Content Tabs */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <StatsDashboard
            userProfile={userProfile}
            completedTickets={completedTickets}
            mistakesCount={mistakeIds.length}
            onNavigateTab={setActiveTab}
            onStartNextTicket={() => setActiveTab('tickets')}
          />
        )}

        {activeTab === 'tickets' && (
          <TicketView
            onBackToDashboard={() => setActiveTab('home')}
            onRecordResult={handleRecordResult}
            onRecordMistake={handleRecordMistake}
            onAddXp={handleAddXp}
            completedTickets={completedTickets}
          />
        )}

        {activeTab === 'topics' && (
          <TopicView
            onRecordMistake={handleRecordMistake}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'signs' && (
          <RoadSignsView onAddXp={handleAddXp} />
        )}

        {activeTab === 'exam' && (
          <ExamView
            userProfile={userProfile}
            onRecordResult={handleRecordResult}
            onRecordMistake={handleRecordMistake}
            onAddXp={handleAddXp}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakesView
            mistakeIds={mistakeIds}
            onCorrectMistake={handleCorrectMistake}
            onAddXp={handleAddXp}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              AvtoMaktab YHQ
            </span>
            <span>• O‘zbekiston Yo‘l Harakati Qoidalari Imtihoniga Tayyorlov</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-extrabold">
              Muallif: Juraboyev Halilullo
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Versiya: v{updateInfo.version}</span>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Yangilanishlarni tekshirish
            </button>
          </div>
        </div>
      </footer>

      {/* Update Consent Modal */}
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        updateInfo={updateInfo}
        onApplyUpdate={handleApplyUpdate}
        onCheckUpdates={handleCheckUpdates}
        isChecking={isCheckingUpdates}
      />

      {/* Google Authentication & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userProfile={userProfile}
        onProfileUpdated={(profile) => {
          setUserProfile(profile);
          if (profile) {
            localStorage.setItem('avto_local_profile', JSON.stringify(profile));
          } else {
            localStorage.removeItem('avto_local_profile');
          }
        }}
      />
    </div>
  );
}
