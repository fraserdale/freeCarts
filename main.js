/* 
  ____                _       _  __               _ 
 |  _ \              | |     | |/ _|             (_)
 | |_) |_   _        | | __ _| | |_ _ __ __ _ _____ 
 |  _ <| | | |   _   | |/ _` | |  _| '__/ _` |_  / |
 | |_) | |_| |  | |__| | (_| | | | | | | (_| |/ /| |
 |____/ \__, |   \____/ \__,_|_|_| |_|  \__,_/___|_|
         __/ |                                      
        |___/                                       
 */
const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const adapters = require('./adapters');
const utils = require('./utils');
const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

let mainWindow;


// Listen for app to be ready
app.on('ready', function () {
    //create new window
    mainWindow = new BrowserWindow({
        title: 'Cart Distribution - Jalfrazi#0001',
        width: 800,
        height: 710,
        minWidth: 800,
        minHeight: 710,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (process.platform === "win32") {
        mainWindow.setIcon('./kermitsupreme.jpg');
    }
    //load html into window
    mainWindow.loadFile(path.join(__dirname, 'static', 'cart.html'));
});


//check version
ipcMain.on('checkVersion', () => {
    const request = require('request');
    request('https://raw.githubusercontent.com/fraserdale/freeCarts/master/package.json', (error, response, body) => {
        let jsonBody = JSON.parse(body);
        let currentVersion = require('./package.json');
        if (currentVersion.version !== jsonBody["version"]) {
            console.log('You are NOT on the correct version');
            mainWindow.webContents.send('wrongVersion', jsonBody['update']);
        } else {
            console.log('On latest version.')
        }
    });
});


//catch save
ipcMain.on('configSave', (e, config) => {
    fs.writeFile('config.json', config, err => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('saved config');
    });
});

ipcMain.on('stop', () => {
    app.quit();
});

ipcMain.on('start', () => {
    mainWindow.webContents.send('message', 'x');
    const config = require('./config.json');
    const Discord = require('discord.js');
    const bot = new Discord.Client();
    let guild;
    let cartNum = 0;
    let redeemedTotal = [];
    let liveTotal = 0;
    let carts = [];

    let cartsStore = [];

    /* Server/guild ID */
    let server = config.server;
    /* This is a hidden channel, normal members should not be able to see this */
    let privateChannel = config.privateChannel;
    /* This is a public channel, 'everyone' should be able to see this */
    let publicChannel = config.publicChannel;
    /* Bot login token */
    let botToken = config.botToken;
    //check if user wants one cart per person;
    let quantityCart = config.quantityCart;
    //checks if user wants messages to stay in channel
    let deleteAfterReact = config.deleteAfterReact;
    //checks if user wants 10 minute expiration
    let after10 = config.after10
    //cool down
    let cooldown = config.cooldown

    bot.login(botToken).catch(err => mainWindow.webContents.send('loginError', 'loginError'));




    bot.on('ready', () => {
        console.log(`Logged in as ${bot.user.username}!`);
        guild = bot.guilds.get(server);
        serverName = guild.name;
        serverImg = 'https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.png';
        mainWindow.webContents.send('serverImg', serverImg);
        mainWindow.webContents.send('serverName', serverName);
        mainWindow.webContents.send('botName', bot.user.username + '#' + bot.user.discriminator)
    });

    bot.on('message', message => {
        try {
            /* if (message.author.bot) return; */
            if (message.channel.type === 'dm') return; //don't respond to DMs

            if (message.channel.id === privateChannel) {
                cartNum++; //todo check we have a cart before incrementing
                message.embeds.forEach(e => {
                    if (e.footer) {
                        const botName = utils.getBotByFooter(e.footer);
                        console.log(cartNum);
                        const cartProps = adapters[`${botName}CartProperties`](e, cartNum); //call the CartProperties method for the bot name

                        writeCart(cartProps);
                    }
                })
            }
            if (message.channel.id == publicChannel) { //check if author is the bot
                message.react('🛒')
            }
        } catch(err) {
            console.log(err)
        }
    })

    function sendCarts() {
        if (carts.length > 0) {
            console.log('Posting cart to public channel...')
            guild.channels.get(publicChannel).send(
                carts.shift()
            );

        }
    }
    setInterval(sendCarts, 2000)

    /* FOR 1 CART ONLY */
    redeemed = []
    /* FOR 1 CART ONLY */


    //cart cooldown
    let cooldownSeconds = cooldown*1000


    bot.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.author.bot) {
            if (redeemedTotal.includes(reaction.message.id)) {
                return
            }
            
            /* FOR 1 CART ONLY */
            let redeemingUser;
            if ((redeemingUser = redeemed.find(element => element.userid == user.id))) {   
                  if (redeemingUser.redeemedLast + cooldownSeconds > Date.now() ){
                      console.log(`${redeemingUser.name} still on cooldown`)
                      reaction.remove(user)
                      return
                  } 
                if (redeemingUser.quantityCart == quantityCart) {
                    console.log(`${redeemingUser.name} at max carts`)
                    reaction.remove(user)
                    return
                }
            }
            /* FOR 1 CART ONLY */


            if (reaction.message.channel.id == publicChannel) {
                if (reaction.count == 2) { //if a user has reacted
                    (reaction.users).forEach(element => {
                        const cartIDRegex = /Cart: # ([0-9]+)/ //this regex captures the cart ID from the footer
                        cartID = cartIDRegex.exec(reaction.message.embeds[0].footer.text)[1] //1 contains the first capture group

                        for (i = 0; i < cartsStore.length; i++) {
                            if (cartsStore[i]['id'] == cartID){
                                if (element['bot'] != true) {
                                    if((after10 && (Date.now() - cartsStore[i]['time'] )<600000) || after10 == false){
                                        /* FOR 1 CART ONLY */
                                        if (quantityCart > 0) {
                                            if ((redeemingUser = redeemed.find(element => element.userid == user.id))) {
                                                if (redeemingUser.quantityCart < quantityCart) {
                                                    redeemingUser.quantityCart++
                                                    redeemingUser.redeemedLast = Date.now()
                                                }
                                            } else {
                                                redeemed.push({
                                                    userid: user.id,
                                                    name: user.username + '#' + user.discriminator,
                                                    quantityCart: 1,
                                                    redeemedLast: Date.now()
                                                })
                                            }
                                        }

                                        /* FOR N CART(s) */

                                        console.log(user.username + '#' + user.discriminator + ' redeemed cart #' +  cartsStore[i]['id'] )

                                        const embed = new Discord.RichEmbed()
                                            .setColor(0x00FF00)
                                            .setTimestamp()
                                            .setTitle(`Size: ${cartsStore[i]['size']}`)
                                            .setURL(cartsStore[i]['login'])
                                            .setDescription(`Email: ${cartsStore[i]['email']} \nPassword: ${cartsStore[i]['pass']}`)
                                            .setFooter(`Cart: # ${cartsStore[i]['id']} • Made by Jalfrazi`)
                                        if (cartsStore[i]['img'] != '') {
                                            embed.setThumbnail(cartsStore[i]['img'])
                                        }
                                        if (cartsStore[i]['sku'] != '') {
                                            embed.setDescription(`Email: ${cartsStore[i]['email']} \nPassword: ${cartsStore[i]['pass']} \nSKU: ${cartsStore[i]['sku']}`)
                                        }else if (cartsStore[i]['email'] != ''){
                                            embed.setDescription(`Email: ${cartsStore[i]['email']} \nPassword: ${cartsStore[i]['pass']}`)
                                        }

                                        guild.members.get(element['id']).send({
                                            embed
                                        });

                                        redeemedTotal.push(reaction.message.id);

                                        try{
                                            if (deleteAfterReact == false){
                                                reaction.message.edit({embed:{color:0xFF0000,title:'REDEEMED by '+user.username + '#' + user.discriminator,timestamp:new Date(),url:reaction.message.embeds[0].url,description:reaction.message.embeds[0].description,thumbnail:{url:reaction.message.embeds[0].thumbnail.url},footer:{text: reaction.message.embeds[0].footer.text, icon_url: reaction.message.embeds[0].footer.iconURL}}})
                                            }
                                        } catch (err) {
                                            console.log(err)
                                        }


                                        liveTotal = cartNum - redeemedTotal.length;
                                        console.log(`live: ${liveTotal}`);
                                        mainWindow.webContents.send('liveTotal', liveTotal);
                                        mainWindow.webContents.send('redeemedTotal', redeemedTotal.length);
                                        mainWindow.webContents.send('redeemedOutput',redeemed);
                                        console.log(`redeemed: ${redeemedTotal.length}`)
                                    }
                                    else if ((Date.now() - cartsStore[i]['time'] )>600000) {
                                        redeemedTotal.push(reaction.message.id);
                                        try {
                                            if(deleteAfterReact ==false){
                                                reaction.message.edit({embed:{color:0x36393F,title:'EXPIRED',timestamp:new Date(),url:reaction.message.embeds[0].url,description:reaction.message.embeds[0].description,thumbnail:{url:reaction.message.embeds[0].thumbnail.url},footer:{text: reaction.message.embeds[0].footer.text, icon_url: reaction.message.embeds[0].footer.iconURL}}})
                                            }
                                        } catch (err) {
                                            console.log(err)
                                        }
                                    }
                                }
                            }
                        }
                    });
                    if (deleteAfterReact) {
                        reaction.message.delete()
                    }

                }
            }
        }
    });

    function writeCart(cartProps) {
        const embed = new Discord.RichEmbed()
            .setColor(0x00FF00)
            .setTimestamp()
            .setDescription(`Size: ${cartProps.size}`)
            .setFooter(utils.createFooter(cartProps.id), utils.getThumbnail())
            .setThumbnail(cartProps.img);
        carts.push({
            embed
        });
        liveTotal = cartProps.cartNum - redeemedTotal.length;
        mainWindow.webContents.send('liveTotal', liveTotal);
        mainWindow.webContents.send('redeemedTotal', redeemedTotal.length);
        mainWindow.webContents.send('cartsTotal', cartProps.cartNum);

        cartsStore.push(cartProps);
    }
})
