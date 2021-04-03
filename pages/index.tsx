import React, { useEffect } from 'react';
import Layout from '../components/Layout'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { IClaps } from '../types';
import { InferGetServerSidePropsType } from 'next';
import UseDebounce from '../components/UseDebounce';
import { pulse, fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

export default function IndexPage({ 
  claps }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [clapData, setClapData] = React.useState(claps);
  const [showCounter, setShowCounter] = React.useState('hidden');
  const [animate, setAnimate] = React.useState(false);
  const debouncedValue = UseDebounce(clapData.claps, 1000);

  useEffect(() => {
    makeRequest();
    
  }, [debouncedValue])

  const handleClaps = async () => {
    animate ? setAnimate(false) : setAnimate(true)

    if(clapData.claps < 50) {
      setClapData({...clapData, claps: clapData.claps + 1 });
      setShowCounter('visible');
    }
  };


  const makeRequest = async () => {
    try {
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
      setShowCounter('hidden');
    } catch(err) {
      toast.notify('Não foi possível realizar a requisição!', {
        duration: 5,
        type: 'error'
      });
    }
  }


  return (
    <StyleRoot>
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>Medium App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ToastContainer />
          <main className={styles.main}>
            <div id="clap" className={styles.clapper} style={animate ? styles1.pulse : undefined}>
            <div className={styles.clapCounter} 
                style={{visibility: `${showCounter}`}}> +{clapData?.claps}</div>
              <button className={styles.clap} onClick={handleClaps}>
                {"👏"}
              </button>
              <span><h2>{clapData?.claps} claps</h2></span>
            </div>
          </main>
        </div>
      </Layout>
    </StyleRoot>
  )
}
const styles1 = {
  pulse: {
    animation: 'x 100ms',
    animationName: Radium.keyframes(pulse, 'pulse')
  },
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
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