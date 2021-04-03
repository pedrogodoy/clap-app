import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useDebounce } from 'use-lodash-debounce';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { IClaps } from '../types';
import { InferGetServerSidePropsType } from 'next';
import UseDebounce from '../components/UseDebounce';


export default function IndexPage({ 
  claps }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [clapData, setClapData] = React.useState(claps);
  const [showCounter, setShowCounter] = React.useState('none');
  const debouncedValue = UseDebounce(clapData.claps, 1000);

  useEffect(() => {
    makeRequest();
    
  }, [debouncedValue])

  const handleClaps = async () => {
    if(clapData.claps < 50) {
      setClapData({...clapData, claps: clapData.claps + 1 });
      setShowCounter('flex');
    }
  };


  const makeRequest = async () => {
    try {
      console.log('chamou');

      const res = await fetch('http://localhost:3333/articles/claps', {
        body: JSON.stringify({
          claps: clapData?.claps
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
  
      const result = await res.json()
      setShowCounter('none');
    } catch(err) {
      toast.notify('Não foi possível realizar a requisição!', {
        duration: 5,
        type: 'error'
      });
    }
  }


  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Medium App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <main className={styles.main}>
          <div className={styles.clapper}>
            <div className={styles.clapCounter} 
              style={{display: `${showCounter}`}}> +{clapData?.claps}</div>
            <button className={styles.clap} onClick={handleClaps}>
              {"👏"}
            </button>
            <span><h2>{clapData?.claps} claps</h2></span>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/claps');
  const claps: IClaps = await res.json();

  return {
    props: {
      claps
    }
  };
}