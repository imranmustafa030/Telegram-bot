import app from "./src/app.js";
import apiFetch, { coinDataFetch } from "./src/components/coinmarketcap/apifetch.js";
import connectDB from "./src/db/index.js"
import {binanceSocket, latestPrice} from "./src/components/binanceAPI/binanceApi.js";


try {
    await connectDB()
} catch (err) {
    console.log("Mongo db connection failed !!! ", err);
} 

await app()

