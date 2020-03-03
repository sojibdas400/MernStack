const express = require("express");
const app = express();


app.get('/', (req, res) => {
    res.json({
        message: 'welcome to our app hh' 
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server is running at port ${PORT}");
});








