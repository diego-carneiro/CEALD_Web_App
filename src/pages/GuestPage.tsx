import { useEffect, useState } from "react";
import GuestTickets from "@/components/GuestTickets";
import axios from "axios";
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
    const checkAvailability = async () => {
      try {
        const response = await axios.get(
          "https://ceald-api.onrender.com/is-open"
        );
        setIsOpen(response.data.isOpen);
      } catch (error) {
        console.error("Erro ao verificar horário:", error);
        setIsOpen(false);
      }
    };

    checkAvailability();

    const now = dayjs();
    const nextCheck =
      now.hour() < 20
        ? now.set("hour", 20).set("minute", 0).set("second", 0)
        : now.add(1, "day").set("hour", 20).set("minute", 0).set("second", 0);

    const timeout = nextCheck.diff(now, "millisecond");

    const timeoutId = setTimeout(() => {
      checkAvailability();
    }, timeout);

    return () => clearTimeout(timeoutId);
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
                volte em outro horário.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <GuestTickets />
      )}
    </>
  );

  return <GuestTickets></GuestTickets>;
}
