const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message);
    console.log(`Received message: ${data}`);
    switch (data.type) {
      case 'offer':
        // Receiving an SDP offer from a client
        pc.setRemoteDescription(data.offer);
        
        // Generate the SDP answer
        pc.createAnswer().then((answer) => {
          pc.setLocalDescription(answer);

          // Send the SDP answer to the client
          ws.send(JSON.stringify({ type: 'answer', answer }));
        });
        break;
      case 'answer':
        // Receiving an SDP answer from a client
        pc.setRemoteDescription(data.answer);
        break;
      case 'ice':
        // Receiving an ICE candidate from a client
        pc.addIceCandidate(data.candidate);
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});



