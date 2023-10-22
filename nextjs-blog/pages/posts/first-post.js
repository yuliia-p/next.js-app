import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';


export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>Marsha</h1>
      <Image
              priority
              src="/images/Marsha.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
      <h2>

        {/* <Link href="/">← Back to home</Link> */}
      </h2>
    </Layout>
  );
}