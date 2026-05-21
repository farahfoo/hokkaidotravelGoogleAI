import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from "motion/react";
import {
  MapPin,
  Compass,
  RotateCcw,
  Clock,
  Navigation,
  RefreshCw,
} from "lucide-react";

interface RouteStop {
  id: string;
  name: string;
  day: number;
  coordinates: { x: number; y: number };
  lat: number;
  lng: number;
  description: string;
  travelFromPrev?: string;
  scenicSpot: string;
  keyActivity: string;
}

const STOPS: RouteStop[] = [
  {
    id: "chitose-start",
    name: "New Chitose Airport",
    day: 1,
    coordinates: { x: 580, y: 380 },
    lat: 42.7942,
    lng: 141.6928,
    description:
      "The gateway to Hokkaido. Pick up the AWD rental car and gear up for the expedition.",
    scenicSpot: "Chitose Valley view",
    keyActivity: "Rental Car Pick-up",
  },
  {
    id: "otaru",
    name: "Otaru",
    day: 1,
    coordinates: { x: 300, y: 160 },
    lat: 43.1907,
    lng: 141.0037,
    description:
      "Historic coastal town known for its romantic preserved canal, stone warehouses, and glasswork.",
    travelFromPrev: "85 km (1h 10m drive via Sasson Expy)",
    scenicSpot: "Otaru Canal & Blue Cave",
    keyActivity: "Night Canal Photography & Canal-side Dining",
  },
  {
    id: "sapporo",
    name: "Sapporo",
    day: 3,
    coordinates: { x: 400, y: 220 },
    lat: 43.0618,
    lng: 141.3545,
    description:
      "Hokkaido's vibrant capital. Famous for Odori Park, the legendary Sapporo Beer, and savory miso ramen.",
    travelFromPrev: "38 km (45m drive)",
    scenicSpot: "Sapporo TV Tower & Odori Park",
    keyActivity: "Nijo Seafood Market Feast & Shopping Arcade",
  },
  {
    id: "furano-biei",
    name: "Furano & Biei",
    day: 4,
    coordinates: { x: 620, y: 140 },
    lat: 43.5932,
    lng: 142.4646,
    description:
      "Rolling agricultural hills, magical lavender fields, and the spellbinding Shirogane Blue Pond.",
    travelFromPrev: "115 km (2h 10m drive)",
    scenicSpot: "Shikisai-no-oka Flower Fields",
    keyActivity: "Blue Pond (Aoiike) Scenic Stroll",
  },
  {
    id: "jozankei",
    name: "Jozankei",
    day: 5,
    coordinates: { x: 350, y: 300 },
    lat: 42.9644,
    lng: 141.1619,
    description:
      "Lush hot spring town tucked inside the Shikotsu-Toya National Park canyon with pristine waters.",
    travelFromPrev: "30 km (50m drive from Sapporo)",
    scenicSpot: "Moerenuma Park & Jozankei Canyon",
    keyActivity: "Traditional Ryokan & Onsen Mineral Bathing",
  },
  {
    id: "lake-toya",
    name: "Lake Toya",
    day: 6,
    coordinates: { x: 260, y: 410 },
    lat: 42.6186,
    lng: 140.8422,
    description:
      "An active volcano region surrounding a perfectly round, crystal clear caldera lake that never freezes.",
    travelFromPrev: "78 km (1h 20m drive)",
    scenicSpot: "Mt. Usu Volcano Ropeway",
    keyActivity: "Volcanic Summit Hiking & Caldera Views",
  },
  {
    id: "departure",
    name: "Chitose Departure",
    day: 7,
    coordinates: { x: 550, y: 350 },
    lat: 42.7942,
    lng: 141.6928,
    description:
      "Last minute souvenir hunting at Aeon Mall and Royce' Chocolate World before takeoff.",
    travelFromPrev: "94 km (1h 25m drive from Lake Toya)",
    scenicSpot: "Royce' Chocolate World Factory",
    keyActivity: "Aeon Mall duty-free shopping",
  },
];

