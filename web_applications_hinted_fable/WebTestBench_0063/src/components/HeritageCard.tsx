import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeritageItem, categories } from '@/data/heritageData';

interface HeritageCardProps {
  item: HeritageItem;
  index: number;
}

const HeritageCard = ({ item, index }: HeritageCardProps) => {
  const category = categories[item.category];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="heritage-card group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        
        {/* Category badge */}
        <span 
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-${category.color}/90 text-primary-foreground backdrop-blur-sm`}
          style={{
            backgroundColor: item.category === 'craft' ? 'hsl(5 75% 45% / 0.9)' :
                            item.category === 'performance' ? 'hsl(38 70% 55% / 0.9)' :
                            item.category === 'folk' ? 'hsl(160 35% 40% / 0.9)' :
                            'hsl(5 75% 45% / 0.9)'
          }}
          data-semtag-id={`listing.grid.item.${item.id}.category`}
          data-semtag-role="observable"
          data-semtag-state="heritage.category"
        >
          {category.name}
        </span>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className="font-serif text-xl font-semibold text-white mb-1"
            data-semtag-id={`listing.grid.item.${item.id}`}
            data-semtag-role="observable"
            data-semtag-state="heritage.title"
          >
            {item.title}
          </h3>
          <p className="text-sm text-white/80">
            {item.titleEn}
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span
            data-semtag-id={`listing.grid.item.${item.id}.region`}
            data-semtag-role="observable"
            data-semtag-state="heritage.region"
          >{item.province} · {item.region}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>

        <Link
          to={`/heritage/${item.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          data-semtag-id={`listing.grid.item.${item.id}.open`}
          data-semtag-role="navigation"
          data-semtag-target="heritage.detail"
        >
          了解详情
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default HeritageCard;
