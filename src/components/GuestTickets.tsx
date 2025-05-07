import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function NomeSenhaScreen() {
  const [guestName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert("Por favor, insira um nome.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://ceald-api.onrender.com/guest",
        {
          name: guestName,
        }
      );

      const createdGuest = response.data;

      setPosition(createdGuest.position);
      setShowDialog(true);
      setGuestName("");
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-zinc-100">
          <DialogHeader>
            <DialogTitle>Senha retirada com sucesso!</DialogTitle>
            <DialogDescription className="text-lg text-zinc-700 mt-8">
              Sua senha é:{" "}
              <span className="font-semibold text-blue-600 text-xl">
                {position}
              </span>
            </DialogDescription>
            <p className="mt-6 text-justify text-base text-zinc-700">
              Por gentileza, lembre-se de sua senha. Tenha um ótimo atendimento!
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-300 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="flex justify-center">
            <img
              className="w-40 md:w-52"
              src="/assets/img/cealdlogo.png"
              alt="Logo CEALD"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nome" className="text-base text-zinc-700">
                Insira seu nome:
              </Label>
              <Input
                id="nome"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Seu nome"
                className="text-lg"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="h-12 text-lg text-white font-semibold w-full bg-blue-500 hover:bg-blue-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Gerando..." : "Retire sua senha"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
