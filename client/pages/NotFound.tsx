import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-primary" />
        </div>

        <div>
          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <p className="text-xl font-semibold text-foreground mb-2">
            Halaman Tidak Ditemukan
          </p>
          <p className="text-base text-foreground/60">
            Sepertinya tanaman ini hilang dari taman kami. Mari kembali ke halaman utama!
          </p>
        </div>

        <Link to="/">
          <Button
            className="w-full h-12 text-base font-semibold rounded-lg"
          >
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
