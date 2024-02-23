import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(
      JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        .username
    );
  }, []);
  return (
    <div></div>
    // <Container>
    //   <img src={Robot} alt="" />
    //   <h1>
    //     Welcome, <span>{userName}!</span>
    //   </h1>
    //   <h3>Please select a chat to Start messaging.</h3>
    // </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  background-color:black
  img {
    height: 20rem;
  }
  span {
    color: Black;
  }
  @media (max-width: 768px) {
    font-size: 24px;
    img {
      height: 5rem;
    }
  }
`;
