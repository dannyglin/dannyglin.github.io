
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`  
  @font-face {
    font-family: 'aqua';
    src: url('/fonts/aqua.ttf');
    font-weight: 600;
    font-style: normal;
    }
`;

export const SiteContainer = styled.div`
  position:absolute;
  top: 0;
  left: 0;
  & h1 {
    background: #a8c8f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #a8d0f8, #6b9bd3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #a8d0f8, #6b9bd3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-width: 1em;
    font-size: 14em;
    @media (max-width: 1564px) {
      font-size: 10em;
    }
    @media (max-width: 1245px) {
      font-size: 150px;
    }
    @media (max-width: 400px) {
      font-size: 50px;
    }
  }
  & p {
    @media (max-width: 400px) {
      font-size: 12px;
    }
  }

`

export const Container = styled.div`
  font-family: 'aqua';
  height: fit-content;
  width: 100vw;
  height: 100vh;
  color: white;
  & h1 {
    padding: 0;
    font-weight: 600;
  }
`
export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'aqua';
  height: 100vh;
  width: 100vw;
  padding-top: 60px;
  @media (max-width: 768px) {
    padding-top: 50px;
  }
  @media (max-width: 480px) {
    padding-top: 80px;
  }
  & p {
    color: #d0e1f0;
  }
  & h1 {
    padding: 0;
    font-weight: 600;
  }
`

export const AboutContainer = styled.div`
  font-family: 'aqua';
  height: 100vh;
  width: 100vw;
  color: #b5c5d8;
  padding-top: 60px;
  @media (max-width: 768px) {
    padding-top: 50px;
  }
  @media (max-width: 480px) {
    padding-top: 80px;
  }
  & h1 {
    padding: 0;
    margin: 0 0 0.05em 0;
    font-weight: 600;
  }
  & li {
    font-size: 14px;
  }
`

export const ProjectsContainer = styled.div`
  font-family: 'aqua';
  height: fit-content;
  width: 100vw;
  color: white;
  padding-top: 60px;
  @media (max-width: 768px) {
    padding-top: 50px;
  }
  @media (max-width: 480px) {
    padding-top: 80px;
  }
  & h1 {
    padding: 0;
    margin: 0 0 0.25em 0;
    font-weight: 600;
  }
`
export const ArtContainer = styled.div`
  font-family: 'aqua';
  height: fit-content;
  width: 100vw;
  color: white;
  padding-top: 60px;
  @media (max-width: 768px) {
    padding-top: 50px;
  }
  @media (max-width: 480px) {
    padding-top: 80px;
  }
  & h1 {
    padding: 0;
    margin: 0 0 0.05em 0;
    font-weight: 600;
  }
`

export const Center = styled.div`
text-align: center;
`

export const Profile = styled.div`
  margin-left: 20px;
  background-image: url('/about-section-pfp.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 600px;
  height: inherit;
  min-height: 500px;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 5px );
  -webkit-backdrop-filter: blur( 5px );
`

export const Emphasis = styled.span`
  color: #c7d7ee;
  font-size:20px;
`
export const Role = styled.span`
  color: #c7d7ee;
  font-size:12px;
`

export const View = styled.a`
  text-decoration: none;
  cursor: pointer;
  pointer-events: all;
  color: #c7d7ee;
  font-size:14px;
  transition: font-size 0.3s ease-in-out, color 0.3s ease-in-out;
  :hover {
    color: #a8c8f0;
    font-size: 15px;
  }
`
export const Navbar = styled.div`
  z-index: 100;
  font-family: 'aqua';
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-weight: 600;
  background: transparent;
  @media (max-width: 768px) {
    font-size: 14px;
    gap: 1rem;
    height: 50px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    gap: 0.5rem;
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }
  & a {
    text-decoration: none;
    cursor: pointer;
    color: #c7d7ee;
    transition: transform, color 0.3s ease-in-out;
    padding: 8px 12px;
    border-radius: 4px;
    @media (max-width: 480px) {
      padding: 4px 8px;
    }
  }
  & a:hover {
    transform: translateY(-2px);
    color: #a8c8f0;
    background: rgba(255, 255, 255, 0.1);
  }
`

export const RightMiddle = styled.div`
  position: absolute;
  font-family: 'aqua';
  top: 37vh;
  right: 5vw;
  font-weight: 300;
  font-size: 20px;
  width: 35ch;
  text-align: right;
`

export const Glass = styled.div`
  padding: 40px 40px;
  nargin: auto;
  width: 350px;
  background: rgba( 255, 255, 255, 0.2 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
  border-radius: 10px;
`

export const GlassCard = styled.div`
  pointer-events: none;
  position: relative;
  top: -300px;
  left: 0px;
  padding: 20px 40px;
  width: 300px;
  background: rgba( 255, 255, 255, 0.2 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  border-radius: 10px;
  margin: 30px;
  & p {
    color: #b5c5d8;
  }
`

export const ArtGlassCard = styled.div`
  pointer-events: none;
  padding: 20px 20px;
  width: 300px;
  background: rgba( 255, 255, 255, 0.2 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 12px );
  -webkit-backdrop-filter: blur( 12px );
  border-radius: 10px;
  margin: 30px;
  color: #8ca2b8;
  & img {
    border-radius: 10px;
  }
`

export const CardBody = styled.div`
  height: 270px;
  margin-top: 30px;
  & p {
    font-size: 16px;
  }
  & h1 {
    background: #a8d0f8; 
    
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    font-size: 24px;
  }
`

export const CardImage = styled.div`
& div {
  width: 300px;
}
& img {
  border-radius: 10px;
  position: relative;
  top: 0;
  left: 70px;
  opacity: .3;
  transition: top ease 0.7s, opacity ease .7s;
}

& div:hover {
  img {
    opacity: 1;
    top:-200px;
  }
}
`

export const FlexContainerCol = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 0vh;
  left: 0vw;
  width: 80vw;
  margin: auto;
  height: fit-content;
`
export const CardContainer = styled.div`
  display: block;
  height: 450px;
`

export const FlexContainerRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  top: 0;
  left: 0;
  width: 80vw;
`