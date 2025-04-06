import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { authRequestInterceptor } from "./interceptors/useAuthInterceptor.ts";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "./components/ui/provider.tsx";

// Inicializa interceptores
authRequestInterceptor();

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <Provider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </ReduxProvider>
);
