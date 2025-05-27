"use client";

import React from 'react'
import NavBar from '../components/NavBar';
import { ArtContainer, SiteContainer, GlobalStyle, FlexContainerCol, FlexContainerRow, ArtGlassCard } from '../components/styles'

export default function VideoEditing() {
  return (
    <>
      <NavBar />
      <SiteContainer>
        <GlobalStyle/>
        <ArtContainer>
          <FlexContainerCol>
            <div><h1>video editing</h1></div>
            <FlexContainerRow>
              <ArtGlassCard>
                <h2>Work in Progress</h2>
                <p>Video editing portfolio coming soon...</p>
              </ArtGlassCard>
            </FlexContainerRow>
          </FlexContainerCol>
        </ArtContainer>
      </SiteContainer>
    </>
  );
} 