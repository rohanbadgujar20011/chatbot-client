import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute } from "../utils/Allapi";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import "../css/Title.css";
const Chat = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });
  console.log(screenSize);
  const host = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();
  const socket = useRef();
  const scrollRef = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const featchdata = async () => {
      if (currentUser) {
        if (currentUser.isAvtarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log(data);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    featchdata(currentUser);
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div>
      {console.log(screenSize.width)}
      {screenSize.width > 719 ? (
        <Container>
          <div className="logo-container">
            <ul>
              <li>
                <div class="logo-holder logo-4">
                  <a href="">
                    <i class="fas fa-book-open"></i>
                    <div class="left">
                      <h3>BotBuddy</h3>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="container ">
            <Contacts contacts={contacts} changeChat={handleChatChange} />

            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </Container>
      ) : (
        <>
          <Container>
            <div className="logo-container">
              <ul>
                <li>
                  <div class="logo-holder logo-4">
                    <a href="">
                      <i class="fas fa-book-open"></i>
                      <div class="left">
                        <h3>BotBuddy</h3>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="container ">
              <Contacts contacts={contacts} changeChat={handleChatChange} />
            </div>
            <div className="container">
              {currentChat === undefined ? (
                <Welcome />
              ) : (
                <ChatContainer currentChat={currentChat} socket={socket} />
              )}
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default Chat;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  @media screen and (min-width: 320px) and (max-width: 719px) {
    grid-template-columns: 50% 65%;
    height:150vh;
  }

  align-items: center;
  background-color: #5aade8;
  .container {
    height: 85vh;
    width: 85vw;
    overflow-y: auto;
    background-color: black;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