function getWeatherMeta(code: number) {
  if (code === 0)
    return {
      label: "Clear Sky",
      emoji: "☀️",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    };
  if (code >= 1 && code <= 3)
    return {
      label: "Partly Cloudy",
      emoji: "🌤️",
      color: "text-sky-400",
      bg: "bg-sky-400/10",
    };
  if (code === 45 || code === 48)
    return {
      label: "Foggy",
      emoji: "🌫️",
      color: "text-slate-400",
      bg: "bg-slate-400/10",
    };
  if (code >= 51 && code <= 57)
    return {
      label: "Light Drizzle",
      emoji: "🌧️",
      color: "text-teal-400",
      bg: "bg-teal-400/10",
    };
  if (code >= 61 && code <= 67)
    return {
      label: "Rainy",
      emoji: "🌧️",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    };
  if (code >= 71 && code <= 77)
    return {
      label: "Snowy",
      emoji: "❄️",
      color: "text-indigo-400",
      bg: "bg-indigo-400/10",
    };
  if (code >= 80 && code <= 82)
    return {
      label: "Showers",
      emoji: "🌦️",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
    };
  if (code >= 95 && code <= 99)
    return {
      label: "Thunderstorm",
      emoji: "⛈️",
      color: "text-red-500",
      bg: "bg-red-500/10",
    };
  return {
    label: "Overcast",
    emoji: "☁️",
    color: "text-slate-350",
    bg: "bg-slate-500/10",
  };
}

interface WeatherData {
  temp: number;
  humidity: number;
  apparentTemp: number;
  precipitation: number;
  code: number;
  windSpeed: number;
  time: string;
}

