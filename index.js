const mongoose = require("mongoose"); 
const dbUrl = process.env.MONGO_ATLAS_URL; 
//Här startar vi vår server 
const {app, port} = require("./src/server"); 

// Kicka igång servern
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true }
mongoose.connect(dbUrl, dbOptions).then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})

module.exports = {app, port}