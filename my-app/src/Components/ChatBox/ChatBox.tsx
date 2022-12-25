import './ChatBox.css'
import { Box, Button, TextField, Typography, Skeleton, Divider } from "@mui/material";
import { useEffect, useRef } from "react";
import SendIcon from '@mui/icons-material/Send';
import {ChatBoxProp, MessageColorObj} from '../../utils/types/types'



export default function ChatBox({sentMessage, handleMessageChange, chatMessages, handleMessageSubmit, piece, username, data}:ChatBoxProp){
    const bottomRef = useRef<null | HTMLDivElement>(null);

    const renderMessageColor = (messageUsername:string):MessageColorObj =>{
        if(piece === 'x'){
            return username === messageUsername ? {color: "#b69f34"} : {color:"#c93030"};
        }else {
            return username === messageUsername ? {color:"#c93030"} : {color: "#b69f34"};
        }
    };

    useEffect(()=> {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chatMessages])

    return (
        <Box component='section' sx={{width:{ xs:'350px', sm:'400px'},  minHeight: '500px', border: '#444444 2px solid', padding: '5px 5px 0px 5px', marginBottom:{xs:'50px'}}}>
            {((data && data.gameLobbyChanged.lobbyIsFull) || piece === "O") ?
                <Box component='div' className='scrollbar' id='style-1' sx={{height: '425px', overflow:'scroll', overflowWrap:'normal', overflowX: 'hidden', scrollbarColor:'#444444', padding: '3% 3% 1% 3%' }} >
                    {chatMessages.map((mesObj) => (
                        <div key={mesObj.message.concat(mesObj.formattedTime)}>
                            <Typography key={mesObj.formattedTime.concat(mesObj.message)} sx={{maxWidth: "100%", fontSize:{
                                xs:'1em', md:'1em'
                            }, overflowWrap: "break-word"}}><span style={renderMessageColor(mesObj.name)}>{mesObj.name}</span>: {mesObj.message}</Typography> 
                            <Typography key={mesObj.formattedTime} sx={{color: "gray", fontSize:{ xs:'.75em', md:'.9em'}, marginTop: ".5%"}}>{mesObj.formattedTime}</Typography> 
                            <Divider light sx={{ width: "100%", marginBottom: "9px", marginTop: "9px", borderBottomWidth: 2, borderColor: "#303030" }} />
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </Box>
                :<Skeleton variant="rectangular" height={420} sx={{margin:'2% 2% 0% 2%'}} />}
            <Box component='form' onSubmit={handleMessageSubmit} sx={{ width: "100%", padding: "2.5%" }}>
            {((data && data.gameLobbyChanged.lobbyIsFull) || piece === "O") ?
                    <>
                        <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
                            <TextField
                                    required
                                    InputLabelProps={{ required: false }}
                                    id="standard-basic" name='UserName' value={sentMessage} onChange={handleMessageChange} label="Send Message to Opponent"
                                    variant="filled"
                                    sx={{ margin: '0', width: "80%"}}
                            />
                            <Button sx={{ margin: '0 0 0 3%', width: "10%"}} variant="outlined" type='submit'><SendIcon/></Button>
                        </Box>
                    </>
                    :<><Skeleton variant="rectangular" sx={{width: '100%', height: '75px', margin: '2% 0%'}}/></>}
            </Box>
        </Box>
    )
};