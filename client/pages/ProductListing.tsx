import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  ChevronLeft,
  Moon,
  Droplets,
  AlertTriangle,
  Wind,
  Leaf,
  Zap,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  careLevel: "sangat-mudah" | "cukup-mudah" | "butuh-perhatian";
  size: "kecil" | "sedang" | "besar";
  features: ("pet-safe" | "air-purifier")[];
  reassuranceTag: {
    icon: React.ReactNode;
    text: string;
  };
}

const categoryProducts: Record<string, Product[]> = {
  "low-light": [
    {
      id: "pothos",
      name: "Pothos (Ekor Kucing)",
      price: "Rp 65.000",
      image:
        "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg",
      careLevel: "sangat-mudah",
      size: "kecil",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Moon className="w-4 h-4" />,
        text: "Suka Tempat Teduh",
      },
    },
    {
      id: "snake-plant",
      name: "Snake Plant (Lidah Mertua)",
      price: "Rp 85.000",
      image:
        "https://images.pexels.com/photos/3916857/pexels-photo-3916857.jpeg",
      careLevel: "sangat-mudah",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Moon className="w-4 h-4" />,
        text: "Tahan di Cahaya Rendah",
      },
    },
    {
      id: "peace-lily",
      name: "Peace Lily (Spathiphyllum)",
      price: "Rp 120.000",
      image:
        "https://images.pexels.com/photos/5632635/pexels-photo-5632635.jpeg",
      careLevel: "cukup-mudah",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Droplets className="w-4 h-4" />,
        text: "Indikator Kekurangan Air",
      },
    },
    {
      id: "zz-plant",
      name: "ZZ Plant",
      price: "Rp 110.000",
      image:
        "https://images.pexels.com/photos/5730589/pexels-photo-5730589.jpeg",
      careLevel: "sangat-mudah",
      size: "besar",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Moon className="w-4 h-4" />,
        text: "Tangguh dan Tahan Lama",
      },
    },
    {
      id: "cast-iron-plant",
      name: "Cast Iron Plant (Aspidistra)",
      price: "Rp 95.000",
      image:
        "https://images.pexels.com/photos/2806832/pexels-photo-2806832.jpeg",
      careLevel: "sangat-mudah",
      size: "sedang",
      features: [],
      reassuranceTag: {
        icon: <Moon className="w-4 h-4" />,
        text: "Paling Tangguh Sekalipun",
      },
    },
    {
      id: "parlor-palm",
      name: "Parlor Palm (Palem Hias)",
      price: "Rp 150.000",
      image:
        "https://images.pexels.com/photos/4552286/pexels-photo-4552286.jpeg",
      careLevel: "cukup-mudah",
      size: "besar",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Leaf className="w-4 h-4" />,
        text: "Pembersih Udara Alami",
      },
    },
  ],
  "pet-safe": [
    {
      id: "spider-plant",
      name: "Spider Plant (Laba-laba Tanaman)",
      price: "Rp 70.000",
      image:
        "https://images.pexels.com/photos/3692746/pexels-photo-3692746.jpeg",
      careLevel: "sangat-mudah",
      size: "kecil",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: "100% Aman untuk Peliharaan",
      },
    },
    {
      id: "polka-dot",
      name: "Polka Dot Plant (Hypoestes)",
      price: "Rp 75.000",
      image:
        "https://images.pexels.com/photos/4588631/pexels-photo-4588631.jpeg",
      careLevel: "cukup-mudah",
      size: "kecil",
      features: [],
      reassuranceTag: {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: "Aman untuk Kucing dan Anjing",
      },
    },
    {
      id: "calathea",
      name: "Calathea (Tanaman Doa)",
      price: "Rp 130.000",
      image:
        "https://images.pexels.com/photos/5731425/pexels-photo-5731425.jpeg",
      careLevel: "butuh-perhatian",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: "Aman untuk Semua Hewan",
      },
    },
    {
      id: "bamboo-palm",
      name: "Bamboo Palm (Chamaedorea)",
      price: "Rp 140.000",
      image:
        "https://images.pexels.com/photos/4552287/pexels-photo-4552287.jpeg",
      careLevel: "cukup-mudah",
      size: "besar",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: "Aman untuk Peliharaan Anda",
      },
    },
    {
      id: "african-violet",
      name: "African Violet",
      price: "Rp 55.000",
      image:
        "https://images.pexels.com/photos/5731419/pexels-photo-5731419.jpeg",
      careLevel: "cukup-mudah",
      size: "kecil",
      features: [],
      reassuranceTag: {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: "Aman untuk Peliharaan",
      },
    },
    {
      id: "prayer-plant",
      name: "Prayer Plant (Maranta)",
      price: "Rp 85.000",
      image:
        "https://images.pexels.com/photos/4588632/pexels-photo-4588632.jpeg",
      careLevel: "cukup-mudah",
      size: "kecil",
      features: [],
      reassuranceTag: {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: "Aman untuk Hewan Peliharaan",
      },
    },
  ],
  "easy-care": [
    {
      id: "succulent-mix",
      name: "Succulent Mix (Sukulen Campur)",
      price: "Rp 45.000",
      image:
        "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg",
      careLevel: "sangat-mudah",
      size: "kecil",
      features: [],
      reassuranceTag: {
        icon: <Zap className="w-4 h-4" />,
        text: "Ideal untuk Pemula",
      },
    },
    {
      id: "aloe-vera",
      name: "Aloe Vera",
      price: "Rp 50.000",
      image:
        "https://images.pexels.com/photos/5731421/pexels-photo-5731421.jpeg",
      careLevel: "sangat-mudah",
      size: "kecil",
      features: [],
      reassuranceTag: {
        icon: <Zap className="w-4 h-4" />,
        text: "Minimal Perawatan",
      },
    },
    {
      id: "cactus",
      name: "Cactus (Kaktus Hias)",
      price: "Rp 60.000",
      image:
        "https://images.pexels.com/photos/3873389/pexels-photo-3873389.jpeg",
      careLevel: "sangat-mudah",
      size: "kecil",
      features: [],
      reassuranceTag: {
        icon: <Zap className="w-4 h-4" />,
        text: "Tahan Lama dan Mudah",
      },
    },
    {
      id: "dracaena",
      name: "Dracaena (Pohon Naga)",
      price: "Rp 100.000",
      image:
        "https://images.pexels.com/photos/5731427/pexels-photo-5731427.jpeg",
      careLevel: "sangat-mudah",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Zap className="w-4 h-4" />,
        text: "Sangat Mudah Dirawat",
      },
    },
    {
      id: "rubber-plant",
      name: "Rubber Plant (Ficus Elastica)",
      price: "Rp 125.000",
      image:
        "https://images.pexels.com/photos/5731437/pexels-photo-5731437.jpeg",
      careLevel: "cukup-mudah",
      size: "besar",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Leaf className="w-4 h-4" />,
        text: "Daun Besar Elegan",
      },
    },
    {
      id: "philodendron",
      name: "Philodendron (Philodendron Hias)",
      price: "Rp 90.000",
      image:
        "https://images.pexels.com/photos/5731433/pexels-photo-5731433.jpeg",
      careLevel: "sangat-mudah",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Zap className="w-4 h-4" />,
        text: "Tumbuh Cepat",
      },
    },
  ],
  "air-purifier": [
    {
      id: "money-plant",
      name: "Money Plant (Tanaman Uang)",
      price: "Rp 80.000",
      image:
        "https://images.pexels.com/photos/5731429/pexels-photo-5731429.jpeg",
      careLevel: "sangat-mudah",
      size: "kecil",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Wind className="w-4 h-4" />,
        text: "Pembersih Udara Aktif",
      },
    },
    {
      id: "areca-palm",
      name: "Areca Palm (Palem Areka)",
      price: "Rp 160.000",
      image:
        "https://images.pexels.com/photos/4552285/pexels-photo-4552285.jpeg",
      careLevel: "cukup-mudah",
      size: "besar",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Wind className="w-4 h-4" />,
        text: "Pembersih Udara Terbaik",
      },
    },
    {
      id: "boston-fern",
      name: "Boston Fern (Pakis Boston)",
      price: "Rp 95.000",
      image:
        "https://images.pexels.com/photos/5731428/pexels-photo-5731428.jpeg",
      careLevel: "butuh-perhatian",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Wind className="w-4 h-4" />,
        text: "Sangat Menyegarkan Udara",
      },
    },
    {
      id: "gerbera",
      name: "Gerbera (Bunga Gerbil)",
      price: "Rp 75.000",
      image:
        "https://images.pexels.com/photos/5731435/pexels-photo-5731435.jpeg",
      careLevel: "cukup-mudah",
      size: "kecil",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Wind className="w-4 h-4" />,
        text: "Pembersih Udara Warna-warni",
      },
    },
    {
      id: "chrysanthemum",
      name: "Chrysanthemum (Bunga Krisan)",
      price: "Rp 70.000",
      image:
        "https://images.pexels.com/photos/5731434/pexels-photo-5731434.jpeg",
      careLevel: "cukup-mudah",
      size: "kecil",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Wind className="w-4 h-4" />,
        text: "Pembersih Udara Indah",
      },
    },
    {
      id: "english-ivy",
      name: "English Ivy (Merambat Hedera)",
      price: "Rp 65.000",
      image:
        "https://images.pexels.com/photos/5731430/pexels-photo-5731430.jpeg",
      careLevel: "cukup-mudah",
      size: "sedang",
      features: ["air-purifier"],
      reassuranceTag: {
        icon: <Wind className="w-4 h-4" />,
        text: "Pembersih Udara Merayap",
      },
    },
  ],
};

