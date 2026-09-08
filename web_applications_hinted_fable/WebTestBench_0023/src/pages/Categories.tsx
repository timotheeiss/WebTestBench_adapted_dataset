import { Link, useNavigate } from 'react-router-dom';
import { Armchair, Shirt, Smartphone, Lamp, BookOpen, Dumbbell, Gamepad2, Package, Leaf } from 'lucide-react';
import { Header } from '@/components/Header';
import { categories } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const iconMap: Record<string, React.ElementType> = {
  Armchair,
  Shirt,
  Smartphone,
  Lamp,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Package
};

export default function Categories() {
  const navigate = useNavigate();
  const { products } = useApp();

  const getCategoryCount = (categoryValue: string) => {
    return products.filter(p => p.category === categoryValue && p.isAvailable).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Browse Categories</h1>
          <p className="text-muted-foreground text-lg">Find exactly what you're looking for</p>
        </div>

        <div
          data-semtag-id="categories.grid"
          data-semtag-role="collection"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Package;
            const count = getCategoryCount(category.value);

            return (
              <button
                key={category.value}
                onClick={() => navigate(`/?category=${category.value}`)}
                data-semtag-id={`categories.grid.item.${category.value}`}
                data-semtag-role="navigation"
                data-semtag-target="home.browse"
                className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-warm transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display font-semibold mb-1">{category.label}</h3>
                <p
                  data-semtag-id={`categories.grid.item.${category.value}.count`}
                  data-semtag-role="observable"
                  data-semtag-state="category.count"
                  className="text-sm text-muted-foreground"
                >
                  {count} items
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 mt-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">ReVive</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ReVive Marketplace. Giving items a second chance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
