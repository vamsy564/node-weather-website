//console.log("this is console logged");

function getCityWeather(cityname){
fetch('/weather?address='+cityname).then((response)=>{
    response.json().then((data)=>{
        //console.log(data);
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data);
            document.getElementById('temperature').innerText=data.current.temperature;
            document.getElementById('precip').innerText=data.current.precip;
        }
        
    })
})
}
const weatherform=document.querySelector('form');
const search=document.querySelector('input');
weatherform.addEventListener("submit",(e)=>{
    e.preventDefault();
    //console.log("Test"+search.value);
    getCityWeather(search.value);

});