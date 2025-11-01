import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SideCartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SideCart({ isOpen, onOpenChange }: SideCartProps) {
  const navigate = useNavigate();
  const {
    readyItems,
    savedItems,
    isLoggedIn,
    removeItem,
    updateQuantity,
    toggleItemCheckbox,
    saveItemForLater,
    moveToCart,
  } = useCart();

  // Calculate subtotal for checked items only
  const checkedCount = readyItems.filter((item) => item.checked).length;
  const subtotal = readyItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Validate cart: check if any items are selected
    if (subtotal <= 0) {
      return;
    }

    // Close the cart drawer
    onOpenChange(false);

    // Check login status
    if (isLoggedIn) {
      // User is logged in, proceed to checkout
      navigate("/checkout");
    } else {
      // User is not logged in, save cart to localStorage and redirect to auth
      const checkedItems = readyItems.filter((item) => item.checked);
      localStorage.setItem("cartItems", JSON.stringify(checkedItems));
      navigate("/auth");
    }
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
          {readyItems.length > 0 && (
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
                          onCheckedChange={() => toggleItemCheckbox(item.id)}
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
                              updateQuantity(item.id, item.quantity - 1)
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
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-foreground/70 hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Row 2: Reassurance Tag */}
                    {item.suitability && (
                      <div className="flex items-center gap-2 text-primary text-xs font-medium mb-3 bg-primary/10 px-3 py-2 rounded-md w-fit ml-10">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Pilihan Tepat! ({item.suitability})</span>
                      </div>
                    )}

                    {/* Item Row 3: Action Links */}
                    <div className="flex gap-4 ml-10">
                      <button
                        onClick={() => removeItem(item.id, "ready")}
                        className="text-sm text-destructive hover:text-destructive/80 transition-colors font-medium"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => saveItemForLater(item.id)}
                        className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Simpan untuk Nanti
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {savedItems.length > 0 && readyItems.length > 0 && (
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
                        onClick={() => removeItem(item.id, "saved")}
                        className="text-sm text-destructive hover:text-destructive/80 transition-colors font-medium"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => moveToCart(item.id)}
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

          {/* Empty State */}
          {readyItems.length === 0 && savedItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/70 mb-4">Keranjang Anda kosong</p>
            </div>
          )}
        </div>

        {/* Footer/Action Area */}
        {readyItems.length > 0 && (
          <div className="border-t border-border/50 px-6 py-6 space-y-3 bg-background flex-shrink-0">
            {/* Dynamic Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-foreground/70 font-medium">
                Subtotal ({checkedCount} {checkedCount === 1 ? "item" : "items"}
                ):
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
              disabled={subtotal <= 0}
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
        )}
      </div>
    </>
  );
}
