// import '../styles/global.css';

// export default function App({ Component, pageProps }) {
//   return (
//       <Component {...pageProps} />
//   );
// }
import { SessionProvider } from 'next-auth/react';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

