import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Calendar } from "lucide-react";

interface WateringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  plantName: string;
}

export default function WateringModal({
  isOpen,
  onClose,
  onConfirm,
  plantName,
}: WateringModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [mode, setMode] = useState<"today" | "date-picker">("today");

  const handleConfirm = () => {
    const date = new Date(selectedDate);
    onConfirm(date);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-background border border-border/50 rounded-2xl p-8 w-full max-w-sm shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Tandai Penyiraman
            </h2>
            <button
              onClick={onClose}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Plant Name */}
          <p className="text-foreground/70 mb-6">
            Kapan terakhir kali Anda menyiram{" "}
            <span className="font-semibold text-foreground">{plantName}</span>?
          </p>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6 bg-muted/30 p-1 rounded-lg">
            <button
              onClick={() => setMode("today")}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all text-sm ${
                mode === "today"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Hari Ini
            </button>
            <button
              onClick={() => setMode("date-picker")}
              className={`flex-1 py-2 px-3 rounded-md font-medium transition-all text-sm ${
                mode === "date-picker"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Pilih Tanggal
            </button>
          </div>

          {/* Content */}
          {mode === "today" && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground mb-2">
                Tanggal yang dipilih:
              </p>
              <p className="text-lg font-semibold text-primary">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          {mode === "date-picker" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                Pilih Tanggal
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-foreground/50 pointer-events-none" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <p className="text-xs text-foreground/60 mt-2">
                Pilih tanggal kapan terakhir kali Anda menyiram tanaman ini
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Batal
            </Button>
            <Button className="flex-1" onClick={handleConfirm}>
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
