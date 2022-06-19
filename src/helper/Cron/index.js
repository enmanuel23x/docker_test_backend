const fs = require('fs');
const { callWs } = require('../WebSocket');
const { ArrayCut } = require('../Util');

function heartbeat() {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
        UpdateCoinList()//Reconnect socket
    }, 1000 + 1000);
}

const UpdateCoinList = () => {
    const ws = callWs('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');
    ws.on('open', heartbeat);
    ws.on('ping', heartbeat);
    ws.on('close', function clear() {
        clearTimeout(this.pingTimeout);
    });
    ws.on('message', function message(data) {
        const batchList = JSON.parse(fs.readFileSync('./src/data/Batch.json', 'utf8'));
        let newData = JSON.parse(data);
        newData['date'] = new Date();
        batchList.push(newData);
        if (batchList.length > 20) {
            batchList.shift();
        }
        proccessNewData(batchList);
        fs.writeFileSync('./src/data/Batch.json', JSON.stringify(batchList));
    });
    ws.on('close', () => {
        console.log('websocket closed')
    });
    ws.on('error', () => {
        console.log('websocket error')
    });
}

const proccessNewData = (batchList) => {
    const keys = ["bitcoin", "ethereum", "monero", "litecoin"];
    const CointList = JSON.parse(fs.readFileSync('./src/data/CointList.json', 'utf8'));
    let newCoinList = [];

    const clean = (data) => data
        .filter((arr, index, self) => index === self.findIndex((t) => (t.date === arr.date && t.value === arr.value)))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    for (const key of keys) {

        let prevList = CointList.find(item => item.key === key);
        prevList = prevList ? prevList.List || [] : [];
        let List = batchList.filter(item => item[key]).map(item => { return { date: item.date, value: item[key] } });
        List = prevList.concat(List || []);
        List = clean(List);//Remove duplicates
        List = ArrayCut(List, 10);//Cut to Latest 10 items
        const Sum = Math.round(List.reduce((a, b) => a + parseFloat(b.value), 0), 2);
        newCoinList.push({
            name: key,
            key,
            List,
            avg: (Sum / List.length) || 0
        })
    }
    fs.writeFileSync('./src/data/CointList.json', JSON.stringify(newCoinList));
}

module.exports = {
    UpdateCoinList
};//end module.exports