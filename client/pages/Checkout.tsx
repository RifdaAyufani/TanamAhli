import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const navigate = useNavigate();
  const { readyItems } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    shippingMethod: "standard",
    paymentMethod: "transfer",
  });

  // Calculate subtotal from all ready items (not just checked ones for display)
  const subtotal = readyItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost = formData.shippingMethod === "express" ? 50000 : 25000;
  const total = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.province ||
      !formData.zipCode
    ) {
      toast.error("Mohon isi semua kolom");
      return;
    }

    setIsProcessing(true);

    // Simulate API call for order processing
    setTimeout(() => {
      toast.success("Pesanan berhasil dibuat!", {
        description: "Anda akan menerima email konfirmasi segera",
      });
      // In a real app, you would clear the cart and navigate to order confirmation page
      navigate("/");
      setIsProcessing(false);
    }, 1500);
  };

  if (readyItems.length === 0) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </button>

          <div className="text-center py-12">
            <p className="text-foreground/70 mb-6 text-lg">
              Keranjang Anda kosong
            </p>
            <Button onClick={() => navigate("/shop")}>Mulai Belanja</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
        <p className="text-foreground/60 mb-8">
          Lengkapi informasi pengiriman dan pembayaran Anda
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Informasi Pengiriman */}
              <div className="bg-background border border-border/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Informasi Pengiriman
                </h2>

                <div className="space-y-4">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-foreground font-medium"
                    >
                      Nama Lengkap
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Nama lengkap Anda"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-foreground font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  {/* Nomor Telepon */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-foreground font-medium"
                    >
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+62 812 3456 7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  {/* Alamat */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-foreground font-medium"
                    >
                      Alamat Lengkap
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Jalan, nomor rumah, kelurahan"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                    />
                  </div>

                  {/* Kota dan Provinsi */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-foreground font-medium"
                      >
                        Kota
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Jakarta"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="province"
                        className="text-foreground font-medium"
                      >
                        Provinsi
                      </Label>
                      <Input
                        id="province"
                        name="province"
                        type="text"
                        placeholder="DKI Jakarta"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Kode Pos */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="zipCode"
                      className="text-foreground font-medium"
                    >
                      Kode Pos
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      placeholder="12345"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground placeholder:text-foreground/40"
                    />
                  </div>
                </div>
              </div>

              {/* Metode Pengiriman */}
              <div className="bg-background border border-border/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Metode Pengiriman
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === "standard"}
                      onChange={handleInputChange}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        Standar (3-5 hari kerja)
                      </p>
                      <p className="text-foreground/60 text-sm">
                        Rp 25.000
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === "express"}
                      onChange={handleInputChange}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        Express (1-2 hari kerja)
                      </p>
                      <p className="text-foreground/60 text-sm">
                        Rp 50.000
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="bg-background border border-border/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Metode Pembayaran
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === "transfer"}
                      onChange={handleInputChange}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        Transfer Bank
                      </p>
                      <p className="text-foreground/60 text-sm">
                        BCA, Mandiri, BNI, dan lainnya
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ewallet"
                      checked={formData.paymentMethod === "ewallet"}
                      onChange={handleInputChange}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold text-foreground">E-Wallet</p>
                      <p className="text-foreground/60 text-sm">
                        GCash, Dana, LinkAja
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === "credit"}
                      onChange={handleInputChange}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        Kartu Kredit
                      </p>
                      <p className="text-foreground/60 text-sm">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 text-base font-semibold"
              >
                {isProcessing ? "Memproses Pesanan..." : "Lanjutkan Pembayaran"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background border border-border/50 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Ringkasan Pesanan
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                {readyItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">
                        {item.name}
                      </p>
                      <p className="text-foreground/60 text-xs">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground text-sm">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-foreground/70">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center text-foreground/70">
                  <span>Pengiriman</span>
                  <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
                </div>
                <div className="border-t border-border/50 pt-3 flex justify-between items-center">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  ✓ Gratis ongkir untuk pembelian di atas Rp 500.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
