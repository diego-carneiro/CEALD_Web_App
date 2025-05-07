import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

type Guest = {
  name: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 24,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  row: {
    fontSize: 12,
    marginVertical: 4,
  },
});

const GuestListPDF = ({ data }: { data: Guest[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Lista de Assistidos</Text>
      {data.map((item, index) => (
        <Text style={styles.row} key={index}>
          {index + 1}. {item.name}
        </Text>
      ))}
    </Page>
  </Document>
);

export default function ADM() {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);

  const formattedDate = dayjs().format("DD-MM-YYYY");

  const fetchGuestList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://ceald-api.onrender.com/guestList"
      );
      setGuestList(response.data);
    } catch (error) {
      console.error("Erro ao buscar lista de assistidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestList();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
          <img
            className="h-8 w-auto md:h-12"
            src="/assets/img/cealdlogo.png"
            alt="Logo CEALD"
          />
          <h1 className="text-xl font-bold text-center hidden md:block">
            Lista de assistidos
          </h1>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
            {/* Botão de atualizar - visível apenas no desktop */}
            <Button
              onClick={fetchGuestList}
              className="hidden md:inline-flex bg-gray-200 hover:bg-gray-300 text-gray-800"
              disabled={loading}
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </Button>

            <PDFDownloadLink
              document={<GuestListPDF data={guestList} />}
              fileName={`lista-de-assistidos-${formattedDate}.pdf`}
            >
              {({ loading }) => (
                <Button className="w-20 h-8 px-3 text-sm md:w-auto md:h-10 md:px-4 md:text-base bg-blue-500 hover:bg-blue-600 text-white">
                  {loading ? "Gerando..." : "Imprimir"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        {/* Tabela */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guestList.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-zinc-700">
                  {index + 1}
                </TableCell>
                <TableCell className="text-zinc-800">
                  {item.name || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
