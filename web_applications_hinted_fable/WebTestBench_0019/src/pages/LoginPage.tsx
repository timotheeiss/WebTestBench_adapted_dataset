import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForum } from "@/context/ForumContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useForum();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const success = login(email, password);
    if (success) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid credentials. Try: tech@example.com");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-8"
          data-semtag-id="nav.home"
          data-semtag-role="navigation"
          data-semtag-target="home.page"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-warm">
            <MessageCircle className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-2xl font-bold">
            Thread<span className="text-gradient">Hive</span>
          </span>
        </Link>

        <div className="rounded-xl border bg-card p-6 shadow-medium animate-scale-in">
          <h1 className="font-heading text-2xl font-bold text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Sign in to continue the conversation
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-semtag-id="login.form"
            data-semtag-role="region"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                data-semtag-id="login.email"
                data-semtag-role="input"
                data-semtag-state="login.email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                data-semtag-id="login.password"
                data-semtag-role="input"
                data-semtag-state="login.password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              data-semtag-id="login.submit"
              data-semtag-role="action"
              data-semtag-action="sign-in"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Demo accounts: tech@example.com, gamer@example.com
          </p>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
              data-semtag-id="nav.register"
              data-semtag-role="navigation"
              data-semtag-target="register.page"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
