import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Check, X, AlertCircle, Loader2, Ticket, Users } from "lucide-react";

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
  const [showLimitDialog, setShowLimitDialog] = useState(false); // Novo Modal de Limite
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

    // UPDATE 1: Validação de Nome e Sobrenome
    const nameParts = guestName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      alert("Por favor, insira seu nome completo (nome e sobrenome).");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Por favor, insira um número de celular com DDD.");
      return;
    }

    const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Número inválido. Use o formato (XX) 9XXXX-XXXX.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://ceald-api.onrender.com/guest",
        { name: guestName, phoneNumber: phoneNumber },
      );

      const createdGuest = response.data;

      // UPDATE 2: Lógica de limite de 60 senhas
      if (createdGuest.position > 60) {
        setShowLimitDialog(true);
      } else {
        setPosition(createdGuest.position);
        setShowDialog(true);
      }

      setGuestName("");
      setPhoneNumber("");
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data === "Guest with this phone number already exists"
      ) {
        setShowPhoneErrorDialog(true);
      } else {
        alert("Erro ao gerar senha. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length < 3) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  return (
    <>
      {/* MODAL DE SUCESSO (Mantido) */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-blue-500/20 max-w-md [&>button]:hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 rounded-lg pointer-events-none"></div>
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
            <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Senha Retirada!
            </DialogTitle>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-4 text-center">
              <span className="text-xl font-semibold text-blue-200 flex justify-center gap-2">
                <Ticket /> Sua Senha
              </span>
              <div className="inline-block bg-white/10 border border-blue-400/30 rounded-lg px-10 py-5">
                <span className="text-6xl font-bold text-white">
                  {position}
                </span>
              </div>
              <p className="text-gray-200">
                Guarde sua senha e tenha um ótimo atendimento!
              </p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* UPDATE 2: NOVO MODAL DE LIMITE EXCEDIDO (MODERNO/AMARELO-ALERTA) */}
      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-amber-900/40 to-slate-900 border-amber-500/20 max-w-md [&>button]:hidden overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
          <button
            onClick={() => setShowLimitDialog(false)}
            className="absolute right-4 top-4 rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <DialogHeader className="relative z-10 space-y-6 py-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 p-5 rounded-full shadow-2xl">
                  <Users
                    className="w-12 h-12 text-slate-900"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>

            <DialogTitle className="text-center text-3xl font-black bg-gradient-to-b from-amber-200 to-orange-400 bg-clip-text text-transparent px-4">
              Limite Atingido
            </DialogTitle>

            <div className="bg-slate-950/50 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <p className="text-amber-100 text-lg text-center leading-relaxed">
                Infelizmente o limite máximo de{" "}
                <span className="font-bold text-white text-xl">60 senhas</span>{" "}
                para hoje já foi preenchido.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <p className="text-slate-400 text-sm text-center">
                Agradecemos a compreensão. Por favor, retorne em nossa próxima
                data de atendimento.
              </p>
            </div>

            <Button
              onClick={() => setShowLimitDialog(false)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-6 rounded-xl transition-all"
            >
              Entendido
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* MODAL DE ERRO TELEFONE (Ajustado) */}
      <Dialog
        open={showPhoneErrorDialog}
        onOpenChange={setShowPhoneErrorDialog}
      >
        <DialogContent className="bg-gradient-to-br from-slate-900 via-red-900/40 to-slate-900 border-red-500/20 max-w-md [&>button]:hidden">
          <button
            onClick={() => setShowPhoneErrorDialog(false)}
            className="absolute right-4 top-4 rounded-full p-2 bg-white/10 hover:bg-white/20 z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <DialogHeader className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-500 p-4 rounded-2xl">
                <AlertCircle className="w-14 h-14 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-3xl font-bold text-red-200">
              Atenção
            </DialogTitle>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-gray-200">
              Este número de celular já retirou uma senha hoje.
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* FORMULÁRIO PRINCIPAL */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 space-y-8">
          <div className="flex justify-center">
            <img
              className="w-44"
              src="/assets/img/cealdlogo.png"
              alt="Logo CEALD"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="nome"
                className="text-zinc-700 font-semibold ml-1"
              >
                Nome Completo
              </Label>
              <Input
                id="nome"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Ex: João Silva"
                className="h-12 text-lg border-slate-200 focus:ring-blue-500 rounded-xl"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="telefone"
                className="text-zinc-700 font-semibold ml-1"
              >
                Celular com DDD
              </Label>
              <Input
                id="telefone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(00) 90000-0000"
                className="h-12 text-lg border-slate-200 focus:ring-blue-500 rounded-xl"
                disabled={isLoading}
              />
            </div>

            {isLoading && showSlowLoadingMessage && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 animate-pulse">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <p className="text-sm text-blue-700 font-medium">
                  Finalizando sua solicitação...
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="h-14 w-full text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-blue-200 hover:shadow-lg transition-all rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Gerar minha Senha"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
