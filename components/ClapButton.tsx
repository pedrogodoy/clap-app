import * as React from 'react'
import { IClaps, User } from '../interfaces'

const API_URL: string = 'localhost:3333/articles/claps';

type ClapButtonProps = {
  claps: number
}

const ClapButton = ({ claps: user }: ClapButtonProps) => (
  <div>
    <button>CLAP</button>
  </div>
)

export default ClapButton
export async function getStaticProps() {
  const res = await fetch(API_URL)
  const claps: IClaps = await res.json()
  console.log(claps);

  return {
    props: {
      claps,
    },
  }
}
