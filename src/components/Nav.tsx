import React from 'react';
import styled from "styled-components";

const Logo = styled.div`
  flex: 0 0 auto;

  img {
    height: 60px;
  }
`;
const Menu = styled.ul`
  list-style: none;
  display: inline-flex;
  flex: 1 0 auto;

  li {
    margin: 0 12px;

    a {
      color: var(--main-text-color);
      list-style-image: none;
      list-style-position: outside;
      list-style-type: none;
      outline: none;
      text-decoration: none;
      text-size-adjust: 100%;
      touch-action: manipulation;
      transition: color 0.3s;
      padding-bottom: 15px;

      img {
        max-height: 26px;
      }
    }

    a:hover, a:active {
      color: rgb(131, 146, 161);
      border-bottom: 4px solid var(--title-text-color);
    }

  }
`;

 
const Navigation = () => {
    return (
       <header>
      <Logo><a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
         <img alt="" src="outside-io-logo.jpeg"/></a>
      </Logo>
       <Menu>
         <li><a href="/">Home</a></li>
         <li><a href="/about">About</a></li>
       </Menu>
       </header>
    );
}
 
export default Navigation;