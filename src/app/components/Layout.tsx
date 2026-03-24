import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Files,
  FileJson,
  FileEdit,
  Database,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/masterfiles", label: "MasterFiles", icon: Files },
    { path: "/renomear-dbn1", label: "Renomear DBN1", icon: RefreshCw },
    { path: "/modelo-exp-dbn0", label: "Modelo DBN0", icon: Database },
    { path: "/modelo-exp-dbn1", label: "Modelo DBN1", icon: FileEdit },
    { path: "/gerador-json", label: "Gerador JSON", icon: FileJson },
  ];

  const helpContent: Record<string, { title: string; items: string[] }> = {
    "/masterfiles": {
      title: "MasterFiles - Ajuda",
      items: [
        "Selecione o arquivo de pack usando o botão Procurar",
        "Preencha um nome descritivo para a pasta da masterfile",
        "Adicione elementos da coluna Inventory Name um por um",
        "Marque a opção Oracle se estiver usando banco de dados Oracle",
        "Clique em 'Criar Masterfile' para processar os dados",
      ],
    },
    "/renomear-dbn1": {
      title: "Renomear DBN1 - Ajuda",
      items: [
        "Use este módulo para renomear arquivos DBN1 exportados",
        "Clique em Procurar para selecionar a pasta com os arquivos",
        "Os arquivos serão renomeados seguindo um padrão consistente",
        "Certifique-se de fazer backup antes de processar",
        "O processo é executado automaticamente após seleção",
      ],
    },
    "/modelo-exp-dbn0": {
      title: "Modelo Exp DBN0 - Ajuda",
      items: [
        "Exporte modelos de banco de dados DBN0 com todas as configurações",
        "Selecione o caminho de destino para salvar os arquivos",
        "Digite os nomes dos inventários DBN0 (um por linha)",
        "Configure o schema conforme necessário",
        "Os arquivos serão gerados no formato adequado",
      ],
    },
    "/modelo-exp-dbn1": {
      title: "Modelo Exp DBN1 - Ajuda",
      items: [
        "Exporte modelos de relacionamento DBN1 com classes customizadas",
        "Defina o caminho de destino para os arquivos exportados",
        "Adicione os inventários necessários",
        "Configure o schema e o nome da classe",
        "Os modelos incluirão todos os relacionamentos DBN1",
      ],
    },
    "/gerador-json": {
      title: "Gerador JSON - Ajuda",
      items: [
        "Selecione o pack contendo os dados a serem convertidos",
        "Adicione os elementos da coluna Inventory Name",
        "O gerador criará arquivos JSON estruturados automaticamente",
        "Acompanhe o progresso da geração em tempo real",
        "Os arquivos JSON estarão prontos após conclusão",
      ],
    },
  };

  const currentHelp =
    helpContent[location.pathname] || helpContent["/masterfiles"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0099AB]/8 via-white to-[#005884]/6">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#0099AB]/10 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/logoAltaiaLabs.png"
            alt="Open Labs"
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-sm font-bold text-[#333333]">App Automation</h1>
            <p className="text-xs text-[#0099AB] font-500">Automation</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-[#0099AB]/10 rounded-lg transition-all duration-200 active:scale-95"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-[#333333]" />
          ) : (
            <Menu size={24} className="text-[#333333]" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block md:w-72 w-full bg-white/95 backdrop-blur-xl border-r border-[#0099AB]/10 shadow-sm flex flex-col md:h-screen`}
      >
        {/* Logo - Desktop only */}
        <div className="hidden md:block p-6 border-b border-[#0099AB]/10">
          <div className="flex items-center gap-3">
            <img
              src="/logoAltaiaLabs.png"
              alt="Open Labs"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-sm font-bold text-[#333333]">
                App Automation
              </h1>
              <p className="text-xs text-[#0099AB] font-500">Altaia</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          {/* Navigation */}
          <nav className="flex flex-col gap-2 p-6 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-lg font-500 text-sm transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-[#0099AB] to-[#005884] text-white shadow-lg shadow-[#0099AB]/30"
                      : "text-[#333333] hover:bg-[#0099AB]/8"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto animate-pulse" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer - Desktop only */}
          <div className="hidden md:flex md:flex-col gap-4 mt-auto p-4 border-t border-[#0099AB]/10">
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0099AB]/10 border border-[#0099AB]/25 hover:border-[#0099AB]/50 text-[#0099AB] font-500 text-sm transition-all hover:bg-[#0099AB]/15"
            >
              <HelpCircle className="w-4 h-4" />
              Ajuda
            </button>
            <div className="text-center space-y-2">
              <div className="h-px bg-gradient-to-r from-transparent via-[#0099AB]/20 to-transparent" />
              <p className="text-xs text-[#999999]">© 2026 Altaia</p>
              <p className="text-xs font-500 text-[#0099AB]">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Help Modal - Overlay */}
      {helpOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setHelpOpen(false)}
        />
      )}

      {/* Help Modal */}
      {helpOpen && (
        <div className="fixed bottom-0 md:bottom-auto md:top-60 md:right-0 left-76 right-0 md:w-96 bg-white/95 backdrop-blur-xl md:border-l border-t md:border-t-0 border-[#0099AB]/10 shadow-2xl z-50 max-h-[80vh] md:max-h-screen overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0099AB] to-[#005884] flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#333333]">
                    {currentHelp.title}
                  </h2>
                  <p className="text-xs text-[#999999]">Dúvidas e instruções</p>
                </div>
              </div>
              <button
                onClick={() => setHelpOpen(false)}
                className="p-2 hover:bg-[#0099AB]/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-[#333333]" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {currentHelp.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <AlertCircle className="w-4 h-4 text-[#0099AB]" />
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div className="rounded-lg bg-[#0099AB]/8 border border-[#0099AB]/25 p-4">
              <p className="text-xs text-[#666666]">
                Precisa de mais ajuda? Verifique a documentação completa ou
                contate o suporte.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
