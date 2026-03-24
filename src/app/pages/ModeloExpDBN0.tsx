import { useState, useRef } from "react";
import { FolderOpen, Database, Download, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export function ModeloExpDBN0() {
  const [savePath, setSavePath] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  const [schema, setSchema] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const savePathInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (!savePath.trim() || !inventoryName.trim() || !schema.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleSavePathSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSavePath(files[0].name);
    }
  };

  const openSavePathDialog = () => {
    savePathInputRef.current?.click();
  };

  return (
    <div className="space-y-8 slide-in-up">
      {/* Page Header with Gradient */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-r from-[#0099AB]/12 to-[#005884]/8 border border-[#0099AB]/15 text-[#333333]">
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0099AB] to-[#005884] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-1 text-[#333333]">
              Modelo Exp DBN0
            </h1>
            <p className="text-sm text-[#666666]">
              Exporte modelos de banco de dados DBN0 com todas as configurações
              necessárias
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="modern-card p-8">
        <div className="space-y-8">
          {/* Save Path */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-[#0099AB]" />
              Onde Deseja Salvar
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={savePath}
                onChange={(e) => setSavePath(e.target.value)}
                placeholder="Caminho de destino para salvar os arquivos..."
                className="flex-1 px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all bg-white/50 hover:bg-white"
              />
              <button
                onClick={openSavePathDialog}
                className="btn-primary flex items-center justify-center gap-2 flex-shrink-0"
              >
                <FolderOpen className="w-4 h-4" />
                Procurar
              </button>
              <input
                ref={savePathInputRef}
                type="file"
                onChange={handleSavePathSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

          {/* Inventory Name */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0099AB]" />
              Nome do Inventário
            </label>
            <textarea
              value={inventoryName}
              onChange={(e) => setInventoryName(e.target.value)}
              placeholder="Digite os nomes dos inventários DBN0 (um por linha)..."
              className="w-full px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all resize-none bg-white/50 hover:bg-white min-h-[120px]"
            />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

          {/* Schema */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0099AB]" />
              Schema do Banco de Dados
            </label>
            <input
              type="text"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder="Digite o schema (exemplo: dbo, public)..."
              className="w-full px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all bg-white/50 hover:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleGenerate}
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
              <Download className="w-5 h-5" />
              Gerar DBN0
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
                <strong className="text-[#333333]">Caminho de Destino:</strong>{" "}
                Escolha onde os arquivos DBN0 serão salvos (ex: D:\exports)
              </li>
              <li>
                <strong className="text-[#333333]">Inventário:</strong> Liste
                todos os inventários DBN0 que deseja exportar, um por linha
              </li>
              <li>
                <strong className="text-[#333333]">Schema:</strong> Especifique
                o schema do banco de dados (como dbo ou public)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
