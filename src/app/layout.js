"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { store } from './store'
import { Provider } from 'react-redux'
import "./globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            {children}
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
