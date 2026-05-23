export type ActivityCategory = 'Sightseeing' | 'Food' | 'Shopping' | 'Logistics';

export interface AlternateActivity {
  id: string;
  time: string;
  title: string;
  desc: string;
  price?: string;
  hours?: string;
  gear?: string;
  img?: string;
  url?: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  category: ActivityCategory;
  desc: string;
  icon?: string; // Lucide icon name represented as string
  gear?: string;
  img?: string;
  url?: string;
  isCompleted?: boolean;
  price?: string;
  hours?: string;
  alternatives?: AlternateActivity[];
  isTanukikoji?: boolean;
}

export interface DayTimeline {
  day: number;
  id?: string;
  optionName?: string;
  date: string;
  location: string;
  sleep: string;
  weather: string;
  activities: Activity[];
}

export interface TripNote {
  id: string;
  day: number;
  time: string;
  title: string;
  content: string;
  createdAt: string;
}
