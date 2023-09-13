import { React, useState, useEffect } from "react";
import {MainTitle, Subtitle, Wrapper, BgText} from "./TextStyle";
import PlaylistGenerator from "./PlaylistGenerator";
import styled from 'styled-components';
import picture from "../assets/vinyldisc.png";

function App (){
    const BigButton = styled.button`
        font-family: poppins;
        margin-top: 2rem;
        font-weight: 800;
        font-size: 25px;
        border: none;
        border-radius: 7px;
        background-color: #1db954;
        color: white;
        height: 50px;
        width: 450px;
        cursor: pointer;
        outline: none;
        display: block;
        margin-bottom: 1rem;
        &:hover {
            background-color: #2ad666;
            transition: background-color, 0.5s;
        }`;
   
    const [token, setToken] = useState("")

    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }
      setToken(token)
    }, [])

    const spotifyLogin = () => {
        const authEndpoint = "https://accounts.spotify.com/authorize";
        const clientId = "48ab47c8798443119692d9221163020e";
        const redirectUri = "http://localhost:3000";
        const scopes = ['playlist-modify-public'];
        const url =  `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
        window.location = url;
        
    };
    
    return (
        <Wrapper>
            <MainTitle>Emotify</MainTitle>
            <Subtitle>How are you feeling today?</Subtitle>
            {token ? <PlaylistGenerator token={token}/> : <BigButton onClick={spotifyLogin}>Login to start making playlists now!</BigButton>  }
            <BgText>Generate a completely custom playlist using AI to fit the exact mood you're in!</BgText>
            <img src={picture} className="App-logo" alt="logo" />
        </Wrapper>
    );
}

export default App;