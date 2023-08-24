import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Head>
        <meta name="google-site-verification" content="ufjB4lpFxeLeyrleMdoU3BtoNleUMd-Wb53g-gZzEiQ" />
      </Head>
      <Navbar />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}