export default function MapView() {
  const [selectedStop, setSelectedStop] = useState<RouteStop>(STOPS[1]); // Otaru as default
  const [weatherCache, setWeatherCache] = useState<Record<string, WeatherData>>(
    {},
  );
  const [loadingWeather, setLoadingWeather] = useState<Record<string, boolean>>(
    {},
  );
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const fetchWeatherForAllStops = async () => {
    setWeatherError(null);
    const initialLoading: Record<string, boolean> = {};
    STOPS.forEach((stop) => {
      initialLoading[stop.id] = true;
    });
    setLoadingWeather(initialLoading);

    try {
      const promises = STOPS.map(async (stop) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${stop.lat}&longitude=${stop.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FTokyo`,
          );
          if (!res.ok) throw new Error("Failed response");
          const data = await res.json();

          const current = data.current;
          return {
            id: stop.id,
            data: {
              temp: current.temperature_2m,
              humidity: current.relative_humidity_2m,
              apparentTemp: current.apparent_temperature,
              precipitation: current.precipitation,
              code: current.weather_code,
              windSpeed: current.wind_speed_10m,
              time: current.time,
            },
          };
        } catch (err) {
          console.error(`Error fetching weather for ${stop.name}:`, err);
          return { id: stop.id, error: true };
        }
      });

      const results = await Promise.all(promises);

      const newCache: Record<string, WeatherData> = {};
      const newLoading: Record<string, boolean> = {};

      results.forEach((item) => {
        newLoading[item.id] = false;
        if ("data" in item && item.data) {
          newCache[item.id] = item.data;
        }
      });

      setWeatherCache(newCache);
      setLoadingWeather(newLoading);
    } catch (err) {
      console.error(err);
      setWeatherError("Unable to fetch real-time weather updates.");
      const stopLoading: Record<string, boolean> = {};
      STOPS.forEach((stop) => {
        stopLoading[stop.id] = false;
      });
      setLoadingWeather(stopLoading);
    }
  };

  useEffect(() => {
    fetchWeatherForAllStops();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-brand-container p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <Compass className="w-5 h-5 text-brand-primary" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">
              Geo-itinerary Tracker
            </span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-brand-text">
            Alpine Circuit Map
          </h2>
          <p className="text-sm text-brand-text-muted mt-1">
            Follow the 7-day scenic route across Hokkaido's peaks, canals, and
            lakes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-brand-container-low px-3 py-1.5 rounded-lg border border-brand-outline-variant/30 text-xs text-brand-text-muted">
          <Clock className="w-4 h-4 text-brand-primary-light" />
          <span>Total driving distance: ~440 km</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SVG Route Map */}
        <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between aspect-[4/3] min-h-[300px] sm:min-h-[400px]">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-400">
            <span className="font-bold text-slate-100 block">MAP KEY</span>
            <span className="mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Selected
              Hub
            </span>
            <span className="mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Route Stop
            </span>
          </div>

          <div className="w-full h-full grow cursor-grab active:cursor-grabbing relative overflow-hidden flex items-center justify-center rounded-lg">
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              minScale={0.5}
              maxScale={4}
            >
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
                contentStyle={{ width: "100%", height: "100%" }}
                wrapperClass="w-full h-full"
                contentClass="w-full h-full"
              >
                <svg
                  className="w-full h-full overflow-hidden select-none"
                  viewBox="180 80 500 360"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Draw road connection lines */}
                  <g className="stroke-slate-700 stroke-[3] fill-none stroke-dasharray-[6,6]">
                    {STOPS.map((stop, i) => {
                      if (i === 0) return null;
                      const prev = STOPS[i - 1];
                      return (
                        <line
                          key={`line-${stop.id}`}
                          x1={prev.coordinates.x}
                          y1={prev.coordinates.y}
                          x2={stop.coordinates.x}
                          y2={stop.coordinates.y}
                          className="stroke-teal-900/40"
                        />
                      );
                    })}
                    {/* Back to Airport circuit */}
                    <line
                      x1={STOPS[STOPS.length - 1].coordinates.x}
                      y1={STOPS[STOPS.length - 1].coordinates.y}
                      x2={STOPS[0].coordinates.x}
                      y2={STOPS[0].coordinates.y}
                      className="stroke-teal-900/30"
                    />
                  </g>

                  {/* Selected glow effect and highlight route */}
                  <g className="stroke-brand-primary-light stroke-[4] fill-none">
                    {STOPS.map((stop, i) => {
                      if (i === 0) return null;
                      const prev = STOPS[i - 1];
                      const isActivePath =
                        stop.id === selectedStop.id ||
                        prev.id === selectedStop.id;
                      return (
                        <motion.line
                          key={`active-line-${stop.id}`}
                          x1={prev.coordinates.x}
                          y1={prev.coordinates.y}
                          x2={stop.coordinates.x}
                          y2={stop.coordinates.y}
                          animate={{
                            stroke: isActivePath ? "#a2c6fd" : "#475569",
                            strokeWidth: isActivePath ? 4 : 2,
                            opacity: isActivePath ? 0.9 : 0.3,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      );
                    })}
                  </g>

                  {/* Pins on the map */}
                  {STOPS.map((stop) => {
                    const isSelected = stop.id === selectedStop.id;
                    return (
                      <g
                        key={`pin-group-${stop.id}`}
                        onClick={() => setSelectedStop(stop)}
                        className="cursor-pointer"
                      >
                        {/* Outer pulsating ring for selected */}
                        {isSelected && (
                          <motion.circle
                            cx={stop.coordinates.x}
                            cy={stop.coordinates.y}
                            r={18}
                            className="fill-amber-400/20 stroke-amber-400 stroke-[1.5]"
                            animate={{
                              r: [12, 22, 12],
                              opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                          />
                        )}

                        {/* Standard marker circle */}
                        <motion.circle
                          cx={stop.coordinates.x}
                          cy={stop.coordinates.y}
                          r={isSelected ? 8 : 6}
                          className={
                            isSelected
                              ? "fill-amber-400"
                              : "fill-sky-500 hover:fill-amber-300"
                          }
                          animate={{ scale: isSelected ? 1.25 : 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        />

                        {/* Text labels for major stops */}
                        <text
                          x={stop.coordinates.x}
                          y={stop.coordinates.y - 14}
                          textAnchor="middle"
                          className={`text-[11px] font-bold tracking-wide pointer-events-none select-none ${isSelected ? "fill-amber-400 scale-105" : "fill-white"}`}
                        >
                          {stop.name === "New Chitose Airport"
                            ? "Chitose"
                            : stop.name === "Chitose Departure"
                              ? "Airport Departure"
                              : stop.name}
                        </text>
                        <text
                          x={stop.coordinates.x}
                          y={stop.coordinates.y + 20}
                          textAnchor="middle"
                          className="text-[9px] fill-slate-500 font-medium pointer-events-none uppercase"
                        >
                          (Day {stop.day})
                        </text>

                        {/* Floating weather pill on the map for each stop */}
                        {weatherCache[stop.id] && (
                          <g
                            transform={`translate(${stop.coordinates.x - 24}, ${stop.coordinates.y - 42})`}
                            className="pointer-events-none"
                          >
                            <rect
                              width="48"
                              height="16"
                              rx="8"
                              className={`fill-slate-900/95 shadow-md ${isSelected ? "stroke-amber-400/60" : "stroke-slate-800"}`}
                              strokeWidth="1"
                            />
                            <text
                              x="24"
                              y="11"
                              textAnchor="middle"
                              className="text-[9px] font-mono font-bold fill-sky-200"
                              style={{ fontSize: "9px", fontWeight: "bold" }}
                            >
                              {getWeatherMeta(weatherCache[stop.id].code).emoji}{" "}
                              {Math.round(weatherCache[stop.id].temp)}°
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </TransformComponent>
            </TransformWrapper>
          </div>

          {/* Compass Graphic Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-40">
            <span className="text-[10px] font-mono tracking-wider text-slate-400">
              N
            </span>
            <div className="relative w-6 h-6 border border-slate-500 rounded-full flex items-center justify-center">
              <div className="w-0.5 h-4 bg-red-400 absolute transform rotate-45" />
              <div className="w-0.5 h-4 bg-slate-500 absolute transform rotate-[225deg]" />
            </div>
          </div>
        </div>

        {/* Selected Pin Details Side Info */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-brand-container-low p-6 rounded-xl border border-brand-outline-variant/30">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="bg-brand-primary-bg text-brand-primary-text text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                Stop Day {selectedStop.day}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-muted">
                <MapPin className="w-4 h-4 text-red-500" />
                Hokkaido Circuit
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-text mb-1 tracking-tight">
                {selectedStop.name}
              </h3>
              {selectedStop.travelFromPrev && (
                <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 flex-wrap py-1 rounded-md mb-3 mt-1 inline-flex max-w-full">
                  <Navigation className="w-3.5 h-3.5 rotate-45 shrink-0" />
                  <span className="font-semibold">
                    {selectedStop.travelFromPrev}
                  </span>
                </div>
              )}
              <hr className="border-brand-outline-variant/40 my-3" />
              <p className="text-sm font-body-md text-brand-text-muted leading-relaxed mb-4">
                {selectedStop.description}
              </p>

              {/* Real-time Weather Station integration */}
              <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 shadow-md flex flex-col justify-between space-y-3.5 my-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-bold tracking-wider text-[10px] uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Climate Station</span>
                  </div>
                  <button
                    onClick={fetchWeatherForAllStops}
                    title="Refresh Weather Info"
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-800"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${Object.values(loadingWeather).some(Boolean) ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>

                {loadingWeather[selectedStop.id] ? (
                  <div className="flex items-center justify-center py-4 space-x-1.5 font-mono text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    <span>Syncing weather telemetry...</span>
                  </div>
                ) : weatherCache[selectedStop.id] ? (
                  <div className="grid grid-cols-12 gap-2 items-center">
                    {/* Temperature summary */}
                    <div className="col-span-6 flex items-center gap-2">
                      <span className="text-3xl font-extrabold tracking-tight font-mono text-slate-100">
                        {Math.round(weatherCache[selectedStop.id].temp)}°C
                      </span>
                      <div className="leading-none">
                        <span className="text-xl block select-none">
                          {
                            getWeatherMeta(weatherCache[selectedStop.id].code)
                              .emoji
                          }
                        </span>
                        <span className="block text-[9px] font-bold text-slate-400 mt-1 select-none leading-tight">
                          {
                            getWeatherMeta(weatherCache[selectedStop.id].code)
                              .label
                          }
                        </span>
                      </div>
                    </div>

                    {/* Wind and precip details */}
                    <div className="col-span-6 border-l border-slate-800 pl-3 grid grid-cols-2 gap-y-2 text-[9px] text-slate-400 font-mono leading-none">
                      <div>
                        <span className="text-slate-500 uppercase tracking-widest text-[7px] font-semibold block mb-1 font-sans">
                          Apparent
                        </span>
                        <span className="text-slate-200 font-bold">
                          {Math.round(
                            weatherCache[selectedStop.id].apparentTemp,
                          )}
                          °C
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase tracking-widest text-[7px] font-semibold block mb-1 font-sans">
                          Humidity
                        </span>
                        <span className="text-slate-200 font-bold">
                          {weatherCache[selectedStop.id].humidity}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase tracking-widest text-[7px] font-semibold block mb-1 font-sans">
                          Wind
                        </span>
                        <span className="text-slate-250 font-bold">
                          {Math.round(weatherCache[selectedStop.id].windSpeed)}{" "}
                          km/h
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase tracking-widest text-[7px] font-semibold block mb-1 font-sans">
                          Precip
                        </span>
                        <span className="text-slate-250 font-bold">
                          {weatherCache[selectedStop.id].precipitation} mm
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-[11px] text-slate-400 italic">
                      Climate readings currently offline. Tap icon to retry.
                    </p>
                    {weatherError && (
                      <p className="text-[9px] text-red-400 font-mono mt-1">
                        ⚠️ {weatherError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs shrink-0 font-bold mt-0.5">
                  ★
                </span>
                <div>
                  <span className="text-xs font-bold text-brand-text block tracking-wide uppercase">
                    Scenic Visual
                  </span>
                  <p className="text-xs text-brand-text-muted mt-0.5">
                    {selectedStop.scenicSpot}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 text-xs shrink-0 font-bold mt-0.5">
                  ✓
                </span>
                <div>
                  <span className="text-xs font-bold text-brand-text block tracking-wide uppercase">
                    Core Activity Focus
                  </span>
                  <p className="text-xs text-brand-text-muted mt-0.5">
                    {selectedStop.keyActivity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-brand-outline-variant/30 flex items-center justify-between">
            <div />
            <button
              onClick={() => setSelectedStop(STOPS[1])}
              className="text-xs font-bold text-brand-primary hover:text-brand-primary-light flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
