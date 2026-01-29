import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Check, X, AlertCircle, Loader2, Ticket } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function GuestTickets() {
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPhoneErrorDialog, setShowPhoneErrorDialog] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [showSlowLoadingMessage, setShowSlowLoadingMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowSlowLoadingMessage(true);
      }, 3000);
    } else {
      setShowSlowLoadingMessage(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert("Por favor, insira um nome.");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Por favor, insira um número de celular com DDD.");
      return;
    }

    const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Número inválido. Use o formato (XX) 9XXXX-XXXX, incluindo o DDD.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://ceald-api.onrender.com/guest",
        {
          name: guestName,
          phoneNumber: phoneNumber,
        },
      );

      const createdGuest = response.data;

      setPosition(createdGuest.position);
      setShowDialog(true);
      setGuestName("");
      setPhoneNumber("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data === "Guest with this phone number already exists"
      ) {
        setShowPhoneErrorDialog(true);
      } else {
        console.error(error);
        alert("Erro ao gerar senha. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length < 3) return digits;
    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-blue-500/20 max-w-md [&>button]:hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 rounded-lg"></div>

          <button
            onClick={() => setShowDialog(false)}
            className="absolute right-4 top-4 rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <DialogHeader className="relative z-10 space-y-6">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-400 to-cyan-400 p-4 rounded-2xl">
                  <Check className="w-14 h-14 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>

            <DialogTitle className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Senha Retirada com Sucesso!
            </DialogTitle>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-200">
                <Ticket className="w-6 h-6" />
                <span className="text-xl font-semibold">Sua Senha</span>
              </div>

              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-lg px-10 py-5">
                  <span className="text-6xl md:text-7xl font-bold text-white">
                    {position}
                  </span>
                </div>
              </div>

              <p className="text-gray-200 text-base md:text-lg text-center pt-2 leading-relaxed">
                Por gentileza, lembre-se de sua senha. Tenha um ótimo
                atendimento!
              </p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showPhoneErrorDialog}
        onOpenChange={setShowPhoneErrorDialog}
      >
        <DialogContent className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 border-red-500/20 max-w-md [&>button]:hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 rounded-lg"></div>

          <button
            onClick={() => setShowPhoneErrorDialog(false)}
            className="absolute right-4 top-4 rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <DialogHeader className="relative z-10 space-y-6">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 blur-2xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl">
                  <AlertCircle
                    className="w-14 h-14 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>

            <DialogTitle className="text-center text-3xl md:text-4xl font-bold text-red-200">
              Erro ao Gerar Senha
            </DialogTitle>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <p className="text-gray-200 text-lg md:text-xl text-center leading-relaxed">
                O número de celular deve ser único por consulente.
              </p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Modal de Erro */}
      <Dialog
        open={showPhoneErrorDialog}
        onOpenChange={setShowPhoneErrorDialog}
      >
        <DialogContent className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 border-red-500/20 max-w-md">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 rounded-lg"></div>

          <button
            onClick={() => setShowPhoneErrorDialog(false)}
            className="absolute right-4 top-4 rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 z-20"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <DialogHeader className="relative z-10 space-y-6">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 blur-2xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl">
                  <AlertCircle
                    className="w-12 h-12 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold text-red-200">
              Erro ao Gerar Senha
            </DialogTitle>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <p className="text-gray-200 text-base text-center leading-relaxed">
                O número de celular deve ser único por consulente.
              </p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 p-8 space-y-6">
          <div className="flex justify-center">
            <img
              className="w-40 md:w-52"
              src="/assets/img/cealdlogo.png"
              alt="Logo CEALD"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="nome"
                className="text-base text-zinc-700 font-medium"
              >
                Insira seu nome completo:
              </Label>
              <Input
                id="nome"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Seu nome"
                className="text-lg h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="telefone"
                className="text-base text-zinc-700 font-medium"
              >
                Número de celular (com DDD):
              </Label>
              <Input
                id="telefone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(99) 91234-5678"
                className="text-lg h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                disabled={isLoading}
              />
            </div>

            {isLoading && showSlowLoadingMessage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in duration-500">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Aguarde mais um pouco, sua senha está sendo gerada...
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="h-14 text-lg text-white font-semibold w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando...
                </span>
              ) : (
                "Retire sua senha"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
