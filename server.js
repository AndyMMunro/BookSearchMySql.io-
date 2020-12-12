const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
// models sync
const db = require("/models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
// routes acquisition

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");


app.use("/", userRoutes)
app.use("/api", bookRoutes)


// Start the API server
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});