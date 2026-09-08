import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-ink">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, hsl(5 75% 35% / 0.4) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, hsl(38 70% 45% / 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, hsl(160 35% 30% / 0.2) 0%, transparent 60%)
            `,
          }}
        />
        {/* Decorative pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Traditional seal icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-primary/20 border-2 border-primary/40 mb-8">
            <span className="font-serif text-3xl text-primary-foreground">遗</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            华夏非物质
            <br />
            <span className="text-gradient-gold">文化遗产</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            沉浸式探索中国千年传承的文化瑰宝
            <br />
            感受传统工艺、民俗活动与表演艺术的独特魅力
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/?view=panorama"
              className="btn-heritage text-lg px-8 py-4"
              data-semtag-id="hero.explore"
              data-semtag-role="navigation"
              data-semtag-target="panorama.view"
            >
              进入全景探索
            </Link>
            <a
              href="#categories"
              className="px-8 py-4 rounded-md font-medium text-primary-foreground/80 hover:text-primary-foreground border border-primary-foreground/30 hover:border-primary-foreground/50 transition-all"
              data-semtag-id="hero.browse"
              data-semtag-role="navigation"
              data-semtag-target="home.categories"
            >
              浏览项目列表
            </a>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          data-semtag-id="hero.stats"
          data-semtag-role="collection"
        >
          {[
            { key: 'world-heritage', value: '43', label: '世界级遗产' },
            { key: 'national-projects', value: '1557', label: '国家级项目' },
            { key: 'provinces-covered', value: '34', label: '省市覆盖' },
            { key: 'category-count', value: '10+', label: '门类分类' },
          ].map((stat) => (
            <div
              key={stat.key}
              className="text-center"
              data-semtag-id={`hero.stats.item.${stat.key}`}
              data-semtag-role="observable"
              data-semtag-state={`stats.${stat.key}`}
            >
              <p className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
