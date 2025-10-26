import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Shop Tanaman
          </h1>

          <p className="text-lg text-foreground/70">
            Temukan tanaman impian kamu dari pilihan terbaik kami.
          </p>

          <p className="text-base text-foreground/60 max-w-lg mx-auto">
            Halaman ini sedang dikembangkan. Beritahu kami jenis tanaman apa
            yang ingin kamu lihat!
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => navigate("/")}
              className="h-12 px-8 text-base font-semibold"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
