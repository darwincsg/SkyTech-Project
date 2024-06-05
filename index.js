require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./Routes/index.js");
const register = require("./Routes/register.js");
const dashboard = require("./Routes/dash.js");
const parts = require("./Routes/parts.js");
const assemblies = require("./Routes/assemblies.js");
const statistics = require("./Routes/statistics.js");
const assemble = require("./Routes/assemble.js");
const test = require("./Routes/test.js"); // Keep the test route

app.use("/", router);
app.use("/register", register);
app.use("/dashboard", dashboard);
app.use("/parts", parts);
app.use("/assemblies", assemblies);
app.use("/statistics", statistics); // Ensure this line exists
app.use("/assemble", assemble);
app.use("/test", test); // Keep the test route

mongoose.connect(process.env.MONGO_URI, { 
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/login", function(req, res) {
    res.render("login", { page: 'login' });
});

app.post("/login", async function(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send("Invalid username or password.");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send("Invalid username or password.");
        }

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true });

        return res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error logging in.");
    }
});
