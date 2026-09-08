import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-primary/20 border-2 border-primary/40 mb-8">
          <span className="font-serif text-3xl text-primary-foreground">404</span>
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
          页面未找到
        </h1>
        <p className="text-primary-foreground/60 mb-8 max-w-md">
          抱歉，您访问的页面不存在。可能已被移除或链接有误。
        </p>
        
        <Link
          to="/"
          className="btn-heritage"
          data-semtag-id="notfound.home"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
        >
          返回首页
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
