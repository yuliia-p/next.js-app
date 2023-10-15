import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Yuliia. I am a graduate of a Full-Immersion Web Development Program with a passion for web development and graphic design.</p>
        <p>I have freelance experience as a Web Developer, specializing in WordPress and Shopify. I am excited to apply my knowledge and learn more in the field, having built a strong foundation in design principles and programming languages.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <Link href="/posts/first-post">Check this page!</Link>
      </section>
    </Layout>
  );
}