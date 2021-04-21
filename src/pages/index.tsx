import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import  ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';


//Um episode
type Episode = {
  id: string;
  title: string;
  members: string;
  // ...
}

// Array de episodes
type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {

  return (
    <div>
      <p>{JSON.stringify(props)}</p>
      <h1>Index</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => { //Somente altera o método
  const { data } = await api.get('episodes?', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.file.url
    }
  })

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, //A cada 8 horas a pessoa vai gerar uma nova página HTML
  }
}