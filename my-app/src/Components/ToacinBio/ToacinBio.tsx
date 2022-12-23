import { Box, Typography, Divider, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Toacin from '../../assets/Toacin.jpg'

export default function ToacinBio() {
    return (
        <Box component='article' sx={{ width: "50%" }} >
            <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img alt='Toacin wearing a hat' src={Toacin} style={{ height: "300px", width: "300px", marginBottom: "20%", marginRight: "7%", borderRadius: "50%" }} />
                </Box>
                <Box sx={{ width: "50%" }}>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "3em", color: "lightgray", textAlign: "end", marginBottom: "20px" }}>Toacin Patwary</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                        <Typography variant='h2' component='h2' sx={{ fontSize: "1.5em", color: "gray", marginBottom: "20px", textAlign: "end", width: "100%" }}> Hey there! I am prospective full stack web developer and software engineer from Phoenix, Arizona, with a university background in Electrical Engineering and Mathematics. This project has been a passion project, and I'm glad to be sharing it with you all!</Typography>
                    </Box>
                    <Typography variant='h2' component='h2' sx={{ fontSize: "2em", color: "lightgray", marginBottom: "15px", textAlign: "end" }}>Favorite Technologies</Typography>
                    <Box sx={{ marginBottom: "40px", textAlign: "end" }}>
                        <Chip label="Extra Soft" sx={{ marginLeft: "10px" }} />
                        <Chip label="Soft" sx={{ marginLeft: "10px" }} />
                        <Chip label="Medium" sx={{ marginLeft: "10px" }} />
                        <Chip label="Hard" sx={{ marginLeft: "10px" }} />
                    </Box>
                    <Box sx={{ marginBottom: "35px", textAlign: "end" }}>
                        <BusinessCenterIcon sx={{ fontSize: "3em", color: 'gray', marginLeft: "10px" }} />
                        <LinkedInIcon sx={{ fontSize: "3em", color: 'gray', marginLeft: "10px" }} />
                        <GitHubIcon sx={{ fontSize: "3em", color: 'gray', marginLeft: "10px" }} />
                    </Box>
                </Box>
            </Box>
            <Divider light sx={{ width: "100%", marginBottom: "60px", marginTop: "40px", borderBottomWidth: 2, borderColor: "#303030" }} />
        </Box>
    )
}