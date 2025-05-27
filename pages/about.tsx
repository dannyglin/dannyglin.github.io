"use client";

import React from 'react'
import NavBar from '../components/NavBar';
import { AboutContainer, SiteContainer, GlobalStyle, FlexContainerCol, FlexContainerRow, Glass, Profile, Emphasis, Role } from '../components/styles'

export default function About() {
  return (
    <>
      <NavBar />
      <SiteContainer>
        <GlobalStyle/>
        <AboutContainer>
          <FlexContainerCol>
            <div>
              <h1>about</h1>
            </div>
            <FlexContainerRow>
              <Glass>
                I'm a <Emphasis>software engineer @ AT&T</Emphasis> with a background in applied mathematics and computer science.
                <br />
                <br />
                {"Previously, I was involved in:"}
                <ul>
                  <li>
                    <Emphasis>AT&T</Emphasis>
                    <Role>{" Software Engineer Intern"}</Role>
                    <br />
                    Developed software solutions and gained experience in enterprise-level development
                  </li>
                  <br />
                  <li>
                    <Emphasis>Online MCIT</Emphasis>
                    <Role>{" Moderator"}</Role>
                    <br />
                    Moderated online discussions and supported students in the Master of Computer and Information Technology program
                  </li>
                  <br />
                  <li>
                    <Emphasis>Milliman</Emphasis>
                    <Role>{" Data Analyst"}</Role>
                    <br />
                    Analyzed data and provided insights for actuarial and consulting services
                  </li>
                  <br />
                  <li>
                    <Emphasis>Stony Brook University Career Center</Emphasis>
                    <Role>{" Intern"}</Role>
                    <br />
                    Supported career services and student professional development initiatives
                  </li>
                  <br />
                  <li>
                    <Emphasis>Sherwin-Williams</Emphasis>
                    <Role>{" Intern"}</Role>
                    <br />
                    Gained experience in corporate operations and business processes
                  </li>
                  <br />
                  <li>
                    <Emphasis>Delta Sigma Pi</Emphasis>
                    <Role>{" Vice President of Finance"}</Role>
                    <br />
                    Managed financial operations for the professional business fraternity
                  </li>
                </ul>
              </Glass>
              <Profile />
            </FlexContainerRow>
          </FlexContainerCol>
        </AboutContainer>
      </SiteContainer>
    </>
  );
} 