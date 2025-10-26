import { useNavigate } from "react-router-dom";
import { Leaf, Bug, Frown, Circle } from "lucide-react";

interface SymptomCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function Klinik() {
  const navigate = useNavigate();

  const symptoms: SymptomCard[] = [
    {
      id: "yellowing",
      icon: <Leaf className="w-12 h-12" />,
      title: "Daun Menguning",
      description: "Daun berubah warna kuning",
      color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700",
    },
    {
      id: "pests",
      icon: <Bug className="w-12 h-12" />,
      title: "Ada Hama/Serangga",
      description: "Melihat serangga atau tanda kerusakan",
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700",
    },
    {
      id: "wilting",
      icon: <Frown className="w-12 h-12" />,
      title: "Layu / Terkulai",
      description: "Tanaman terlihat lemas dan terkulai",
      color: "bg-red-50 hover:bg-red-100 border-red-200 text-red-700",
    },
    {
      id: "brown-spots",
      icon: <Circle className="w-12 h-12" />,
      title: "Bercak Coklat",
      description: "Ada bintik atau noda coklat",
      color: "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700",
    },
  ];

  const handleSymptomSelect = (symptomId: string) => {
    navigate(`/diagnosis/${symptomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tenang, kami bantu cek. Apa yang kamu lihat?
            </h1>
            <p className="text-lg text-foreground/60">
              Pilih gejala yang paling mirip dengan kondisi tanamanmu
            </p>
          </div>

          {/* Symptom Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {symptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => handleSymptomSelect(symptom.id)}
                className={`${symptom.color} rounded-xl border-2 p-8 transition-all duration-200 hover:shadow-lg active:scale-95 text-left flex flex-col items-center md:items-start`}
              >
                <div className="flex items-center justify-center mb-4 w-full md:w-auto">
                  <div className="p-3 bg-white/50 rounded-lg">
                    {symptom.icon}
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-center md:text-left w-full">
                  {symptom.title}
                </h2>
                <p className="text-sm text-center md:text-left w-full mt-2 opacity-80">
                  {symptom.description}
                </p>
              </button>
            ))}
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center text-foreground/60 text-sm">
            <p>Tidak yakin apa gejalanya? 
              <button 
                onClick={() => navigate("/")}
                className="text-primary hover:underline ml-1 font-semibold"
              >
                Kembali ke beranda
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
