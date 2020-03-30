const request =require('request')
const forecast = (long,latit,callback)=>
{
     var url ="https://api.darksky.net/forecast/91a71fd8642654a43a4c4dc42b7d541a/"+long+","+latit;
     request({url:url,json:true},(error ,res)=>
     {  if(error)
        {
            callback("unable to connect",undefined)
        }
        else
        {    
            callback(undefined,res);
        }
         
     });
}

module.exports = forecast