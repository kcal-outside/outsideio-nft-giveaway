
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

const Redeem = () => {
  return (
        <main>
            <MainContainer>
              <h1>
                GeeksforGeeks is a Computer 
                Science portal for geeks.
              </h1>
              <p>
              </p>
            </MainContainer>
        </main>
  );
};
  
export default Redeem;