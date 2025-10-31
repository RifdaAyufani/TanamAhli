import { useState } from "react";
import PlantCard, { PlantStatus } from "@/components/PlantCard";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Plant {
  id: string;
  nickname: string;
  plantName: string;
  image: string;
  status: PlantStatus;
  careInfo: string;
  lastWatered: string;
  nextWaterIn?: string;
  adoptedDate: string;
}

export default function GarasiSaya() {
  const navigate = useNavigate();

  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "monstera-1",
      nickname: "Jojo si Monstera",
      plantName: "Monstera Deliciosa",
      image:
        "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
      status: "happy",
      careInfo: "Disiram 2 hari lalu. Siram lagi dalam 5 hari.",
      lastWatered: "Disiram 2 hari lalu",
      nextWaterIn: "Siram lagi dalam 5 hari",
      adoptedDate: "15 Januari 2024",
    },
    {
      id: "cactus-1",
      nickname: "Kiki si Kaktus",
      plantName: "Kaktus Mini",
      image:
        "https://images.pexels.com/photos/3873389/pexels-photo-3873389.jpeg",
      status: "needs-attention",
      careInfo: "Terakhir disiram 1 minggu lalu.",
      lastWatered: "Terakhir disiram 1 minggu lalu",
      adoptedDate: "10 Januari 2024",
    },
    {
      id: "spider-plant-1",
      nickname: "Mimi si Spider Plant",
      plantName: "Spider Plant",
      image:
        "https://images.pexels.com/photos/3692746/pexels-photo-3692746.jpeg",
      status: "happy",
      careInfo: "Disiram 3 hari lalu. Siram lagi dalam 4 hari.",
      lastWatered: "Disiram 3 hari lalu",
      nextWaterIn: "Siram lagi dalam 4 hari",
      adoptedDate: "20 Januari 2024",
    },
  ]);

  const handleWaterPlant = (plantId: string) => {
    setPlants(
      plants.map((plant) =>
        plant.id === plantId
          ? {
              ...plant,
              status: "happy" as const,
              lastWatered: "Baru saja disiram",
              nextWaterIn: "Siram lagi dalam 3-5 hari",
            }
          : plant,
      ),
    );

    const plant = plants.find((p) => p.id === plantId);
    toast.success(`${plant?.nickname} sekarang segar dan senang! 🌿`, {
      description: "Terima kasih sudah merawatnya",
    });
  };

  const happyCount = plants.filter((p) => p.status === "happy").length;
  const needsAttentionCount = plants.filter(
    (p) => p.status === "needs-attention",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50 px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/profile")}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Garasi Tanamanku
              </h1>
              <p className="text-lg text-foreground/60 mt-2">
                Lihat dan rawat koleksi tanamanmu yang indah
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-background border border-border/50 rounded-lg p-4">
              <p className="text-sm text-foreground/60 mb-1">Total Tanaman</p>
              <p className="text-3xl font-bold text-foreground">
                {plants.length}
              </p>
            </div>
            <div className="bg-background border border-green-200/50 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium mb-1">
                Sehat & Bahagia
              </p>
              <p className="text-3xl font-bold text-green-600">{happyCount}</p>
            </div>
            <div className="bg-background border border-orange-200/50 rounded-lg p-4">
              <p className="text-sm text-orange-700 font-medium mb-1">
                Butuh Perhatian
              </p>
              <p className="text-3xl font-bold text-orange-600">
                {needsAttentionCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Plant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                id={plant.id}
                nickname={plant.nickname}
                plantName={plant.plantName}
                image={plant.image}
                status={plant.status}
                careInfo={plant.careInfo}
                lastWatered={plant.lastWatered}
                nextWaterIn={plant.nextWaterIn}
                onWater={() => handleWaterPlant(plant.id)}
              />
            ))}
          </div>

          {/* Add Plant CTA */}
          <div className="text-center">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Ingin Menambah Tanaman?
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                Temukan tanaman baru yang sempurna untuk koleksi Anda
              </p>
              <Button
                size="lg"
                className="inline-flex items-center gap-2 h-12 px-8 text-base font-semibold"
                onClick={() => navigate("/shop")}
              >
                <Plus className="w-5 h-5" />
                Cari Tanaman Baru
              </Button>
            </div>
          </div>

          {/* Care Tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                💡 Tips Perawatan
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Siram tanaman sesuai jadwal yang ditunjukkan</li>
                <li>✓ Pastikan tanaman mendapat cahaya yang cukup</li>
                <li>✓ Periksa tanah untuk memastikan tidak terlalu basah</li>
                <li>✓ Berikan pupuk setiap bulan untuk pertumbuhan optimal</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                🌱 Cara Membuat Tanaman Senang
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Berikan air dengan konsisten dan dalam jumlah tepat</li>
                <li>
                  ✓ Hindari paparan langsung sinar matahari yang terlalu panas
                </li>
                <li>✓ Bersihkan daun dari debu setiap 2 minggu</li>
                <li>✓ Putar tanaman untuk pertumbuhan yang merata</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
