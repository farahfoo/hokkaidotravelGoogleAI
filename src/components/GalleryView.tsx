import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, MapPin, X, Info, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

export default function GalleryView() {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const locations = ['All', 'Otaru', 'Sapporo', 'Biei'];

  const filteredImages = selectedLocation === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.location.toLowerCase().includes(selectedLocation.toLowerCase()));

  // Photography tips mapping for each image to add rich interactive details
  const getPhotoTip = (title: string) => {
    if (title.includes("Canal")) return "Visit during blue hour (around 15-30 minutes after sunset). The street lamps glow beautifully against the deep cobalt sky, and reflections are crystal clear.";
    if (title.includes("Kaisendon")) return "Use a wide aperture (f/2.8 or lower) for high food depth of field. Shoot near window daylight and tilt up slightly to show the mountain of seafood.";
    if (title.includes("Caves")) return "Best captured on a sunny morning between 9 AM and 11 AM when sunlight strikes the limestone cliffs at an angle, illuminating the turquoise water.";
    if (title.includes("Tengu")) return "Use a stable tripod or solid ledge. Ideal for sunset transitioning into nightlights. Look for the harbor line winding into the mountains.";
    if (title.includes("TV Tower")) return "Walk down Odori Park block 3. Frame with the cherry blossoms in the foreground to give depth and contrast to the red steel structure.";
    if (title.includes("Shikisai")) return "Use a high-angle perspective or compression lens (70-200mm) to tighten the flower strips and create the iconic 'carpet' appearance.";
    if (title.includes("Blue Pond")) return "Avoid direct harsh afternoon glare. Best at early morning or slightly overcast times. Focus on the contrast of white birch trees against the turquoise pond.";
    return "Optimize for high contrast to capture the organic geometry and light playing with concrete/glass shapes.";
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-container p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <Camera className="w-5 h-5 text-brand-primary" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">Scenic Lens</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-brand-text">Photographer's Gallery</h2>
          <p className="text-sm text-brand-text-muted mt-1 font-sans">
            Curated list of incredible stops, complete with professional composition and lighting tips.
          </p>
        </div>

        {/* Location Filters */}
        <div className="flex flex-wrap gap-1 bg-brand-container-low p-1 rounded-xl border border-brand-outline-variant/30 text-xs font-medium">
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedLocation === loc
                  ? 'bg-brand-primary text-white font-bold shadow-xs'
                  : 'text-brand-text-muted hover:text-brand-text hover:bg-white/50'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Images */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={`${img.title}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group bg-brand-container-low rounded-xl overflow-hidden border border-brand-outline-variant/30 cursor-pointer flex flex-col justify-between"
              onClick={() => setLightboxImage(img)}
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-xs p-2 rounded-full text-brand-primary shadow-lg scale-90 group-hover:scale-100 transition-all">
                    <ZoomIn className="w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Title and location badge */}
              <div className="p-4 bg-white grow flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-sm font-bold text-brand-text tracking-tight group-hover:text-brand-primary line-clamp-1 transition-colors">
                    {img.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-brand-text-muted mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="line-clamp-1">{img.location}</span>
                  </div>
                </div>
                
                <div className="mt-3.5 pt-2 border-t border-brand-outline-variant/20 flex justify-between items-center text-[10px] text-brand-text-muted">
                  <span className="font-mono bg-brand-primary-bg text-brand-primary-text font-semibold px-2 py-0.5 rounded-md">
                    PRO TIP INCLUDED
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-brand-container-low rounded-xl border border-dashed border-brand-outline-variant">
          <ImageIcon className="w-8 h-8 text-brand-outline mb-2" />
          <p className="text-sm font-medium text-brand-text-muted">No visual spots found for "{selectedLocation}"</p>
        </div>
      )}

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl flex flex-col lg:flex-row"
              onClick={e => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[250px] lg:min-h-[450px]">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[50vh] lg:max-h-[85vh] w-full h-full object-contain"
                />
                
                {/* Image overlay helper */}
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white/95 text-xs px-2.5 py-1 rounded-md font-mono flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" /> High Res Preview
                </div>
              </div>

              {/* Composition details column */}
              <div className="w-full lg:w-[350px] p-6 sm:p-8 flex flex-col justify-between bg-brand-container-low border-t lg:border-t-0 lg:border-l border-brand-outline-variant/30 overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-brand-primary bg-brand-primary-bg px-2.5 py-1 rounded-md">
                        Spot Profile
                      </span>
                    </div>
                    <button
                      onClick={() => setLightboxImage(null)}
                      className="p-1 rounded-full hover:bg-brand-container cursor-pointer text-brand-text-muted hover:text-brand-text transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brand-text tracking-tight">
                      {lightboxImage.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-brand-text-muted mt-2">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="font-medium">{lightboxImage.location}</span>
                    </div>
                  </div>

                  <hr className="border-brand-outline-variant/30" />

                  {/* Photography tip explanation */}
                  <div className="space-y-3 bg-white p-4 rounded-xl border border-brand-outline-variant/20 shadow-xs">
                    <div className="flex items-center gap-2 text-brand-primary font-bold text-xs tracking-wider uppercase">
                      <Info className="w-4 h-4" />
                      <span>Composition &amp; Light</span>
                    </div>
                    <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                      {getPhotoTip(lightboxImage.title)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-outline-variant/30 flex items-center justify-between text-[11px] text-brand-text-muted">
                  <span>Aspect: Landscape (16:9)</span>
                  <span>Spring Expedition</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
