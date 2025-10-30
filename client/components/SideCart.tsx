import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Minus,
  CheckCircle,
  X,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  suitability: string;
  quantity: number;
  checked: boolean;
}

interface SideCartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SideCart({ isOpen, onOpenChange }: SideCartProps) {
  const [readyItems, setReadyItems] = useState<CartItem[]>([
    {
      id: "monstera",
      name: "Monstera Deliciosa",
      price: 150000,
      image:
        "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
      suitability: "Cocok untuk kamar remang",
      quantity: 1,
      checked: true,
    },
    {
      id: "spider-plant",
      name: "Spider Plant",
      price: 70000,
      image:
        "https://images.pexels.com/photos/3692746/pexels-photo-3692746.jpeg",
      suitability: "100% Aman untuk Peliharaan",
      quantity: 1,
      checked: true,
    },
  ]);

  const [savedItems, setSavedItems] = useState<CartItem[]>([
    {
      id: "cactus",
      name: "Kaktus Mini",
      price: 45000,
      image:
        "https://images.pexels.com/photos/3873389/pexels-photo-3873389.jpeg",
      suitability: "",
      quantity: 1,
      checked: false,
    },
  ]);

  // Calculate subtotal for checked items only
  const checkedCount = readyItems.filter((item) => item.checked).length;
  const subtotal = readyItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle checkbox toggle
  const toggleReadyItemCheckbox = (id: string) => {
    setReadyItems(
      readyItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Handle quantity change for ready items
  const updateReadyItemQuantity = (id: string, delta: number) => {
    setReadyItems(
      readyItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  // Remove from ready items
  const removeReadyItem = (id: string) => {
    setReadyItems(readyItems.filter((item) => item.id !== id));
  };

  // Save ready item for later
  const saveReadyItemForLater = (id: string) => {
    const item = readyItems.find((item) => item.id === id);
    if (item) {
      setSavedItems([...savedItems, item]);
      removeReadyItem(id);
    }
  };

  // Remove from saved items
  const removeSavedItem = (id: string) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
  };

  // Move saved item to ready
  const moveSavedToReady = (id: string) => {
    const item = savedItems.find((item) => item.id === id);
    if (item) {
      setReadyItems([...readyItems, { ...item, checked: true }]);
      removeSavedItem(id);
    }
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${checkedCount} items!`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/80"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-background shadow-lg flex flex-col animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="border-b border-border/50 px-6 py-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-bold text-foreground">
            Keranjang Adopsi Saya
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Section 1: Siap Diadopsi */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Siap Diadopsi
            </h3>
            <div className="space-y-4">
              {readyItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-border/50 rounded-lg p-4 bg-background hover:bg-muted/20 transition-colors"
                >
                  {/* Item Row 1: Checkbox + Image + Info */}
                  <div className="flex gap-4 mb-3">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() =>
                          toggleReadyItemCheckbox(item.id)
                        }
                      />
                    </div>

                    {/* Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Plant Info */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.name}
                      </h4>
                      <p className="text-primary font-bold text-sm mb-2">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>

                      {/* Quantity Adjuster */}
                      <div className="flex items-center gap-1 w-fit border border-border/50 rounded-md">
                        <button
                          onClick={() =>
                            updateReadyItemQuantity(item.id, -1)
                          }
                          className="p-1 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm text-foreground font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateReadyItemQuantity(item.id, 1)
                          }
                          className="p-1 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Row 2: Reassurance Tag */}
                  <div className="flex items-center gap-2 text-primary text-xs font-medium mb-3 bg-primary/10 px-3 py-2 rounded-md w-fit ml-10">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Pilihan Tepat! ({item.suitability})</span>
                  </div>

                  {/* Item Row 3: Action Links */}
                  <div className="flex gap-4 ml-10">
                    <button
                      onClick={() => removeReadyItem(item.id)}
                      className="text-sm text-destructive hover:text-destructive/80 transition-colors font-medium"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => saveReadyItemForLater(item.id)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Simpan untuk Nanti
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          {savedItems.length > 0 && (
            <div className="border-t border-border/50 my-8" />
          )}

          {/* Section 2: Disimpan untuk Nanti */}
          {savedItems.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">
                Disimpan untuk Nanti
              </h3>
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border/50 rounded-lg p-4 bg-background hover:bg-muted/20 transition-colors"
                  >
                    {/* Item Row 1: Image + Info */}
                    <div className="flex gap-4 mb-3">
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Plant Info */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.name}
                        </h4>
                        <p className="text-primary font-bold text-sm">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => removeSavedItem(item.id)}
                        className="text-sm text-destructive hover:text-destructive/80 transition-colors font-medium"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => moveSavedToReady(item.id)}
                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Pindahkan ke Keranjang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer/Action Area */}
        <div className="border-t border-border/50 px-6 py-6 space-y-3 bg-background flex-shrink-0">
          {/* Dynamic Subtotal */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-foreground/70 font-medium">
              Subtotal ({checkedCount} {checkedCount === 1 ? "item" : "items"}):
            </span>
            <span className="text-2xl font-bold text-primary">
              Rp {subtotal.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold"
            onClick={handleCheckout}
            disabled={checkedCount === 0}
          >
            Lanjut ke Pembayaran
          </Button>

          {/* Continue Shopping Link */}
          <button
            onClick={() => onOpenChange(false)}
            className="w-full text-primary hover:text-primary/80 transition-colors font-medium text-base py-2"
          >
            Lanjut Belanja
          </button>
        </div>
      </div>
    </>
  );
}
