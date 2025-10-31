import { Button } from "@/components/ui/button";
import { Smile, Frown, Droplets } from "lucide-react";

export type PlantStatus = "happy" | "needs-attention";

interface PlantCardProps {
  id: string;
  nickname: string;
  plantName: string;
  image: string;
  status: PlantStatus;
  careInfo: string;
  lastWatered: string;
  nextWaterIn?: string;
  onWater?: () => void;
}

export default function PlantCard({
  id,
  nickname,
  plantName,
  image,
  status,
  careInfo,
  lastWatered,
  nextWaterIn,
  onWater,
}: PlantCardProps) {
  const isHappy = status === "happy";
  const statusColor = isHappy ? "text-green-600" : "text-orange-500";
  const statusBg = isHappy ? "bg-green-50" : "bg-orange-50";
  const statusText = isHappy ? "Lagi Senang!" : "Aku Haus Nih!";

  return (
    <div className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Plant Image */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
          src={image}
          alt={plantName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Status Badge */}
      <div className={`relative px-6 pt-4 pb-2 ${statusBg}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">{isHappy ? "😊" : "😥"}</div>
          <div>
            <p className={`font-bold text-lg ${statusColor}`}>{statusText}</p>
            <p className="text-xs text-foreground/60">{plantName}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 flex-1 flex flex-col">
        {/* Nickname */}
        <h3 className="text-2xl font-bold text-foreground mb-4">{nickname}</h3>

        {/* Care Info */}
        <div className="bg-muted/20 rounded-lg p-4 mb-6 border border-border/50">
          <div className="flex gap-2 items-start mb-3">
            <Droplets className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80 leading-relaxed">
              <p className="font-medium text-foreground mb-1">{careInfo}</p>
              <p className="text-xs text-foreground/60">📅 {lastWatered}</p>
              {nextWaterIn && (
                <p className="text-xs text-primary font-medium mt-1">
                  ⏰ {nextWaterIn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Water Button (for needs attention state) */}
        {!isHappy && onWater && (
          <Button
            onClick={onWater}
            className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/90 mt-auto"
          >
            <Droplets className="w-4 h-4 mr-2" />
            Saya Sudah Siram!
          </Button>
        )}

        {/* Happy state indicator button */}
        {isHappy && (
          <div className="mt-auto pt-4 border-t border-border/50">
            <p className="text-xs text-center text-foreground/60">
              ✅ Tanaman ini sehat dan bahagia!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
