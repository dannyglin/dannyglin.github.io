"use client";

import React from 'react'
import NavBar from '../components/NavBar';
import { ProjectsContainer, SiteContainer, GlobalStyle, FlexContainerCol, FlexContainerRow } from '../components/styles'
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const projects = [
    {
      name: 'NYC Eats',
      year: '2024',
      body: "A comprehensive food discovery application for New York City, helping users find restaurants and food experiences across the five boroughs.",
      skillsUsed: "React | Node.js | MongoDB | Express",
      image: "nyc-eats.png",
    },
    {
      name: 'RAG AI Chatbot',
      year: '2024',
      body: "An intelligent chatbot using Retrieval-Augmented Generation (RAG) technology to provide accurate and contextual responses based on a knowledge base.",
      skillsUsed: "Python | LangChain | OpenAI API | Vector Database",
      image: "rag-chatbot.png",
    },
    {
      name: 'E-commerce Website',
      year: '2023',
      body: "A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment processing capabilities.",
      skillsUsed: "React | Node.js | PostgreSQL | Stripe API",
      image: "ecommerce.png",
    },
    {
      name: 'Magic 8 Ball',
      year: '2023',
      body: "A fun interactive web application that provides random answers to user questions, built with modern web technologies.",
      skillsUsed: "JavaScript | HTML | CSS",
      image: "magic8ball.png",
    },
    {
      name: 'NBA Player Stats',
      year: '2023',
      body: "A data visualization application that displays NBA player statistics with interactive charts and performance analytics.",
      skillsUsed: "Python | Pandas | Matplotlib | NBA API",
      image: "nba-stats.png",
    },
    {
      name: 'Fundraiser Goal App',
      year: '2022',
      body: "A mobile application designed to help organizations track and manage their fundraising goals with real-time progress updates.",
      skillsUsed: "React Native | Firebase | Node.js",
      image: "fundraiser.png",
    }
  ]

  const projectCards = projects.map((project, index) => {
    return <ProjectCard key={index} {...project}/>
  })

  return (
    <>
      <NavBar />
      <SiteContainer>
        <GlobalStyle/>
        <ProjectsContainer>
          <FlexContainerCol>
            <div><h1>projects</h1></div>
            <FlexContainerRow>
              {projectCards}
            </FlexContainerRow>
          </FlexContainerCol>
        </ProjectsContainer>
      </SiteContainer>
    </>
  );
} 