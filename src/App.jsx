import { useState, useEffect } from "react";

const apiCall = {
  event: "bts:subscribe",
  data: { channel: "order_book_btcusd" },
};

const App = () => {
  const [bids, setBids] = useState([0]);

  useEffect(() => {
    const websocket = new WebSocket("wss://ws.bitstamp.net");
    websocket.onopen = (event) => {
      websocket.send(JSON.stringify(apiCall));
    };

    websocket.onmessage = (event) => {
      const json = JSON.parse(event.data);
      try {
        if (json.event === "data") {
          setBids(json.data.bids.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <div>
      {bids.map((item, index) => (
        <div key={index}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
