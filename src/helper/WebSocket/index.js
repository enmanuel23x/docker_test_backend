const WebSocket = require('ws');

const callWs = (url) => {
    return new WebSocket(url, {
        perMessageDeflate: false
    });
}

module.exports = {
    callWs
}; //end module.exports