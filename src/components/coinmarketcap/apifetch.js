import cron from 'node-cron';
import axios from 'axios'
import CoinGecko from "coingecko-api"


const CoinGeckoClient = new CoinGecko();
const apiFetch = async ()=>{
    console.log("ApiFetch Working well!!!")
}

export const coinDataFetch =async (coin)=>{
    const data = await CoinGeckoClient.coins.fetch(`${coin}`, {});
    const marketData = data.data.market_data;
    
    const requiredData = {
        price: marketData.current_price.usd,
        marketCap : marketData.market_cap.usd,
        tradingVolume24Hours: marketData.total_volume.usd,
        PriceChange24Hours: marketData.price_change_percentage_24h,
        PriceChange7Day: marketData.price_change_percentage_7d,
    };
    console.log(requiredData)
    return requiredData;


}


export default apiFetch;