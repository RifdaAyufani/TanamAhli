import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCard {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  description?: string;
}

export default function Shop() {
  const navigate = useNavigate();

  const categories: CategoryCard[] = [
    {
      id: "low-light",
      title: "Untuk Kamar Remang",
      image:
        "https://images.pexels.com/photos/2317542/pexels-photo-2317542.jpeg",
      imageAlt: "Ruangan cozy dengan cahaya lembut dan tanaman indah",
      description: "Tanaman yang tumbuh sempurna di cahaya rendah",
    },
    {
      id: "pet-safe",
      title: "Aman untuk Peliharaan",
      image:
        "https://images.pexels.com/photos/27278702/pexels-photo-27278702.jpeg",
      imageAlt: "Kucing yang aman bersama tanaman ramah hewan",
      description: "Tanaman non-toxic yang aman untuk pet",
    },
    {
      id: "easy-care",
      title: "Untuk si Pelupa (Perawatan Mudah)",
      image:
        "https://images.pexels.com/photos/14142822/pexels-photo-14142822.jpeg",
      imageAlt: "Tanaman kaktus dan sukulent yang tahan lama",
      description: "Tanaman hardy yang membutuhkan sedikit perawatan",
    },
    {
      id: "air-purifier",
      title: "Pembersih Udara Alami",
      image:
        "https://images.pexels.com/photos/22610781/pexels-photo-22610781.jpeg",
      imageAlt: "Tanaman dengan daun lebar yang menyegarkan udara",
      description: "Tanaman yang memurnikan udara secara alami",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Banner - Quiz CTA */}
      <section className="px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Masih bingung harus mulai dari mana?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Kami punya kuis interaktif untuk membantu kamu menemukan tanaman
              yang sempurna!
            </p>
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold inline-flex items-center gap-2"
              onClick={() => navigate("/klinik")}
            >
              Mulai Kuis Tanaman
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="flex-1 px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Cari Berdasarkan Kebutuhanmu
            </h1>
            <p className="text-lg text-foreground/60">
              Pilih kategori yang sesuai dengan kondisi rumah dan gaya hidupmu
            </p>
          </div>

          {/* Category Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-left flex flex-col h-full bg-background"
              >
                {/* Image Section */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden bg-muted">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-sm md:text-base text-foreground/60">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* CTA Indicator */}
                  <div className="flex items-center gap-2 text-primary font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Lihat Koleksi</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-muted/30 border-t border-border px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Butuh Rekomendasi Personal?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Tim ahli kami siap membantu kamu memilih tanaman yang tepat
          </p>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5"
            onClick={() => navigate("/klinik")}
          >
            Konsultasi Gratis
          </Button>
        </div>
      </section>
    </div>
  );
}
