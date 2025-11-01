import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ProfileInfo() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "Maya Purnama",
    email: "maya@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [originalFormData, setOriginalFormData] = useState(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalFormData(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(originalFormData);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name.trim()) {
      toast.error("Nama tidak boleh kosong");
      setIsLoading(false);
      return;
    }

    // If changing password
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        toast.error("Masukkan password saat ini");
        setIsLoading(false);
        return;
      }

      if (formData.newPassword.length < 6) {
        toast.error("Password baru minimal 6 karakter");
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Password baru dan konfirmasi tidak cocok");
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      toast.success("Informasi berhasil diperbarui!", {
        description: "Perubahan Anda telah disimpan",
      });
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setIsLoading(false);
    }, 800);
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
            Informasi Personal
          </h1>
          <p className="text-lg text-foreground/60">
            Kelola nama dan password akun Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-background border border-border/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Data Pribadi
              </h2>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-foreground font-semibold"
                  >
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-12 bg-background border-border/50 text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-foreground font-semibold"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="h-12 bg-muted border-border/50 text-foreground/60 cursor-not-allowed"
                  />
                  <p className="text-xs text-foreground/60">
                    Email tidak dapat diubah untuk keamanan akun
                  </p>
                </div>
              </div>
            </div>

            {/* Password Section */}
            {isEditing && (
              <div className="bg-background border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Ubah Password
                </h2>
                <p className="text-sm text-foreground/60 mb-6">
                  Kosongkan bagian ini jika tidak ingin mengubah password
                </p>

                <div className="space-y-6">
                  {/* Current Password */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="currentPassword"
                      className="text-foreground font-semibold"
                    >
                      Password Saat Ini
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="h-12 bg-background border-border/50 text-foreground pr-12"
                        placeholder="Masukkan password saat ini"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-4 top-3.5 text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="newPassword"
                      className="text-foreground font-semibold"
                    >
                      Password Baru
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="h-12 bg-background border-border/50 text-foreground pr-12"
                        placeholder="Masukkan password baru (minimal 6 karakter)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-3.5 text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-foreground font-semibold"
                    >
                      Konfirmasi Password Baru
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="h-12 bg-background border-border/50 text-foreground pr-12"
                        placeholder="Konfirmasi password baru"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-3.5 text-foreground/50 hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={handleEditClick}
                  className="flex-1 h-12 text-base font-semibold"
                >
                  Edit Informasi
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 text-base font-semibold"
                  >
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 h-12 text-base font-semibold border-2"
                  >
                    Batal
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
