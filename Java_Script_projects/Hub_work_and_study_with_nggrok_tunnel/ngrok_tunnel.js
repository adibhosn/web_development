// ngrok_tunnel.js
const ngrok = require('ngrok');

(async function() {
    const url = await ngrok.connect(63342);
    console.log(`ngrok tunnel created at URL: ${url}`);
})();
