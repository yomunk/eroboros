const express = require("express");
const cors = require("cors");
const app = express();
const osc = require("osc");

let currentMessage ="";

app.use(cors());

app.listen(3000,()=>{
  console.log(`Example app listening on port ${3000}`)

})

app.get('/', function (req, res, next) {
      res.statusCode = 200;
  res.json({
    currentMessage,
  })
})

const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 12345
});

udpPort.on("ready", function () {
    // var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    // ipAddresses.forEach(function (address) {
    //     console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    // });
});
udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
    currentMessage=JSON.stringify({[oscMessage.address]:oscMessage.args[0]})
});
udpPort.open();

// OSC.js
