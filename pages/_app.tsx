import { UIProvider } from '@/context/ui/UIProvider';
import '@/styles/globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <ThemeProvider>
          <Toaster richColors closeButton />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </UIProvider>
    </QueryClientProvider>
  );
}
