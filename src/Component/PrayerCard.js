import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';


const PrayerCard =({name,time,img})=>{
    return(
        <>
      <Grid item xs={12} sm={6} md={4} >
      <Card sx={{ width: "100%", margin: "20px" }} >
        <CardActionArea >
          <CardMedia 
            component="img"
            height="180"
            image={img}
            alt="prayercard"
          />
          <CardContent >
            <h1 style={{ fontSize: 30 }}>{name}</h1>
            <Typography gutterBottom variant="h2" component="div">
              {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>

        </>
    )

}
export default PrayerCard