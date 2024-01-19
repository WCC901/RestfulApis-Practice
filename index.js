const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// Our route files for users and posts
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

// Points to the users and posts files in the routes folder
const users = require(`./ruotes/users`, users);
const posts = require(`./routes/posts`, posts);

//Use our routes 
app.use("/", (req, res) => {
    res.send("all routes should begin with /api")
});

app.get(`/`, (req, res) => {
    res.send("All usable routes start with slash api.");
});

// 404 Middleware
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
  });

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});

