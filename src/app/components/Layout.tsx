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
} from "lucide-react";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/masterfiles", label: "MasterFiles", icon: Files },
    { path: "/renomear-dbn1", label: "Renomear DBN1", icon: RefreshCw },
    { path: "/modelo-exp-dbn0", label: "Modelo DBN0", icon: Database },
    { path: "/modelo-exp-dbn1", label: "Modelo DBN1", icon: FileEdit },
    { path: "/gerador-json", label: "Gerador JSON", icon: FileJson },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0099AB]/8 via-white to-[#005884]/6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#0099AB]/10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logoAltaiaLabs.png"
                alt="Open Labs"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-sm font-bold text-[#333333]">
                  App Automation
                </h1>
                <p className="text-xs text-[#0099AB] font-500">Automation</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#0099AB]/10 text-[#005884] shadow-inner"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0099AB]"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-[#0099AB]/10 text-[#005884]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white/50 text-center py-4 border-t border-[#0099AB]/10">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Altaia - v1.0.0
        </p>
      </footer>
    </div>
  );
}
