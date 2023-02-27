const express = require ("express");
const bodyParser = require('body-parser')
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(request, response){
    response.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(request, response){

    var firstname = request.body.fName;
    var lastname = request.body.lName;
    var email = request.body.email;

    var data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    
    }
    var jsonData = JSON.stringify(data);

    var url = "https://us21.api.mailchimp.com/3.0/lists/570588f634";
    
    var Options = {
        method :"POST",
        auth:"DevMautin01:7c660fbbf52c5452d5bdf25e94078152-us21"
    }
    

  var req =  https.request(url, Options, function(response){
   
        response.on("data", function(data){ 
            console.log(JSON.parse(data));
        })
    })
    if (response.statusCode === 200){
        response.sendFile( __dirname + "/success.html");
    }else{
        response.sendFile(__dirname + "/failure.html");
    };


    req.write(jsonData);
    req.end();
});

app.post("/failure" , function(request, response){
    response.redirect("/")
})

    

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000")
});



// Api keys
// 7c660fbbf52c5452d5bdf25e94078152-us21

// Unique id
// 570588f634