import {Telegraf} from "telegraf"
import { message } from "telegraf/filters"
import User from "../../model/User.model.js"
import { coinDataFetch } from "../coinmarketcap/apifetch.js"


const botFunction = async ()=>{

    const bot = new Telegraf(process.env.BOT_TOKEN)
    console.log("Bot connected!!")

    bot.start(async (ctx) => {
        ctx.reply('Welcome')
        ctx.reply('You need to register yourself by typing command /register')

    }
    )

    bot.command('register', async (ctx) => {
        const telegramUser = ctx.update.message.from;
        console.log("ctx :: ", telegramUser)
        const user = await User.findOne({tgId: telegramUser.id });
        if(user){
            console.log("You are already register")
        }

        const newUser = await User.create({
            tgId: telegramUser.id,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name || "",
            username: telegramUser.username,
        })

        const reCheckUser = await User.findOne({tgId: telegramUser.id });

        if(reCheckUser){
            await ctx.reply('Your are registered now, Yout can use Command now')
        }


    })
    bot.command('get_token', async (ctx) => {
        const telegramUser = ctx.update.message.from;
        console.log("ctx :: ", telegramUser)
        const user = await User.findOne({tgId: telegramUser.id });
        if(!user){
            console.log("You are not Registered, you need to register by using /register command")
        }
        const data = ctx.update.message.text;
        const match = data.match(/^\/get_token\s*(.*)/);
        const token = match ? match[1].trim() : '';
        
        console.log(token)
        
        try {
           const result = await coinDataFetch(token)
           
           ctx.reply(`price : ${result.price}`)
           ctx.reply(`marketCap : ${result.marketCap}`)
           ctx.reply(`tradingVolume24Hours : ${result.tradingVolume24Hours}`)
           ctx.reply(`PriceChange24Hours : ${result.PriceChange24Hours}`)
           ctx.reply(`PriceChange7Day : ${result.PriceChange7Day}`)

        
       } catch (error) {
            await ctx.reply("Try again you might entering wrong coin name")
        
       }
        
    })

    bot.on(message('text'), async (ctx) => {

        ctx.reply("We are checking you are register or not!!!")
        const telegramUserId = ctx.update.message.from.id;
        try {
            
            const user = await User.findOne({tgId:telegramUserId});
            if(!user){
            return await ctx.reply('You are not registered, You need to register yourself by typing command /register')
            }
            
            await ctx.reply("Hop you are doing good!. we have some build in command to provide you a valueable response ")
            
            
        } catch (error) {
            console.log(error)
        }

    })

    bot.launch()

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))

}



export default botFunction;