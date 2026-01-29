/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Loader2, RotateCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  page: { padding: 24 },
  title: { fontSize: 18, marginBottom: 12, textAlign: "center" },
  row: { fontSize: 12, marginVertical: 4 },
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
  const [adminPassword, setAdminPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const formattedDate = dayjs().format("DD-MM-YYYY");

  const fetchGuestList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://ceald-api.onrender.com/guestList",
      );
      setGuestList(response.data);
    } catch (error) {
      console.error("Erro ao buscar lista de assistidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showContent) {
      fetchGuestList();
    }
  }, [showContent]);

  const verifyPassword = async () => {
    try {
      setIsAuthenticating(true);
      setAuthError("");

      const response = await axios.post(
        "https://ceald-api.onrender.com/admin-password",
        {
          password: adminPassword,
        },
      );

      if (response.status === 200) {
        setShowContent(true);
        setAuthError("");
      } else {
        setAuthError("Senha incorreta");
      }
    } catch (error) {
      setAuthError("Senha incorreta");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <>
      <Dialog open={!showContent}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-blue-500/20 sm:max-w-md [&>button]:hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 rounded-lg"></div>

          <DialogHeader className="relative z-10 space-y-6">
            <div className="flex justify-center mb-2">
              <div className="flex justify-center mt-4">
                <img
                  className="w-40 md:w-52"
                  src="/assets/img/cealdlogo.png"
                  alt="Logo CEALD"
                />
              </div>
            </div>

            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Acesso Administrativo
            </DialogTitle>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">
                  Senha de Administrador
                </label>
                <Input
                  type="password"
                  placeholder="Digite a senha"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  disabled={isAuthenticating}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400 mt-8"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isAuthenticating) {
                      verifyPassword();
                    }
                  }}
                />
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-300 text-sm text-center">
                    {authError}
                  </p>
                </div>
              )}

              <Button
                onClick={verifyPassword}
                disabled={isAuthenticating}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-base shadow-lg shadow-blue-500/30 disabled:opacity-70"
              >
                {isAuthenticating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {showContent && (
        <div className="min-h-screen bg-zinc-100 px-6 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
              <img
                className="hidden md:block h-8 w-auto md:h-12"
                src="/assets/img/cealdlogo.png"
                alt="Logo CEALD"
              />

              <h1 className="text-xl font-bold text-center hidden md:block">
                Lista de assistidos
              </h1>

              <div className="hidden md:flex md:gap-4 md:items-center">
                <Button
                  onClick={fetchGuestList}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar"}
                </Button>

                <PDFDownloadLink
                  document={<GuestListPDF data={guestList} />}
                  fileName={`lista-de-assistidos-${formattedDate}.pdf`}
                >
                  {({ loading }) => (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      {loading ? "Gerando..." : "Imprimir"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>

              <div className="flex md:hidden gap-2 items-center justify-end">
                <Button
                  onClick={fetchGuestList}
                  className="w-10 h-10 p-0 bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center"
                  disabled={loading}
                >
                  <RotateCw
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>

                <PDFDownloadLink
                  document={<GuestListPDF data={guestList} />}
                  fileName={`lista-de-assistidos-${formattedDate}.pdf`}
                >
                  {({ loading }) => (
                    <Button className="h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white">
                      {loading ? "Gerando..." : "Imprimir"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>

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
      )}
    </>
  );
}
