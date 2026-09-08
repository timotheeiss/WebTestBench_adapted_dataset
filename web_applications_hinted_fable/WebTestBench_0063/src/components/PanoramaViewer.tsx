import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heritageItems, categories } from '@/data/heritageData';
import { usePanoramaStore } from '@/store/panoramaStore';
import HeritageOverlay from './HeritageOverlay';

const PanoramaViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  const {
    yaw,
    pitch,
    zoom,
    selectedHotspotId,
    showOverlay,
    isPanoramaLoading,
    loadedHotspots,
    setCameraPosition,
    setSelectedHotspot,
    setShowOverlay,
    setPanoramaLoading,
    markHotspotLoaded,
  } = usePanoramaStore();

  // Simulate panorama loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPanoramaLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [setPanoramaLoading]);

  // Simulate hotspot loading
  useEffect(() => {
    heritageItems.forEach((item, index) => {
      setTimeout(() => {
        markHotspotLoaded(item.id);
      }, 2000 + index * 300);
    });
  }, [markHotspotLoaded]);

  // Handle mouse/touch drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    const newYaw = yaw + deltaX * 0.3;
    const newPitch = Math.max(-45, Math.min(45, pitch - deltaY * 0.3));
    
    setCameraPosition(newYaw, newPitch, zoom);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePos, yaw, pitch, zoom, setCameraPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(2, zoom - e.deltaY * 0.001));
    setCameraPosition(yaw, pitch, newZoom);
  }, [yaw, pitch, zoom, setCameraPosition]);

  // Calculate hotspot screen position based on camera
  const getHotspotScreenPosition = (hotspotYaw: number, hotspotPitch: number) => {
    const relativeYaw = hotspotYaw - yaw;
    const relativePitch = hotspotPitch - pitch;
    
    // Convert to screen coordinates (simplified projection)
    const x = 50 + (relativeYaw / 180) * 50 * zoom;
    const y = 50 - (relativePitch / 90) * 50 * zoom;
    
    // Check if visible
    const isVisible = Math.abs(relativeYaw) < 90 / zoom;
    
    return { x, y, isVisible };
  };

  const selectedItem = selectedHotspotId 
    ? heritageItems.find(item => item.id === selectedHotspotId) 
    : null;

  return (
    <div
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-xl"
      data-semtag-id="panorama.viewer"
      data-semtag-role="region"
    >
      {/* Loading state */}
      <AnimatePresence>
        {isPanoramaLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-ink"
          >
            <div className="loading-spinner mb-4" />
            <p
              className="text-primary-foreground text-sm"
              data-semtag-id="panorama.loading"
              data-semtag-role="observable"
              data-semtag-state="panorama.loading"
            >全景场景加载中...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panorama container */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
        data-semtag-id="panorama.hotspots"
        data-semtag-role="collection"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          background: `
            radial-gradient(ellipse at center, 
              hsl(20 15% 20%) 0%, 
              hsl(20 10% 12%) 50%,
              hsl(20 10% 8%) 100%
            )
          `,
        }}
      >
        {/* Simulated panorama background with gradient */}
        <div 
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transform: `
              scale(${zoom}) 
              rotateX(${pitch * 0.2}deg) 
              translateX(${-yaw * 0.5}px)
            `,
            background: `
              linear-gradient(
                ${135 + yaw * 0.1}deg,
                hsl(5 75% 25% / 0.3) 0%,
                hsl(38 70% 35% / 0.2) 25%,
                hsl(160 35% 25% / 0.2) 50%,
                hsl(20 30% 20% / 0.3) 75%,
                hsl(5 75% 25% / 0.3) 100%
              )
            `,
          }}
        />
        
        {/* Decorative elements to simulate traditional architecture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 100px,
                hsl(38 70% 55% / 0.1) 100px,
                hsl(38 70% 55% / 0.1) 102px
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 100px,
                hsl(5 75% 45% / 0.1) 100px,
                hsl(5 75% 45% / 0.1) 102px
              )
            `,
            transform: `translateX(${-yaw * 2}px)`,
          }}
        />

        {/* Hotspots */}
        {heritageItems.map((item) => {
          const pos = getHotspotScreenPosition(item.hotspotPosition.yaw, item.hotspotPosition.pitch);
          const isLoaded = loadedHotspots.has(item.id);
          const category = categories[item.category];
          
          if (!pos.isVisible) return null;
          
          return (
            <motion.button
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isLoaded ? 1 : 0, 
                opacity: isLoaded ? 1 : 0 
              }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="hotspot group"
              data-semtag-id={`panorama.hotspots.item.${item.id}`}
              data-semtag-role="action"
              data-semtag-action="open-hotspot"
              data-semtag-controls="panorama.overlay"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedHotspot(item.id);
              }}
            >
              {/* Hotspot marker */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground font-serif text-sm font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                  background: item.category === 'craft' ? 'var(--gradient-vermillion)' :
                              item.category === 'performance' ? 'var(--gradient-gold)' :
                              item.category === 'folk' ? 'linear-gradient(135deg, hsl(160 35% 40%), hsl(160 40% 35%))' :
                              'var(--gradient-vermillion)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {item.title.charAt(0)}
              </div>
              
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-card px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{category.name}</p>
                </div>
              </div>
              
              {/* Loading indicator for unloaded hotspots */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <p className="text-xs text-muted-foreground">
            拖拽旋转 • 滚轮缩放 • 点击热点探索
          </p>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setCameraPosition(yaw, pitch, Math.min(2, zoom + 0.2))}
            className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:bg-card transition-colors"
            data-semtag-id="panorama.zoom.in"
            data-semtag-role="action"
            data-semtag-action="zoom-in"
            data-semtag-controls="panorama.viewer"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            onClick={() => setCameraPosition(yaw, pitch, Math.max(0.5, zoom - 0.2))}
            className="w-10 h-10 bg-card/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:bg-card transition-colors"
            data-semtag-id="panorama.zoom.out"
            data-semtag-role="action"
            data-semtag-action="zoom-out"
            data-semtag-controls="panorama.viewer"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hotspot loading status */}
      <AnimatePresence>
        {loadedHotspots.size < heritageItems.length && !isPanoramaLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
          >
            <p
              className="text-xs text-muted-foreground"
              data-semtag-id="panorama.hotspots.status"
              data-semtag-role="observable"
              data-semtag-state="panorama.hotspots.loading"
            >
              正在加载热点... ({loadedHotspots.size}/{heritageItems.length})
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heritage overlay */}
      <AnimatePresence>
        {showOverlay && selectedItem && (
          <HeritageOverlay
            item={selectedItem}
            onClose={() => setShowOverlay(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PanoramaViewer;
