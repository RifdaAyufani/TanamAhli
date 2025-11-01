import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface Address {
  id: string;
  name: string;
  fullAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function ProfileAlamat() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      name: "Rumah",
      fullAddress: "Jl. Teuku Umar No. 45",
      city: "Jakarta",
      province: "DKI Jakarta",
      zipCode: "12345",
      phone: "081234567890",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "Kantor",
      fullAddress: "Jl. Gatot Subroto No. 10",
      city: "Jakarta",
      province: "DKI Jakarta",
      zipCode: "12310",
      phone: "081298765432",
      isDefault: false,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    fullAddress: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      fullAddress: "",
      city: "",
      province: "",
      zipCode: "",
      phone: "",
    });
    setEditingId(null);
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.name ||
      !formData.fullAddress ||
      !formData.city ||
      !formData.province ||
      !formData.zipCode ||
      !formData.phone
    ) {
      toast.error("Mohon isi semua kolom");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...formData,
        isDefault: addresses.length === 0,
      };

      setAddresses([...addresses, newAddress]);
      toast.success("Alamat berhasil ditambahkan!", {
        description: `${formData.name} telah disimpan`,
      });
      resetForm();
      setShowAddForm(false);
      setIsLoading(false);
    }, 800);
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      name: address.name,
      fullAddress: address.fullAddress,
      city: address.city,
      province: address.province,
      zipCode: address.zipCode,
      phone: address.phone,
    });
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setIsLoading(true);

    if (
      !formData.name ||
      !formData.fullAddress ||
      !formData.city ||
      !formData.province ||
      !formData.zipCode ||
      !formData.phone
    ) {
      toast.error("Mohon isi semua kolom");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId ? { ...addr, ...formData } : addr,
        ),
      );
      toast.success("Alamat berhasil diperbarui!");
      resetForm();
      setShowAddForm(false);
      setIsLoading(false);
    }, 800);
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.filter((a) => !a.isDefault).length === 1) {
      const isDefault = addresses.find((a) => a.id === id)?.isDefault;
      if (isDefault) {
        toast.error("Tidak dapat menghapus alamat utama!");
        return;
      }
    }

    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success("Alamat berhasil dihapus");
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
    toast.success("Alamat utama berhasil diubah");
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
            Alamat Tersimpan
          </h1>
          <p className="text-lg text-foreground/60">
            Kelola alamat pengiriman Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Add Address Button */}
          {!showAddForm && (
            <Button
              size="lg"
              className="w-full h-12 text-base font-semibold mb-8"
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Alamat Baru
            </Button>
          )}

          {/* Add/Edit Address Form */}
          {showAddForm && (
            <div className="bg-background border border-border/50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingId ? "Edit Alamat" : "Alamat Baru"}
              </h2>

              <form
                onSubmit={editingId ? handleSaveEdit : handleAddAddress}
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-foreground font-semibold"
                  >
                    Label Alamat
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Contoh: Rumah, Kantor, Orang Tua"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 bg-background border-border/50 text-foreground"
                  />
                </div>

                {/* Full Address */}
                <div className="space-y-3">
                  <Label
                    htmlFor="fullAddress"
                    className="text-foreground font-semibold"
                  >
                    Alamat Lengkap
                  </Label>
                  <Input
                    id="fullAddress"
                    name="fullAddress"
                    placeholder="Jalan, nomor rumah, kelurahan"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    className="h-12 bg-background border-border/50 text-foreground"
                  />
                </div>

                {/* City and Province */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="city"
                      className="text-foreground font-semibold"
                    >
                      Kota
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Jakarta"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="province"
                      className="text-foreground font-semibold"
                    >
                      Provinsi
                    </Label>
                    <Input
                      id="province"
                      name="province"
                      placeholder="DKI Jakarta"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground"
                    />
                  </div>
                </div>

                {/* Zip Code and Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="zipCode"
                      className="text-foreground font-semibold"
                    >
                      Kode Pos
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="12345"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-foreground font-semibold"
                    >
                      No. Telepon
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+62 812 3456 7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 bg-background border-border/50 text-foreground"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 text-base font-semibold"
                  >
                    {isLoading
                      ? "Menyimpan..."
                      : editingId
                        ? "Simpan Perubahan"
                        : "Tambah Alamat"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => {
                      resetForm();
                      setShowAddForm(false);
                    }}
                    className="flex-1 h-12 text-base font-semibold border-2"
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Alamat Saya
            </h2>
            {addresses.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60 mb-4">
                  Belum ada alamat tersimpan
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  Tambah Alamat Pertama
                </Button>
              </div>
            ) : (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {address.name}
                        </h3>
                        {address.isDefault && (
                          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                            <Check className="w-3 h-3" />
                            Utama
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/70 text-sm mb-1">
                        {address.fullAddress}
                      </p>
                      <p className="text-foreground/60 text-xs">
                        {address.city}, {address.province} {address.zipCode}
                      </p>
                      <p className="text-foreground/60 text-xs mt-2">
                        📱 {address.phone}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="p-2 text-foreground/60 hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-2 text-foreground/60 hover:text-destructive transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Jadikan Alamat Utama
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
