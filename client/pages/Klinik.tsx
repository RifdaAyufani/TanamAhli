import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export default function Klinik() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Klinik Tanaman
          </h1>

          <p className="text-lg text-foreground/70">
            Layanan konsultasi untuk menyelamatkan tanaman kesayangan kamu.
          </p>

          <p className="text-base text-foreground/60 max-w-lg mx-auto">
            Halaman ini sedang dikembangkan. Beritahu kami apa yang ingin kamu
            lihat di fitur Klinik kami!
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
