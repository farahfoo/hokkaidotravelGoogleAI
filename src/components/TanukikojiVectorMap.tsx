import { useState } from "react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Compass,
  RotateCcw,
  Clock,
  Info,
  ZoomIn,
  ZoomOut,
  X,
  Sparkles,
  ShoppingBag,
  Utensils,
  Coffee,
} from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  jpName?: string;
  description: string;
  category: "Shopping" | "Food" | "Sight" | "Hotel" | "Shrine";
  x: number;
  y: number;
  details?: string;
  hours?: string;
}

const LANDMARKS: Landmark[] = [
  {
    id: "tanukikoji-arcade",
    name: "Tanukikoji Shopping Arcade",
    jpName: "狸小路商店街",
    description: "The famous 1km-long roofed shopping arcade dating back to 1873. Has over 200 shops.",
    category: "Shopping",
    x: 480,
    y: 310,
    details: "Stretches from 1-Chome to 7-Chome. Blocks 4, 5, and 6 are incredibly vibrant with souvenir shops, drugstores, and local diners.",
    hours: "Open 24/7 (individual shop hours vary, typically 10:00 AM - 10:00 PM)",
  },
  {
    id: "tanuki-shrine",
    name: "Honjin Tanukidaimyojin Shrine",
    jpName: "本阵狸大明神社",
    description: "A small, unique shrine in Tanukikoji 5-Chome dedicated to the Tanuki (raccoon dog) spirits.",
    category: "Shrine",
    x: 320,
    y: 280,
    details: "Features a lucky Tanuki statue. Pouring water over it is said to bring prosperity in business and safe travel.",
    hours: "Open 24/7",
  },
  {
    id: "fuji-megane",
    name: "Fuji Megane store",
    jpName: "富士眼镜 (9999)",
    description: "An iconic glasses center located right in the middle of the Fashion and Shopping intersection.",
    category: "Shopping",
    x: 475,
    y: 345,
    details: "Historically significant landmark at the cornerstone of the central walking pathway.",
    hours: "10:00 AM - 7:30 PM",
  },
  {
    id: "odori-park",
    name: "Odori Park",
    jpName: "大通公园",
    description: "The beautiful linear park stretching 1.5km through the center of Sapporo. Hosts seasonal festivals.",
    category: "Sight",
    x: 450,
    y: 75,
    details: "The green oasis of Sapporo. Great view of the TV Tower on the east end and lilac flower gardens.",
    hours: "Open 24/7",
  },
  {
    id: "yamagoya",
    name: "Yamagoya Diner (51)",
    jpName: "玉子/Egg/山小屋",
    description: "Cozy local dining corner specializing in comfort egg bowls and hot noodle soups.",
    category: "Food",
    x: 435,
    y: 375,
    details: "Famed among local wanderers for a classic, hearty post-shopping midnight snack.",
    hours: "11:30 AM - 11:00 PM",
  },
  {
    id: "nankoen",
    name: "Nankoen Yakiniku (60)",
    jpName: "南光园",
    description: "Historic local charcoal grill restaurant serving premium Hokkaido Wagyu and local cuts.",
    category: "Food",
    x: 435,
    y: 505,
    details: "Legendary gourmet stop inside the warm, crowded Susukino area. Especially cozy when weather is cold.",
    hours: "5:00 PM - Midnight",
  },
  {
    id: "beef-no-mori",
    name: "Beef no Mori (55)",
    jpName: "Beef no Mori",
    description: "A cozy underground dining hall specializing in juicy local beef cuts and highballs.",
    category: "Food",
    x: 520,
    y: 490,
    details: "Famous for tender ribeyes and customized dipping sauces made from local mountain horseradish.",
    hours: "4:30 PM - 11:00 PM",
  },
  {
    id: "daimaru-fujii",
    name: "Daimaru Fujii Central (59)",
    jpName: "Stationery 文具用品",
    description: "Extensive multi-floor stationery store offering beautiful calligraphy brushes, washi papers, and souvenir crafts.",
    category: "Shopping",
    x: 830,
    y: 175,
    details: "A absolute wonderland for paper and diary planners. Located close to the Odori linear border.",
    hours: "10:00 AM - 7:00 PM",
  },
  {
    id: "chitose-tsuru",
    name: "Chitose Tsuru Museum (1096)",
    jpName: "千岁鹤酒造",
    description: "Historic local sake tasting center representing Sapporo's primary traditional brewery.",
    category: "Sight",
    x: 900,
    y: 310,
    details: "Sample beautiful freshly brewed craft sake made from pure Toyohira River underflow spring water.",
    hours: "11:00 AM - 6:00 PM",
  },
  {
    id: "miyoshi-shrine",
    name: "Miyoshi Shrine",
    jpName: "三吉神社",
    description: "Historic shrine beloved by locals, founded in 1878. A very peaceful oasis sitting by the western streetcar line.",
    category: "Shrine",
    x: 210,
    y: 180,
    details: "A peaceful place to get red ink stamp journals (Goshuin). Surrounded by colorful cherry blossoms in spring.",
    hours: "Open 24/7",
  },
  {
    id: "resol-hotel",
    name: "Hotel Resol Trinity Sapporo",
    jpName: "Hotel Resol",
    description: "Modern, high-rise hotel positioned gracefully right beside the Tozai Line and Odori borders.",
    category: "Hotel",
    x: 400,
    y: 115,
    details: "Features premium view rooms looking out directly over the colorful winter illumination stages of Odori park.",
  },
  {
    id: "view-hotel",
    name: "Sapporo View Hotel",
    jpName: "View Hotel",
    description: "Elegant, green-filled luxury hotel framing the western side of the Odori park complex.",
    category: "Hotel",
    x: 180,
    y: 115,
  }
];

const MapControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
      <button
        onClick={() => zoomIn()}
        className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button
        onClick={() => zoomOut()}
        className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      <button
        onClick={() => resetTransform()}
        className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all"
        title="Reset Map Layout"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function TanukikojiVectorMap({ onClose }: { onClose?: () => void }) {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(LANDMARKS[0]);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const getCatColor = (cat: string) => {
    switch (cat) {
      case "Shopping":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Food":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Sight":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Hotel":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shrine":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getCatIcon = (cat: string) => {
    switch (cat) {
      case "Shopping":
        return <ShoppingBag className="w-3.5 h-3.5" />;
      case "Food":
        return <Utensils className="w-3.5 h-3.5" />;
      case "Sight":
        return <Compass className="w-3.5 h-3.5" />;
      case "Hotel":
        return <Coffee className="w-3.5 h-3.5" />;
      case "Shrine":
        return <Sparkles className="w-3.5 h-3.5" />;
      default:
        return <Info className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#fafbff] text-slate-850 font-sans select-none relative rounded-3xl overflow-hidden min-h-[550px] md:min-h-[600px] max-h-[85vh]">
      {/* Map Board Side */}
      <div className="flex-1 h-[350px] md:h-auto bg-[#f1f5f9] relative border-b md:border-b-0 md:border-r border-slate-200/60 overflow-hidden flex items-center justify-center">
        {/* Navigation Indicator Overlay (Compass) */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono tracking-wider text-slate-500">
          <Compass className="w-4 h-4 text-emerald-500 animate-spin-slow animate-duration-10000" />
          <span>SAPPORO DOWNTOWN GRID • 札幌</span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-35 w-8 h-8 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 flex items-center justify-center cursor-pointer max-md:flex hidden"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1 pointer-events-none select-none">
          <div className="px-2.5 py-1 rounded bg-slate-800/90 backdrop-blur-xs border border-white/10 text-[9px] font-mono uppercase tracking-widest text-slate-100 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            Live Vector Canvas
          </div>
          <div className="text-[10px] text-slate-450 font-medium font-mono text-right bg-white/50 backdrop-blur-xs px-2 rounded-md">
            Pinch to Zoom, Drag to Pan Map
          </div>
        </div>

        <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            minScale={0.7}
            maxScale={4}
          >
            <MapControls />
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f4f6fa",
              }}
              contentStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="w-[1000px] h-[600px] relative select-none shrink-0 border border-slate-300/45 bg-slate-50 shadow-inner rounded-xl overflow-hidden">
                {/* SVG Live Map Graphics */}
                <svg
                  viewBox="0 0 1000 600"
                  className="w-full h-full select-none"
                  style={{
                    backgroundImage: "radial-gradient(#e2e8f0 1.5px, transparent 1.5px)",
                    backgroundSize: "24px 24px",
                  }}
                >
                  {/* Grid Lines */}
                  <g stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="5 5">
                    <line x1="200" y1="0" x2="200" y2="600" />
                    <line x1="400" y1="0" x2="400" y2="600" />
                    <line x1="600" y1="0" x2="600" y2="600" />
                    <line x1="800" y1="0" x2="800" y2="600" />
                    <line x1="0" y1="200" x2="1000" y2="200" />
                    <line x1="0" y1="400" x2="1000" y2="400" />
                  </g>

                  {/* ───────────────── STREETS & PATHWAYS ───────────────── */}
                  {/* Route 36 */}
                  <g>
                    <rect x="0" y="415" width="1000" height="20" fill="#cbd5e1" />
                    <line x1="0" y1="425" x2="1000" y2="425" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="12 8" />
                    <text x="180" y="429" fill="#64748b" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
                      ROUTE 36 / 国道36号线
                    </text>
                  </g>

                  {/* Vertical Street Grid Lines */}
                  <g stroke="#cbd5e1" strokeWidth="6" opacity="0.35">
                    <line x1="180" y1="0" x2="180" y2="600" />
                    <line x1="330" y1="0" x2="330" y2="600" />
                    <line x1="630" y1="0" x2="630" y2="600" />
                    <line x1="800" y1="0" x2="800" y2="600" />
                  </g>

                  {/* ───────────────── REGIONS & ZONES (LOW GLOW OPACITY) ───────────────── */}
                  {/* Communication Zone */}
                  <g
                    onMouseEnter={() => setHoveredZone("communication")}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <polygon
                      points="80,130 260,130 290,320 80,320"
                      fill="#fef08a"
                      opacity={hoveredZone === "communication" ? "0.4" : "0.22"}
                      stroke="#fef08a"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    <text x="110" y="230" fill="#a16207" fontSize="11" fontWeight="bold" letterSpacing="0.05em">
                      Communication Zone
                    </text>
                    <text x="145" y="246" fill="#ca8a04" fontSize="10" opacity="0.9">
                      交流区 / Western Arc
                    </text>
                  </g>

                  {/* Gourmet Zone inside Susukino */}
                  <g
                    onMouseEnter={() => setHoveredZone("gourmet")}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <polygon
                      points="390,380 730,380 770,550 390,550"
                      fill="#fed7aa"
                      opacity={hoveredZone === "gourmet" ? "0.42" : "0.24"}
                      stroke="#fed7aa"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    <text x="560" y="450" fill="#9a3412" fontSize="12" fontWeight="bold" letterSpacing="0.05em">
                      Gourmet Zone / 美食区
                    </text>
                    <text x="548" y="468" fill="#bc4722" fontSize="10" opacity="0.9">
                      Susukino Ramen & Yakiniku Grid
                    </text>
                  </g>

                  {/* Fashion Zone central block */}
                  <g
                    onMouseEnter={() => setHoveredZone("fashion")}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <polygon
                      points="410,120 560,120 560,370 410,370"
                      fill="#fbcfe8"
                      opacity={hoveredZone === "fashion" ? "0.38" : "0.2"}
                      stroke="#fbcfe8"
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    <text x="445" y="150" fill="#9d174d" fontSize="12" fontWeight="bold" letterSpacing="0.05em">
                      Fashion Zone
                    </text>
                    <text x="466" y="165" fill="#c21d56" fontSize="10" opacity="0.9">
                      时装区 / Core Mall
                    </text>
                  </g>


                  {/* ───────────────── TRANSPORTATION LINES ───────────────── */}
                  {/* Tozai Line Route Line (Teal/Blue) */}
                  <line x1="80" y1="100" x2="920" y2="100" stroke="#0ea5e9" strokeWidth="7" strokeLinecap="round" />
                  <text x="250" y="94" fill="#0369a1" fontSize="10" fontWeight="bold" letterSpacing="0.1em" fontFamily="monospace">
                    ■ TOZAI SUBWAY LINE / 东西线
                  </text>

                  {/* Namboku Line Route Line (Green/Emerald) */}
                  <line x1="500" y1="100" x2="500" y2="550" stroke="#10b981" strokeWidth="7" strokeLinecap="round" />
                  <text x="512" y="540" fill="#047857" fontSize="10" fontWeight="bold" letterSpacing="0.1em" fontFamily="monospace">
                    ■ NAMBOKU SUBWAY LINE / 南北线
                  </text>

                  {/* Streetcar Line (Orange Dashed) */}
                  <path
                    d="M 120 180 L 350 180 L 350 350 L 500 350"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />
                  <text x="135" y="194" fill="#d97706" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    ■ STREETCAR LINE / 札幌市电
                  </text>

                  {/* ───────────────── THE PARKS & WATERWAYS ───────────────── */}
                  {/* Odori Park Green Block */}
                  <rect x="150" y="45" width="700" height="35" rx="6" fill="#15803d" opacity="0.82" />
                  <text x="440" y="66" fill="#ffffff" fontSize="12" fontWeight="bold" letterSpacing="0.1em">
                    ODORI PARK / 大通公园
                  </text>

                  {/* ───────────────── SHOPPING ARCADE BAR ───────────────── */}
                  {/* Tanukikoji Shopping Street Block */}
                  <rect x="150" y="295" width="650" height="30" rx="4" fill="#ea580c" opacity="0.9" stroke="#c2410c" strokeWidth="2" />
                  <g stroke="#ffffff" strokeWidth="1">
                    {/* Divider Blocks */}
                    <line x1="240" y1="295" x2="240" y2="325" />
                    <line x1="330" y1="295" x2="330" y2="325" />
                    <line x1="420" y1="295" x2="420" y2="325" />
                    <line x1="510" y1="295" x2="510" y2="325" />
                    <line x1="600" y1="295" x2="600" y2="325" />
                    <line x1="700" y1="295" x2="700" y2="325" />
                  </g>

                  {/* Block numbers inside Tanukikoji */}
                  <text x="195" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-1</text>
                  <text x="285" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-2</text>
                  <text x="375" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-3</text>
                  <text x="465" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-4</text>
                  <text x="555" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-5</text>
                  <text x="645" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-6</text>
                  <text x="745" y="314" fill="#ffffff" fontSize="9" fontWeight="bold">T-7</text>

                  <text x="390" y="286" fill="#d84418" fontSize="13" fontWeight="heavy" fontFamily="Georgia, serif">
                    ★ TANUKIKOJI SHOPPING STREET (狸小路)
                  </text>


                  {/* ───────────────── SUBWAY STATIONS ───────────────── */}
                  {/* Nishi 11 Chome Sta. */}
                  <g transform="translate(120, 100)">
                    <circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
                    <text x="-35" y="-14" fill="#024e75" fontSize="9" fontWeight="bold">W11 Nishi 11</text>
                  </g>

                  {/* Odori Station */}
                  <g transform="translate(500, 100)" className="animate-pulse">
                    <circle cx="0" cy="0" r="12" fill="#ffffff" stroke="#1e3a8a" strokeWidth="4" />
                    <text x="-48" y="-18" fill="#1e3a8a" fontSize="10" fontWeight="extrabold">H08 ODORI / 大通</text>
                  </g>

                  {/* Susukino Station */}
                  <g transform="translate(500, 420)">
                    <circle cx="0" cy="0" r="11" fill="#ffffff" stroke="#047857" strokeWidth="3" />
                    <text x="-45" y="24" fill="#065f46" fontSize="10" fontWeight="extrabold">N08 SUSUKINO / 薄野</text>
                  </g>


                  {/* ───────────────── INTERACTIVE LANDMARK POINTS ───────────────── */}
                  {LANDMARKS.filter(l => l.x !== undefined).map((loc) => {
                    const isSelected = selectedLandmark?.id === loc.id;
                    const isArcade = loc.id === "tanukikoji-arcade";

                    // Determine colors based on category
                    let markerColor = "#ea580c"; // default orange
                    if (loc.category === "Food") markerColor = "#e11d48"; // rose
                    if (loc.category === "Sight") markerColor = "#059669"; // emerald
                    if (loc.category === "Hotel") markerColor = "#2563eb"; // blue
                    if (loc.category === "Shrine") markerColor = "#7c3aed"; // purple

                    return (
                      <g
                        key={loc.id}
                        transform={`translate(${loc.x}, ${loc.y})`}
                        onClick={() => setSelectedLandmark(loc)}
                        className="cursor-pointer group select-none"
                      >
                        {/* Selected animation pulses */}
                        {isSelected && (
                          <circle cx="0" cy="0" r="24" fill={markerColor} opacity="0.32" className="animate-ping" style={{ animationDuration: "3s" }} />
                        )}

                        {/* Interactive Circle Pin */}
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected ? 10 : 8}
                          fill={markerColor}
                          stroke="#ffffff"
                          strokeWidth={isSelected ? 3 : 2}
                          className="transition-all duration-300 group-hover:scale-125 hover:fill-slate-900 shadow-md"
                        />

                        {/* Label tag above elements if not the global Arcade */}
                        {!isArcade && (
                          <g transform="translate(0, -14)">
                            {/* Simple text element for names */}
                            <rect
                              x={-(loc.name.length * 2.8) - 10}
                              y="-9"
                              width={loc.name.length * 5.6 + 20}
                              height="14"
                              rx="3"
                              fill="#ffffff"
                              stroke={isSelected ? "#1e293b" : "#cbd5e1"}
                              strokeWidth={isSelected ? "1.5" : "1"}
                              opacity="0.9"
                            />
                            <text
                              x="0"
                              y="1"
                              fill={isSelected ? "#1e293b" : "#475569"}
                              fontSize="8"
                              fontWeight={isSelected ? "bold" : "600"}
                              textAnchor="middle"
                            >
                              {loc.name.replace(" (1096)", "").replace(" (60)", "").replace(" (48)", "").replace(" (51)", "")}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>

      {/* Information Sidebar details */}
      <div className="w-full md:w-[320px] shrink-0 bg-white p-6 flex flex-col justify-between border-t md:border-t-0 border-slate-100 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-450 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-primary" /> Landmark Directory
            </h3>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer max-md:hidden"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {selectedLandmark ? (
              <motion.div
                key={selectedLandmark.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3 font-sans"
              >
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getCatColor(
                      selectedLandmark.category
                    )}`}
                  >
                    {getCatIcon(selectedLandmark.category)}
                    {selectedLandmark.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-lg md:text-xl font-bold text-slate-900 leading-tight">
                    {selectedLandmark.name}
                  </h4>
                  {selectedLandmark.jpName && (
                    <span className="text-xs font-bold text-slate-450 italic mt-0.5 block">
                      {selectedLandmark.jpName}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed md:text-sm bg-slate-50 p-3 rounded-xl border border-slate-100/80">
                  {selectedLandmark.description}
                </p>

                {selectedLandmark.details && (
                  <div className="bg-brand-primary-bg/20 p-3 rounded-xl border border-brand-primary/10">
                    <span className="text-[10px] font-bold font-mono text-brand-primary uppercase tracking-wider block mb-1">
                      💡 Pro Traveler Tip
                    </span>
                    <p className="text-xs text-brand-primary-text font-medium leading-relaxed">
                      {selectedLandmark.details}
                    </p>
                  </div>
                )}

                {selectedLandmark.hours && (
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Hours:</strong> {selectedLandmark.hours}</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-2 text-slate-400">
                <Compass className="w-8 h-8 text-slate-300 animate-pulse" />
                <p className="text-xs font-medium">Select a colored pin on the map to show full guide details.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Menu Selection Directory */}
        <div className="border-t border-slate-100/90 pt-4 mt-6">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-350 block mb-2">
            Tap Quick-Jump Locations
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {LANDMARKS.slice(0, 6).map((mark) => (
              <button
                key={mark.id}
                onClick={() => setSelectedLandmark(mark)}
                className={`text-left px-2 py-1.5 rounded-lg text-xs font-medium truncate border transition-all ${
                  selectedLandmark?.id === mark.id
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-bold"
                    : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {mark.name.replace(" (1096)", "").replace(" (60)", "").replace(" (48)", "").replace(" (51)", "").replace(" Shopping Arcade", "").replace(" Diner", "")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
