import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getHeritageById, categories } from '@/data/heritageData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HeritageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = id ? getHeritageById(id) : null;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({});
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Handle image loading
  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);
  
  const handleImageError = useCallback((index: number) => {
    setImageLoadError(prev => ({ ...prev, [index]: true }));
    setIsImageLoading(false);
  }, []);
  
  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [selectedImageIndex]);
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
            未找到该非遗项目
          </h1>
          <Link
            to="/"
            className="btn-heritage"
            data-semtag-id="detail.notfound.home"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }
  
  const category = categories[item.category];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
              data-semtag-id="detail.breadcrumb.home"
              data-semtag-role="navigation"
              data-semtag-target="home.page"
            >
              首页
            </Link>
            <span>/</span>
            <Link
              to="/#categories"
              className="hover:text-foreground transition-colors"
              data-semtag-id="detail.breadcrumb.categories"
              data-semtag-role="navigation"
              data-semtag-target="home.categories"
            >
              非遗项目
            </Link>
            <span>/</span>
            <span className="text-foreground">{item.title}</span>
          </motion.nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-4">
                <AnimatePresence mode="wait">
                  {isImageLoading && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-muted z-10"
                    >
                      <div className="loading-spinner" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {imageLoadError[selectedImageIndex] ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">图片加载失败</p>
                  </div>
                ) : (
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={item.images[selectedImageIndex]}
                    alt={`${item.title} - ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    onError={() => handleImageError(selectedImageIndex)}
                  />
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    data-semtag-id={`detail.gallery.thumb.${index + 1}`}
                    data-semtag-role="action"
                    data-semtag-action="select-image"
                    data-semtag-state={index === selectedImageIndex ? 'selected' : undefined}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      index === selectedImageIndex 
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {imageLoadError[index] ? (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={image}
                        alt={`${item.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(index)}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Category badge */}
              <span 
                className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-primary-foreground mb-4"
                style={{
                  backgroundColor: item.category === 'craft' ? 'hsl(5 75% 45%)' :
                                  item.category === 'performance' ? 'hsl(38 70% 55%)' :
                                  item.category === 'folk' ? 'hsl(160 35% 40%)' :
                                  'hsl(5 75% 45%)'
                }}
                data-semtag-id="detail.category"
                data-semtag-role="observable"
                data-semtag-state="heritage.category"
              >
                {category.name}
              </span>

              <h1
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2"
                data-semtag-id="detail.title"
                data-semtag-role="observable"
                data-semtag-state="heritage.title"
              >
                {item.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {item.titleEn}
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span
                    data-semtag-id="detail.region"
                    data-semtag-role="observable"
                    data-semtag-state="heritage.region"
                  >{item.province} · {item.region}</span>
                </div>
                {item.year && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span
                      data-semtag-id="detail.year"
                      data-semtag-role="observable"
                      data-semtag-state="heritage.year"
                    >{item.year}年入选</span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p
                  className="text-foreground/80 leading-relaxed whitespace-pre-line"
                  data-semtag-id="detail.description"
                  data-semtag-role="observable"
                  data-semtag-state="heritage.description"
                >
                  {item.fullDescription}
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/?view=panorama')}
                  className="btn-heritage"
                  data-semtag-id="detail.back-panorama"
                  data-semtag-role="navigation"
                  data-semtag-target="panorama.view"
                >
                  返回全景探索
                </button>
                <Link
                  to="/#categories"
                  className="px-6 py-3 rounded-md font-medium border border-border text-foreground hover:bg-muted transition-colors"
                  data-semtag-id="detail.browse-more"
                  data-semtag-role="navigation"
                  data-semtag-target="home.categories"
                >
                  浏览更多项目
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HeritageDetail;
