import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Package,
  Calendar,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  items: OrderItem[];
  total: number;
  status: "completed" | "pending" | "shipped";
  shippingAddress: string;
  estimatedDelivery?: string;
}

export default function ProfileRiwayat() {
  const navigate = useNavigate();

  const orders: Order[] = [
    {
      id: "order-1",
      orderNumber: "ORD-2024-001",
      date: new Date("2024-01-20"),
      items: [
        {
          id: "item-1",
          name: "Monstera Deliciosa",
          quantity: 1,
          price: 150000,
          image:
            "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
        },
      ],
      total: 150000 + 25000,
      status: "completed",
      shippingAddress: "Jl. Teuku Umar No. 45, Jakarta, DKI Jakarta 12345",
    },
    {
      id: "order-2",
      orderNumber: "ORD-2024-002",
      date: new Date("2024-01-25"),
      items: [
        {
          id: "item-2",
          name: "Spider Plant",
          quantity: 2,
          price: 70000,
          image:
            "https://images.pexels.com/photos/3692746/pexels-photo-3692746.jpeg",
        },
        {
          id: "item-3",
          name: "Kaktus Mini",
          quantity: 1,
          price: 45000,
          image:
            "https://images.pexels.com/photos/3873389/pexels-photo-3873389.jpeg",
        },
      ],
      total: 70000 * 2 + 45000 + 25000,
      status: "shipped",
      shippingAddress: "Jl. Gatot Subroto No. 10, Jakarta, DKI Jakarta 12310",
      estimatedDelivery: "28 Januari 2024",
    },
    {
      id: "order-3",
      orderNumber: "ORD-2024-003",
      date: new Date("2024-01-28"),
      items: [
        {
          id: "item-4",
          name: "Peace Lily",
          quantity: 1,
          price: 125000,
          image:
            "https://images.pexels.com/photos/4632605/pexels-photo-4632605.jpeg",
        },
      ],
      total: 125000 + 25000,
      status: "pending",
      shippingAddress: "Jl. Teuku Umar No. 45, Jakarta, DKI Jakarta 12345",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-orange-600" />;
      default:
        return <Package className="w-5 h-5 text-foreground/50" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "shipped":
        return "Dalam Pengiriman";
      case "pending":
        return "Menunggu Konfirmasi";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-muted text-foreground/70 border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border/50 px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali ke Pengaturan
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Riwayat Adopsi
          </h1>
          <p className="text-lg text-foreground/60">
            Lihat semua pesanan tanaman yang telah Anda buat
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/60 mb-4">
                Belum ada pesanan tanaman
              </p>
              <Button onClick={() => navigate("/shop")}>
                Mulai Belanja Sekarang
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-muted/30 px-6 md:px-8 py-4 border-b border-border/50">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">
                          Order ID
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {order.orderNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="px-6 md:px-8 py-6">
                    {/* Order Date */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
                      <Calendar className="w-5 h-5 text-foreground/50" />
                      <div>
                        <p className="text-sm text-foreground/60">
                          Tanggal Pesanan
                        </p>
                        <p className="font-semibold text-foreground">
                          {order.date.toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6 pb-6 border-b border-border/50">
                      <h3 className="text-lg font-bold text-foreground mb-4">
                        Item Pesanan
                      </h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">
                                {item.name}
                              </p>
                              <p className="text-sm text-foreground/60">
                                Qty: {item.quantity}x
                              </p>
                              <p className="font-semibold text-primary mt-1">
                                Rp{" "}
                                {(item.price * item.quantity).toLocaleString(
                                  "id-ID",
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="flex items-start gap-3 mb-6 pb-6 border-b border-border/50">
                      <MapPin className="w-5 h-5 text-foreground/50 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-foreground/60 mb-2">
                          Alamat Pengiriman
                        </p>
                        <p className="font-semibold text-foreground">
                          {order.shippingAddress}
                        </p>
                      </div>
                    </div>

                    {/* Estimated Delivery */}
                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
                        <Truck className="w-5 h-5 text-foreground/50" />
                        <div>
                          <p className="text-sm text-foreground/60">
                            Estimasi Pengiriman
                          </p>
                          <p className="font-semibold text-foreground">
                            {order.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Price Summary */}
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Total Pesanan</span>
                        <span className="text-2xl font-bold text-primary">
                          Rp {order.total.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      {order.status === "completed" && (
                        <Button
                          variant="outline"
                          className="flex-1 border-2"
                          onClick={() => navigate("/shop")}
                        >
                          Beli Lagi
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="flex-1 border-2"
                        onClick={() => navigate("/garasi-saya")}
                      >
                        Lihat di Garasi Saya
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
