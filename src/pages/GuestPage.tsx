import { useEffect, useState } from "react";
import GuestTickets from "@/components/GuestTickets";
import dayjs from "dayjs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function GuestPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const now = dayjs();
    const currentHour = now.hour();

    const isWithinAllowedTime = currentHour >= 12 && currentHour < 22;

    setIsOpen(isWithinAllowedTime);
  }, []);

  if (isOpen === null) {
    return null;
  }

  return (
    <>
      {!isOpen ? (
        <Dialog open>
          <DialogContent className="bg-zinc-100">
            <DialogHeader>
              <DialogTitle>Horário Encerrado</DialogTitle>
              <DialogDescription className="text-zinc-700 text-justify mt-2">
                O intervalo para a retirada de senhas se encerrou. Por favor,
                volte entre 12h e 20h.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <GuestTickets />
      )}
    </>
  );
}
