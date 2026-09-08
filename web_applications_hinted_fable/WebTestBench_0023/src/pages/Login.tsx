import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(email, password);
    
    if (success) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Try: emma@example.com');
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
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <form
            onSubmit={handleSubmit}
            data-semtag-id="login.form"
            data-semtag-role="region"
            className="space-y-4"
          >
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
                  data-semtag-id="login.email"
                  data-semtag-role="input"
                  data-semtag-state="login.email"
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
                  data-semtag-id="login.password"
                  data-semtag-role="input"
                  data-semtag-state="login.password"
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
              data-semtag-id="login.submit"
              data-semtag-role="action"
              data-semtag-action="sign-in"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/register"
                data-semtag-id="login.signup"
                data-semtag-role="navigation"
                data-semtag-target="register.page"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div
            data-semtag-id="login.demo-accounts"
            data-semtag-role="observable"
            data-semtag-state="login.help"
            className="mt-6 p-3 rounded-lg bg-muted text-sm text-muted-foreground"
          >
            <p className="font-medium mb-1">Demo accounts:</p>
            <p>emma@example.com, marcus@example.com, sofia@example.com</p>
            <p className="text-xs mt-1">(any password works)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