interface FilterState {
  careLevel: string | null;
  size: string | null;
  features: string[];
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      suitability: product.reassuranceTag.text,
    });
  };

  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden border border-border/50 hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-foreground mb-1">
          {product.name}
        </h3>
        <p className="text-primary font-semibold mb-3">{product.price}</p>
        <div className="flex items-center gap-2 text-primary/80 text-sm mb-4 bg-primary/5 px-3 py-2 rounded-md w-fit">
          {product.reassuranceTag.icon}
          <span>{product.reassuranceTag.text}</span>
        </div>
        <Button size="sm" className="w-full mt-auto" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </div>
    </div>
  );
}

function FilterSidebar({
  filters,
  onFilterChange,
  categoryId,
}: {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categoryId: string;
}) {
  const categoryTitles: Record<string, string> = {
    "low-light": "Untuk Kamar Remang",
    "pet-safe": "Aman untuk Peliharaan",
    "easy-care": "Untuk si Pelupa (Perawatan Mudah)",
    "air-purifier": "Pembersih Udara Alami",
  };

  return (
    <aside className="bg-muted/30 rounded-xl p-6 border border-border/50 h-fit sticky top-4">
      <h2 className="text-2xl font-bold text-foreground mb-8">Filter</h2>

      {/* Care Level Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tingkat Perawatan
        </h3>
        <RadioGroup
          value={filters.careLevel || ""}
          onValueChange={(value) =>
            onFilterChange({ ...filters, careLevel: value })
          }
        >
          <div className="space-y-3">
            {[
              { value: "sangat-mudah", label: "Sangat Mudah" },
              { value: "cukup-mudah", label: "Cukup Mudah" },
              { value: "butuh-perhatian", label: "Butuh Perhatian" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={option.value}
                  id={`care-${option.value}`}
                />
                <Label
                  htmlFor={`care-${option.value}`}
                  className="text-base font-normal text-foreground/70 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Plant Size Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Ukuran Tanaman
        </h3>
        <RadioGroup
          value={filters.size || ""}
          onValueChange={(value) => onFilterChange({ ...filters, size: value })}
        >
          <div className="space-y-3">
            {[
              { value: "kecil", label: "Kecil (Meja)" },
              { value: "sedang", label: "Sedang (Lantai)" },
              { value: "besar", label: "Besar (Pojok Ruang)" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={option.value}
                  id={`size-${option.value}`}
                />
                <Label
                  htmlFor={`size-${option.value}`}
                  className="text-base font-normal text-foreground/70 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Other Features Filter */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Fitur Lain
        </h3>
        <div className="space-y-3">
          {[
            { value: "pet-safe", label: "Aman untuk Hewan" },
            { value: "air-purifier", label: "Pembersih Udara" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`feature-${option.value}`}
                checked={filters.features.includes(option.value)}
                onCheckedChange={(checked) => {
                  const newFeatures = checked
                    ? [...filters.features, option.value]
                    : filters.features.filter((f) => f !== option.value);
                  onFilterChange({ ...filters, features: newFeatures });
                }}
              />
              <Label
                htmlFor={`feature-${option.value}`}
                className="text-base font-normal text-foreground/70 cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function ProductListing() {
  const { categoryId = "low-light" } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    careLevel: null,
    size: null,
    features: [],
  });

  const categoryTitles: Record<string, string> = {
    "low-light": "Untuk Kamar Remang",
    "pet-safe": "Aman untuk Peliharaan",
    "easy-care": "Untuk si Pelupa (Perawatan Mudah)",
    "air-purifier": "Pembersih Udara Alami",
  };

  const products =
    categoryProducts[categoryId] || categoryProducts["low-light"];

  // Apply filters
  const filteredProducts = products.filter((product) => {
    if (filters.careLevel && product.careLevel !== filters.careLevel) {
      return false;
    }
    if (filters.size && product.size !== filters.size) {
      return false;
    }
    if (
      filters.features.length > 0 &&
      !filters.features.every((feature) =>
        product.features.includes(feature as any),
      )
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Back Button */}
      <div className="px-4 md:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali ke Shop
        </button>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              {categoryTitles[categoryId] || "Produk Kami"}
            </h1>
            <p className="text-lg text-foreground/60">
              {filteredProducts.length} produk tersedia
            </p>
          </div>

          {/* Layout: Filters + Products */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              categoryId={categoryId}
            />

            {/* Product Grid */}
            <main>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/60 mb-4">
                    Tidak ada produk yang sesuai dengan filter Anda
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        careLevel: null,
                        size: null,
                        features: [],
                      })
                    }
                  >
                    Hapus Filter
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
