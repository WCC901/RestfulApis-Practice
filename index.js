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

const error = require(`./utilities/errors`);

// Valid API Keys.
apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx"];

// To access: localhost:3000/api/user?api-key=ONE_OF_THE_API_KEYS

// New middleware to check for API keys!
// Note that if the key is not verified,
// we do not call next(); this is the end.
// This is why we attached the /api/ prefix
// to our routing at the beginning!
app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];

    // Check for the absence of a key.
    if (!key) {
        res.status(400);
        return res.json({ error: "API Key Required" });
    }

    // Check for key validity.
    if (apiKeys.indexOf(key) === -1) {
        res.status(401);
        return res.json({ error: "Invalid API Key" });
    }

    // Valid key! Store it in req.key for route access.
    req.key = key;
    next(); // Think of next() like continuing on, so the code doesn't get stuck
});

//Use our routes 
app.use("/", (req, res) => {
    res.send("all routes should begin with /api")
});

app.get(`/`, (req, res) => {
    res.send("All usable routes start with slash api.");
});

// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});

