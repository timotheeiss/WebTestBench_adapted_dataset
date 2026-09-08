import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          data-semtag-id="nav.logo"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-lg">遗</span>
          </div>
          <div>
            <h1 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              华夏非遗
            </h1>
            <p className="text-xs text-muted-foreground">
              Chinese Intangible Heritage
            </p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-semtag-id="nav.home"
            data-semtag-role="navigation"
            data-semtag-target="home.page"
          >
            首页
          </Link>
          <Link
            to="/?view=panorama"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-semtag-id="nav.panorama"
            data-semtag-role="navigation"
            data-semtag-target="panorama.view"
          >
            全景探索
          </Link>
          <a
            href="#categories"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-semtag-id="nav.categories"
            data-semtag-role="navigation"
            data-semtag-target="home.categories"
          >
            分类浏览
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link
            to="/?view=panorama"
            className="btn-heritage text-sm"
            data-semtag-id="nav.explore"
            data-semtag-role="navigation"
            data-semtag-target="panorama.view"
          >
            开始探索
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
