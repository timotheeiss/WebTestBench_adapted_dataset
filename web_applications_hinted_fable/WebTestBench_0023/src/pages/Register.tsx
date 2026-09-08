import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useApp();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const success = register(name, email, password, location);
    
    if (success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error('An account with this email already exists');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold">ReVive</span>
          </Link>
          <h1 className="font-display text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2">Join our sustainable marketplace</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <form
            onSubmit={handleSubmit}
            data-semtag-id="register.form"
            data-semtag-role="region"
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-semtag-id="register.name"
                  data-semtag-role="input"
                  data-semtag-state="register.name"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-semtag-id="register.email"
                  data-semtag-role="input"
                  data-semtag-state="register.email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-semtag-id="register.password"
                  data-semtag-role="input"
                  data-semtag-state="register.password"
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  data-semtag-id="register.location"
                  data-semtag-role="input"
                  data-semtag-state="register.location"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={isLoading}
              data-semtag-id="register.submit"
              data-semtag-role="action"
              data-semtag-action="create-account"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                data-semtag-id="register.login"
                data-semtag-role="navigation"
                data-semtag-target="login.page"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
