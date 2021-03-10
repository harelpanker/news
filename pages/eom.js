import styled from 'styled-components';

const EOM = ({ employee }) => {
  return (
    <StyledMain>
      <h1>Employee of the month</h1>
      <div>
        <h2>{employee.name}</h2>
        <h6>{employee.position}</h6>
        <img src={`${employee.image}`} alt={employee.name} />
        <p>{employee.description}</p>
      </div>
    </StyledMain>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth'
  );
  const employee = await res.json();
  return {
    props: {
      employee,
    }, // will be passed to the page component as props
  };
};

const StyledMain = styled.main`
  min-height: 100vh;
  padding: 6rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 4rem;
    margin-bottom: 5rem;
  }
  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  h6 {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  img {
    border-radius: 50%;
    margin-bottom: 2rem;
    max-width: 100%;
  }
  @media only screen and (max-width: 520px) {
    h1 {
      font-size: 3rem;
      margin-bottom: 4rem;
    }
  }
`;

export default EOM;
