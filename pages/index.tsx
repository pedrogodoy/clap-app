import React, { useEffect } from 'react';
import Layout from '../components/Layout'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useDebounce } from 'use-lodash-debounce';


export default function IndexPage({ claps }: any) {
  const [clapData, setClapData] = React.useState(claps.clap.claps || 0);
  const [showCounter, setShowCounter] = React.useState('none');
  const debouncedValue = useDebounce(clapData, 1000);

  useEffect(() => {
    makeRequest();
    
  }, [debouncedValue])

  const handleClaps = async () => {
    if(clapData < 50) {
      setClapData(clapData + 1);
      setShowCounter('flex');
      // handlerDebounce();
    }
  };


  const makeRequest = async () => {
    const res = await fetch('http://localhost:3333/articles/claps', {
      body: JSON.stringify({
        claps: clapData
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
    setClapData(result.claps);
    setShowCounter('none');
  }


  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Medium App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.clapper}>
            <div className={styles.clapCounter} 
              style={{display: `${showCounter}`}}> +{clapData}</div>
            <button className={styles.clap} onClick={handleClaps}>
              {"👏"}
            </button>
            <span><h2>{clapData} claps</h2></span>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/claps');
  const claps = await res.json();

  return {
    props: {
      claps
    }
  };
}
