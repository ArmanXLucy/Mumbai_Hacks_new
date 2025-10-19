import React, { useState } from "react";
import "./About.css";
import LinkedInIcon from "../components/LinkedinIcon";
import Footer from "../components/Footer";

const teamMembers = [
  {
    id: 1,
    name: "MD. ARMAN ALI",
    role: "MERN STACK DEVELOPER",
    img: "./src/images/Arman.png",
    skills: ["Backend", "Gen AI", "Machine Learning"],
    bio: "Arman is an IEM IT student (second year) dedicated to core system development. He impliments Backend, Machine Learning, and Gen AI, focusing on data processing and functionality. This technical stack drove the successful development of FineEdge, showcasing a strong command over intelligent architecture.",
    linkedin: "https://www.linkedin.com/in/md-arman-ali-87a300323/",
  },
  {
    id: 2,
    name: "SARASWATA CHATTERJEE",
    role: "FRONTEND DEVELOPER",
    img: "./src/images/Saraswata.jpg",
    skills: ["Frontend", "UI/UX", "Gen AI"],
    bio: "A second-year student in Internet of Things(IoT) at IEM. Saraswata operates at the crucial intersection of design and data, impliment UI/UX, Frontend Development, and Generative AI. He applied this powerful skill set to develop the functional web platform, FineEdge.",
    linkedin: "https://www.linkedin.com/in/saraswata-chatterjee-b560972b3/",
  },
  {
    id: 3,
    name: "ARIJIT DEB",
    role: "BACKEND DEVELOPER",
    img: "./src/images/Arijit.jpg",
    skills: ["Frontend", "Machine Learning", "Backend"],
    bio: "A second-year IT student at IEM, Arijit builds at the intersection of design and intelligence. Implimenting Frontend Development, Machine Learning, and Generative AI. He applied this trifecta to create FineEdge. Driven to develop smart, cutting-edge web platforms.",
    linkedin: "https://www.linkedin.com/in/arijit-deb-7b0747324/",
  },
];

const About = () => {
  const [selected, setSelected] = useState(null);


  const selectedMember = selected ? teamMembers.find(member => member.id === selected) : null;

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>
          Finance <span>Simplified.</span>
        </h1>
        <p>
          Cut through the complexity. Get practical, straightforward advice to build lasting financial confidence today.
        </p>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`team-card ${
                selected === member.id ? "active" : ""
              }`}
              onClick={() =>
                setSelected(selected === member.id ? null : member.id)
              }
            >
              <div className="image-wrapper">
                <img
                  src={member.img}
                  alt={member.name}
                  className={selected === member.id ? "colored" : "bw"}
                />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>

        {selectedMember && (
          <div className="info-card">
            <h3>{selectedMember.name}</h3>
            <p className="role">{selectedMember.role}</p>


            <div className="linkedin-link-container">
              <LinkedInIcon/> 
              <a 
                href={selectedMember.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 

                className="linkedin-text text-white/50"
              >
                LinkedIn/{selectedMember.name.replace(/\s/g, '-')}
              </a>
            </div>


            <p className="bio">{selectedMember.bio}</p>
            <div className="skills">
              {selectedMember.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer/>
    </div>
  );
};

export default About;