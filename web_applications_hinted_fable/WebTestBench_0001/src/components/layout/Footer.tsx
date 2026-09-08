import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4" data-semtag-id="footer.home" data-semtag-role="navigation" data-semtag-target="home.page">
              <span className="font-display text-xl font-bold text-foreground">
                Curated<span className="text-primary">Picks</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Hand-picked product recommendations across tech, home, and fitness. 
              Every item is personally tested and reviewed to help you make informed decisions.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-foreground">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/tech" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-semtag-id="footer.category.tech" data-semtag-role="navigation" data-semtag-target="category.tech">
                  Tech Gadgets
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-semtag-id="footer.category.home" data-semtag-role="navigation" data-semtag-target="category.home">
                  Home Goods
                </Link>
              </li>
              <li>
                <Link to="/category/fitness" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-semtag-id="footer.category.fitness" data-semtag-role="navigation" data-semtag-target="category.fitness">
                  Fitness
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-semtag-id="footer.products" data-semtag-role="navigation" data-semtag-target="products.page">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-semtag-id="footer.admin" data-semtag-role="navigation" data-semtag-target="admin.page">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CuratedPicks. Affiliate links may earn us a commission.
          </p>
        </div>
      </div>
    </footer>
  );
};
