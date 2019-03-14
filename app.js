var express = require("express");
const http = require('http');
var app = express();
var courseList = ["os","dsa","dcn","java","ss"];
var id = ["msonthalia","vsonthalia","ssonthalia"];
var pass = ["08091997","08051996","06031973"];
var os = [];
var dsa = [];
var dcn = [];
var java = [];
var ss = [];
var status = [];
var statustoprint = [];
var student_courses = [[],[],[]];
var username;
var password;
var n;

app.set("views","./views");
app.set("view engine","pug");
app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.use(function(req,res,next)
{
    console.log(req.body);
    console.log("middleware"+req.url);

    if(req.url=="/login")
    {
        next();       
    }

    if(req.url=="/option")
    {

        username=req.body.username;
        password=pass[id.indexOf(username)];
        if(username=="msonthalia" && password=="08091997")
        {
            n=0;
            res.render('option');
        } 
        else if(req.body.name=="vsonthalia" && req.body.password=="08051996")
        {
            n=1;
            res.render('option');
        }
        else if(req.body.name=="ssonthalia" && req.body.password=="06031973")
        {
            n=2;
            res.render('option');
        }
        else
        {
            res.status(401).send("Invalid Username or Password");
        }
    }

        
    if(req.url=="/coursereg")
    { 
        next();
    }
    if(req.url=="/studprof")
    { 
        next();
    }

});


app.get("/login",function(req,res)
{
    console.log("Logging in");
    res.render("login");
});


app.post("/option",function(req,res){
    console.log("get options ");
    console.log(req.body.value);
    res.render("option");
});


app.get("/coursereg",function(req,res)
{
    console.log("post course reg");
    console.log(req.body);

    res.render("courseregister");
});


app.post("/coursereg",function(req,res)
{
    console.log("post course reg");
    console.log(req.body);
    console.log(req.body.subject);
   

    if(req.body.subject=='1')
    {
        os.push(username);
        student_courses[n].push("os");
        console.log("enrolled in os");
    }

    else if(req.body.subject=='2')
    {  
        var indice = os.indexOf(id[n]);
        os.splice(indice,1);
        var indices = student_courses[n].indexOf("os");
        student_courses[n].splice(indices,1);
        console.log("unenrolled in os");
        console.log(student_courses[n]);
    }
        
    else if(req.body.subject=='3')
    {
        dsa.push(username);
        student_courses[n].push("dsa");
        console.log("enrolled in dsa");
    }

    else if(req.body.subject=='4')
    {  
        var indice = dsa.indexOf(id[n]);
        dsa.splice(indice,1);
        var indices = student_courses[n].indexOf("dsa");
        student_courses[n].splice(indices,1);
        console.log("unenrolled in dsa");

    }

    else if(req.body.subject=='5')
    {
        dcn.push(username);
        student_courses[n].push("dcn");
        console.log("enrolled in dcn");
    }

    else if(req.body.subject=='6')
    {  
        var indice = dcn.indexOf(id[n]);
        dcn.splice(indice,1);
        var indices = student_courses[n].indexOf("dcn");
        student_courses[n].splice(indices,1);
        console.log("unenrolled in dcn");
        
    }

    else if(req.body.subject=='7')
    {
        java.push(username);
        student_courses[n].push("java");
        console.log("enrolled in java");
    }

    else if(req.body.subject=='8')
    {  
        var indice = java.indexOf(id[n]);
        java.splice(indice,1);
        var indices = student_courses[n].indexOf("java");
        student_courses[n].splice(indices,1);
        console.log("unenrolled in java")
        
    }

    else if(req.body.subject=='9')
    {
        ss.push(username);
        student_courses[n].push("ss");
        console.log("enrolled in ss");
    }

    else if(req.body.subject=='10')
    {  
        var indice = ss.indexOf(id[n]);
        ss.splice(indice,1);
        var indices = student_courses[n].indexOf("ss");
        student_courses[n].splice(indices,1);
        console.log("unenrolled in ss");
    }

    if(os.length>=2)
    {
        status[0]='active';
        console.log("Active statement");
    }
    
    else 
    {
        status[0]='inactive';
    }

    if(dsa.length>=2)
    {
        status[1]='active';
    }
    
    else 
    {
        status[1]='inactive';
    }

    if(dcn.length>=2)
    {
        status[2]='active';
    }
    
    else 
    {
        status[2]='inactive';
    }

    if(java.length>=2)
    {
        status[3]='active';
    }
    
    else 
    {
        status[3]='inactive';
    }

    if(ss.length>=2)
    {
        status[4]='active';
    }
    
    else 
    {
        status[4]='inactive';
    }

    var i = 0;
    statustoprint.splice(0);
    for(var sc=0;sc<student_courses[n].length;sc++)
    //student_courses[n].forEach(function(sc)
    {
        if(student_courses[n][sc]=='os')
        {
            statustoprint[i]=status[0];
            console.log(status);
        }
        else if(student_courses[n][sc]=='dsa')
        {
            statustoprint[i]=status[1];
        }
        else if(student_courses[n][sc]=='dcn')
        {
            statustoprint[i]=status[2];
        }
        else if(student_courses[n][sc]=='java')
        {
            statustoprint[i]=status[3];
        }
        else if(student_courses[n][sc]=='ss')
        {
            statustoprint[i]=status[4];
        }
        i++;
    }


    res.render("courseregister");
});


app.post("/studprof",function(req,res)
{    
    res.render("studprof",{
        courses : student_courses[n],
        stat : statustoprint
    });

});
app.listen(3000);