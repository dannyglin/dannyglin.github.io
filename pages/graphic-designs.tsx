"use client";

import React from 'react'
import NavBar from '../components/NavBar';
import { ArtContainer, SiteContainer, GlobalStyle, FlexContainerCol, FlexContainerRow, ArtGlassCard } from '../components/styles'

export default function GraphicDesigns() {
  return (
    <>
      <NavBar />
      <SiteContainer>
        <GlobalStyle/>
        <ArtContainer>
          <FlexContainerCol>
            <div><h1>graphic designs</h1></div>
            <FlexContainerRow>
              <ArtGlassCard>
                <h2>Work in Progress</h2>
                <p>Graphic design portfolio coming soon...</p>
              </ArtGlassCard>
            </FlexContainerRow>
          </FlexContainerCol>
        </ArtContainer>
      </SiteContainer>
    </>
  );
} 