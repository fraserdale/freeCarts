const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var guild;
cartNum = 0




/* Server/guild ID */
server = ""
/* This is a hidden channel, normal members should not be able to see this */
privateChannel = ""
/* This is a public channel, 'everyone' should be able to see this */
publicChannel = ""
/* Bot login token */
botToken = ""


bot.login(botToken);

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.username}!`);
    guild = bot.guilds.get(server);
});



bot.on("message", message => {
    /* if (message.author.bot) return; */
    if (message.channel.type == "dm") return;
    if (message.content === "listroles") {
        findGuildMember(message, guild).then(member => {
            let str = "";
            for (let role of member.guild.roles.values()) {
                str += role.name + " : " + role.id + "\n";
            }
            message.author.send(str);
        });
    }
    if (message.channel.id == privateChannel) {
        cartNum += 1
        console.log("message")
        message.embeds.forEach((e) => {
            if (e.footer.text === "Splashforce") {
                size = ((e.title).slice(20))
                email = (e.description).split(" ")[1].split("\n")[0]
                pass = (e.description).split(": ")[2]
                console.log("TESTING: " + pass)
                /* emailPass = e.description */
                loginURL = e.url
                img = e.thumbnail.url
                console.log("Size: " + size)
                console.log("Email:Pass : " + email + ":" + pass)
                console.log("Login link: " + loginURL)
                console.log("Image: " + img)
                const embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setDescription(`Size: ${size}`)
                    .setFooter(`Cart: # ${cartNum}`)
                    .setThumbnail(img)
                guild.channels.get(publicChannel).send({
                    embed
                });

                // Get content from file
                var contents = fs.readFileSync("carts.json");
                // Define to JSON type
                var jsonContent = JSON.parse(contents);
                jsonContent.push({
                    'id': (cartNum).toString(),
                    'email': email,
                    'pass': pass,
                    'login': loginURL,
                    'image': img,
                    'size': size
                })
                fs.writeFile("./carts.json", JSON.stringify(jsonContent, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                    console.log("File has been created");
                });
            }
        })
    }
    if (message.channel.id == publicChannel) {
        message.react("🛒")
    }

})
bot.on('messageReactionAdd', (reaction, user) => {
    console.log('Reaction added; current count:', reaction.count);
    /* console.log(reaction.message.id); */
    if (reaction.count == 2) { /* could do > 1 ? */
        (reaction.users).forEach(element => {
            /* console.log(element)
            console.log(Object.keys(element)) */
            console.log(element['username'])
            console.log("user ID: " + element['id'])
            cartID = (reaction.message.embeds[0].footer.text).split("# ")[1]

            var contents = fs.readFileSync("carts.json");
            var jsonContent = JSON.parse(contents);
            for (i = 0; i < jsonContent.length; i++) {
                if (jsonContent[i]['id'] == cartID) {
                    if (element['bot'] != true) {
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00FF00)
                            .setTimestamp()
                            .setTitle(`Size: ${jsonContent[i]['size']}`)
                            .setURL(jsonContent[i]['login'])
                            .setDescription(`Email: ${jsonContent[i]['email']} \nPassword: ${jsonContent[i]['pass']}`)
                            .setThumbnail(jsonContent[i]['image'])
                            .setFooter(`Cart: # ${cartNum}`)
                        guild.members.get(element['id']).send({
                            embed
                        });
                    }
                }
            }
        });
        reaction.message.delete()
    }
});