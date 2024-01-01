import './App.css';
import CoinsDropdown from './components/CoinsDropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BubbleText from './components/BubbleText';
import { toast } from 'react-toastify';
import bomb from './utils/bomb';

function App() {
  const [amount, setAmount] = useState('');
  const [priceInfo, setPriceInfo] = useState('');
  const [calcPrice, setCalcPrice] = useState('');

  const [error, setError] = useState('');

  const [selectedCoin, setSelectedCoin] = useState({});
  const [coinsList, setCoinsList] = useState([{
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

  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [currencyList, setCurrencyList] = useState([{ id: 'btc', name: 'BTC' }, { id: 'inr', name: 'INR' }]);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const base_url = "https://dzap-cypto-curreny-backend.vercel.app/coins";
    
    const fetchData = async () => {
      try {
        const response = await axios.get(base_url); // Replace with your API endpoint
        setCoinsList(response.data.coins);
        const coinsMap = response.data.currencies.map((currency) => {
          return {
            id: currency,
            name: currency.toUpperCase()
          }
        })
        setCurrencyList(coinsMap);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchData();
  }, []);

  const convert = async () => {
    if (amount == '') {
      toast.error("Please enter amount");
      return;
    }
    if (!selectedCoin.name) {
      toast.error("Please select a coin to convert");
      return;
    }
    if (!selectedCurrency.name) {
      toast.error("Please select a currency to convert")
      return;
    }
    setIsConverting(true);
    setPriceInfo(`${amount.toString()} ${selectedCoin.name} cost ${selectedCurrency.name}`);
    setCalcPrice(false);

    try {
      const base_url = `https://dzap-cypto-curreny-backend.vercel.app/coins/conversion?id=${selectedCoin.id}&amount=${amount}&currency=${selectedCurrency.id}`;
      const response = await axios.get(base_url); // Replace with your API endpoint
      bomb.cannon();
      setCalcPrice(response.data.price);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConverting(false);
    }

  }

  return (
    <div className="home-page-bg">
      <div className='main-content'>
        {error && <><img src='https://clipart-library.com/img1/764205.png' height={150} />
          <p>Mehh.. Something went wrong</p>
          <p>Error : {error}</p></>}

        {(!error && !isPageLoading) &&
          <>
            <BubbleText title={'DZap-Convertor'} />
            <div className='form-actions'>
              <input className='mr-2' onChange={(evnt) => setAmount(evnt.target.value)} type='number' />
              <CoinsDropdown
                handleChange={(val) => { setSelectedCoin(val) }}
                selectedVal={selectedCoin?.name}
                options={coinsList} />
              <h3 className='mr-2'> to </h3>
              <CoinsDropdown
                handleChange={(val) => { setSelectedCurrency(val) }}
                selectedVal={selectedCurrency?.name}
                options={currencyList} />
            </div>

            <div className='btn-container'>
              {isConverting ? <span class="loader"></span> :
                <button className='button-49' role='button' onClick={() => convert()}>Convert</button>}
            </div>

            {calcPrice && <div className='price-info-box'>{priceInfo} <h4 className='ml-2'>{calcPrice}</h4></div>}
          </>
        }

        {isPageLoading && <span class="loader"></span>}

      </div>

    </div>
  );
}

export default App;
