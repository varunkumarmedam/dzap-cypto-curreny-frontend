import './App.css';
import CoinsDropdown from './components/CoinsDropdown';
import { useState } from 'react';

function App() {
  const [selectedCoin, setSelectedCoin] = useState({});

  const [coinsList, setCoinsList] = useState([{
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "btc",
    "logo": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
  },
  {
    "id": "ethereum",
    "name": "Ethereum",
    "symbol": "eth",
    "logo": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
  },
  {
    "id": "tether",
    "name": "Tether",
    "symbol": "usdt",
    "logo": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661"
  },
  {
    "id": "binancecoin",
    "name": "BNB",
    "symbol": "bnb",
    "logo": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970"
  }]);

  return (
    <div className="App">
      <CoinsDropdown
        handleChange={(val) => { setSelectedCoin(val) }}
        selectedVal={selectedCoin?.name}
        options={coinsList} />
    </div>
  );
}

export default App;
