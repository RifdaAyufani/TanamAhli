import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const navigate = useNavigate();

  // Placeholder cart data - in production, this would come from state management
  const cartItems: CartItem[] = [];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 20000 : 0;
  const total = subtotal + shippingCost;

  const handleRemoveItem = (itemId: string) => {
    // TODO: Implement remove item functionality
    console.log("Remove item:", itemId);
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
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
          Lanjut Belanja
        </button>
      </div>

      {/* Main Content */}
      <section className="flex-1 px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
            Keranjang Belanja Anda
          </h1>

          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="bg-muted/30 rounded-xl border border-border/50 p-12 md:p-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-primary/50" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Keranjang Anda Masih Kosong
              </h2>
              <p className="text-lg text-foreground/70 mb-8 max-w-md mx-auto">
                Mulai temukan tanaman hijau yang sempurna untuk rumahmu! 🌱
              </p>
              <Button
                size="lg"
                className="inline-flex items-center gap-2"
                onClick={() => navigate("/shop")}
              >
                Jelajahi Produk
              </Button>
            </div>
          ) : (
            // Cart with Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-background border border-border/50 rounded-xl overflow-hidden">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <div className="border-t border-border/50" />}
                      <div className="p-6 flex gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {item.name}
                          </h3>
                          <p className="text-primary font-semibold mb-4">
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-border/50 rounded-lg">
                              <button className="px-3 py-2 text-foreground/70 hover:text-foreground">
                                −
                              </button>
                              <span className="px-4 py-2 text-foreground">
                                {item.quantity}
                              </span>
                              <button className="px-3 py-2 text-foreground/70 hover:text-foreground">
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-sm text-foreground/60 mb-2">Subtotal</p>
                          <p className="text-xl font-bold text-foreground">
                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 sticky top-20">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Ringkasan Pesanan
                  </h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-primary/20">
                    <div className="flex justify-between text-foreground/70">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/70">
                      <span>Pengiriman</span>
                      <span>
                        {shippingCost === 0
                          ? "Gratis"
                          : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full mb-3"
                    onClick={handleCheckout}
                  >
                    Lanjut ke Pembayaran
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-primary text-primary hover:bg-primary/5"
                    onClick={() => navigate("/shop")}
                  >
                    Lanjut Belanja
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
