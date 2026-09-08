import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeritageItem, categories } from '@/data/heritageData';

interface HeritageOverlayProps {
  item: HeritageItem;
  onClose: () => void;
}

const HeritageOverlay = ({ item, onClose }: HeritageOverlayProps) => {
  const category = categories[item.category];
  
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overlay-backdrop"
        onClick={onClose}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="overlay-content top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[80vh] overflow-hidden"
        data-semtag-id="panorama.overlay"
        data-semtag-role="region"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-card transition-colors"
          data-semtag-id="panorama.overlay.close"
          data-semtag-role="action"
          data-semtag-action="close-overlay"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Category badge */}
          <span 
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-primary-foreground backdrop-blur-sm"
            style={{
              backgroundColor: item.category === 'craft' ? 'hsl(5 75% 45% / 0.9)' :
                              item.category === 'performance' ? 'hsl(38 70% 55% / 0.9)' :
                              item.category === 'folk' ? 'hsl(160 35% 40% / 0.9)' :
                              'hsl(5 75% 45% / 0.9)'
            }}
            data-semtag-id="panorama.overlay.category"
            data-semtag-role="observable"
            data-semtag-state="heritage.category"
          >
            {category.name}
          </span>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2
            className="font-serif text-2xl font-bold text-foreground mb-1"
            data-semtag-id="panorama.overlay.title"
            data-semtag-role="observable"
            data-semtag-state="heritage.title"
          >
            {item.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {item.titleEn}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {item.province} · {item.region}
            </span>
            {item.year && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {item.year}年入选
              </span>
            )}
          </div>
          
          <p className="text-foreground/80 leading-relaxed mb-6">
            {item.description}
          </p>
          
          {/* Thumbnail gallery */}
          <div className="flex gap-2 mb-6">
            {item.images.slice(0, 3).map((image, index) => (
              <div 
                key={index}
                className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={image}
                  alt={`${item.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=200';
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to={`/heritage/${item.id}`}
              className="btn-heritage"
              data-semtag-id="panorama.overlay.detail"
              data-semtag-role="navigation"
              data-semtag-target="heritage.detail"
            >
              查看详情
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-md font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-semtag-id="panorama.overlay.continue"
              data-semtag-role="action"
              data-semtag-action="close-overlay"
            >
              继续探索
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HeritageOverlay;
