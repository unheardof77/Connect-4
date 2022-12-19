import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
interface Message {
    name: string;
    message: string;
    formattedTime: string;
}

interface ChatBoxProp {
    sentMessage: string;
    handleMessageChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
    chatMessages: Message[];
    handleMessageSubmit: (e:React.FormEvent)=>void;
    piece: string;
    username:string;
};
interface MessageColorObj {
    color:string
}

export default function ChatBox({sentMessage, handleMessageChange, chatMessages, handleMessageSubmit, piece, username}:ChatBoxProp){

    const renderMessageColor = (messageUsername:string):MessageColorObj =>{
        if(piece === 'x'){
            return username === messageUsername? {color: "#b69f34"}: {color:"#c93030"};
        }else {
            return username === messageUsername? {color:"#c93030"}:{color: "#b69f34"};
        }
    };

    return (
        <Box component='section' sx={{width: '400px', height: '500px', border: '#444444 2px solid'}}>
            <Box component='div' sx={{height: '425px', overflow:'scroll', overflowWrap:'normal', overflowX: 'hidden', scrollbarColor:'#444444' }} >
                {chatMessages.map((mesObj) =><Typography key={mesObj.formattedTime.concat(mesObj.message)}><span  style={renderMessageColor(mesObj.name)}>{mesObj.name}</span>: {mesObj.message}</Typography> )}
            </Box>
            <Box component='form' onSubmit={handleMessageSubmit} sx={{display: 'flex', height: '75px'}}>
                <TextField
                        fullWidth
                        id="standard-basic" name='UserName' value={sentMessage} onChange={handleMessageChange} label="Type Message"
                        variant="filled"
                        
                        sx={{ margin: '2%'}}
                />
                <Button sx={{ margin: '2%'}} variant="outlined" type='submit'>Send</Button>
            </Box>
        </Box>
    )
};