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

  if (isOpen === null) {
    return null;
  }

  return (
    <>
      {!isOpen ? (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          <div className="relative z-10 w-full max-w-2xl space-y-8 md:space-y-12">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-50 animate-pulse"></div>
                <div className="flex justify-center mt-4">
                  <img
                    className="w-40 md:w-52"
                    src="/assets/img/cealdlogo.png"
                    alt="Logo CEALD"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-center text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent animate-pulse px-4">
              Horário Encerrado
            </h1>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10 space-y-6 md:space-y-8 mx-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-blue-300 flex-shrink-0 mt-1" />
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
                  O intervalo para a retirada de senhas se encerrou.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 md:pt-8">
                <div className="flex items-center justify-center gap-3 text-blue-200 mb-4">
                  <Clock className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="text-xl md:text-2xl font-semibold">
                    Horário de Atendimento
                  </span>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl px-8 md:px-12 py-4 md:py-5">
                    <span className="text-3xl md:text-5xl font-bold text-white">
                      12h às 14h
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-base md:text-lg text-center pt-4">
                Por favor, retorne durante o horário de atendimento.
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
