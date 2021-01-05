const express=require('express');
const path=require('path');
const hbs=require('hbs');
const geocode=require("./utils/geocode.js");
const forecast=require("./utils/foreacast.js");

const app=express();

const port=process.env.PORT||3000;

//console.log("Hello000");
//Paths for Express config
const viewspath=path.join(__dirname, '../templates/views');
const publicpath=path.join(__dirname,'../public');
const partialspath=path.join(__dirname,'../templates/partials');

//set handlebars engine and view location
app.set('view engine','hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);



//Setup Static Directory to Serve
app.use(express.static(publicpath));

app.get('',(req,res)=>{
    res.render('index',{"title":"Weather","createdby":"Vamsi"});
    //res.send("Index Page");
})

app.get('/about',(req, res)=>{
    res.render('about',{"title":"About","createdby":"Vamsi"});
})

app.get('/help',(req,res)=>{
    res.render('help',{"title":"Help","createdby":"Vamsi"});
})

app.get('/help/*',(req,res)=>{
    res.render('404',{"type":"help"});
})



app.get('/weather',(req, res)=>{

    if(req.query.address==undefined){
        return res.send({"error":"Please Provide address"});
    }

    //var precip,temp;
    //console.log(decodeURIComponent(req.query.address));
    geocode(req.query.address,(error,{latitude, longitude}={})=>{

        if(error){
            return res.send({error});
        }
   // console.log(latitude);
    forecast(latitude, longitude, (error, forecastdata)=>{
        /*res.send({
            precipitation: forecastdata.precipitation,
            temperature:forecastdata.temperature
        })*/
        res.send(forecastdata);
    });
    });
    
    
 })



app.get('*',(req, res)=>{
   // res.send("My 404");
   res.render('404',{"type":"generic"});
})



app.listen(port,()=>{
console.log("Server up on "+port);
});

