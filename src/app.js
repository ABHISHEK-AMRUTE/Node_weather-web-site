const express = require('express')
const path  =require('path')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const request =require("request");
const geocode =require("./utils/geocoding")
const forecast =require("./utils/forecast");

var partialpath = path.join(__dirname,'../templets/partials')
hbs.registerPartials(partialpath)
var pathdirectory= path.join(__dirname,'../public')
app.set('view engine','hbs')
var  viewpath =path.join(__dirname,'../templets/views')
app.set('views',viewpath)
app.use(express.static(pathdirectory))
app.get('',(req,res)=>
{  
    res.render('index',{
        title:'Weather',
        content:'created dynamically',
        name:'abhishek amrute'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        content:'created dynamically',
        name:'abhishek amrute'
    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'about',
        content:'created dynamically',
        name:'abhishek amrute'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return  res.send('Require Address querry for forecasting')
       
    }
    geocode(req.query.address,(erro,{longitute,latitude}={})=>
    {
        if(erro)
        {
            return  res.send({
                error:'Try another name pls!'
            })
        }
        else
        {  
       
            forecast(latitude,longitute,(error,ress)=>
            { 
                if(error)
                {
                    return  res.send({
                        error:'Try another name pls!'
                    })
                }
                else
                {
                    console.log(ress.body.currently.summary+" " +ress.body.currently.temperature+" And the cahnce of rain is : " +ress.body.currently.precipProbability*100)
                    res.send({
                        summary:ress.body.currently.summary,
                        temperature : ress.body.currently.temperature,
                        rain_probability : ress.body.currently.precipProbability
                    })
                }
            })
            
        }
    })

   
   
    

})
app.get('/help/*',(req,res)=>
{
    res.render('404',{
        title:'404!',
        content:'Help page not found',
        name:'Abhishek Amrute'
    })
})
app.get('*',(req,res)=>
{
    res.render('404',{
        title:'404!',
        content:'page not found',
        name:'Abhishek Amrute'
    })
})

app.listen(port,()=>{
    console.log('Server is up at port ' + port)
})