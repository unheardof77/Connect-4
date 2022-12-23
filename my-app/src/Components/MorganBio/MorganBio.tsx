import { Box, Typography, Divider, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Morgan from '../../assets/Morgan.jpg'

export default function ToacinBio() {
    return (
        <Box component='article' sx={{ width: "50%" }} >
            <Box sx={{ display: "flex" }}>
                <Box sx={{ maxWidth: "50%" }}>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "3em", color: "lightgray", marginBottom: "20px" }}>Morgan Tolman</Typography>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "20px", width: "100%" }}> Hello, I am a recent graduate of a Full-Stack Web Development boot camp.  Thank you for visiting our Connect4 clone.  It has been a joy to work on, and I hope you enjoy it as well.  Some of my hobbies are learning new technologies, skateboarding, and small arduino projects. </Typography>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "2em", color: "lightgray", marginBottom: "15px" }}>Favorite Technologies</Typography>
                    <Box sx={{ marginBottom: "40px" }}>
                        <Chip label="TypeScript" sx={{ marginRight: "10px" }} />
                        <Chip label="GraphQl" sx={{ marginRight: "10px" }} />
                        <Chip label="Mongoose" sx={{ marginRight: "10px" }} />
                        <Chip label="React" sx={{ marginRight: "10px" }} />
                    </Box>
                    <Box sx={{ marginBottom: "35px" }}>
                        <GitHubIcon onClick={()=>window.open('https://github.com/unheardof77', '_blank')} sx={{ fontSize: "3em", color: 'gray', marginRight: "10px" }} />
                        <LinkedInIcon onClick={()=>window.open('https://www.linkedin.com/in/morgan-tolman-664816250', '_blank')} sx={{ fontSize: "3em", color: 'gray', marginRight: "10px" }} />
                        <BusinessCenterIcon onClick={()=>window.open('https://unheardof77.github.io/react-portfolio/', '_blank')} sx={{ fontSize: "3em", color: 'gray', marginRight: "10px" }} />
                    </Box>
                </Box>
                <Box sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img alt='Morgan next to a river' src={Morgan} style={{ height: "300px", width: "300px", marginBottom: "20%", marginLeft: "7%", borderRadius: "50%" }} />
                </Box>
            </Box>
            <Divider light sx={{ width: "100%", marginBottom: "60px", marginTop: "40px", borderBottomWidth: 2, borderColor: "#303030" }} />
        </Box>
    )
}