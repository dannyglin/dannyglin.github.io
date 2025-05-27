"use client";

import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import { AboutContainer, SiteContainer, GlobalStyle, FlexContainerCol, Glass, Emphasis } from '../components/styles'

export default function Resume() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <>
      <NavBar />
      <div style={{
        width: '100vw',
        minHeight: '100vh',
        paddingTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '80px 10px 40px 10px',
        boxSizing: 'border-box'
      }}>
        <GlobalStyle/>
        <div style={{ 
          width: '100%', 
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '750px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
                        <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '10px' : '20px'
            }}>
              <h1 style={{ 
                fontSize: '1.8rem', 
                margin: '0', 
                background: 'linear-gradient(135deg, #a8d0f8, #6b9bd3)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontWeight: '600'
              }}>resume</h1>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  backgroundColor: '#c7d7ee',
                  color: '#2c5aa0',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.8em' : '0.9em',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#a8c8f0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#c7d7ee';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Download PDF Version
              </a>
            </div>
            <Glass style={{ 
              width: '100%', 
              maxWidth: isMobile ? '100%' : '650px', 
              margin: isMobile ? '0 5px' : '0 auto'
            }}>
              <div style={{ 
                padding: isMobile ? '15px 20px' : '25px 35px', 
                lineHeight: '1.4', 
                fontSize: isMobile ? '12px' : '13px' 
              }}>
                  {/* Header */}
                  <div style={{ textAlign: 'center', marginBottom: isMobile ? '15px' : '20px' }}>
                    <h2 style={{ fontSize: isMobile ? '1.4em' : '1.6em', margin: '0 0 6px 0', color: '#c7d7ee', fontWeight: '600' }}>Danny Lin</h2>
                    <p style={{ 
                      margin: '0', 
                      color: '#b5c5d8', 
                      fontSize: isMobile ? '11px' : '13px', 
                      fontWeight: '400',
                      lineHeight: isMobile ? '1.6' : '1.4'
                    }}>
                      {isMobile ? (
                        <>
                          (850) 490-7526<br />
                          dannylin@gmail.com<br />
                          <a href="https://www.linkedin.com/in/dannygolin" style={{ color: '#c7d7ee', textDecoration: 'none', fontWeight: '500' }}>LinkedIn</a> | 
                          <a href="https://github.com/dannyglin" style={{ color: '#c7d7ee', textDecoration: 'none', fontWeight: '500' }}> GitHub</a>
                        </>
                      ) : (
                        <>
                          (850) 490-7526 | dannylin@gmail.com | 
                          <a href="https://www.linkedin.com/in/dannygolin" style={{ color: '#c7d7ee', textDecoration: 'none', fontWeight: '500' }}> LinkedIn</a> | 
                          <a href="https://github.com/dannyglin" style={{ color: '#c7d7ee', textDecoration: 'none', fontWeight: '500' }}> GitHub</a>
                        </>
                      )}
                    </p>
                  </div>

                                    {/* Education */}
                  <div style={{ marginBottom: isMobile ? '12px' : '15px' }}>
                    <h3 style={{ 
                      color: '#c7d7ee', 
                      borderBottom: '2px solid #c7d7ee', 
                      paddingBottom: '4px', 
                      marginBottom: isMobile ? '8px' : '10px', 
                      fontSize: isMobile ? '1em' : '1.1em', 
                      fontWeight: '600', 
                      letterSpacing: '0.5px' 
                    }}>EDUCATION</h3>
                      <div style={{ marginBottom: isMobile ? '10px' : '12px' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: isMobile ? 'flex-start' : 'center', 
                          marginBottom: '3px',
                          flexDirection: isMobile ? 'column' : 'row'
                        }}>
                          <strong style={{ fontSize: isMobile ? '0.9em' : '1em', fontWeight: '600', color: '#c7d7ee' }}>University of Pennsylvania</strong>
                          <span style={{ fontSize: isMobile ? '0.8em' : '0.9em', color: '#b5c5d8', fontWeight: '400' }}>Expected Graduation: December 2025</span>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: isMobile ? 'flex-start' : 'center', 
                          marginBottom: '3px',
                          flexDirection: isMobile ? 'column' : 'row'
                        }}>
                          <em style={{ fontSize: isMobile ? '0.85em' : '0.95em', color: '#c7d7ee' }}>Master of Science in Computer Science</em>
                          <span style={{ fontSize: isMobile ? '0.8em' : '0.9em', color: '#b5c5d8' }}>Philadelphia, Pennsylvania</span>
                        </div>
                        <div style={{ textAlign: isMobile ? 'left' : 'right', fontSize: isMobile ? '0.8em' : '0.9em', color: '#b5c5d8', fontWeight: '400' }}>GPA: 4.0/4.00</div>
                      </div>
                    
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <strong style={{ fontSize: '1em', fontWeight: '600', color: '#c7d7ee' }}>Stony Brook University</strong>
                        <span style={{ fontSize: '0.9em', color: '#b5c5d8', fontWeight: '400' }}>May 2022</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <em style={{ fontSize: '0.95em', color: '#c7d7ee' }}>Bachelor of Science in Applied Mathematics & Statistics</em>
                        <span style={{ fontSize: '0.9em', color: '#b5c5d8' }}>Stony Brook, NY</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9em', color: '#c7d7ee' }}>Double Major in Business Management (Specialization in Finance & Operations)</span>
                        <span style={{ fontSize: '0.9em', color: '#b5c5d8', fontWeight: '400' }}>GPA: 3.65/4.00, Dean's List</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: isMobile ? '12px' : '15px' }}>
                    <h3 style={{ 
                      color: '#c7d7ee', 
                      borderBottom: '2px solid #c7d7ee', 
                      paddingBottom: '4px', 
                      marginBottom: isMobile ? '8px' : '10px', 
                      fontSize: isMobile ? '1em' : '1.1em', 
                      fontWeight: '600', 
                      letterSpacing: '0.5px' 
                    }}>SKILLS</h3>
                    <div style={{ marginBottom: '6px', fontSize: isMobile ? '11px' : '13px', color: '#c7d7ee' }}><strong style={{ fontSize: isMobile ? '11px' : '13px' }}>Technologies:</strong> Python, PySpark, Java, C, C++, SQL, R, HTML, CSS, JavaScript, React, SAS, and Swift</div>
                    <div style={{ marginBottom: '6px', fontSize: isMobile ? '11px' : '13px', color: '#c7d7ee' }}><strong style={{ fontSize: isMobile ? '11px' : '13px' }}>Languages:</strong> English (Native), Fuzhou Dialect (Native), and Mandarin (Fluent)</div>
                    <div style={{ fontSize: isMobile ? '11px' : '13px', color: '#c7d7ee' }}><strong style={{ fontSize: isMobile ? '11px' : '13px' }}>Interests:</strong> Basketball, Running, Pickleball, Investing, Real Estate, Artificial Intelligence, Software Development, and Data Science</div>
                  </div>

                  {/* Professional Experience */}
                  <div style={{ marginBottom: isMobile ? '12px' : '15px' }}>
                    <h3 style={{ 
                      color: '#c7d7ee', 
                      borderBottom: '2px solid #c7d7ee', 
                      paddingBottom: '4px', 
                      marginBottom: isMobile ? '8px' : '10px', 
                      fontSize: isMobile ? '1em' : '1.1em', 
                      fontWeight: '600', 
                      letterSpacing: '0.5px' 
                    }}>PROFESSIONAL EXPERIENCE</h3>
                    
                    <div style={{ marginBottom: isMobile ? '10px' : '12px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: isMobile ? 'flex-start' : 'center', 
                        marginBottom: '2px',
                        flexDirection: isMobile ? 'column' : 'row'
                      }}>
                        <strong style={{ fontSize: isMobile ? '0.85em' : '0.95em', color: '#c7d7ee' }}>AT&T - Software Engineer Internship</strong>
                        <span style={{ fontSize: isMobile ? '0.75em' : '0.85em', color: '#b5c5d8' }}>Middletown, NJ | June 2024 – August 2024</span>
                      </div>
                      <div style={{ marginBottom: '4px', fontSize: isMobile ? '0.75em' : '0.85em', color: '#c7d7ee' }}><em>Tools: Python, React, HTML, CSS, and Pandas</em></div>
                      <ul style={{ marginTop: '4px', paddingLeft: isMobile ? '12px' : '14px', fontSize: isMobile ? '10px' : '12px', color: '#c7d7ee' }}>
                        <li style={{ marginBottom: '2px' }}>Developed and deployed a Streamline-based AI website for Optical Network Team, integrating Pinecone and OpenAI APIs</li>
                        <li style={{ marginBottom: '2px' }}>Implemented a Retrieval-Augmented Generation (RAG) system using GPT-4 LLM, achieving a 90% accuracy in retrieving relevant texts for complex network queries</li>
                        <li>Engineered a machine learning pipeline to process and embed over 10,000 PDF documents, enhancing data accessibility and reducing manual research effort by 80%</li>
                      </ul>
                    </div>

                    <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: isMobile ? 'flex-start' : 'center', 
                        marginBottom: '5px',
                        flexDirection: isMobile ? 'column' : 'row'
                      }}>
                        <strong style={{ fontSize: isMobile ? '0.95em' : '1.1em', color: '#c7d7ee' }}>Milliman - Data Analyst</strong>
                        <span style={{ fontSize: isMobile ? '0.8em' : '0.95em', color: '#b5c5d8' }}>Manhattan, NY | June 2022 – June 2023</span>
                      </div>
                      <div style={{ marginBottom: isMobile ? '8px' : '10px', color: '#c7d7ee', fontSize: isMobile ? '0.8em' : '1em' }}><em>Tools: Python, SQL, PySpark, SAS, and VBA</em></div>
                      <ul style={{ marginTop: isMobile ? '8px' : '10px', paddingLeft: isMobile ? '15px' : '20px', color: '#c7d7ee', fontSize: isMobile ? '10px' : '13px' }}>
                        <li style={{ marginBottom: isMobile ? '6px' : '8px' }}>Automated downloading files from SFAS for client production by using Python, resulted in a 35% reduction in the time</li>
                        <li style={{ marginBottom: isMobile ? '6px' : '8px' }}>Analyzed the client's database using Spark, coding a seamless pipeline database for optimal operation of parquet files</li>
                        <li style={{ marginBottom: isMobile ? '6px' : '8px' }}>Streamlined the generation of monthly User Statistic Reports by 80% and eliminated errors by leveraging VBA and Excel</li>
                        <li>Investigated the client interface's database by executing SQL queries and generated a comprehensive Excel report to address client concerns</li>
                      </ul>
                    </div>
                  </div>

                  {/* Leadership Experience */}
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ color: '#c7d7ee', borderBottom: '2px solid #c7d7ee', paddingBottom: '4px', marginBottom: '10px', fontSize: '1.1em', fontWeight: '600', letterSpacing: '0.5px' }}>LEADERSHIP EXPERIENCE</h3>
                    
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <strong style={{ fontSize: '1.1em', color: '#c7d7ee' }}>Delta Sigma Pi - Vice President of Finance / Philanthropy Committee Director</strong>
                        <span style={{ fontSize: '0.95em', color: '#b5c5d8' }}>Stony Brook, NY | April 2021 – April 2022</span>
                      </div>
                      <div style={{ marginBottom: '10px', color: '#c7d7ee' }}><em>Tool: Excel and Google Sheets</em></div>
                      <ul style={{ marginTop: '10px', paddingLeft: '20px', color: '#c7d7ee' }}>
                        <li style={{ marginBottom: '8px' }}>Donated over $14,500+ through fundraiser events such as Bingo Boards, Onigiri, Succulent Plants & Insomnia Cookie for organizations like Heifer International, UNICEF, Food Bank for NYC, Audre Lorde Project, and NAACP</li>
                        <li style={{ marginBottom: '8px' }}>Managed and maintained the organization's income statements, balance sheets, and cash flow statements, by calculating revenue, expenses, and national dues</li>
                        <li style={{ marginBottom: '8px' }}>Acted as the Chief Financial Officer for 60 members and maintained a record of financial transactions</li>
                        <li>Coordinated and guided a team of 20 individuals, fostering productive discussions and executing fundraising initiatives</li>
                      </ul>
                    </div>
                  </div>

                  {/* Projects */}
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ color: '#c7d7ee', borderBottom: '2px solid #c7d7ee', paddingBottom: '4px', marginBottom: '10px', fontSize: '1.1em', fontWeight: '600', letterSpacing: '0.5px' }}>PROJECTS</h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <strong style={{ fontSize: '1.1em', color: '#c7d7ee' }}>Twitter (X) Application</strong>
                        <span style={{ fontSize: '0.95em', color: '#b5c5d8' }}>GitHub</span>
                      </div>
                      <div style={{ marginBottom: '8px', color: '#c7d7ee' }}><em>Tools: Swift</em></div>
                      <p style={{ margin: '0', color: '#c7d7ee' }}>Utilized application programming interfaces (APIs) to develop an imitation Twitter iOS app, functioning with abilities to log in, load tweets, auto-resize interface, compose, favorite, and retweet tweets.</p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <strong style={{ fontSize: '1.1em', color: '#c7d7ee' }}>Flixster Application</strong>
                        <span style={{ fontSize: '0.95em', color: '#b5c5d8' }}>GitHub</span>
                      </div>
                      <div style={{ marginBottom: '8px', color: '#c7d7ee' }}><em>Tools: Swift</em></div>
                      <p style={{ margin: '0', color: '#c7d7ee' }}>Designed a Flixster app, using custom table and collection view cells that reveal currently airing movies in theaters.</p>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ color: '#c7d7ee', borderBottom: '2px solid #c7d7ee', paddingBottom: '4px', marginBottom: '10px', fontSize: '1.1em', fontWeight: '600', letterSpacing: '0.5px' }}>CERTIFICATES</h3>
                    <p style={{ marginBottom: '12px', color: '#c7d7ee' }}><strong>Corporate Finance Institute:</strong> Advanced Excel Formulas | Dashboard & Data Visualization | Financial Analysis Fundamental</p>
                    <p style={{ margin: '0', color: '#c7d7ee' }}><strong>CodePath:</strong> Introduction to Web Development | iOS Development | Technical Interview Preparation</p>
                  </div>


                              </div>
              </Glass>
            </div>
          </div>
        </div>
      </>
    );
  } 