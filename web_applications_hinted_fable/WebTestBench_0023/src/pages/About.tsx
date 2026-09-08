import { Link } from 'react-router-dom';
import { Leaf, Recycle, Heart, Globe, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-sage/20 to-background py-20">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our Mission: A <span className="text-primary">Sustainable</span> Future
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ReVive is more than a marketplace. It's a community dedicated to reducing waste 
            and giving everyday items a second chance at life.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sage/30 blur-3xl" />
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                <Recycle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Reduce Waste</h3>
              <p className="text-muted-foreground">
                Every item bought second-hand is one less item in a landfill. Join us in making a difference.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-warm flex items-center justify-center">
                <Heart className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Support Local</h3>
              <p className="text-muted-foreground">
                Connect with sellers in your community. Build relationships and shop locally.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                <Globe className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Think Global</h3>
              <p className="text-muted-foreground">
                Small actions create big change. Together, we can reduce our collective carbon footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to make a difference?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of others who are choosing sustainable shopping.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link
              to="/"
              data-semtag-id="about.start-browsing"
              data-semtag-role="navigation"
              data-semtag-target="home.page"
            >
              Start Browsing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
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
