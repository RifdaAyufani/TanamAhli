import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Cloud,
  Droplets,
  Heart,
  Cat,
  Zap,
  ChevronLeft,
} from "lucide-react";

type Step = "greeting" | "location" | "care" | "pet" | "loading";

interface WizardAnswers {
  location: string | null;
  care: string | null;
  pet: string | null;
}

const LocationOptions = [
  {
    id: "bright-window",
    label: "Near a bright window",
    description: "Lots of natural light",
    icon: <Sun className="w-8 h-8" />,
  },
  {
    id: "desk",
    label: "On a work desk (low light)",
    description: "Office or indoor space",
    icon: <Cloud className="w-8 h-8" />,
  },
  {
    id: "bathroom",
    label: "In the bathroom (humid)",
    description: "Steamy and moist",
    icon: <Droplets className="w-8 h-8" />,
  },
];

const CareOptions = [
  {
    id: "forgetful",
    label: "I'm very forgetful",
    description: "Water me rarely!",
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: "consistent",
    label: "I'm pretty consistent",
    description: "I can water regularly",
    icon: <Heart className="w-8 h-8" />,
  },
];

const PetOptions = [
  {
    id: "yes-pets",
    label: "Yes, I have pets!",
    description: "Cats or dogs at home",
    icon: <Cat className="w-8 h-8" />,
  },
  {
    id: "no-pets",
    label: "No pets at home",
    description: "Safe to have any plant",
    icon: <Heart className="w-8 h-8" />,
  },
];

function AnswerCard({
  option,
  selected,
  onClick,
}: {
  option: (typeof LocationOptions)[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-3 ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border/50 bg-background hover:border-primary/50 hover:bg-primary/5"
      }`}
    >
      <div className={`text-foreground ${selected ? "text-primary" : ""}`}>
        {option.icon}
      </div>
      <div>
        <p className={`font-semibold text-base ${selected ? "text-primary" : "text-foreground"}`}>
          {option.label}
        </p>
        <p className="text-sm text-foreground/60">{option.description}</p>
      </div>
    </button>
  );
}

function ChatBubble({ message, isBot }: { message: string; isBot: boolean }) {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-md rounded-2xl px-6 py-4 ${
          isBot
            ? "bg-primary/10 text-foreground border border-primary/20"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="text-base leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-foreground/60 text-sm">Finding your perfect green friend...</p>
    </div>
  );
}

export default function Wizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("greeting");
  const [answers, setAnswers] = useState<WizardAnswers>({
    location: null,
    care: null,
    pet: null,
  });
  const [showLoading, setShowLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    {
      text: "Hi there! 👋 I'm Tanamahli, your friendly plant expert. Let's find the perfect plant for you!",
      isBot: true,
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === "greeting") {
        setStep("location");
        setMessages((prev) => [
          ...prev,
          {
            text: "Where will you put your new plant?",
            isBot: true,
          },
        ]);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleLocationSelect = (locationId: string) => {
    const selected = LocationOptions.find((opt) => opt.id === locationId);
    if (selected) {
      setAnswers({ ...answers, location: locationId });
      setMessages((prev) => [
        ...prev,
        {
          text: selected.label,
          isBot: false,
        },
      ]);
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setStep("care");
        setMessages((prev) => [
          ...prev,
          {
            text: `Got it, a ${selected.label.toLowerCase()}! Now, how often do you remember to water?`,
            isBot: true,
          },
        ]);
      }, 1500);
    }
  };

  const handleCareSelect = (careId: string) => {
    const selected = CareOptions.find((opt) => opt.id === careId);
    if (selected) {
      setAnswers({ ...answers, care: careId });
      setMessages((prev) => [
        ...prev,
        {
          text: selected.label,
          isBot: false,
        },
      ]);
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setStep("pet");
        setMessages((prev) => [
          ...prev,
          {
            text: "One more thing! Do you have any curious pets (cats or dogs)?",
            isBot: true,
          },
        ]);
      }, 1500);
    }
  };

  const handlePetSelect = (petId: string) => {
    const selected = PetOptions.find((opt) => opt.id === petId);
    if (selected) {
      setAnswers({ ...answers, pet: petId });
      setMessages((prev) => [
        ...prev,
        {
          text: selected.label,
          isBot: false,
        },
      ]);
      setShowLoading(true);
      setTimeout(() => {
        setStep("loading");
        const encodedAnswers = new URLSearchParams({
          location: answers.location || "",
          care: answers.care || "",
          pet: petId,
        }).toString();
        navigate(`/wizard/recommendations?${encodedAnswers}`);
      }, 1500);
    }
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
          Kembali ke Shop
        </button>
      </div>

      {/* Main Chat Area */}
      <section className="flex-1 px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Chat Messages */}
          <div className="mb-8 min-h-32">
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg.text} isBot={msg.isBot} />
            ))}
            {showLoading && <LoadingAnimation />}
          </div>

          {/* Answer Options */}
          {step === "location" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LocationOptions.map((option) => (
                <AnswerCard
                  key={option.id}
                  option={option}
                  selected={answers.location === option.id}
                  onClick={() => handleLocationSelect(option.id)}
                />
              ))}
            </div>
          )}

          {step === "care" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CareOptions.map((option) => (
                <AnswerCard
                  key={option.id}
                  option={option}
                  selected={answers.care === option.id}
                  onClick={() => handleCareSelect(option.id)}
                />
              ))}
            </div>
          )}

          {step === "pet" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PetOptions.map((option) => (
                <AnswerCard
                  key={option.id}
                  option={option}
                  selected={answers.pet === option.id}
                  onClick={() => handlePetSelect(option.id)}
                />
              ))}
            </div>
          )}

          {step === "loading" && (
            <div className="flex justify-center items-center py-12">
              <LoadingAnimation />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
