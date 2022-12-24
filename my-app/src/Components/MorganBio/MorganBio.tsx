import { Box, Typography, Divider, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Morgan from '../../assets/Morgan.jpg'

export default function MorganBio() {
    const bioIconStyle = { 
        fontSize: "3em", 
        color: 'gray', 
        marginRight: "10px", 
        cursor: "pointer" 
    }

    const chipStyle = {
        margin: "0 10px 10px 0px",
    }

    return (
        <Box component='article' sx={{ width: {xs: "80%", sm: "80%", lg: "50%"} }} >
            <Box sx={{ display: "flex", flexDirection: {xs: "column-reverse", sm: "column-reverse", lg: "row"}}}>
                <Box sx={{ width: {xs: "100%", sm: "100%", lg: "50%"}}}>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "3em", color: "lightgray", marginBottom: "20px", textAlign: {xs: "center", lg: "start"}}}>Morgan Tolman</Typography>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "20px", width: "100%", textAlign: {xs: "center", lg: "start"} }}> Hello, I am a recent graduate of a Full-Stack Web Development boot camp.  Thank you for visiting our Connect4 clone.  It has been a joy to work on, and I hope you enjoy it as well.  Some of my hobbies are learning new technologies, skateboarding, and small arduino projects. </Typography>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "2em", color: "lightgray", marginBottom: "15px", textAlign: {xs: "center", lg: "start"} }}>Favorite Technologies</Typography>
                    <Box sx={{ marginBottom: "40px", textAlign: {xs: "center", lg: "start"} }}>
                        <Chip label="TypeScript" sx={chipStyle} />
                        <Chip label="GraphQl" sx={chipStyle} />
                        <Chip label="Mongoose" sx={chipStyle} />
                        <Chip label="React" sx={chipStyle} />
                    </Box>
                    <Box sx={{ marginBottom: "35px", textAlign: {xs: "center", lg: "start"} }}>
                        <GitHubIcon onClick={()=>window.open('https://github.com/unheardof77', '_blank')} sx={bioIconStyle} />
                        <LinkedInIcon onClick={()=>window.open('https://www.linkedin.com/in/morgan-tolman-664816250', '_blank')} sx={bioIconStyle} />
                        <BusinessCenterIcon onClick={()=>window.open('https://unheardof77.github.io/react-portfolio/', '_blank')} sx={bioIconStyle} />
                    </Box>
                </Box>
                <Box sx={{ minWidth: {xs: "100%", lg: "50%"}, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box component="img" alt='Morgan next to a river' src={Morgan} sx={{ height: "300px", width: "300px", marginBottom: {xs: "30px", lg:"20%"}, borderRadius: "50%" }} />
                </Box>
            </Box>
            <Divider light sx={{ width: "100%", marginBottom: "60px", marginTop: "40px", borderBottomWidth: 2, borderColor: "#303030" }} />
        </Box>
    )
}