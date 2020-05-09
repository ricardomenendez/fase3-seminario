const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

exports.handler = function (e,ctx,callback) {
    // TODO implement
    let scanningParameters = {
        TableName: 'Verbodega2'
    };
    
    docClient.scan(scanningParameters, function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
    })
    
};
