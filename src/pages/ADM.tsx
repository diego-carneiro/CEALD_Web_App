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

// Tipagem dos dados recebidos
type Guest = {
  name: string;
};

// Estilos do PDF
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

// Componente PDF com dados
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

export default function ListaAssistidos() {
  const [guestList, setGuestList] = useState<Guest[]>([]);

  const fetchGuestList = async () => {
    try {
      const response = await axios.get(
        "https://ceald-api.onrender.com/guestList"
      );
      setGuestList(response.data);
    } catch (error) {
      console.error("Erro ao buscar lista de assistidos:", error);
    }
  };

  useEffect(() => {
    fetchGuestList();
    const interval = setInterval(fetchGuestList, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <img
            className="w-12 h-auto"
            src="src/assets/img/cealdlogo.png"
            alt="Logo CEALD"
          />
          <h1 className="text-2xl font-bold text-center flex-1">
            Lista de assistidos
          </h1>
          <div className="w-32 text-right">
            <PDFDownloadLink
              document={<GuestListPDF data={guestList} />}
              fileName="lista-de-assistidos.pdf"
            >
              {({ loading }) => (
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
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
