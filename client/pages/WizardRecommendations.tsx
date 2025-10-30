import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  ChevronLeft,
  CheckCircle,
  Sun,
  Cloud,
  Droplets,
  Heart,
} from "lucide-react";

interface PlantRecommendation {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  lightRequirement: "bright" | "medium" | "low";
  waterFrequency: "rare" | "occasional" | "regular";
  petSafe: boolean;
  reasons: string[];
}

const allPlants: PlantRecommendation[] = [
  {
    id: "pothos",
    name: "Pothos (Ekor Kucing)",
    price: "Rp 65.000",
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
    description:
      "Tanaman merambat yang mudah dirawat dan cocok untuk berbagai kondisi cahaya.",
    lightRequirement: "low",
    waterFrequency: "rare",
    petSafe: false,
    reasons: ["Dapat tumbuh di cahaya rendah", "Sangat mudah dirawat untuk pemula"],
  },
  {
    id: "snake-plant",
    name: "Snake Plant (Lidah Mertua)",
    price: "Rp 85.000",
    image: "https://images.pexels.com/photos/3916857/pexels-photo-3916857.jpeg",
    description: "Tanaman tahan lama yang dapat bertahan dengan minimal perawatan.",
    lightRequirement: "medium",
    waterFrequency: "rare",
    petSafe: false,
    reasons: ["Sangat tahan lama", "Cocok untuk yang pelupa", "Pembersih udara"],
  },
  {
    id: "peace-lily",
    name: "Peace Lily (Spathiphyllum)",
    price: "Rp 120.000",
    image: "https://images.pexels.com/photos/5632635/pexels-photo-5632635.jpeg",
    description:
      "Tanaman elegan yang menyukai kelembaban dan memberikan sinyal ketika membutuhkan air.",
    lightRequirement: "low",
    waterFrequency: "regular",
    petSafe: false,
    reasons: ["Sempurna untuk kamar mandi", "Menyukai kelembaban", "Pembersih udara"],
  },
  {
    id: "spider-plant",
    name: "Spider Plant (Laba-laba Tanaman)",
    price: "Rp 70.000",
    image: "https://images.pexels.com/photos/3692746/pexels-photo-3692746.jpeg",
    description: "Tanaman yang aman untuk hewan peliharaan dan sangat mudah tumbuh.",
    lightRequirement: "bright",
    waterFrequency: "occasional",
    petSafe: true,
    reasons: ["100% aman untuk hewan peliharaan", "Mudah dirawat", "Tumbuh cepat"],
  },
  {
    id: "zz-plant",
    name: "ZZ Plant",
    price: "Rp 110.000",
    image: "https://images.pexels.com/photos/5730589/pexels-photo-5730589.jpeg",
    description: "Tanaman yang sangat tahan terhadap kondisi apapun.",
    lightRequirement: "medium",
    waterFrequency: "rare",
    petSafe: false,
    reasons: ["Ekstrem tangguh dan tahan lama", "Cocok untuk pemula", "Pembersih udara"],
  },
  {
    id: "parlor-palm",
    name: "Parlor Palm (Palem Hias)",
    price: "Rp 150.000",
    image: "https://images.pexels.com/photos/4552286/pexels-photo-4552286.jpeg",
    description:
      "Tanaman palem yang elegan untuk menambah suasana tropis di rumah.",
    lightRequirement: "medium",
    waterFrequency: "occasional",
    petSafe: true,
    reasons: ["Aman untuk hewan peliharaan", "Pembersih udara alami", "Daun besar"],
  },
  {
    id: "polka-dot",
    name: "Polka Dot Plant",
    price: "Rp 75.000",
    image: "https://images.pexels.com/photos/4588631/pexels-photo-4588631.jpeg",
    description: "Tanaman dengan daun berwarna-warni yang aman untuk hewan.",
    lightRequirement: "medium",
    waterFrequency: "regular",
    petSafe: true,
    reasons: ["Aman untuk kucing dan anjing", "Daun indah dan berwarna", "Perawatan konsisten"],
  },
  {
    id: "calathea",
    name: "Calathea (Tanaman Doa)",
    price: "Rp 130.000",
    image: "https://images.pexels.com/photos/5731425/pexels-photo-5731425.jpeg",
    description: "Tanaman eksotis yang menyukai kelembaban dan cahaya indirecta.",
    lightRequirement: "medium",
    waterFrequency: "regular",
    petSafe: true,
    reasons: [
      "Aman untuk semua hewan",
      "Sempurna untuk kamar mandi yang lembab",
      "Daun unik dan menarik",
    ],
  },
  {
    id: "monstera",
    name: "Monstera Deliciosa",
    price: "Rp 150.000",
    image: "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
    description: "Tanaman populer dengan daun besar yang mengesankan.",
    lightRequirement: "bright",
    waterFrequency: "occasional",
    petSafe: false,
    reasons: ["Daun besar yang mengesankan", "Cocok cahaya terang", "Mudah dirawat"],
  },
  {
    id: "dracaena",
    name: "Dracaena (Pohon Naga)",
    price: "Rp 100.000",
    image: "https://images.pexels.com/photos/5731427/pexels-photo-5731427.jpeg",
    description: "Tanaman yang tahan terhadap berbagai kondisi pencahayaan.",
    lightRequirement: "low",
    waterFrequency: "rare",
    petSafe: false,
    reasons: ["Sangat mudah dirawat", "Tahan cahaya rendah", "Pembersih udara"],
  },
  {
    id: "bamboo-palm",
    name: "Bamboo Palm",
    price: "Rp 140.000",
    image: "https://images.pexels.com/photos/4552287/pexels-photo-4552287.jpeg",
    description: "Tanaman palem yang aman untuk hewan dan menyegarkan udara.",
    lightRequirement: "bright",
    waterFrequency: "occasional",
    petSafe: true,
    reasons: ["Aman untuk peliharaan", "Pembersih udara terbaik", "Daun tropis"],
  },
  {
    id: "rubber-plant",
    name: "Rubber Plant (Ficus Elastica)",
    price: "Rp 125.000",
    image: "https://images.pexels.com/photos/5731437/pexels-photo-5731437.jpeg",
    description: "Tanaman dengan daun besar mengkilap yang mengesankan.",
    lightRequirement: "bright",
    waterFrequency: "occasional",
    petSafe: false,
    reasons: ["Daun besar yang elegan", "Cocok untuk ruangan cerah", "Pembersih udara"],
  },
];

