require('dotenv').config({path:__dirname + '/../.env'});
const mongoose = require('mongoose');
const app = require('./middleware');


//MongoDB connection
mongoose.connect(process.env.DB_LOCAL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected to the database');
})
.catch( err => {
    console.log(`something went wrong ${err}`);
})


//Test Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello From The Backend" });
});



//assign port 8000 to listen requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});