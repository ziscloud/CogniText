import { MilkdownProvider } from "@milkdown/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { create, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';
import extensions from "./extensions";
import { init } from "@neutralinojs/lib";

const moInstance = create({
    extensions: extensions,
});

const App = () => moInstance.render(<Workbench />);

const root$ = document.getElementById("app");
if (!root$) throw new Error("No root element found");

const root = createRoot(root$);

root.render(
  <StrictMode>
    <MilkdownProvider>
      <App />
    </MilkdownProvider>
  </StrictMode>
);

init();
