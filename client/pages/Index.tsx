import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf, Zap, Heart } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-4xl">
          {/* Decorative elements */}
          <div className="absolute top-20 left-5 md:left-20 w-12 h-12 md:w-16 md:h-16 text-primary/20">
            <Leaf className="w-full h-full" />
          </div>
          <div className="absolute bottom-40 right-5 md:right-20 w-10 h-10 md:w-14 md:h-14 text-primary/10 rotate-45">
            <Leaf className="w-full h-full" />
          </div>

          {/* Content */}
          <div className="relative text-center space-y-6">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Teman Hijau <span className="text-primary">Pertamamu</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Kami bantu kamu merawat, bukan hanya membeli.
            </p>

            {/* CTA Buttons - Side by side on desktop */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              {/* Primary CTA */}
              <Button
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                onClick={() => navigate("/shop")}
              >
                Bantu Saya Pilih Tanaman
              </Button>

              {/* Secondary CTA */}
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary/5 transition-all"
                onClick={() => navigate("/klinik")}
              >
                Tanaman Saya Bermasalah?
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 pt-12 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span>Dipercaya oleh ribuan pemilik tanaman</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Respon cepat 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Optional preview */}
      <section className="bg-muted/30 border-t border-border py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Bagaimana Tanamahli Membantu Kamu?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background rounded-lg p-6 text-center border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Pilihan Tanaman
              </h3>
              <p className="text-sm text-foreground/60">
                Temukan tanaman yang sempurna untuk ruang dan kemampuan kamu.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background rounded-lg p-6 text-center border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Panduan Perawatan
              </h3>
              <p className="text-sm text-foreground/60">
                Dapatkan tips ahli dan panduan langkah demi langkah untuk setiap
                tanaman.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background rounded-lg p-6 text-center border border-border/50 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Dukungan Ahli
              </h3>
              <p className="text-sm text-foreground/60">
                Tanya jawab dengan ahli tanaman kami kapan saja kamu
                membutuhkan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
