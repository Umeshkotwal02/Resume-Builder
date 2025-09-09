"use client";
import React from "react";
import resume1 from "../assets/images/resume1.webp";
import resume3 from "../assets/images/resume3.webp";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import TemplateSlider from "../components/homepage/TemplateSlider";
import AtsSection from "../components/homepage/AtsSection";

const Homepage = () => {
  return (
    <>
      <div className="HeroSection_backgroundImage">
        <Container>
          <div className="row">
            {/* Left Content */}
            <div className="col-lg-7 col-md-12 mb-5 mb-lg-0 text-center text-lg-start">
              <h1 className="home-h1-text fw-bold mb-4">
                Enhancv&apos;{" "}
                <span className="HeroSection_headerGradient__zJ_5v">
                  Resume
                </span>{" "}
                <span className="HeroSection_headerGradient__zJ_5v">
                  Builder
                </span>{" "}
                helps you get hired at top companies
              </h1>

              {/* Buttons */}
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
                <a
                  href="/template"
                  className="text-white build-res-btn p-2 p-2 px-3 fs-11 rounded-3 text-decoration-none"
                >
                  Build Your Resume
                </a>

                <a
                  href="/template"
                  className="flex-just-align about-btn text-decoration-none px-2"
                >
                  Get ATS Friendly Resume
                </a>
              </div>

              <div className="stats-wrap">
                <div className="stats-inner">
                  <div className="stats">
                    <div className="stats-percentage">
                      <span>38%</span>
                    </div>
                    <p>more interviews</p>
                  </div>

                  <div className="stats">
                    <div className="stats-percentage">
                      <span>23%</span>
                    </div>
                    <p>more likely to get a job offer</p>
                  </div>
                </div>
              </div>

              <h2 className="h3 fw-semibold">
                Pick a resume template and build your resume in minutes!
              </h2>
            </div>

            {/* Right Content (Images) */}
            <div className="col-lg-5 col-md-12 position-relative">
              <div className="FoldImageAnimated_card__3Nznq">
                <div className="FoldImageAnimated_content__5n8A2">
                  <div className="FoldImageAnimated_front__2BSzH">
                    <div className="position-relative">
                      <Tilt>
                        <Image
                          alt="Resume Example"
                          src={resume1}
                          width={430}
                          height={608}
                          className="img-fluid FoldImageAnimated_resumeOne__D0ARv"
                          style={{ zIndex: 1 }}
                        />
                        <Image
                          alt="Resume Example 3"
                          src={resume3}
                          width={507}
                          height={563}
                          className="img-fluid FoldImageAnimated_resumeThree__l_nL0 position-absolute top-0 start-50 translate-middle-x"
                          style={{ zIndex: 1 }}
                        />
                      </Tilt>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <TemplateSlider />
      <AtsSection />
    </>
  );
};

export default Homepage;
