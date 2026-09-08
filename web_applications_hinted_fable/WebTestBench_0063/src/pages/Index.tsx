import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HeritageListing from '@/components/HeritageListing';
import PanoramaViewer from '@/components/PanoramaViewer';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchParams] = useSearchParams();
  const showPanorama = searchParams.get('view') === 'panorama';

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showPanorama]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {showPanorama ? (
            <motion.div
              key="panorama"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Panorama Section */}
              <section className="container mx-auto px-4 py-8">
                <div className="mb-6">
                  <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                    全景探索
                  </h1>
                  <p className="text-muted-foreground">
                    拖拽旋转场景，点击热点了解非遗项目
                  </p>
                </div>
                <PanoramaViewer />
              </section>
              
              <HeritageListing />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection />
              <HeritageListing />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
