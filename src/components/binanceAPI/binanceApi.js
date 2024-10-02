import WebSocket from 'ws';

let latestPrice = null; // Variable to store the latest price

const binanceSocket = (coin) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}usdt@trade`);

    ws.on('message', (data) => {
      const trade = JSON.parse(data);
      const price = trade.p; // The price of the trade
      
      // Log the trade data
      // console.log(trade);

      // Update the latest price variable
      latestPrice = price;

      // Resolve the Promise with the latest price
      resolve(price);
      
      // Optionally, close the WebSocket after getting the first price
      // ws.close();
    });
    
    // Handle WebSocket connection errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      reject(error); // Reject the Promise on error
    });
    
    // Handle WebSocket close event
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};

// Export the function and the latest price variable
export { binanceSocket, latestPrice };
