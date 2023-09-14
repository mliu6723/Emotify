import TextField from "@mui/material/TextField";
import { React, useState } from "react";
import OpenAI from "openai";
import styled from 'styled-components';
import SpotifyPlaylist from "./SpotifyPlaylist";
import LoadingBar from "./LoadingBar";
import axios from 'axios';

function PlaylistGenerator ({token}){
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
    const [inputValue, setInputValue] = useState("");
    const [length, setLength] = useState(10);
    const [songs, setSongs] = useState([])
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (!clicked) {
            setClicked(true);
            fetchSongs();
        }
    };

    const fetchSongs = () => {
        setLoading(true);
        setLoaded(false);
    
        const payload = ({
          temperature: 0,
          max_tokens: 3000,
          model: "text-davinci-003",
          prompt: `You are an assistant that only responds in JSON. 
          Create a list of ${length} unique songs based off the following 
          statement: "${inputValue}". Include "id", "title", "artist", "album" 
          in your response. An example response is: "
          [
            {
                "id": 1,
                "title": "Hey Jude",
                "artist": "The Beatles",
                "album": "The Beatles (White Album)",
                "duration": "4:56"
            }
          ]".`
        });
    
        console.log(`Payload: ${payload.prompt}`)
        
        axios({
          method: "POST",
          url: "https://api.openai.com/v1/completions",
          data: payload,
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`
          }
        })
          .then((res) => {
             if (res.status === 200) {
              setLoaded(true)
              setLoading(false);
              //Parse the reponse from OpenAI
              const songs = JSON.parse(res.data.choices[0].text);
              setSongs(songs)
            }else{
              console.log(res.status);
            }
          })
          .catch((e) => {
            setLoading(false);
            console.log(e.message);
          });
        };

return(
    <div>
    <div className="search" >
        <TextField
            label="Search"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="What kind of music are you feeling?"
            sx={{
              width: "[90%, 70%, 50%]",
              width: "75%",
              color: "white",
            }}
            InputLabelProps={{
              style: {
                color: "white",
                fontWeight: "bold",
              },
            }}
          />
        <select className='inputField' style={{borderRadius: '15px'}} onChange={(e) => 
            setLength(e.target.value)}>
            <option value={10}>10 songs</option>
            <option value={30}>30 songs</option>
            <option value={50}>50 songs</option>
        </select>
</div>
          <BigButton
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "15px",
              mr: "2rem",
            }}
            onClick={handleButtonClick}
            // stop loading after 10 seconds
          >
            Generate Songs
          </BigButton>
            {loading ? <LoadingBar /> : null}
            {loaded ? <SpotifyPlaylist playlistArray={songs} /> : null}
    </div>
    
);
}
export default PlaylistGenerator;
