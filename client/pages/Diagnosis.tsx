import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingCart, ChevronLeft } from "lucide-react";

interface DiagnosisData {
  id: string;
  title: string;
  diagnosis: string;
  description: string;
  solutions: string[];
  product: {
    name: string;
    price: string;
    description: string;
  };
}

export default function Diagnosis() {
  const { symptomId } = useParams();
  const navigate = useNavigate();

  const diagnosisMap: Record<string, DiagnosisData> = {
    yellowing: {
      id: "yellowing",
      title: "Daun Menguning",
      diagnosis: "Kelebihan Air",
      description:
        "Ini adalah masalah paling umum! Akar tanamanmu mungkin terendam air terlalu lama.",
      solutions: [
        "Hentikan penyiraman selama 1 minggu.",
        "Pastikan lubang di bawah pot tidak tersumbat.",
        "Pindahkan ke tempat yang sedikit lebih terang.",
      ],
      product: {
        name: "Media Tanam Baru yang Lebih Porous",
        price: "Rp 35.000",
        description: "Media tanam berkualitas tinggi dengan drainase sempurna",
      },
    },
    pests: {
      id: "pests",
      title: "Ada Hama/Serangga",
      diagnosis: "Serangan Hama",
      description:
        "Tanamanmu diserang oleh serangga pemakan daun. Ini bisa diatasi dengan perawatan yang tepat.",
      solutions: [
        "Isolasi tanaman dari tanaman lain untuk mencegah penyebaran.",
        "Semprotkan dengan air sabun setiap hari selama 1 minggu.",
        "Periksa bagian belakang daun secara berkala.",
      ],
      product: {
        name: "Pestisida Organik Natural",
        price: "Rp 45.000",
        description: "Pestisida alami yang aman untuk tanaman dan keluarga",
      },
    },
    wilting: {
      id: "wilting",
      title: "Layu / Terkulai",
      diagnosis: "Kekurangan Air atau Akar Membusuk",
      description:
        "Tanaman terlihat lemas, ini bisa karena kekurangan air atau akar yang tidak sehat.",
      solutions: [
        "Siram tanaman secara perlahan hingga media tanam basah menyeluruh.",
        "Letakkan di tempat dengan cahaya terang tidak langsung.",
        "Hindari menyiram terlalu sering sampai tanah mengering sedikit.",
      ],
      product: {
        name: "Pot Terracotta dengan Drainage Hole",
        price: "Rp 28.000",
        description: "Pot berkualitas dengan lubang drainase untuk sirkulasi air optimal",
      },
    },
    "brown-spots": {
      id: "brown-spots",
      title: "Bercak Coklat",
      diagnosis: "Penyakit Jamur atau Bakteri",
      description:
        "Bercak coklat biasanya disebabkan oleh kelembaban tinggi atau bakteri.",
      solutions: [
        "Buang daun yang terinfeksi untuk mencegah penyebaran.",
        "Kurangi frekuensi penyiraman dan hindari menyiram daun.",
        "Tingkatkan ventilasi dan pindahkan ke tempat yang lebih terang dan kering.",
      ],
      product: {
        name: "Fungisida Alami Sulfur Dust",
        price: "Rp 52.000",
        description: "Fungisida alami untuk mencegah dan mengatasi penyakit jamur",
      },
    },
  };

  const data = diagnosisMap[symptomId || ""] || diagnosisMap.yellowing;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Back Button */}
      <div className="px-4 py-4 md:py-6">
        <button
          onClick={() => navigate("/klinik")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali Cek Gejala Lain
        </button>
      </div>

      <section className="flex-1 flex flex-col px-4 py-8 md:py-12">
        <div className="w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Oke, ini kemungkinan diagnosisnya...
            </h1>
            <p className="text-foreground/60">
              Gejala: {data.title}
            </p>
          </div>

          {/* Diagnosis Card */}
          <div className="bg-white border-2 border-primary/20 rounded-xl p-6 md:p-8 mb-8 md:mb-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Kemungkinan: {data.diagnosis}
                </h2>
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="mb-8 md:mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Solusi Cepat:</h3>
            <div className="space-y-4">
              {data.solutions.map((solution, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm md:text-base">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-foreground/70 text-base md:text-lg pt-1">
                    {solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Cross-Sell */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Produk Terkait:
            </h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {data.product.name}
                </h4>
                <p className="text-foreground/60 mb-3">
                  {data.product.description}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {data.product.price}
                </p>
              </div>
              <Button
                size="lg"
                className="h-12 px-8 text-base font-semibold whitespace-nowrap flex items-center gap-2"
                onClick={() => navigate("/shop")}
              >
                <ShoppingCart className="w-5 h-5" />
                Beli Sekarang
              </Button>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-12 p-6 md:p-8 bg-muted/40 rounded-lg text-center">
            <p className="text-foreground/70 mb-4">
              Masih bingung atau tanamanmu tidak membaik?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-2 border-primary text-primary hover:bg-primary/5"
            >
              Hubungi Tim Ahli Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
