import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Sun,
  Droplet,
  AlertTriangle,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";

interface CareGuideItem {
  icon: React.ReactNode;
  label: string;
}

interface ProductData {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  careGuide: CareGuideItem[];
}

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productMap: Record<string, ProductData> = {
    monstera: {
      id: "monstera",
      name: "Monstera Deliciosa",
      price: "Rp 150.000",
      image:
        "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
      description:
        "Monstera Deliciosa adalah tanaman hias populer dengan daun besar yang indah. Tanaman ini cocok untuk pemula dan membuat ruangan lebih hidup.",
      careGuide: [
        {
          icon: <Sun className="w-6 h-6" />,
          label: "Cahaya Sedang (Tidak langsung)",
        },
        {
          icon: <Droplet className="w-6 h-6" />,
          label: "Siram 1x Seminggu",
        },
        {
          icon: <AlertTriangle className="w-6 h-6" />,
          label: "Beracun (Jauhkan dari hewan)",
        },
      ],
    },
  };

  const product = productMap[productId || "monstera"] || productMap.monstera;
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/\D/g, "")),
      image: product.image,
    });
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Product Image */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square md:aspect-auto md:h-96 lg:h-[500px] rounded-xl overflow-hidden border border-border/50 shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="flex flex-col justify-between">
              {/* Top Section - Name and Price */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {product.price}
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              {/* Middle Section - Care Guide */}
              <div className="my-8 md:my-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Panduan Perawatan
                </h2>

                <div className="space-y-4">
                  {product.careGuide.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <p className="text-base md:text-lg text-foreground font-medium">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section - Add to Cart Button */}
              <div className="pt-8 md:pt-12">
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Tambahkan ke Keranjang
                </Button>

                {/* Additional Info */}
                <div className="mt-4 text-center text-sm text-foreground/60">
                  <p>✓ Pengiriman gratis untuk pembelian hari ini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
