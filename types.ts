export interface Question {
  id: string;
  topicId: string;
  ticketId: string;
  questionNumber: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  globalIndex?: number; // 1 to 1270
  ruleReference: string; // e.g. "YHQ 12.4-band"
  imageType: 'intersection' | 'signs' | 'speed' | 'parking' | 'overtake' | 'railway' | 'pedestrian' | 'medical' | 'roundabout' | 'controller' | 'lane' | 'priority_junction';
  signCode?: string; // e.g. "3.27", "2.4"
  difficulty?: 'easy' | 'medium' | 'hard';
  scenarioMeta?: {
    car1Action?: string;
    car2Action?: string;
    car3Action?: string;
    hasTrafficLight?: boolean;
    trafficLightColor?: 'red' | 'yellow' | 'green' | string;
    mainRoadDirection?: 'straight' | 'right' | 'left' | string;
    signsPresent?: string[];
  };
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  description: string;
  iconName: string;
  questionCount: number;
}

export interface Ticket {
  id: string;
  number: number;
  title: string;
  questionCount: number;
}

export interface RoadSign {
  id: string;
  code: string;
  name: string;
  category: 'warning' | 'priority' | 'prohibitory' | 'mandatory' | 'informative' | 'service' | 'additional';
  categoryUz: string;
  description: string;
  shape: 'triangle' | 'circle' | 'square' | 'octagon' | 'diamond' | 'rectangle';
  bgColor: string;
  borderColor?: string;
  iconSymbol: string;
}

export interface UserProfile {
  userId: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  createdAt: string;
  updatedAt?: string;
  xp: number;
  streak: number;
  testsPassed: number;
  testsFailed: number;
  lastActiveDate?: string;
}

export interface UserProgress {
  userId: string;
  ticketId: string;
  score: number;
  totalQuestions: number;
  mistakesCount: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
}

export interface SavedMistake {
  userId: string;
  questionId: string;
  topicId: string;
  savedAt: string;
  reviewCount: number;
}

export interface AppUpdateInfo {
  version: string;
  releaseDate: string;
  title: string;
  description: string;
  features: string[];
  isAvailable: boolean;
}
