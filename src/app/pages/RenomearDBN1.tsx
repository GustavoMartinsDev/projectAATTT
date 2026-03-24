import { useState, useRef } from "react";
import { FolderOpen, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export function RenomearDBN1() {
  const [folderPath, setFolderPath] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleRename = () => {
    if (!folderPath.trim()) {
      alert("Por favor, selecione uma pasta");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFolderPath(files[0].name);
    }
  };

  const openFolderDialog = () => {
    folderInputRef.current?.click();
  };

  return (
    <div className="space-y-8 slide-in-up">
      {/* Page Header with Gradient */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-r from-[#0099AB]/12 to-[#005884]/8 border border-[#0099AB]/15 text-[#333333]">
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0099AB] to-[#005884] flex items-center justify-center flex-shrink-0 shadow-sm">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-1 text-[#333333]">
              Renomear DBN1
            </h1>
            <p className="text-sm text-[#666666]">
              Renomeie seus arquivos exportados com facilidade e organize seus
              dados
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="modern-card p-8">
        <div className="space-y-8">
          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#0099AB]" />
              Selecione a Pasta de Origem
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
                placeholder="Caminho da pasta com os arquivos DBN1..."
                className="flex-1 px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all bg-white/50 hover:bg-white"
              />
              <button
                onClick={openFolderDialog}
                className="btn-primary flex items-center justify-center gap-2 flex-shrink-0"
              >
                <FolderOpen className="w-4 h-4" />
                Procurar
              </button>
              <input
                ref={folderInputRef}
                type="file"
                onChange={handleFolderSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleRename}
          disabled={isProcessing}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="loader" />
              Processando...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              Renomear Arquivos
            </>
          )}
        </button>
      </div>

      {/* Help Section */}
      <div className="hidden rounded-lg bg-[#0099AB]/8 border border-[#0099AB]/25 border-l-4 border-l-[#0099AB] p-6 space-y-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#0099AB] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#333333] mb-4">
              📘 Como Usar Esta Ferramenta
            </p>
            <ul className="space-y-3 text-sm text-[#666666]">
              <li>
                <strong className="text-[#333333]">Pasta de Origem:</strong>{" "}
                Selecione a pasta contendo seus arquivos DBN1 exportados que
                desejam ser renomeados
              </li>
              <li>
                <strong className="text-[#333333]">
                  Padrão de Renomeação:
                </strong>{" "}
                Os arquivos serão renomeados automaticamente seguindo o padrão
                da empresa
              </li>
              <li>
                <strong className="text-[#333333]">Backup:</strong> Recomendamos
                fazer backup dos arquivos antes de renomear
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
