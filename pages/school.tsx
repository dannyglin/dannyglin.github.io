"use client";

import React from 'react'
import NavBar from '../components/NavBar';
import { AboutContainer, SiteContainer, GlobalStyle, FlexContainerCol, FlexContainerRow, Glass, Emphasis, Role } from '../components/styles'

export default function School() {
  return (
    <>
      <NavBar />
      <SiteContainer>
        <GlobalStyle/>
        <AboutContainer>
          <FlexContainerCol>
            <div>
              <h1>school</h1>
            </div>
            <FlexContainerRow>
              <Glass style={{ margin: '0 20px' }}>
                <h2><Emphasis>High School</Emphasis></h2>
                <p><strong>Milton High School</strong></p>
                <br />
                <p>Involved in:</p>
                <ul>
                  <li>National Honor Society</li>
                  <li>Mu Alpha Theta</li>
                  <li>Student Board Advising Council</li>
                  <li>Beta Club</li>
                  <li>Student Government Association</li>
                  <li>Association of Student Historians</li>
                  <li>Spanish Club</li>
                  <li>Chess Club</li>
                  <li>Junior Varsity Basketball</li>
                  <li>Varsity Track & Field</li>
                  <li>Varsity Cross Country</li>
                </ul>
              </Glass>
              
              <Glass style={{ margin: '0 20px' }}>
                <h2><Emphasis>Undergraduate</Emphasis></h2>
                <p><strong>Stony Brook University</strong></p>
                <p>BS in Applied Math + Business - 2022</p>
                <br />
                <p>Involved in:</p>
                <ul>
                  <li>Delta Sigma Pi</li>
                  <li>Stony Brook Career Center</li>
                  <li>Sigma Beta Honor Society</li>
                  <li>Diversity Professional Leadership Network</li>
                  <li>CodePath</li>
                  <li>AMS Committee</li>
                  <li>Basketball Club</li>
                </ul>
              </Glass>
              
              <Glass style={{ margin: '0 20px' }}>
                <h2><Emphasis>Graduate</Emphasis></h2>
                <p><strong>University of Pennsylvania</strong></p>
                <p>MS in Computer Science - 2025</p>
                <br />
                <p>Involved in:</p>
                <ul>
                  <li>MOSA</li>
                  <li>OnlineMCIT</li>
                </ul>
              </Glass>
            </FlexContainerRow>
          </FlexContainerCol>
        </AboutContainer>
      </SiteContainer>
    </>
  );
} 