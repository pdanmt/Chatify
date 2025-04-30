import { Provider } from "@/components/ui/provider";
import { ConversationContextProvider } from "@/context/conversation-context";
import { UserContextProvider } from "@/context/user-context";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatify",
  description: "App de conversas usando e-mail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${roboto.variable}`} suppressHydrationWarning>
        <Provider>
          <UserContextProvider>
            <ConversationContextProvider>
              {children}
            </ConversationContextProvider>
          </UserContextProvider>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar
            theme='dark'
          />
        </Provider>
      </body>
    </html>
  );
}
