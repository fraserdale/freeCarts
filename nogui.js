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
const url = require('url');
const path = require('path');
const fs = require('fs')




function start() {
    console.log('Started')
    const config = require('./config.json');
    const Discord = require('discord.js');
    const bot = new Discord.Client();
    const fs = require('fs');
    var guild;
    let cartNum = 0
    let redeemedTotal = 0
    let liveTotal = 0
    let carts = []

    let cartsStore = []

    /* Server/guild ID */
    let server = config.server
    /* This is a hidden channel, normal members should not be able to see this */
    let privateChannel = config.privateChannel
    /* This is a public channel, 'everyone' should be able to see this */
    let publicChannel = config.publicChannel
    /* Bot login token */
    let botToken = config.botToken
    //check if user wants one cart per person
    let quantityCart = config.quantityCart
    //checks if user wants messages to stay in channel
    let deleteAfterReact = config.deleteAfterReact

    bot.login(botToken).catch(err => console.log('loginError'))




    bot.on('ready', () => {
        console.log(`Logged in as ${bot.user.username}!`);
        guild = bot.guilds.get(server);
        serverName = guild.name
        serverImg = 'https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.png'
        console.log('serverImg ', serverImg);
        console.log('serverName ', serverName);
        console.log('botName ', bot.user.username)
    })

    bot.on('message', message => {
        /* if (message.author.bot) return; */
        if (message.channel.type == 'dm') return;
        if (message.channel.id == privateChannel) {
            cartNum += 1
            message.embeds.forEach((e) => {
                if (e.footer) {
                    if (e.footer.text === 'Splashforce') {
                        size = ((e.title).slice(20))
                        email = (e.description).split(' ')[1].split('\n')[0]
                        pass = (e.description).split(': ')[2]
                        console.log('TESTING: ' + pass)
                        loginURL = e.url
                        img = e.thumbnail.url
                        /* Look into getting sku from link /shrug */
                        sku = ''
                        console.log('Size: ' + size)
                        console.log('Email:Pass : ' + email + ':' + pass)
                        console.log('Login link: ' + loginURL)
                        console.log('Image: ' + img)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setDescription(`Size: ${size}`)
                            .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')
                            .setThumbnail(img)
                        carts.push({
                            embed
                        })
                        liveTotal = cartNum - redeemedTotal
                        console.log('liveTotal ', liveTotal);
                        console.log('redeemedTotal ', redeemedTotal)
                        console.log('cartsTotal ', cartNum);
                        writeCart(cartNum, email, pass, loginURL, img, size, sku)
                    } else if (e.footer.text === 'yCopp Ultimate Adidas Bot') {
                        //clothing size
                        size = (e.title).split(',')[1]
                        email = (e.fields)[0]['value']
                        pass = (e.fields)[1]['value']

                        loginURL = e.url
                        sku = ((e.title).split(',')[0])
                        img = ''
                        console.log('Size: ' + size)
                        console.log('Email:Pass : ' + email + ':' + pass)
                        console.log('Login link: ' + loginURL)
                        console.log('Image: ' + img)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setDescription(`Size: ${size} \nSKU: ${sku}`)
                            .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')
                            .setThumbnail(img)
                        carts.push({
                            embed
                        })
                        liveTotal = cartNum - redeemedTotal
                        console.log('liveTotal ', liveTotal);
                        console.log('redeemedTotal ', redeemedTotal)
                        console.log('cartsTotal ', cartNum);
                        writeCart(cartNum, email, pass, loginURL, img, size, sku)

                    } else if (e.footer.text === 'LatchKeyIO Adidas Bot') {
                        size = (e.fields)[2]['value']
                        email = (e.fields)[4]['value']
                        pass = (e.fields)[5]['value']

                        loginURL = e.url
                        img = e.thumbnail.url
                        sku = (e.fields)[1]['value']
                        console.log('Size: ' + size)
                        console.log('Email:Pass : ' + email + ':' + pass)
                        console.log('Login link: ' + loginURL)
                        console.log('Image: ' + img)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setDescription(`Size: ${size} \nSKU: ${sku}`)
                            .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')
                            .setThumbnail(img)
                        carts.push({
                            embed
                        })
                        liveTotal = cartNum - redeemedTotal
                        console.log('liveTotal ', liveTotal);
                        console.log('redeemedTotal ', redeemedTotal)
                        console.log('cartsTotal ', cartNum);
                        writeCart(cartNum, email, pass, loginURL, img, size, sku)

                    } else if (e.footer.text === 'Copyright Backdoor.IO 2018, All Rights Reserved.') {
                        size = (e.fields)[1]['value']
                        userPass = (e.fields)[2]['value']
                        email = (userPass).split(' ')[1].split('\n')[0]
                        pass = (userPass).split(': ')[2]

                        loginURL = e.url
                        img = e.thumbnail.url
                        sku = (e.fields)[0]['value']
                        console.log('Size: ' + size)
                        console.log('Email:Pass : ' + email + ':' + pass)
                        console.log('Login link: ' + loginURL)
                        console.log('Image: ' + img)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setDescription(`Size: ${size} \nSKU: ${sku}`)
                            .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')
                            .setThumbnail(img)

                        carts.push({
                            embed
                        })
                        liveTotal = cartNum - redeemedTotal
                        console.log('liveTotal ', liveTotal);
                        console.log('redeemedTotal ', redeemedTotal)
                        console.log('cartsTotal ', cartNum);
                        writeCart(cartNum, email, pass, loginURL, img, size, sku)

                    } else if ((e.footer.text).startsWith('NoMercy')) {
                        size = (e.fields)[1]['value']
                        email = (e.fields)[3]['value']
                        pass = (e.fields)[4]['value']

                        loginURL = e.url
                        img = e.thumbnail.url
                        sku = (e.fields)[0]['value']
                        console.log('Size: ' + size)
                        console.log('Email:Pass : ' + email + ':' + pass)
                        console.log('Login link: ' + loginURL)
                        console.log('Image: ' + img)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setDescription(`Size: ${size} \nSKU: ${sku}`)
                            .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')
                            .setThumbnail(img)
                        carts.push({
                            embed
                        })
                        writeCart(cartNum, email, pass, loginURL, img, size, sku)
                    } else if (e.footer.text === 'Gen5 Adidas') {
                        size = (e.fields)[1]['value']
                        email = (e.fields)[3]['value']
                        pass = (e.fields)[4]['value']
                        loginURL = e.url
                        img = e.thumbnail.url
                        sku = (e.fields)[0]['value']
                        console.log('Size: ' + size)
                        console.log('Email:Pass : ' + email + ':' + pass)
                        console.log('Login link: ' + loginURL)
                        console.log('Image: ' + img)
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setDescription(`Size: ${size} \nSKU: ${sku}`)
                            .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')

                        carts.push({
                            embed
                        })

                        liveTotal = cartNum - redeemedTotal
                        console.log('liveTotal ', liveTotal);
                        console.log('redeemedTotal ', redeemedTotal)
                        console.log('cartsTotal ', cartNum);
                        writeCart(cartNum, email, pass, loginURL, img, size, sku)

                    }
                }
            })
        }
        if (message.channel.id == publicChannel) {
            message.react('🛒')
        }
    })

    function sendCarts() {
        if (carts.length > 0) {
            console.log('sending cart...')
            guild.channels.get(publicChannel).send(
                carts.shift()
            );

        }
    }
    setInterval(sendCarts, 3000)

    /* FOR 1 CART ONLY */
    redeemed = []
    /* FOR 1 CART ONLY */



    bot.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.author.bot) {
            /* FOR 1 CART ONLY */
            let redeemingUser;
            if ((redeemingUser = redeemed.find(element => element.userid == user.id))) {
                if (redeemingUser.quantityCart == quantityCart) {
                    console.log('user at max carts')
                    reaction.remove(user)
                    return
                }
            }
            /* FOR 1 CART ONLY */



            /* console.log(reaction.message.id); */
            if (reaction.message.channel.id == publicChannel) {
                console.log('Reaction added; current count:', reaction.count);
                if (reaction.count == 2) {
                    (reaction.users).forEach(element => {
                        console.log(element['username'])
                        console.log('user ID: ' + element['id'])
                        cartID = (reaction.message.embeds[0].footer.text).split('# ')[1].split(' • M')[0]

                        for (i = 0; i < cartsStore.length; i++) {
                            if (cartsStore[i]['id'] == cartID) {
                                if (element['bot'] != true) {
                                    /* FOR 1 CART ONLY */
                                    console.log(redeemed)
                                    if (quantityCart > 0) {
                                        if ((redeemingUser = redeemed.find(element => element.userid == user.id))) {
                                            if (redeemingUser.quantityCart < quantityCart) {
                                                redeemingUser.quantityCart++
                                            }
                                        } else {
                                            redeemed.push({
                                                userid: user.id,
                                                quantityCart: 1
                                            })
                                        }
                                    }

                                    /* FOR 1 CART ONLY */

                                    const embed = new Discord.RichEmbed()
                                        .setColor(0x00FF00)
                                        .setTimestamp()
                                        .setTitle(`Size: ${cartsStore[i]['size']}`)
                                        .setURL(cartsStore[i]['login'])
                                        .setDescription(`Email: ${cartsStore[i]['email']} \nPassword: ${cartsStore[i]['pass']}`)
                                        .setFooter(`Cart: # ${cartNum} • Made by Jalfrazi`, 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg')
                                    if (cartsStore[i]['image'] != '') {
                                        embed.setThumbnail(cartsStore[i]['image'])
                                    }
                                    if (cartsStore[i]['sku'] != '') {
                                        embed.setDescription(`Email: ${cartsStore[i]['email']} \nPassword: ${cartsStore[i]['pass']} \nSKU: ${cartsStore[i]['sku']}`)
                                    }
                                    guild.members.get(element['id']).send({
                                        embed
                                    });
                                    redeemedTotal++

                                    liveTotal = cartNum - redeemedTotal
                                    console.log(`live: ${liveTotal}`)
                                    console.log('liveTotal ', liveTotal);
                                    console.log('redeemedTotal ', redeemedTotal)
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

    function writeCart(cartNum, email, pass, loginURL, img, size, sku) {
        liveTotal = cartNum - redeemedTotal
        console.log('liveTotal ', liveTotal);
        console.log('redeemedTotal ', redeemedTotal)
        console.log('cartsTotal ', cartNum);

        cartsStore.push({
            'id': (cartNum).toString(),
            'email': email,
            'pass': pass,
            'login': loginURL,
            'image': img,
            'size': size,
            'sku': sku
        })
    }
}

start()