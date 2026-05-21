import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  Clock,
  Hotel,
  Plane,
  Camera,
  Compass,
  CheckCircle2,
  AlertCircle,
  NotebookPen,
  Plus,
  Trash2,
  ListTodo,
  Info,
  Thermometer,
  Luggage,
  ChevronRight,
  CheckSquare,
  Square,
  Share2,
  Type,
} from "lucide-react";
import { Activity, TripNote } from "./types";
import { INITIAL_ITINERARY } from "./data";
import MapView from "./components/MapView";
import GalleryView from "./components/GalleryView";

const getCategoryBadgeColor = (category: Activity["category"]) => {
  switch (category) {
    case "Sightseeing":
      return "bg-emerald-50 text-emerald-800 border-emerald-100";
    case "Food":
      return "bg-amber-50 text-amber-850 border-amber-100";
    case "Shopping":
      return "bg-violet-50 text-violet-800 border-violet-100";
    case "Logistics":
      return "bg-blue-50 text-blue-800 border-blue-100";
  }
};

const getCategoryDotColor = (category: Activity["category"]) => {
  switch (category) {
    case "Sightseeing":
      return "bg-emerald-500";
    case "Food":
      return "bg-amber-500";
    case "Shopping":
      return "bg-violet-500";
    case "Logistics":
      return "bg-blue-500";
  }
};

// Resilient icon mapper for predefined activity icons
const getActivityIcon = (name?: string) => {
  const cn = "w-5 h-5 shrink-0";
  switch (name) {
    case "Plane":
      return <Plane className={`${cn} text-blue-600`} />;
    case "Hotel":
      return <Hotel className={`${cn} text-indigo-600`} />;
    case "Camera":
      return <Camera className={`${cn} text-emerald-600`} />;
    case "Utensils":
      return <IconsList.Utensils className={`${cn} text-amber-600`} />;
    case "Sailboat":
      return <IconsList.Sailboat className={`${cn} text-cyan-600`} />;
    case "TrendingUp":
      return <IconsList.TrendingUp className={`${cn} text-teal-600`} />;
    case "Building":
      return <IconsList.Building className={`${cn} text-blue-600`} />;
    case "Fish":
      return <IconsList.Fish className={`${cn} text-sky-600`} />;
    case "ShoppingBag":
      return <IconsList.ShoppingBag className={`${cn} text-purple-600`} />;
    case "Flame":
      return <IconsList.Flame className={`${cn} text-red-500`} />;
    case "Palette":
      return <IconsList.Palette className={`${cn} text-rose-500`} />;
    case "Eye":
      return <IconsList.Eye className={`${cn} text-amber-500`} />;
    case "Heart":
      return <IconsList.Heart className={`${cn} text-red-500`} />;
    case "Gift":
      return <IconsList.Gift className={`${cn} text-pink-600`} />;
    case "Home":
      return <IconsList.Home className={`${cn} text-slate-600`} />;
    case "Soup":
      return <IconsList.Soup className={`${cn} text-amber-600`} />;
    case "Mountain":
      return <IconsList.Mountain className={`${cn} text-orange-600`} />;
    case "Waves":
      return <IconsList.Waves className={`${cn} text-teal-600`} />;
    case "Cookie":
      return <IconsList.Cookie className={`${cn} text-amber-700`} />;
    default:
      return <Compass className={`${cn} text-indigo-500`} />;
  }
};

