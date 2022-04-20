import { COLOR_BLACK, COLOR_WHITE } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import { StringProps } from "helpers/types";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
      margin:0;
      padding:0;
      border: 0;
      outline: 0;
      overflow-x: hidden;
      background-color: ${COLOR_BLACK};
      color: ${COLOR_WHITE};
      background-image: url("/assets/svg/grid.svg");
      background-size: auto;
    }

    :root {
      color-scheme: dark;
    }

    * {
      box-sizing: border-box;
      border: 0 solid;
    }

    html {
      scroll-behavior: smooth;
    }

    #__next {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    a {
      text-decoration: none;
      text-align: initial;
      outline: none;
      font-family: "Defcon Zero";
      display: flex;
      align-items: center;
    }

    button {
      padding: 0;
      line-height: inherit;
      cursor: pointer;
    }
    
    button, input, textarea {
      outline: none;
      border: 0;
    }

    h1 {
      font-size: 4rem;   
      line-height: 100%;   
      letter-spacing: 0.025rem;      
      font-family: "Defcon Zero Title";
      font-weight: 400;
      
      @media ${devices.tabletL} {
        font-size: 3rem;  
      }

      @media ${devices.tabletM} {
        font-size: 2.5rem;  
      }

      @media ${devices.mobileL} {
        font-size: 1.75rem;
      }

    }

    h2 {
      font-size: 5rem;   
      margin-bottom: 70px; 
      font-family: "Defcon Zero";

      @media ${devices.tabletM} {
        font-size: 3.75rem;    
      }

      @media ${devices.mobileL} {
        font-size: 2rem;    
      }
    }

    h3 {
      font-size: 2.5rem;    
      font-family: "Rubik Medium";
      font-weight: 600;
      
      @media ${devices.tabletL} {
        font-size: 1.8rem;  
      }
    }

    h4 {
      font-size: 1.25rem;    
      font-family: "Defcon Zero";
      color: #8FD8E7;
    }
    
    h1, h3, h4, h5, p {
      margin: 0;
      color: ${COLOR_WHITE};
    }

    p {
      line-height: 26px;
      font-family: "Rubik Regular";
    }

    p, button, input {
      font-size: 1rem;
    }
`;

export const AnimateSlideBurger = styled.div`
  &.burgerslide-transition-enter {
    transform: translateX(50%);
    -webkit-transform: translateX(50%);
    -moz-transform: translateX(50%);
    transition: transform 0.5s ease;
    -webkit-transition: -webkit-transform 0.5s ease;
    -moz-transition: -moz-transform 0.5s ease;
  }
  &.burgerslide-transition-enter-active {
    transform: none;
    -webkit-transform: none;
    -moz-transform: none;
    transition: transform 0.5s ease;
    -webkit-transition: -webkit-transform 0.5s ease;
    -moz-transition: -moz-transform 0.5s ease;
  }
  &.burgerslide-transition-exit {
    transform: none;
    -webkit-transform: none;
    -moz-transform: none;
  }
  &.burgerslide-transition-exit-active {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
    transition: transform 0.5s ease;
    -webkit-transition: -webkit-transform 0.5s ease;
    -moz-transition: -moz-transform 0.5s ease;
  }
`;

export const EaseInTransition = styled.div`
  &.ease-in-enter {
    opacity: 0;
  }
  &.ease-in-enter-active {
    opacity: 1;
    transition: opacity 400ms ease-in;
  }
  &.ease-in-exit {
    opacity: 1;
  }
  &.ease-in-exit-active {
    opacity: 0;
    transition: opacity 400ms ease;
  }
`;

export const PageHideOuterScroll = createGlobalStyle<StringProps>`
  @media ${devices.mobileM} {
    body {
      overflow-y: ${(p) => (p.shouldHide ? "hidden" : "auto")};
    }
  }
`;

export const AbsoluteDecoration = styled.div<StringProps>`
  position: absolute;
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
`;
