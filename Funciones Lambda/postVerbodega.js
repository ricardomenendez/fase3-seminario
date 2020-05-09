const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2"});

exports.handler = function (e,ctx,callback){
    console.log(e);
    
    var params = {
        Item: {
            "id":  Date.now(),
            "temperatura": e.Temperatura,
            "humedad": e.Humedad,
            "co2": e.CO2,
            "smoke": e.Smoke,
            "lpg": e.LPG,
            "dipositivo": e.Dispositivo,
            "date": Date().toString()
        },
        TableName:'Verbodega2'
    };
    
    docClient.put(params,function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,{message: "Works! Ok!"});
        }
    });
    
};
