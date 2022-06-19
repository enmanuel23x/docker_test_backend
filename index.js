require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT || 2000;

//Catch console logs (log, warn, error)
if (process.env.LOG_ACTIVE == 'true') {
    const Logger = require('./src/helper/Logger');
    //Catch log
    const trueLog = console.log;
    trueLog(process.env.LOG_ACTIVE)
    console.log = function () {
        trueLog(...arguments);
        Logger.info(arguments)
    }
    //Catch error
    const trueError = console.error;
    console.error = function () {
        trueError(...arguments);
        Logger.error(arguments)
    }
    //Catch warn
    const trueWarn = console.warn;
    console.warn = function () {
        trueWarn(...arguments);
        Logger.warn(arguments)
    }
}

//Listen server
server.listen(PORT, err => {
    if (err) console.log(err)
    console.log('Server running on Port ', PORT)
})