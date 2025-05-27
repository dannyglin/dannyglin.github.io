"use client"; // This is a client component

import React from 'react'
import { Canvas } from "@react-three/fiber";
import Background from '../app/background';
import OverlayHome from '../components/OverlayHome';
import { HomeContainer, SiteContainer } from '../components/styles'
import NavBar from '../components/NavBar';
import { GlobalStyle } from '../components/styles'

export default function Home() {
  return (
    <>
      <NavBar />
      <SiteContainer>
        <GlobalStyle/>
        <HomeContainer>
          <Canvas style={{ position: 'absolute', top: 0, left: 0, height: "100vh", width: "100vw", pointerEvents: 'none' }} 
                // @ts-ignore
                camera={{ position: [0, -1.7, 3], rotation: [Math.PI/4,0,0] }}>
            <Background/>
          </Canvas>
          <OverlayHome/>
        </HomeContainer>
      </SiteContainer>
    </>
  );
}