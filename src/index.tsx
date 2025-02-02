import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderContext } from "./app/Provider/ThemeProvider";
import { StoreProvider } from "./app/Provider/Store";
import { ErrorBoundary } from "./app/Provider/ErrorBoundary";
import App from "./app/App";

import "./app/styles/main.scss";
import "./shared/config/i18n";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <StoreProvider>
        <ThemeProviderContext>
          <App />
        </ThemeProviderContext>
      </StoreProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
