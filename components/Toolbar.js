import Link from 'next/link';
import styled from 'styled-components';

const Toolbar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/feed/1'>
            <a>Feed</a>
          </Link>
        </li>
        <li>
          <Link href='/eom'>
            <a>Employee</a>
          </Link>
        </li>
      </ul>
    </StyledNav>
  );
};
const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #222831;
  color: #ffffff;
  height: 60px;
  display: flex;
  justify-content: center;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    li {
      margin: 0 1rem;
      a {
        opacity: 0.8;
        transition: all 0.5s ease-in-out;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;

export default Toolbar;
