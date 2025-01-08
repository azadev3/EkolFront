import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslateContextProvider } from "./context/TranslateContext.tsx";
import ScrollToTop from "./ScrollToTop.tsx";
import { Helmet } from 'react-helmet';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    }
  }
});
export const HelmetTag = Helmet;

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
