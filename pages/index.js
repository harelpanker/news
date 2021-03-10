import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next News</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main>
        <h1>Next.js News App</h1>
        <h3>Your one stop shop for the latest news articles</h3>
      </Main>
    </div>
  );
}

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 6rem 1rem;
`;
