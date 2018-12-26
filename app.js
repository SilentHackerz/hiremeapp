const express = require('express');
const path=require("path");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express()
const port = 3000


app.use(express.static(__dirname+'/public'));

app.set('views', path.join(__dirname,'/public'));
app.set("view engine","jade");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", function(req,res,next){
res.render("index");
})


app.post("/",function(req,res,next){

    let transporter = nodemailer.createTransport({
        host: 'gains.arrowsupercloud.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ayub@imohammad.in',
            pass: 'e^{)f^Q6a_q)' 
        }
    });

    
    let mailOptions = {
        from: '"Mohammad" <ayub@imohammad.in>',
        to: `mohammad.tech36@gmail.com, $(req.body.email)`,
        subject: 'Hire me Acknodlegment email from the hacking school bootcamper',
        text: 'Hello '+ req.body.firstname,
        html: '<b>The following data has been acknowledged</b>' + "<br>" + req.body.firstname + "<br>" + req.body.lastname + "<br>" + req.body.email + "<br>" + req.body.phone +"<br>" + req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
       
    });
    res.redirect("/success.html")
});

app.get("/success", function(req,res,next){
    res.sendFile(__dirname+"/public/success.html")
})

// app.get('/', (req, res, next) => res.sendFile(__dirname+"/public"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))