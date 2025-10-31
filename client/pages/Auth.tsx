import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

type AuthMode = "login" | "signup";

interface LoginForm {
  email: string;
  password: string;
}

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export default function Auth() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useCart();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        toast.success("Selamat datang kembali!", {
          description: `Login berhasil untuk ${loginForm.email}`,
        });
        navigate("/");
        setIsLoading(false);
      } else {
        toast.error("Mohon isi semua kolom");
        setIsLoading(false);
      }
    }, 800);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (signUpForm.name && signUpForm.email && signUpForm.password) {
        if (signUpForm.password.length < 6) {
          toast.error("Password minimal 6 karakter");
          setIsLoading(false);
          return;
        }
        toast.success("Akun berhasil dibuat!", {
          description: `Selamat datang ${signUpForm.name}!`,
        });
        navigate("/");
        setIsLoading(false);
      } else {
        toast.error("Mohon isi semua kolom");
        setIsLoading(false);
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    toast.info("Google login coming soon!", {
      description: "Fitur ini sedang dalam pengembangan",
    });
  };

  const handleForgotPassword = () => {
    toast.info("Lupa Password", {
      description: "Fitur reset password akan segera hadir",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Tanamahli
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-background border border-border/50 rounded-2xl p-8 shadow-lg">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">
            Selamat Datang!
          </h1>
          <p className="text-center text-foreground/60 mb-8">
            {mode === "login"
              ? "Masuk ke akunmu untuk melanjutkan"
              : "Buat akun baru untuk memulai perjalanan hijau"}
          </p>

          {/* Toggle Tabs */}
          <div className="flex gap-4 mb-8 bg-muted/30 p-1 rounded-lg">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                mode === "login"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Daftar
            </button>
          </div>

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="kamu@example.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Forgot Password Link */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Lupa Password?
              </button>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold mt-6"
              >
                {isLoading ? "Sedang Masuk..." : "Masuk"}
              </Button>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === "signup" && (
            <form onSubmit={handleSignUpSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Nama
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nama lengkapmu"
                  value={signUpForm.name}
                  onChange={handleSignUpChange}
                  className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="kamu@example.com"
                  value={signUpForm.email}
                  onChange={handleSignUpChange}
                  className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={signUpForm.password}
                  onChange={handleSignUpChange}
                  className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold mt-6"
              >
                {isLoading ? "Sedang Membuat Akun..." : "Buat Akun"}
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-xs font-semibold text-foreground/50 uppercase">
              Atau
            </span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-2 border-primary text-primary hover:bg-primary/5"
            onClick={handleGoogleLogin}
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Lanjutkan dengan Google
          </Button>

          {/* Terms */}
          <p className="text-xs text-foreground/60 text-center mt-8">
            Dengan masuk atau mendaftar, kamu menyetujui{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Syarat Layanan
            </a>{" "}
            dan{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Kebijakan Privasi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
