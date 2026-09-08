import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForum } from "@/context/ForumContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useForum();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const success = register(username, email, password);
    if (success) {
      toast.success("Account created! Welcome to ThreadHive!");
      navigate("/");
    } else {
      toast.error("Username or email already exists");
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
            Join the Hive
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Create an account to start discussing
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-semtag-id="register.form"
            data-semtag-role="region"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="cooluser123"
                data-semtag-id="register.username"
                data-semtag-role="input"
                data-semtag-state="register.username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                data-semtag-id="register.email"
                data-semtag-role="input"
                data-semtag-state="register.email"
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
                data-semtag-id="register.password"
                data-semtag-role="input"
                data-semtag-state="register.password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              data-semtag-id="register.submit"
              data-semtag-role="action"
              data-semtag-action="create-account"
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
              data-semtag-id="nav.login"
              data-semtag-role="navigation"
              data-semtag-target="login.page"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
