import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  CheckCircle,
  Package,
  Mail,
  Leaf,
} from "lucide-react";

interface SideCartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SideCart({ isOpen, onOpenChange }: SideCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAddOn, setShowAddOn] = useState(true);

  const product = {
    id: "monstera",
    name: "Monstera Deliciosa",
    price: 150000,
    image:
      "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
    suitability: "Cocok untuk kamar remang",
  };

  const addOn = {
    id: "media",
    name: "Media Tanam Porous",
    price: 35000,
  };

  const subtotal = product.price * quantity + (showAddOn ? addOn.price : 0);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddAddon = () => {
    alert(`${addOn.name} ditambahkan ke keranjang!`);
    setShowAddOn(false);
  };

  const handleCheckout = () => {
    alert("Lanjut ke pembayaran!");
  };

  const handleContinueShopping = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-96 flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="border-b border-border/50 px-6 py-6">
          <div className="flex items-center justify-between w-full">
            <SheetTitle className="text-2xl font-bold text-foreground">
              Keranjang Adopsi Saya
            </SheetTitle>
            <SheetClose asChild>
              <button className="text-foreground/70 hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Product Card */}
          <div className="bg-muted/30 rounded-xl overflow-hidden border border-border/50 mb-6">
            {/* Product Image */}
            <div className="relative w-full h-40 overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-5">
              {/* Product Name */}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {product.name}
              </h3>

              {/* Suitability Tag */}
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4 bg-primary/10 px-3 py-2 rounded-md w-fit">
                <CheckCircle className="w-4 h-4" />
                <span>Pilihan Tepat! ({product.suitability})</span>
              </div>

              {/* Price */}
              <p className="text-primary font-semibold text-lg mb-4">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              {/* Quantity Adjuster */}
              <div className="flex items-center border border-border/50 rounded-lg w-fit">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-foreground font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Essential Add-on Section */}
          {showAddOn && (
            <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-5 mb-6">
              <h4 className="font-bold text-foreground mb-3">Perlengkapan Esensial</h4>
              <p className="text-foreground/80 text-sm mb-4">
                Monstera-mu butuh <span className="font-semibold">{addOn.name}</span>. Mau tambahkan?
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-1"
                  onClick={handleAddAddon}
                >
                  <Plus className="w-4 h-4" />
                  Tambahkan
                </Button>
                <button
                  onClick={() => setShowAddOn(false)}
                  className="flex-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Lain Kali
                </button>
              </div>
            </div>
          )}

          {/* What's Next Section */}
          <div className="mb-8">
            <h4 className="font-semibold text-foreground mb-4">Apa Selanjutnya?</h4>
            <div className="flex gap-4 justify-between">
              {/* Shipping */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-foreground/70 font-medium">Kemas Aman</p>
              </div>

              {/* Guide */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-foreground/70 font-medium">Panduan Digital</p>
              </div>

              {/* Track */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-foreground/70 font-medium">Lacak di Garasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer/Action Area */}
        <div className="border-t border-border/50 px-6 py-6 space-y-3 bg-background">
          {/* Subtotal */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-foreground/70 font-medium">Subtotal</span>
            <span className="text-2xl font-bold text-primary">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold"
            onClick={handleCheckout}
          >
            Lanjut ke Pembayaran
          </Button>

          {/* Continue Shopping Link */}
          <button
            onClick={handleContinueShopping}
            className="w-full text-primary hover:text-primary/80 transition-colors font-medium text-base py-2"
          >
            Lanjut Belanja
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
