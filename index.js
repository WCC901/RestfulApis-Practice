const express = require("express");
const app = express();
const port = 3000;

// Imports the data from the fake database files
const users = require("./data/users");
const posts = require("./data/posts");

// Index route for users
app.get(`/api/users`, (req, res) => {
    res.json(users);
});

// Show route for Users
app.get(`/api/users/:id`, (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.send("User Not Found");
    }
});

// Index route for Posts
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

//Show route for Posts
app.get("api/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.send("Post Not Found");
    }
});

app.get(`/`, (req, res) => {
    res.send("All usable routes start with slash api.");
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});

