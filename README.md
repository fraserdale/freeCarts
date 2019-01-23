# freeCarts
Free cart management for discords where 'free carts' are available. Stops multiple people accessing a cart. 

# Instructions
1. Install [Node.js](https://nodejs.org/en/download/)
2. Navigate into the freeCarts directory
3. In command prompt/terminal type `npm i`
4. Fill in the `config.json ` file. (more instructions below)
5. In command prompt/terminal type `npm start`

### Tips
Make the channel that the carts are output in a channel where users cannot type (no error handling)

### Compatibility
- [x] Splashforce
- [x] yCopp account links
- [ ] yCopp cookies
- [x] LatchKey
- [x] adisplash
- [x] NoMercy (need testing)
- [x] Gen5 (need testing)

![demo](https://i.imgur.com/YSlcJAG.png)

<a href="http://www.youtube.com/watch?feature=player_embedded&v=ns6HeuZF3qU
" target="_blank"><img src="https://i.ytimg.com/vi/ns6HeuZF3qU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBA8DA1pdx9Gp2EDDpNRS8PtEvbFg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

### Bot permissions
Bot status
Manage reactions

## Creating Discord Applications 
### Step 1: Navigate to /developers/applications
Go to: discordapp.com/developers/applications/me or [click here](https://discordapp.com/developers/applications/me)

### Step 2: Create your Application
- Click **New App**
- Enter your Application's name under **App Name**  

Redirect URI, Description, and App Icon can be ignored for now and editted later. Redirect URI and Description can be ignored entirely as it is for Discord OAuth
App Icon will be the avatar for your bot, whilst App Name will be the original username for your bot.  

Then hit the big purple **Create App** Button at the bottom.  
This will build your application and bring you to its page.  

## Setting Up Bot Accounts
When on your application information page scroll to the section labeled: **Bot**  

### Creating the Bot
Press **Create a Discord Bot** button.  
This will prompt you about the repercussions of creating a bot account, after reading this hit **Yes, do it!**  

### Getting and using your Token
You will see `Token: click to reveal` in your Bot Information Section, your Token is sensitive information and should NEVER be shared.
If your token does get into somebody's hands who shouldn't have it click the: **Regenerate new token** button, this will invalidate all prior tokens.

### Using your Token
Open config.json and replace insert botToken, replacing `Bot login token` with the token received above.

## Adding Bots To Servers
### Generating OAuth Link
Discord makes this much easier with the purple **Generate OAuth2 URL** button on the bottom of the Bot Information Section
After visiting the link hit the copy button just below the *scopes* menu.  

This will be the link you visit to add the bot to your Discord Server  
**Adding bot to A Discord Server requires that you have `MANAGE_SERVER` or `ADMINISTRATOR` permissions or hold owner in the guild**

## Discord Developer Mode
Discord Developer Mode allows you to right click and retrieve useful information about specific things.  
This feature can be accessed via: `User Settings > Appearance > ADVANCED > Developer Mode`

This allows you to get:
- Guild ids
- Channel and Category ids