function calculateMatchScore(
  plant: PlantRecommendation,
  location: string,
  care: string,
  pet: string
): number {
  let score = 0;

  // Light requirement matching
  if (location === "bright-window") {
    if (plant.lightRequirement === "bright") score += 30;
    else if (plant.lightRequirement === "medium") score += 15;
    else score += 5;
  } else if (location === "desk") {
    if (plant.lightRequirement === "low") score += 30;
    else if (plant.lightRequirement === "medium") score += 15;
    else score += 5;
  } else if (location === "bathroom") {
    // Bathroom = humid + low-medium light
    if (plant.lightRequirement === "low" || plant.lightRequirement === "medium") score += 25;
    // Prefer plants that like regular watering (humid bathroom)
    if (plant.waterFrequency === "regular") score += 20;
    else score += 5;
  }

  // Care frequency matching
  if (care === "forgetful") {
    if (plant.waterFrequency === "rare") score += 25;
    else if (plant.waterFrequency === "occasional") score += 15;
    else score += 5;
  } else if (care === "consistent") {
    if (plant.waterFrequency === "regular") score += 25;
    else if (plant.waterFrequency === "occasional") score += 15;
    else score += 5;
  }

  // Pet safety matching
  if (pet === "yes-pets") {
    if (plant.petSafe) score += 20;
    else score -= 50; // Strongly disfavor toxic plants for pet owners
  } else {
    // no-pets: pet-safe plants are nice bonus
    if (plant.petSafe) score += 5;
  }

  return score;
}

function RecommendationCard({
  plant,
  reasons,
}: {
  plant: PlantRecommendation;
  reasons: string[];
}) {
  const handleAddToCart = () => {
    alert(`${plant.name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-64 overflow-hidden bg-muted">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{plant.name}</h3>
        <p className="text-primary font-semibold text-lg mb-4">{plant.price}</p>
        <p className="text-foreground/70 text-base mb-6">{plant.description}</p>

        {/* Reasons */}
        <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/10">
          <p className="text-sm font-semibold text-primary mb-3">Kenapa cocok untuk kamu:</p>
          <ul className="space-y-2">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-foreground/80 text-sm">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          size="lg"
          className="w-full h-12"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Tambah ke Keranjang
        </Button>
      </div>
    </div>
  );
}

export default function WizardRecommendations() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const location = searchParams.get("location") || "bright-window";
  const care = searchParams.get("care") || "consistent";
  const pet = searchParams.get("pet") || "no-pets";

  // Calculate scores and get top 3-4 plants
  const scoredPlants = allPlants
    .map((plant) => ({
      plant,
      score: calculateMatchScore(plant, location, care, pet),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const locationLabels: Record<string, string> = {
    "bright-window": "Dekat jendela yang cerah",
    desk: "Di meja kerja (cahaya rendah)",
    bathroom: "Di kamar mandi (lembab)",
  };

  const careLabels: Record<string, string> = {
    forgetful: "Sering lupa menyiram",
    consistent: "Bisa menyiram teratur",
  };

  const petLabels: Record<string, string> = {
    "yes-pets": "Ada hewan peliharaan",
    "no-pets": "Tidak ada hewan peliharaan",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Back Button */}
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate("/wizard")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Mulai Ulang Kuis
        </button>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tanaman Impian Kamu! 🌿
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Berdasarkan preferensimu, kami rekomendasikan 4 tanaman ini:
            </p>

            {/* User Preferences Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Lokasi</p>
                <p className="text-foreground">{locationLabels[location]}</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Perawatan</p>
                <p className="text-foreground">{careLabels[care]}</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Hewan Peliharaan</p>
                <p className="text-foreground">{petLabels[pet]}</p>
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scoredPlants.map(({ plant, score }) => (
              <RecommendationCard
                key={plant.id}
                plant={plant}
                reasons={
                  // Filter reasons based on match
                  plant.reasons.filter((reason) => {
                    if (location === "bathroom" && reason.includes("kamar mandi"))
                      return true;
                    if (location === "desk" && reason.includes("cahaya rendah"))
                      return true;
                    if (care === "forgetful" && reason.includes("mudah"))
                      return true;
                    if (
                      care === "consistent" &&
                      (reason.includes("Perawatan konsisten") ||
                        reason.includes("Sempurna"))
                    )
                      return true;
                    if (pet === "yes-pets" && reason.includes("aman"))
                      return true;
                    if (!reason.includes("kamar mandi") && !reason.includes("cahaya rendah"))
                      return true;
                    return false;
                  })
                }
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-primary/10 border border-primary/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Siap untuk memulai perjalanan hijau?
            </h2>
            <p className="text-foreground/70 mb-6">
              Tambahkan tanaman pilihan ke keranjang dan mulai berkebun!
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/shop")}
            >
              Kembali ke Shop
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
