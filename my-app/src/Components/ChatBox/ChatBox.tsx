import './ChatBox.css'
import { Box, Button, TextField, Typography, Skeleton, Divider } from "@mui/material";
import React, { useEffect, useRef } from "react";
interface Message {
    name: string;
    message: string;
    formattedTime: string;
}
interface SubScriptionData {

};

interface ChatBoxProp {
    sentMessage: string;
    handleMessageChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
    chatMessages: Message[];
    handleMessageSubmit: (e:React.FormEvent)=>void;
    piece: string;
    username:string | undefined;
    data: {
        gameLobbyChanged:{
            lobbyIsFull: boolean;
        }
    }
};
interface MessageColorObj {
    color:string;
}

export default function ChatBox({sentMessage, handleMessageChange, chatMessages, handleMessageSubmit, piece, username, data}:ChatBoxProp){
    const bottomRef = useRef<null | HTMLDivElement>(null);

    const renderMessageColor = (messageUsername:string):MessageColorObj =>{
        if(piece === 'x'){
            return username === messageUsername? {color: "#b69f34"}: {color:"#c93030"};
        }else {
            return username === messageUsername? {color:"#c93030"}:{color: "#b69f34"};
        }
    };

    useEffect(()=> {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chatMessages])

    return (
        <Box component='section' sx={{width: '400px', height: '500px', border: '#444444 2px solid'}}>
            {((data && data.gameLobbyChanged.lobbyIsFull) || piece === "O") ?
                <Box component='div' sx={{height: '425px', overflow:'scroll', overflowWrap:'normal', overflowX: 'hidden', scrollbarColor:'#444444', padding: '5px 10px 5px 8px' }} >
                    {chatMessages.map((mesObj) => (
                        <>
                            <Typography key={mesObj.formattedTime.concat(mesObj.message)}><span style={renderMessageColor(mesObj.name)}>{mesObj.name}</span>: {mesObj.message}</Typography> 
                            <Typography key={mesObj.formattedTime} sx={{color: "gray", fontSize: ".8em", marginTop: ".5%"}}>{mesObj.formattedTime}</Typography> 
                            <Divider light sx={{ width: "100%", marginBottom: "9px", marginTop: "9px", borderBottomWidth: 2, borderColor: "#303030" }} />
                        </>
                    ))}
                    <div ref={bottomRef} />
                </Box>
                :<Skeleton variant="rectangular" height={420} sx={{margin:'2% 2% 0% 2%'}} />}
            <Box component='form' onSubmit={handleMessageSubmit} sx={{display: 'flex', height: '75px'}}>
            {((data && data.gameLobbyChanged.lobbyIsFull) || piece === "O") ?
                    <>
                        <TextField
                                fullWidth
                                id="standard-basic" name='UserName' value={sentMessage} onChange={handleMessageChange} label="Type Message"
                                variant="filled"
                                
                                sx={{ margin: '2%'}}
                        />
                        <Button sx={{ margin: '2%'}} variant="outlined" type='submit'>Send</Button>
                    </>
                    :<><Skeleton variant="rectangular" sx={{width: '100%', height: '70%', margin:'2% '}}/></>}
            </Box>
        </Box>
    )
};