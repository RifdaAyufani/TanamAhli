import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Receipt,
  LogOut,
  ChevronRight,
  Edit2,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

export default function Profile() {
  const navigate = useNavigate();

  const userName = "Maya";
  const userEmail = "maya@gmail.com";

  const menuItems: MenuItem[] = [
    {
      id: "garasi-saya",
      icon: <Leaf className="w-5 h-5" />,
      label: "Garasi Tanamanku",
      description: "Lihat dan rawat koleksi tanaman Anda",
      onClick: () => {
        navigate("/garasi-saya");
      },
    },
    {
      id: "personal-info",
      icon: <User className="w-5 h-5" />,
      label: "Informasi Personal",
      description: "Untuk mengubah nama/password",
      onClick: () => {
        navigate("/profile/info");
      },
    },
    {
      id: "saved-addresses",
      icon: <MapPin className="w-5 h-5" />,
      label: "Alamat Tersimpan",
      description: "Untuk menambah/mengedit alamat pengiriman",
      onClick: () => {
        navigate("/profile/alamat");
      },
    },
    {
      id: "adoption-history",
      icon: <Receipt className="w-5 h-5" />,
      label: "Riwayat Adopsi",
      description: "Untuk melihat pesanan sebelumnya",
      onClick: () => {
        navigate("/profile/riwayat");
      },
    },
  ];

  const handleLogout = () => {
    toast.success("Berhasil keluar akun", {
      description: "Sampai jumpa lagi!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border/50 px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Pengaturan Akun
          </h1>
          <p className="text-lg text-foreground/60">
            Kelola profil dan preferensi akun Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* User Info Card */}
          <div className="bg-background border border-border/50 rounded-2xl p-8 mb-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>

              {/* User Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {userName}
                </h2>
                <p className="text-lg text-foreground/70 mb-4">{userEmail}</p>
                <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
                  <Edit2 className="w-4 h-4" />
                  Edit Profil
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-border/50">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="w-full px-8 py-5 flex items-center gap-4 hover:bg-muted/20 transition-colors group text-left"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors text-primary">
                    {item.icon}
                  </div>

                  {/* Label & Description */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {item.description}
                    </p>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground/70 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Logout Section */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-foreground/60 mb-4">
              Ingin keluar dari akun Anda?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 border-2 border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Keluar Akun
            </Button>
          </div>

          {/* Account Info */}
          <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-border/50">
            <p className="text-xs text-foreground/60">
              <span className="font-semibold">ID Akun:</span> MAY-2024-789456
            </p>
            <p className="text-xs text-foreground/60 mt-2">
              <span className="font-semibold">Bergabung sejak:</span> 15 Januari
              2024
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
