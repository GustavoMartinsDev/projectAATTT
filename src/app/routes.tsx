import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MasterFiles } from "./pages/MasterFiles";
import { RenomearDBN1 } from "./pages/RenomearDBN1";
import { ModeloExpDBN0 } from "./pages/ModeloExpDBN0";
import { ModeloExpDBN1 } from "./pages/ModeloExpDBN1";
import { GeradorJSON } from "./pages/GeradorJSON";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: MasterFiles },
      { path: "masterfiles", Component: MasterFiles },
      { path: "renomear-dbn1", Component: RenomearDBN1 },
      { path: "modelo-exp-dbn0", Component: ModeloExpDBN0 },
      { path: "modelo-exp-dbn1", Component: ModeloExpDBN1 },
      { path: "gerador-json", Component: GeradorJSON },
    ],
  },
]);
