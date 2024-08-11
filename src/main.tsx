import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslateContextProvider } from "./context/TranslateContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <TranslateContextProvider>
          <App />
        </TranslateContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </HashRouter>
);
