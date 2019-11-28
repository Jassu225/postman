const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const config = require('./config');
const routes = require('./routes');
const port = process.env.PORT || config.port;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let sessionCookie = {
    cookie: {
        secure: false
    },
    secret: "secret key",
    resave: true,
    saveUninitialized: true
}

if (app.get('env') === 'production') {
    // app.set('trust proxy', 1) // trust first proxy
    sessionCookie.cookie.secure = true // serve secure cookies
}
// console.log(__dirname);
  
app.use(session(sessionCookie));
app.use("/css/",express.static(path.join(__dirname, "../client","/css")));
app.use("/js/",express.static(path.join(__dirname, "../client", "/js")));
app.use("/images/",express.static(path.join(__dirname, "../client", "/images")));

// GET Methods
app.get(routes.root, function(req, res) { 
    // send root
    res.sendFile(path.join(__dirname, "../client", "/html/index.html"));
});

// POST Methods
app.post(routes.root, function (req, res) {
    res.sendStatus(403);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));