import { useState, useRef } from "react";
import {
  FolderOpen,
  FileText,
  Database,
  Zap,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";

export function MasterFiles() {
  const [packPath, setPackPath] = useState("");
  const [masterfileName, setMasterfileName] = useState("");
  const [inventoryNames, setInventoryNames] = useState("");
  const [oracleChecked, setOracleChecked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const packInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    if (!masterfileName.trim()) {
      alert("Por favor, preencha o nome da masterfile");
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

  const stats = [
    { label: "Arquivos", value: "0", icon: FileText, color: "from-[#0099AB]" },
    { label: "Pastas", value: "0", icon: FolderOpen, color: "from-[#005884]" },
    {
      label: "Banco",
      value: "Oracle",
      icon: Database,
      color: "from-[#002E48]",
    },
  ];

  return (
    <div className="space-y-8 slide-in-up">
      {/* Page Header with Gradient */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-r from-[#0099AB]/12 to-[#005884]/8 border border-[#0099AB]/15 text-[#333333]">
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0099AB] to-[#005884] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-1 text-[#333333]">
              MasterFiles
            </h1>
            <p className="text-sm text-[#666666]">
              Crie e gerencie seus arquivos de masterfile com total controle e
              facilidade
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 hidden">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="modern-card group cursor-pointer"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="p-6 flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#999999] font-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-[#333333] group-hover:text-[#0099AB] transition-colors">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                value={packPath}
                onChange={(e) => setPackPath(e.target.value)}
                placeholder="Selecione o arquivo de pack..."
                className="flex-1 px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all bg-white/50 hover:bg-white"
                disabled={true}
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

          {/* Masterfile Name */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0099AB]" />
              Nome da Pasta da Masterfile
            </label>
            <input
              type="text"
              value={masterfileName}
              onChange={(e) => setMasterfileName(e.target.value)}
              placeholder="Digite um nome descritivo..."
              className="w-full px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all bg-white/50 hover:bg-white"
            />
            {masterfileName && (
              <p className="text-xs text-[#00aa44] mt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Nome válido
              </p>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

          {/* Inventory Names */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0099AB]" />
              Elementos da Coluna Inventory Name
            </label>
            <textarea
              value={inventoryNames}
              onChange={(e) => setInventoryNames(e.target.value)}
              placeholder="Digite cada elemento em uma linha..."
              className="w-full px-4 py-3 border-1.5 border-[#e0e0e0] rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0099AB] focus:border-transparent transition-all resize-none bg-white/50 hover:bg-white min-h-[140px]"
            />
            {inventoryNames && (
              <p className="text-xs text-[#999999] mt-2">
                {inventoryNames.split("\n").filter((x) => x.trim()).length}{" "}
                elemento(s) adicionado(s)
              </p>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#e0e0e0] to-transparent" />

          {/* Oracle Checkbox */}
          <div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#0099AB]/10 to-transparent border border-[#0099AB]/20">
              <Checkbox
                id="oracle"
                checked={oracleChecked}
                onCheckedChange={(checked) =>
                  setOracleChecked(checked as boolean)
                }
                className="border-[#0099AB]"
              />
              <div>
                <label
                  htmlFor="oracle"
                  className="text-sm font-600 text-[#333333] cursor-pointer block"
                >
                  Usar Masterfiles Oracle
                </label>
                <p className="text-xs text-[#999999] mt-1">
                  Otimiza a integração com bancos de dados Oracle
                </p>
              </div>
            </div>
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
                        Processando...
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#00aa44]" />
                      <span className="text-sm font-600 text-[#00aa44]">
                        Concluído!
                      </span>
                    </>
                  )}
                </div>
                <span className="text-sm font-600 text-[#0099AB]">
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

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center flex-col sm:flex-row">
        <button
          onClick={handleCreate}
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
              <Zap className="w-5 h-5" />
              Criar Masterfile
            </>
          )}
        </button>
        <button className="px-10 py-3 rounded-lg border border-[#e0e0e0] text-[#333333] hover:bg-[#0099AB]/10 transition-all font-600 text-sm">
          Limpar Formulário
        </button>
      </div>

      {/* Info Section */}
      {!isProcessing && progress === 0 && (
        <div className="hidden rounded-lg bg-[#0099AB]/8 border border-[#0099AB]/25 border-l-4 border-l-[#0099AB] p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#0099AB] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-600 text-[#333333]">
              Dica: Preencha todos os campos corretamente
            </p>
            <p className="text-xs text-[#999999] mt-1">
              Certifique-se de que o arquivo de pack existe e que o nome da
              masterfile não contém caracteres especiais.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
