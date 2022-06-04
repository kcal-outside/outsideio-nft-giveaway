
import React from "react";
import styled from "styled-components";

 const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 4%;
  margin-left: 4%;
  text-align: center;
  justify-content: center;
`;

const About = () => {
  return (
        <main>
            <MainContainer>
              <h1>
                About Us
              </h1>
              <p>
                GeeksforGeeks is a Computer 
                Science portal for geeks.
              </p>
            </MainContainer>
        </main>
  );
};
  
export default About;