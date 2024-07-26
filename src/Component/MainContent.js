import React, { useState ,useEffect} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import PrayerCard from "./PrayerCard";
import photo1 from '../Component/assest/p1.jpg';
import photo2 from '../Component/assest/p2.jpg';
import photo3 from '../Component/assest/p3.jpg';
import photo4 from '../Component/assest/p4.jpg';
import photo5 from '../Component/assest/p5.jpg';
import { Container } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import moment from 'moment';
import  'moment/dist/locale/ar';
moment.locale("ar");


const MainContent=()=>{

const [today,setToday]=useState('');
const [timings,setTimings]=useState({
    "Fajr": "03:58",
    "Dhuhr": "12:40",
    "Asr": "16:26",
    "Maghrib": "19:47",
    "Isha": "21:21",

})

const avilableCities=[
        {displayName:"حمص",
        apiName:"Homs"},
        {displayName:"طرطوس",
        apiName:"Tartus"},
        {displayName:"دمشق",
        apiName:"Damascus"},
        {displayName:"حماه",
        apiName:"Hama"},
        {displayName:"حلب",
        apiName:"Aleppo"},
        {displayName:"دير الزور",
        apiName:"Deir ez-Zor"},
        {displayName:"اللاذقية",
        apiName:"Latakia"}
];

const[selectedcity,setSelectedcity]=useState({
    displayName:"حمص",
    apiName:"Homs"
})

    const getTimings= async()=>{
        const response=await axios.get(`https://api.aladhan.com/v1/timingsByCity/24-07-2024?country=SY&city=${selectedcity.apiName}`);
        setTimings(response.data.data.timings)
    }

    useEffect(()=>{
         getTimings();
    },[selectedcity]);

const [restTimes,setRestTimes]=useState("00:00:00");

    useEffect(()=>{
        let interval=setInterval(()=>{
            setupCountdownTimer()
        },1000)
         const t=moment();
         setToday(t.format("MMM Do YYYY | h:mm "))
         return ()=>{
            clearInterval(interval);
         }
    },[restTimes]);

    const [prayerName,setPrayerName]=useState({
        arabicName:"",
        engName:""
    })

    const setupCountdownTimer=()=>{
        const momentNow=moment();
        
        if (momentNow.isAfter(moment(timings["Asr"], "hh:mm"))&&momentNow.isBefore(moment(timings["Maghrib"],"hh:mm"))) {
            setPrayerName({ arabicName:"المغرب",
                engName:"Maghrib"})
        }
        else if(momentNow.isAfter(moment(timings["Dhuhr"],"hh:mm"))&&momentNow.isBefore(moment(timings["Asr"],"hh:mm"))){
            setPrayerName({ arabicName:"العصر",
                engName:"Asr"})
        }
        else if(momentNow.isAfter(moment(timings["Maghrib"],"hh:mm"))&&momentNow.isBefore(moment(timings["Isha"],"hh:mm"))){
            setPrayerName({ arabicName:"العشاء",
                engName:"Isha"})
        }
        else if(momentNow.isAfter(moment(timings["Fajr"],"hh:mm"))&&momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
            setPrayerName({ arabicName:"الظهر",
                engName:"Dhuhr"})
        }
        else{
            setPrayerName({ arabicName:"الفجر",
                engName:"Fajr"})
        }

        const prayerTime = moment(timings[prayerName.engName], "hh:mm");
        const now = moment();
        const duration = moment.duration(prayerTime.diff(now));
        if (duration.asMilliseconds() < 0) {
          duration.add(24, 'hours'); 
        }
        const restTime = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
        setRestTimes(restTime);
        return restTimes;
}
    
    const handleChange = (event) => {
        const cityObj=avilableCities.find((city)=>{
            return city.apiName == event.target.value;
        })
        setSelectedcity(cityObj)
      };

    return(
        <>
        <Grid container>
            <Grid xs={6} style={{color:'white'}}>
                <div>
                    <h1>{selectedcity.displayName}</h1>
                    <h2>{today}</h2>
                </div>
            </Grid>
            <Grid xs={6} style={{color:'white'}}>
                <div>
                    <h2>متبقي حتى صلاة <span style={{fontSize:30}}>{prayerName.arabicName}</span></h2>
                    <h1>{restTimes}</h1>
                </div>
            </Grid>
        </Grid>
        <Divider variant="middle"  style={{borderWidth:'1px',borderColor:'#fff',opacity:0.1}}/>
        
    <Container maxWidth="lg">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 3 }}
  direction="row"
  justifyContent="center"
  alignItems="center"
  gap="15px"
  sx={{ flexWrap: "wrap" ,alignItems:'center' }}>
       
    
        <PrayerCard 
        time={timings.Dhuhr}
        name="صلاة الظهر"
        img ={photo2} />

        <PrayerCard 
        time={timings.Asr}
        name="صلاة العصر"
        img ={photo1} />

        <PrayerCard 
        time={timings.Maghrib}
        name="صلاة المغرب"
        img ={photo3} />

        <PrayerCard 
        time={timings.Isha}
        name="صلاة العشاء"
        img ={photo5} />

        <PrayerCard 
        time={timings.Fajr}
        name="صلاة الفجر"
        img ={photo4} />
        </Grid>
   </Container>

        <FormControl style={{margin:"15px"}}>
        <InputLabel id="demo-simple-select-label" style={{color:'#fff'}}>City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedcity.apiName}
          label="City"
          onChange={handleChange}
          style={{color:'white',width:'170px'}}
        >

            {avilableCities.map((city)=>(
                <MenuItem
                key={city.apiName}
                value={city.apiName}
                >{city.displayName}</MenuItem>
            ))}
        </Select>
      </FormControl>
        </>
    ) 


}
export default MainContent