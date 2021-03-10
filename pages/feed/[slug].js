import { useRouter } from 'next/router';
import styled from 'styled-components';

function Feed({ articles, pageNumber }) {
  const router = useRouter();
  console.log(articles);
  // handler
  const prevPageHandler = () => router.push(`/feed/${pageNumber - 1}`);
  // handler
  const nextPageHandler = () => router.push(`/feed/${pageNumber + 1}`);

  return (
    <Main>
      {articles.map((article, index) => (
        <Card
          key={index}
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}
        </Card>
      ))}
      <Pagination>
        <button
          disabled={pageNumber === 1 || pageNumber < 1}
          onClick={prevPageHandler}
          className={pageNumber === 1 ? 'disabled' : ''}>
          PREV
        </button>
        <pre>#{pageNumber}</pre>
        <button
          disabled={pageNumber === 5 || pageNumber > 5}
          onClick={nextPageHandler}
          className={pageNumber === 5 ? 'disabled' : ''}>
          NEXT
        </button>
      </Pagination>
    </Main>
  );
}

// data fetching
export const getServerSideProps = async (context) => {
  const pageNumber = context.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  ).then((res) => res.json());

  const { articles } = apiResponse;

  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

// styles
const Pagination = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-top: 2rem;
  max-width: 100%;

  pre {
    font-size: 2rem;
    font-weight: 700;
  }
  button {
    padding: 0.6rem 2rem;
    border-radius: 0;
    border: 2px solid #222831;
    color: #222831;
    background-color: transparent;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 700;
    line-height: 1;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background-color: #222831;
    }
  }
  .disabled {
    cursor: not-allowed;
    color: grey;
    border: 2px solid grey;
    transition: all 0.3s ease;
    &:hover {
      color: #222831;
      background-color: grey;
    }
  }
`;
const Card = styled.a`
  width: 40rem;
  padding: 2rem;
  max-width: 100%;
  border-bottom: 1px solid #222831;
  cursor: pointer;

  img {
    width: 100%;
    max-height: 27rem;
    object-fit: cover;
    border-radius: 1rem;
  }
  p {
    margin: 0.5rem 0 2rem 0;
  }
  h2 {
    line-height: 1.1;
  }
  @media only screen and (max-width: 520px) {
    padding: 1rem;
    img {
      max-height: 12rem;
    }
  }
`;
const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 6rem 1rem;
`;

export default Feed;
