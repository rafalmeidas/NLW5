import React, { useEffect } from "react";

export default function Home(props) {
  
  return (
    <div>
      <p>{JSON.stringify(props)}</p>
      <h1>Index</h1>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, //A cada 8 horas a pessoa vai gerar uma nova página HTML
  }
}