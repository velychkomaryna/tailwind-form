"use client";

import { QueryClient, QueryClientProvider } from "react-query";
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
            {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
