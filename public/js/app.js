// const fetch = require("node-fetch");
console.log("Script running normal");




var form = document.querySelector('form')
var inp = document.querySelector('input')
var mes1 =document.querySelector('#mes1')
var mes2 =document.querySelector('#mes2')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    var st = "http://localhost:3000/weather?address=" + inp.value;
    fetch(st).then((response)=>{
       
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                mes1.textContent="Error! Try again with correct name"
                mes2.textContent=""
                
            }else{
                mes1.textContent="Temperature " + data.temperature
                mes2.textContent="Summary : " + data.summary +" Chance of rain is " +data.rain_probability*100 +" %"
                   
               }
        }) 
       
       
    })
    .catch((err)=>
    {
        mes1.textContent="Error! Try again with correct name"
        mes2.textContent=""
    })
})