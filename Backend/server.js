const express = require('express');
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./Config/database")
const path = require('path');

const cors = require("cors")
const app = express();
const port = 3000;

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

connectDB()

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use("/auth",authRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});