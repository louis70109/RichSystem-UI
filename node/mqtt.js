const mqtt = require('mqtt')
const opt = {
  port: 1883
}

let client = mqtt.connect('mqtt://35.165.3.251', opt)

client.on('connect', () => {
  console.log('已經連接mqtt囉');
  client.subscribe('device_1')
})

client.on('message', (topic, msg) => {
  console.log(`收到 ${topic} 主題，訊息： ${msg.toString()}`);
})