import { useState, useRef } from "react";
import {
  FolderOpen,
  FileJson,
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";

export function GeradorJSON() {
  const [packPath, setPackPath] = useState("");
  const [inventoryNames, setInventoryNames] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const packInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    if (!packPath.trim() || !inventoryNames.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 300);
  };

  const handlePackSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPackPath(files[0].name);
    }
  };

  const openPackDialog = () => {
    packInputRef.current?.click();
  };

  const inventoryCount = inventoryNames
    .split("\n")
    .filter((x) => x.trim()).length;

  return (
    <div className="space-y-8 slide-in-up">
      {/* Page Header with Gradient */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-r from-[#0099AB]/12 to-[#005884]/8 border border-[#0099AB]/15 text-[#333333]">
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0099AB] to-[#005884] flex items-center justify-center flex-shrink-0 shadow-sm">
            <FileJson className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-1 text-[#333333]">
              Gerador de JSON
            </h1>
            <p className="text-sm text-[#666666]">
              Crie arquivos JSON automaticamente a partir de seus dados e
              inventários
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 hidden">
        <div className="modern-card p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0099AB] to-[#005884] flex items-center justify-center flex-shrink-0 shadow-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#999999] font-500">Pack</p>
              <p className="text-lg font-bold text-[#333333]">
                {packPath ? "Selecionado" : "Não selecionado"}
              </p>
            </div>
          </div>
        </div>

        <div className="modern-card p-6 hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#005884] to-[#002E48] flex items-center justify-center flex-shrink-0 shadow-lg">
              <FileJson className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#999999] font-500">Elementos</p>
              <p className="text-lg font-bold text-[#333333]">
                {inventoryCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="modern-card p-8">
        <div className="space-y-8">
          {/* Pack Selection */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#0099AB]" />
              Selecione o Pack
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={packPath}
                onChange={(e) => setPackPath(e.target.value)}
                placeholder="Caminho do pack para geração de JSON..."
                className="flex-1 px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all bg-white/50 hover:bg-white"
              />
              <button
                onClick={openPackDialog}
                className="btn-primary flex items-center justify-center gap-2 flex-shrink-0"
              >
                <FolderOpen className="w-4 h-4" />
                Procurar
              </button>
              <input
                ref={packInputRef}
                type="file"
                onChange={handlePackSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

          {/* Inventory Names */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <FileJson className="w-5 h-5 text-[#0099AB]" />
              Elementos da Coluna Inventory Name
            </label>
            <textarea
              value={inventoryNames}
              onChange={(e) => setInventoryNames(e.target.value)}
              placeholder="Digite cada elemento em uma linha..."
              className="w-full px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all resize-none bg-white/50 hover:bg-white min-h-[160px] font-mono text-sm"
            />
            {inventoryNames && (
              <p className="text-xs text-[#999999] mt-2">
                {inventoryCount} elemento(s) adicionado(s)
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {progress > 0 && (
            <div className="space-y-3 p-4 rounded-lg bg-[#0099AB]/8 border border-[#0099AB]/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {progress < 100 ? (
                    <>
                      <div className="w-2 h-2 bg-[#0099AB] rounded-full animate-pulse" />
                      <span className="text-sm font-600 text-[#333333]">
                        Gerando JSON...
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#00aa44]" />
                      <span className="text-sm font-600 text-[#00aa44]\">
                        Concluído!
                      </span>
                    </>
                  )}
                </div>
                <span className="text-sm font-600 text-[#0099AB]\">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden border border-blue-200">
                <div
                  className="h-full bg-gradient-to-r from-[#0099AB] to-[#005884] transition-all duration-300 rounded-full shadow-lg"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleCreate}
          disabled={isProcessing}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="loader" />
              Gerando...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Criar JSON
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
                <strong className="text-[#333333]">Pack:</strong> Selecione o
                caminho do pack contendo os dados que serão convertidos para
                JSON
              </li>
              <li>
                <strong className="text-[#333333]">Inventários:</strong> Liste
                todos os nomes dos inventários que devem ser incluídos no
                arquivo JSON, um por linha
              </li>
              <li>
                <strong className="text-[#333333]">Geração:</strong> O sistema
                criará um arquivo JSON estruturado e validado com os dados
                fornecidos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
