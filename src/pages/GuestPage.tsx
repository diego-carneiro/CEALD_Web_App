import { useEffect, useState } from "react";
import GuestTickets from "@/components/GuestTickets";
import dayjs from "dayjs";
import { Clock, AlertCircle } from "lucide-react";

export default function GuestPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const now = dayjs();
    const currentHour = now.hour();
    const isWithinAllowedTime = currentHour >= 12 && currentHour < 14;
    setIsOpen(isWithinAllowedTime);
  }, []);

  if (isOpen === null) return null;

  return (
    <>
      {!isOpen ? (
        <div className="h-dvh w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-6 md:gap-10">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-30 animate-pulse"></div>
              <img
                className="w-32 md:w-48 relative z-10 object-contain"
                src="/assets/img/cealdlogo.png"
                alt="Logo CEALD"
              />
            </div>

            <h1 className="text-center text-3xl md:text-6xl font-extrabold bg-gradient-to-b from-white to-blue-300 bg-clip-text text-transparent px-4 tracking-tight">
              Horário Encerrado
            </h1>

            <div className="w-full bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-10 space-y-6 md:space-y-8">
              <div className="flex items-center justify-center gap-3 text-white/90">
                <AlertCircle className="w-6 h-6 text-blue-400" />
                <p className="text-lg md:text-xl font-medium">
                  Intervalo de senhas encerrado
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-center gap-2 text-blue-300/80 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm md:text-base font-bold uppercase tracking-widest">
                    Atendimento
                  </span>
                </div>

                <div className="text-center">
                  <div className="inline-block bg-white/5 border border-white/10 rounded-2xl px-6 py-3 md:px-10 md:py-4 shadow-2xl">
                    <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                      12h às 14h
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm md:text-base text-center font-medium">
                Por favor, retorne durante o horário de funcionamento.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <GuestTickets />
      )}
    </>
  );
}