// Help map specific Lucide icons individually and safely
const IconsList = {
  Utensils: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Sailboat: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
      <path d="M10 2v16M10 2a11 11 0 0 1 8 8c0 3.3-2.7 6-8 6V2Z" />
    </svg>
  ),
  TrendingUp: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  Building: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  ),
  Fish: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6.5 12c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5Z" />
      <path d="M18 12a6 6 0 0 0-6-6M2 12c0-3 3-5 5-5s6 4 6 5-4 5-6 5-5-2-5-5Z" />
    </svg>
  ),
  ShoppingBag: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Flame: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Palette: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.42-.15-.82-.4-1.13-.25-.3-.43-.72-.43-1.17 0-1.01.81-1.83 1.83-1.83H18c3.3 0 6-2.7 6-6v-.5C24 5.5 18.5 2 12 2Z" />
    </svg>
  ),
  Eye: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Heart: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Gift: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="15" x="3" y="8" rx="2" />
      <path d="M12 8V22M19 12H5M12 8H8a4 4 0 0 1 0-8h4ZM12 8h4a4 4 0 0 0 0-8h-4Z" />
    </svg>
  ),
  Home: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Soup: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v4M16 2v4M8 2v4M2 13h20M22 13a10 10 0 0 1-20 0Z" />
    </svg>
  ),
  Mountain: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
  Waves: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C5.8 7 7 5.7 8.5 5.7c1.5 0 2.7 1.3 4 1.3 1.3 0 2.5-1.3 4-1.3 1.5 0 2.7 1.3 4 1.3 1.3 0 1.9-.5 2.5-1M2 12c.6.5 1.2 1 2.5 1 1.3 0 2.5-1.3 4-1.3 1.5 0 2.7 1.3 4 1.3 1.3 0 2.5-1.3 4-1.3 1.5 0 2.7 1.3 4 1.3 1.3 0 1.9-.5 2.5-1M2 18c.6.5 1.2 1 2.5 1 1.3 0 2.5-1.3 4-1.3 1.5 0 2.7 1.3 4 1.3 1.3 0 2.5-1.3 4-1.3 1.5 0 2.7 1.3 4 1.3 1.3 0 1.9-.5 2.5-1" />
    </svg>
  ),
  Cookie: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
      <path d="M12 2a10 10 0 0 1 10 10M16 16c.5 0 1-.5 1-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1Z" />
      <circle cx="9" cy="9" r="1" />
      <circle cx="9" cy="14" r="1" />
    </svg>
  ),
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<"itinerary" | "map" | "gallery">(
    "itinerary",
  );
  const [activeDay, setActiveDay] = useState<number>(0); // 0 = All Days continuous feed
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState<TripNote[]>([]);

  // Note form fields
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTime, setNoteTime] = useState("09:00 AM");
  const [noteFormDay, setNoteFormDay] = useState<number>(1);

  // Text Scaling Settings
  const [textSizeScale, setTextSizeScale] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("hokkaido_text_size_scale");
      if (stored) {
        return parseFloat(stored);
      }
      // If mobile width screen on initial render, default to larger text size comfort setting
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        return 1.15;
      }
      return 1.0;
    } catch {
      return 1.0;
    }
  });

  // Scale relative element sizes by updating root font size
  useEffect(() => {
    try {
      localStorage.setItem(
        "hokkaido_text_size_scale",
        textSizeScale.toString(),
      );
      document.documentElement.style.fontSize = `${textSizeScale * 100}%`;
    } catch (e) {
      console.error("Failed to persist text scale", e);
    }
  }, [textSizeScale]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem(
        "hokkaido_completed_activities",
      );
      if (storedCompleted) {
        setCompletedActivities(JSON.parse(storedCompleted));
      }

      const storedNotes = localStorage.getItem("hokkaido_trip_notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.error("Local storage lookup failed", e);
    }
  }, []);

  // Save changes
  const toggleActivityCompletion = (id: string) => {
    const updated = completedActivities.includes(id)
      ? completedActivities.filter((x) => x !== id)
      : [...completedActivities, id];

    setCompletedActivities(updated);
    localStorage.setItem(
      "hokkaido_completed_activities",
      JSON.stringify(updated),
    );
  };

  const handleShareActivity = async (act: Activity, dayLocation: string) => {
    const text = `Check out this activity from my Hokkaido trip!\n\n${act.title}\n${act.desc}\n${act.time || ""} - ${act.category}\n\nLocation: ${dayLocation}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hokkaido Trip: ${act.title}`,
          text: text,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      const mailtoLink = `mailto:?subject=${encodeURIComponent(`Hokkaido Trip: ${act.title}`)}&body=${encodeURIComponent(text)}`;
      window.location.href = mailtoLink;
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const targetDay = activeDay === 0 ? noteFormDay : activeDay;

    const newNote: TripNote = {
      id: `note-${Date.now()}`,
      day: targetDay,
      time: noteTime,
      title: noteTitle,
      content: noteContent,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("hokkaido_trip_notes", JSON.stringify(updatedNotes));

    // Reset inputs
    setNoteTitle("");
    setNoteContent("");
  };

  const handleClearNote = (id: string) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("hokkaido_trip_notes", JSON.stringify(updatedNotes));
  };

  const currentTimelineData =
    INITIAL_ITINERARY.find((d) => d.day === activeDay) || INITIAL_ITINERARY[0];
  const allActivitiesList = INITIAL_ITINERARY.flatMap((d) => d.activities);

  // Calculate completion percentage
  const totalActivitiesCount = allActivitiesList.length;
  const currentCompletedCount = completedActivities.length;
  const percentageCompleted =
    totalActivitiesCount > 0
      ? Math.round((currentCompletedCount / totalActivitiesCount) * 100)
      : 0;

  // Render lists of notes for the current active day (or all if activeDay is 0)
  const filteredNotes =
    activeDay === 0 ? notes : notes.filter((n) => n.day === activeDay);

  // Collect packing tips for the selected day based on activities
  const activeDayGears = currentTimelineData.activities
    .filter((act) => act.gear)
    .map((act) => ({ title: act.title, gear: act.gear }));

  return (
    <div className="min-h-screen bg-brand-bg pb-16 selection:bg-brand-primary-bg selection:text-brand-primary-text font-sans antialiased text-brand-text">
      {/* Premium Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-brand-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 sm:gap-4 relative w-full">
            {/* Text Size Toggle */}
            <button
              onClick={() =>
                setTextSizeScale((prev) =>
                  prev === 1.0 ? 1.15 : prev === 1.15 ? 1.3 : 1.0,
                )
              }
              className="absolute top-0 right-0 md:static p-1.5 sm:p-2 text-brand-text-muted hover:text-brand-text hover:bg-slate-100 rounded-lg transition-colors border border-brand-outline-variant/30 bg-slate-50 md:order-last z-10"
              title={`Toggle Text Size (Current: ${textSizeScale * 100}%)`}
            >
              <Type className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {/* Branding with Elegant paired serifs */}
            <div className="shrink-0 pr-10 md:pr-0">
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                <span className="text-[8px] sm:text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase bg-brand-primary-bg px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                  ★ SPRING EXPEDITION
                </span>
                <span className="text-[10px] sm:text-xs text-brand-text-muted hidden sm:inline font-semibold">
                  | May 24 - May 30
                </span>
              </div>
              <h1 className="font-serif text-lg sm:text-3.5xl font-bold tracking-tight text-brand-text">
                Hokkaido Alpine &amp; Flora
              </h1>
            </div>

            {/* Live Statistics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full md:w-auto mt-2 sm:mt-0">
              {/* Progress Bar Widget */}
              <div className="flex items-center gap-2 sm:gap-4 bg-brand-container-low px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border border-brand-outline-variant/30 grow">
                <div className="grow md:grow-0">
                  <div className="flex justify-between items-center text-[10px] sm:text-xs mb-1 font-bold">
                    <span className="text-brand-text-muted uppercase tracking-wider">
                      Journey Progress
                    </span>
                    <span className="text-brand-primary font-mono">
                      {percentageCompleted}%
                    </span>
                  </div>
                  <div className="w-full sm:w-56 bg-brand-container h-1.5 sm:h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      key="progress-bar-movement"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentageCompleted}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-brand-primary h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="border-l border-brand-outline-variant/40 pl-2 sm:pl-4 text-center">
                  <span className="block text-xs sm:text-sm font-bold text-brand-text font-mono leading-none">
                    {currentCompletedCount}/{totalActivitiesCount}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-brand-text-muted font-bold block mt-1">
                    Stops
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar Header Tabs - Consolidated list to avoid duplication */}
          <div className="flex justify-start gap-1 mt-6 border-t border-brand-container/50 pt-3 overflow-x-auto scrollbar-none">
            {[
              { id: "itinerary", label: "Journey Timeline", icon: Calendar },
              { id: "map", label: "Alpine Map Tracker", icon: Compass },
              { id: "gallery", label: "Photographer Guide", icon: Camera },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? "bg-brand-primary text-white shadow-xs"
                      : "text-brand-text-muted hover:text-brand-text hover:bg-brand-container-low"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AnimatePresence mode="wait">
          {/* Combined Itinerary Feed and Day-Focus View */}
          {currentTab === "itinerary" && (
            <motion.div
              key="itinerary-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Day Selector Sidebar Column */}
              <div className="lg:col-span-4 lg:sticky lg:top-[160px] h-fit space-y-6">
                {/* Day selector layout with Continuous feed option */}
                <div className="bg-white rounded-2xl border border-brand-container p-5 shadow-xs">
                  <div className="flex items-center gap-1.5 mb-4 text-brand-primary">
                    <ListTodo className="w-4.5 h-4.5" />
                    <h3 className="font-sans text-xs font-bold tracking-widest uppercase">
                      Plan Timeline
                    </h3>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    {/* All Days Master Feed Trigger */}
                    <button
                      onClick={() => setActiveDay(0)}
                      className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-between cursor-pointer group transition-all border text-xs font-bold ${
                        activeDay === 0
                          ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                          : "bg-brand-container-low text-brand-text-muted hover:bg-white border-brand-outline-variant/30 hover:border-brand-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4" />
                        <span>All Days Master Feed</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${activeDay === 0 ? "bg-white/20 text-white" : "bg-slate-200/50 text-slate-700"}`}
                      >
                        Day 1-7
                      </span>
                    </button>

                    {/* Day-by-Day Select Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                      {INITIAL_ITINERARY.map((d) => {
                        const isActive = activeDay === d.day;
                        const isDayFullyScouted = d.activities.every((act) =>
                          completedActivities.includes(act.id),
                        );
                        return (
                          <button
                            key={d.day}
                            id={`day-select-${d.day}`}
                            onClick={() => {
                              setActiveDay(d.day);
                              setNoteFormDay(d.day);
                            }}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center relative cursor-pointer group transition-all border ${
                              isActive
                                ? "bg-brand-primary text-white border-brand-primary font-bold shadow-md"
                                : "bg-brand-container-low text-brand-text-muted hover:bg-white border-brand-outline-variant/30 hover:border-brand-outline"
                            }`}
                          >
                            <span className="text-[9px] uppercase font-bold leading-none mb-0.5 select-none md:scale-95">
                              Day
                            </span>
                            <span className="text-sm font-mono leading-none font-bold">
                              {d.day}
                            </span>

                            {/* Checked indicator */}
                            {isDayFullyScouted && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-white flex items-center justify-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic stats of the currently active day */}
                  <hr className="border-brand-outline-variant/30 my-4" />

                  {activeDay === 0 ? (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-brand-text-muted uppercase block leading-tight">
                            Expedition Path
                          </span>
                          <span className="text-brand-text font-bold text-xs sm:text-sm">
                            Chitose • Otaru • Sapporo • Biei • Jozankei • Lake
                            Toya
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <Hotel className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-brand-text-muted uppercase block leading-tight">
                            Total Accommodations
                          </span>
                          <span className="text-brand-text font-bold text-xs sm:text-sm">
                            Traditional Ryokan &amp; Scenic Wilderness Stays
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <Thermometer className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-brand-text-muted uppercase block leading-tight">
                            Spring Climate Scale
                          </span>
                          <span className="text-brand-text text-xs font-semibold leading-relaxed">
                            High temps ranging from 8°C to 18°C
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4.5 h-4.5 text-red-500 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold text-brand-text-muted uppercase block leading-tight">
                            Sector Area
                          </span>
                          <span className="text-brand-text font-bold text-xs sm:text-sm">
                            {currentTimelineData.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <Hotel className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold text-brand-text-muted uppercase block leading-tight">
                            Stay Accommodation
                          </span>
                          <span className="text-brand-text font-bold text-xs sm:text-sm">
                            {currentTimelineData.sleep}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <Thermometer className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold text-brand-text-muted uppercase block leading-tight">
                            Expected Weather
                          </span>
                          <span className="text-brand-text text-xs font-semibold leading-relaxed">
                            {currentTimelineData.weather}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Packing and Outfit Advisor Column */}
                <div className="bg-brand-secondary-bg/25 border border-brand-secondary/20 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center gap-1.5 mb-3 text-brand-secondary-text">
                    <Luggage className="w-4.5 h-4.5" />
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase">
                      Packing &amp; Wear Advisor
                    </h4>
                  </div>

                  {activeDay === 0 ? (
                    <div className="space-y-3">
                      <p className="text-xs text-brand-text-muted leading-relaxed mb-1">
                        General seasonal Hokkaido spring layers checklist (all
                        conditions):
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-brand-secondary/15 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-brand-text block">
                            Thermal Warm Layers
                          </span>
                          <span className="text-[11px] font-medium text-brand-secondary-text mt-0.5 block italic">
                            Needed for altitude peak summits and cold coastal
                            winds
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-brand-secondary/15 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-brand-text block">
                            Traction Hiking Footwear
                          </span>
                          <span className="text-[11px] font-medium text-brand-secondary-text mt-0.5 block italic">
                            Comfort boots for flower fields and volcanic trails
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-brand-secondary/15 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-brand-text block">
                            Waterproof Active Shells
                          </span>
                          <span className="text-[11px] font-medium text-brand-secondary-text mt-0.5 block italic">
                            Shield from damp conditions near Blue Pond and
                            rivers
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
                        Based on Day {activeDay}'s thermal metrics and expected
                        activities, we recommend wearing:
                      </p>

                      {activeDayGears.length > 0 ? (
                        <div className="space-y-3.5">
                          {activeDayGears.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-3 rounded-xl border border-brand-secondary/15 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="text-xs font-bold text-brand-text block">
                                  {item.title}
                                </span>
                                <span className="text-[11px] font-medium text-brand-secondary-text mt-0.5 block italic">
                                  {item.gear}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white p-3.5 rounded-xl border border-brand-secondary/15 text-center">
                          <Info className="w-4.5 h-4.5 text-brand-secondary-text mx-auto mb-1.5" />
                          <p className="text-[11px] font-bold text-brand-text-muted uppercase">
                            Default Spring Attire
                          </p>
                          <p className="text-[11px] text-brand-text-muted mt-1 leading-relaxed">
                            Light windbreaker layers, thermal sweater, durable
                            outdoor trousers, and athletic sneakers.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Notepad for Day specific logs */}
                <div className="bg-white rounded-2xl border border-brand-container p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-brand-primary">
                      <NotebookPen className="w-4.5 h-4.5" />
                      <h4 className="font-sans text-xs font-bold tracking-widest uppercase">
                        {activeDay === 0
                          ? "Travel Pad (Add Observations)"
                          : `Travel Pad (Day ${activeDay})`}
                      </h4>
                    </div>
                    <span className="bg-brand-primary-bg text-brand-primary-text font-bold font-mono text-[10px] px-2 py-0.5 rounded-md">
                      {filteredNotes.length} LOGS
                    </span>
                  </div>

                  <form onSubmit={handleAddNote} className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Log title..."
                        required
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        className="col-span-2 text-xs bg-brand-container-low border border-brand-outline-variant/40 rounded-lg p-2 focus:outline-hidden focus:border-brand-primary transition-all font-semibold"
                      />
                      <select
                        value={noteTime}
                        onChange={(e) => setNoteTime(e.target.value)}
                        className="col-span-1 text-[11px] bg-brand-container-low border border-brand-outline-variant/40 rounded-lg p-1 px-1.5 focus:outline-hidden font-bold"
                      >
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      {/* Dropdown for noteDay selection if All Days Master Feed is active */}
                      {activeDay === 0 && (
                        <select
                          value={noteFormDay}
                          onChange={(e) =>
                            setNoteFormDay(parseInt(e.target.value))
                          }
                          className="text-[11px] bg-brand-container-low border border-brand-outline-variant/40 rounded-lg p-1.5 px-2.5 focus:outline-hidden font-bold shrink-0 text-brand-primary"
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                            <option key={d} value={d}>
                              Day {d}
                            </option>
                          ))}
                        </select>
                      )}

                      <textarea
                        placeholder="Observation details..."
                        rows={2}
                        required
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="w-full text-xs bg-brand-container-low border border-brand-outline-variant/40 rounded-lg p-2 focus:outline-hidden focus:border-brand-primary transition-all font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {activeDay === 0
                          ? `Add Log to Day ${noteFormDay}`
                          : `Add Observation`}
                      </span>
                    </button>
                  </form>

                  {/* List of active day observations */}
                  <div className="mt-5 space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {filteredNotes.map((note) => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-brand-container-low p-3 rounded-lg border border-brand-outline-variant/20 flex justify-between items-start"
                        >
                          <div className="space-y-1 pr-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="bg-slate-400/25 text-slate-800 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                                {note.time}
                              </span>
                              {activeDay === 0 && (
                                <span className="bg-brand-primary/10 text-brand-primary font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                                  DAY {note.day}
                                </span>
                              )}
                              <span className="text-xs font-bold text-brand-text line-clamp-1">
                                {note.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-brand-text-muted leading-relaxed font-sans font-medium">
                              {note.content}
                            </p>
                          </div>

                          <button
                            onClick={() => handleClearNote(note.id)}
                            className="text-brand-text-muted hover:text-red-500 font-bold p-1 rounded-sm hover:bg-white cursor-pointer transition-all shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {filteredNotes.length === 0 && (
                      <p className="text-[10px] text-center italic text-brand-text-muted py-3">
                        No custom notes written yet. Fill the box to log sights.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Timeline Column */}
              <div className="lg:col-span-8 space-y-8">
                {activeDay === 0 ? (
                  /* RENDER ALL DAYS CONTINUOUSLY */
                  <div className="space-y-12">
                    {/* Section Header */}
                    <div className="bg-white rounded-2xl border border-brand-container p-6 sm:p-8 shadow-xs">
                      <span className="text-[10px] sm:text-xs font-bold text-brand-primary tracking-widest uppercase">
                        7-Day Expedition Feed
                      </span>
                      <h2 className="font-serif text-3xl sm:text-3.5xl font-extrabold text-brand-text tracking-tight mt-1.5">
                        Continuous Journey Timeline
                      </h2>
                      <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mt-2 font-medium">
                        A combined list of our entire campaign stops and
                        pathways in Hokkaido. Toggle completion nodes directly
                        as you trek to record your progress.
                      </p>
                    </div>

                    {/* Loop through each day */}
                    {INITIAL_ITINERARY.map((dayData) => {
                      return (
                        <div key={dayData.day} className="space-y-6">
                          {/* Day Banner Card */}
                          <div className="bg-brand-primary-bg/25 border border-brand-primary-bg/40 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                            <div>
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span className="bg-brand-primary text-white text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-md">
                                  DAY {dayData.day}
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-brand-primary-light font-mono">
                                  • {dayData.date}
                                </span>
                              </div>
                              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-primary-text">
                                {dayData.location}
                              </h3>
                            </div>

                            <div className="flex flex-col sm:items-end gap-1 text-slate-700 font-sans">
                              <span className="font-bold text-brand-primary text-xs bg-white/80 px-2.5 py-1 rounded-lg border border-brand-outline-variant/30">
                                🏢 Stay: {dayData.sleep}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-brand-text-muted font-mono whitespace-nowrap mt-1 pb-0.5 flex items-center gap-1">
                                🌡️ Spring Climate:{" "}
                                {dayData.weather.split(".")[0]}
                              </span>
                            </div>
                          </div>

                          {/* Activities timeline stream for this day */}
                          <div className="space-y-6 relative pl-4 sm:pl-6 border-l-2 border-brand-container ml-4 sm:ml-6 mt-4">
                            {dayData.activities.map((act) => {
                              const isCompleted = completedActivities.includes(
                                act.id,
                              );
                              return (
                                <div
                                  key={act.id}
                                  className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 relative ${
                                    isCompleted
                                      ? "border-emerald-300 opacity-80 shadow-xs"
                                      : "border-brand-container hover:border-brand-primary/20 shadow-sm"
                                  }`}
                                >
                                  {/* Connector Circle Dot */}
                                  <div className="absolute -left-[23px] sm:-left-[31px] top-7 w-4.5 h-4.5 rounded-full bg-brand-bg flex items-center justify-center border-2 border-brand-container">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isCompleted
                                          ? "bg-emerald-500"
                                          : getCategoryDotColor(act.category)
                                      }`}
                                    />
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                                    {/* Image Thumbnail preview if matches */}
                                    {act.img && (
                                      <div className="w-full sm:w-[130px] aspect-video sm:aspect-square shrink-0 rounded-xl overflow-hidden bg-brand-container-low border border-brand-container">
                                        <img
                                          src={act.img}
                                          alt={act.title}
                                          referrerPolicy="no-referrer"
                                          className="w-full h-full object-cover transition-transform duration-550 hover:scale-105"
                                        />
                                      </div>
                                    )}

                                    {/* Details */}
                                    <div className="flex-1 space-y-3 w-full">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          {getActivityIcon(act.icon)}
                                          <span className="font-mono text-sm sm:text-base font-bold text-brand-primary-light">
                                            {act.time}
                                          </span>
                                          <span
                                            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 rounded-md ${getCategoryBadgeColor(act.category)}`}
                                          >
                                            {act.category}
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() =>
                                              handleShareActivity(
                                                act,
                                                dayData.location,
                                              )
                                            }
                                            className="text-xs font-bold px-3 py-1 rounded-lg border bg-brand-container-low text-brand-text-muted border-brand-outline-variant/30 hover:bg-white hover:text-brand-text transition-all cursor-pointer flex items-center gap-1.5"
                                            title="Share Activity"
                                          >
                                            <Share2 className="w-4 h-4" />
                                            <span className="hidden sm:inline">
                                              Share
                                            </span>
                                          </button>
                                          <button
                                            onClick={() =>
                                              toggleActivityCompletion(act.id)
                                            }
                                            className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                                              isCompleted
                                                ? "bg-emerald-50 text-emerald-800 border-emerald-250 hover:bg-emerald-100"
                                                : "bg-brand-container-low text-brand-text-muted border-brand-outline-variant/30 hover:bg-white hover:text-brand-text"
                                            }`}
                                          >
                                            {isCompleted ? (
                                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                              <Square className="w-4 h-4" />
                                            )}
                                            <span>
                                              {isCompleted
                                                ? "Completed"
                                                : "Mark Visited"}
                                            </span>
                                          </button>
                                        </div>
                                      </div>

                                      <div>
                                        <h4
                                          className={`font-serif text-lg sm:text-xl font-bold tracking-tight text-brand-text ${isCompleted ? "line-through text-brand-text-muted/60 font-medium" : ""}`}
                                        >
                                          {act.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans mt-1">
                                          {act.desc}
                                        </p>
                                      </div>

                                      {/* Gear recommendations / Ticket links */}
                                      <div className="flex flex-wrap gap-2 pt-1 text-xs">
                                        {act.gear && (
                                          <span className="bg-brand-secondary-bg text-brand-secondary-text font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[11px] border border-brand-secondary/10">
                                            <AlertCircle className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                                            <span>Wear: {act.gear}</span>
                                          </span>
                                        )}

                                        <span className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 text-[11px] border border-brand-outline-variant/30">
                                          <span className="text-[10px] font-bold bg-slate-200 text-slate-800 rounded px-1 block shrink-0 leading-tight">
                                            ¥
                                          </span>
                                          <span>
                                            Fee: {act.price || "not available"}
                                          </span>
                                        </span>

                                        <span className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 text-[11px] border border-brand-outline-variant/30">
                                          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                          <span>
                                            Hours:{" "}
                                            {act.hours || "not available"}
                                          </span>
                                        </span>

                                        <span className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[11px] border border-brand-outline-variant/30 whitespace-nowrap">
                                          <Compass className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                                          <span className="font-bold text-brand-primary">
                                            Map:
                                          </span>
                                          <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.title + ", Hokkaido, Japan")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-primary hover:text-brand-primary-light hover:underline font-bold inline-flex items-center"
                                          >
                                            Google
                                          </a>
                                          <span className="text-slate-300">
                                            |
                                          </span>
                                          <a
                                            href={`https://maps.apple.com/?q=${encodeURIComponent(act.title + ", Hokkaido, Japan")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-primary hover:text-brand-primary-light hover:underline font-bold inline-flex items-center"
                                          >
                                            Apple
                                          </a>
                                        </span>

                                        {act.url && (
                                          <a
                                            href={act.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-primary text-[11px] font-bold hover:text-brand-primary-light flex items-center gap-1 bg-brand-primary-bg px-2.5 py-1 rounded-md border border-brand-primary/10 transition-colors"
                                          >
                                            <span>Ticket Hub</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* RENDER DETAILED SELECTED SINGLE DAY */
                  <div className="space-y-6">
                    {/* Header info card */}
                    <div className="bg-white rounded-2xl border border-brand-container p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                      <div>
                        <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase">
                          Focused Day View
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-brand-text tracking-tight mt-1">
                          Day {currentTimelineData.day}:{" "}
                          {currentTimelineData.location}
                        </h2>
                        <p className="text-xs sm:text-sm text-brand-text-muted font-sans font-bold flex items-center gap-1.5 mt-1.5">
                          <Clock className="w-4 h-4 text-brand-primary-light shrink-0" />
                          <span>
                            Scheduled for:{" "}
                            <b className="text-brand-text">
                              {currentTimelineData.date}
                            </b>{" "}
                            • {currentTimelineData.activities.length} Guided
                            Stops
                          </span>
                        </p>
                      </div>
                      <div className="bg-amber-100 border border-amber-200 p-2.5 px-4 rounded-xl shrink-0 flex items-center gap-2">
                        <Thermometer className="w-4.5 h-4.5 text-amber-700 font-bold" />
                        <div>
                          <span className="block text-[9px] font-bold text-amber-800 uppercase tracking-wider">
                            Climate Note
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-amber-900">
                            {currentTimelineData.weather.split(".")[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline card items list */}
                    <div className="space-y-6 relative pl-4 sm:pl-6 border-l-2 border-brand-container">
                      {currentTimelineData.activities.map((act, actIdx) => {
                        const isCompleted = completedActivities.includes(
                          act.id,
                        );
                        return (
                          <motion.div
                            key={act.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: actIdx * 0.08,
                            }}
                            className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 ${
                              isCompleted
                                ? "border-emerald-300 opacity-80 shadow-xs"
                                : "border-brand-container hover:border-brand-primary/40 shadow-sm"
                            }`}
                          >
                            {/* Connector dot */}
                            <div className="absolute -left-[23px] sm:-left-[31px] top-7 w-4.5 h-4.5 rounded-full bg-brand-bg flex items-center justify-center border-2 border-brand-container">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isCompleted
                                    ? "bg-emerald-500"
                                    : getCategoryDotColor(act.category)
                                }`}
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                              {/* Image Thumbnail */}
                              {act.img && (
                                <div className="w-full sm:w-[150px] aspect-video sm:aspect-square shrink-0 rounded-xl overflow-hidden bg-brand-container-low border border-brand-container">
                                  <img
                                    src={act.img}
                                    alt={act.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              {/* Stop info details */}
                              <div className="flex-1 space-y-3 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {getActivityIcon(act.icon)}
                                    <span className="font-mono text-sm sm:text-base font-bold text-brand-primary-light font-bold">
                                      {act.time}
                                    </span>
                                    <span
                                      className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 rounded-md ${getCategoryBadgeColor(act.category)}`}
                                    >
                                      {act.category}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        handleShareActivity(
                                          act,
                                          currentTimelineData.location,
                                        )
                                      }
                                      className="text-xs font-bold px-2 py-1 sm:px-3 rounded-lg border bg-brand-container-low text-brand-text-muted border-brand-outline-variant/30 hover:bg-white hover:text-brand-text transition-all cursor-pointer flex items-center gap-1.5"
                                      title="Share Activity"
                                    >
                                      <Share2 className="w-4 h-4" />
                                      <span className="hidden sm:inline">
                                        Share
                                      </span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        toggleActivityCompletion(act.id)
                                      }
                                      className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                                        isCompleted
                                          ? "bg-emerald-50 text-emerald-800 border-emerald-250 hover:bg-emerald-100"
                                          : "bg-brand-container-low text-brand-text-muted border-brand-outline-variant/30 hover:bg-white hover:text-brand-text"
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                                      ) : (
                                        <Square className="w-4 h-4" />
                                      )}
                                      <span>
                                        {isCompleted
                                          ? "Completed"
                                          : "Mark Visited"}
                                      </span>
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <h3
                                    className={`font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-text ${isCompleted ? "line-through text-brand-text-muted/65 font-medium" : ""}`}
                                  >
                                    {act.title}
                                  </h3>
                                  <p className="text-sm text-brand-text-muted leading-relaxed font-sans mt-1.5">
                                    {act.desc}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2 text-xs">
                                  {act.gear && (
                                    <span className="bg-brand-secondary-bg text-brand-secondary-text font-medium px-2.5 py-1 rounded-md flex items-center gap-1 border border-brand-secondary/10">
                                      <AlertCircle className="w-3.5 h-3.5 text-brand-secondary" />
                                      <span>Gear: {act.gear}</span>
                                    </span>
                                  )}

                                  <span className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 text-[11px] border border-brand-outline-variant/30">
                                    <span className="text-[10px] font-bold bg-slate-200 text-slate-800 rounded px-1 block shrink-0 leading-tight">
                                      ¥
                                    </span>
                                    <span>
                                      Fee: {act.price || "not available"}
                                    </span>
                                  </span>

                                  <span className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 text-[11px] border border-brand-outline-variant/30">
                                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                    <span>
                                      Hours: {act.hours || "not available"}
                                    </span>
                                  </span>

                                  <span className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[11px] border border-brand-outline-variant/30 whitespace-nowrap">
                                    <Compass className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                                    <span className="font-bold text-brand-primary">
                                      Map:
                                    </span>
                                    <a
                                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.title + ", Hokkaido, Japan")}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-brand-primary hover:text-brand-primary-light hover:underline font-bold inline-flex items-center"
                                    >
                                      Google
                                    </a>
                                    <span className="text-slate-300">|</span>
                                    <a
                                      href={`https://maps.apple.com/?q=${encodeURIComponent(act.title + ", Hokkaido, Japan")}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-brand-primary hover:text-brand-primary-light hover:underline font-bold inline-flex items-center"
                                    >
                                      Apple
                                    </a>
                                  </span>

                                  {act.url && (
                                    <a
                                      href={act.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-brand-primary font-bold hover:text-brand-primary-light flex items-center gap-1 bg-brand-primary-bg px-2.5 py-1 rounded-md border border-brand-primary/10 transition-colors"
                                    >
                                      <span>Official Ticket Hub</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Alpine Circuit Interactive Map */}
          {currentTab === "map" && (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <MapView />
            </motion.div>
          )}

          {/* Photographer's Gallery guide */}
          {currentTab === "gallery" && (
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GalleryView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
