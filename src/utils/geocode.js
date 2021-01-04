const request=require('postman-request');

const geocode=(address, callback)=>{
    const geocodeurl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidmFtc3k1NjQiLCJhIjoiY2tqNjc0YXNlNDhuOTJ3cnh5b3JlN2E4aCJ9.ql6-agkM36uYgIpD9G2C-A";
    request(geocodeurl, (error, response, body)=>{
        if(error){
            callback(error,undefined);
        }
        else if(JSON.parse(body).features.length==0){
            callback("Location doesn't exist", undefined);
        }
        else{
            //console.log(body);
            var result=JSON.parse(body).features[0];
            var resobj={};
            resobj.latitude=result.geometry.coordinates[1];
            resobj.longitude=result.geometry.coordinates[0];
            resobj.place=result.place_name;

            callback(undefined,resobj);
        }
    })

}

module.exports=geocode;