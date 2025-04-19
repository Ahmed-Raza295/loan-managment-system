import React from 'react';
import styled from 'styled-components';

const Button = ({ title }) => {
  return (
    <StyledWrapper>
     <button type='button'>{title}</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    --color: #560bad;
    font-family: inherit;
    display: inline-block;
    width: 6em;
    height: 2.7em;
    line-height: 2.5em;
    margin: 20px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid blue;
    transition: color 0.5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    color: blue;
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: blue;
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }

  button:hover {
    color: white;
  }

  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: #578FCA;
    transition: background 0s;
  }`;

export default Button;
