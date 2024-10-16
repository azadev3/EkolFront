import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslateContextProvider } from "./context/TranslateContext.tsx";
import ScrollToTop from "./ScrollToTop.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <TranslateContextProvider>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </TranslateContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
);
