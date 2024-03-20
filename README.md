# VPS Status Bot

VPS Status Bot is a simple Discord bot that provides real-time updates on your VPS (Virtual Private Server) status within your Discord server. It fetches and displays information such as CPU usage, RAM usage, disk usage, and uptime.

# installation using bash command
1. just type 
```bash <(curl -s https://raw.githubusercontent.com/Darknessking13/Vps-Status-bot/main/install.sh)```

2.configure config.json with ur infos

3. then it ready just type 
```node main.js```

# Installation method 2

1. Clone the repository:

bash

```git clone https://github.com/Darknessking13/Vps-Status-bot.git```

2. Navigate to the project directory:
cd Vps-Status-bot
Edit the config.json file with your bot token, Discord channel ID, and server ID. You can use a text editor like Nano:

3. Install the required dependencies using npm:

```npm install discord.js@13 child_process os```

4. Start the bot by running the main script:

```node main.js```

Usage
Once the bot is running, it will periodically update the specified Discord channel with the VPS status information.

Config template:
And here's the `config.json` file template:

```json
{
  "token": "your_bot_token",
  "channelId": "your_discord_channel_id",
  "serverId": "your_discord_server_id"
}
```

#Make it 24/7
1. Install pm2
```npm install pm2 -g```

2. Start bot
```pm2 start main.js```

ScreenShots

![image](https://github.com/Darknessking13/Vps-Status-bot/assets/133841052/e1696b17-7969-48d0-8e80-9ae1ad01c625)

hope you have great day ._.
