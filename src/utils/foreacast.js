const request= require("postman-request");

const forecast=(latitude, longitude, callback)=>{
    const url="http://api.weatherstack.com/current?access_key=065faa5cbdfc640391b53f96cfe45662&query="+latitude+","+longitude+"&units=m";
    request(url,(error,response, body)=>{
        //console.log(body);
        if(error || JSON.parse(body).success==false){
            callback(error,undefined);
            console.log("ERROR");
           // console.log(body.error.info);
        }
        else{
            //console.log(body);
            var resbody=JSON.parse(body);
            var resobj={
                "precipitation":resbody.current.precip,
                "temperature":resbody.current.temperature
            }
            callback(undefined,resbody);
        }
    })
}

module.exports=forecast;