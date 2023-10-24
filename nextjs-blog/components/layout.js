import Head from 'next/head';
import styles from './layout.module.css';
import LayoutStyles from './layout.module.css';
import Link from 'next/link';

const name = 'TOPList';
export const siteTitle = 'TOPList';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={LayoutStyles.spanTitle}>
        
          {home ? (
              {name}
            
          ) : (
            <Link href="/">
              {name}
            </Link>
          )}
        
        <nav className={LayoutStyles.nav}>
          <ul>
            <li>
              <Link href="/">
                Top Rated Movies
              </Link>
            </li>
            <li>
              <Link href="/now-playing">
                Now Playing Movies
              </Link>
            </li>
            <li>
              <Link href="/upcoming">
                Upcoming Movies
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={LayoutStyles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
