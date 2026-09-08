const Footer = () => {
  return (
    <footer className="bg-ink py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-lg">遗</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                  华夏非遗
                </h3>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/60 max-w-xs">
              致力于保护和传承中国非物质文化遗产，让千年文化在数字时代焕发新的生机。
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold text-primary-foreground mb-4">
              探索分类
            </h4>
            <ul className="space-y-2" data-semtag-id="footer.categories" data-semtag-role="collection">
              {[
                { key: 'craft', label: '传统工艺' },
                { key: 'performance', label: '传统表演' },
                { key: 'folk', label: '民俗活动' },
                { key: 'art', label: '传统美术' },
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href="#categories"
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    data-semtag-id={`footer.categories.item.${item.key}`}
                    data-semtag-role="navigation"
                    data-semtag-target="home.categories"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-semibold text-primary-foreground mb-4">
              了解更多
            </h4>
            <ul className="space-y-2" data-semtag-id="footer.links" data-semtag-role="collection">
              {[
                { key: 'about', label: '关于我们' },
                { key: 'guide', label: '使用指南' },
                { key: 'contact', label: '联系方式' },
                { key: 'copyright', label: '版权声明' },
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    data-semtag-id={`footer.links.item.${item.key}`}
                    data-semtag-role="navigation"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © 2024 华夏非遗. 保护传承，让文化永续流传。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
