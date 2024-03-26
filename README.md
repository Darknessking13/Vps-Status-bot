# VPS Status Bot

VPS Status Bot is a simple Discord bot that provides real-time updates on your VPS (Virtual Private Server) status within your Discord server. It fetches and displays information such as CPU usage, RAM usage, disk usage, and uptime.

## Requirements
1. OS type must be Linux.
2. Node.js 16 or greater is required.

## Installation

1.Run the following bash command:
```bash <(curl -s https://raw.githubusercontent.com/Darknessking13/Vps-Status-bot/main/install.sh)```

2.Configure config.json with your information.

3.Once configured, start the bot by running:
```node main.js```

# Config Template:
Here's the config.json file template:
```{
  "token": "your_bot_token",
  "channelId": "your_discord_channel_id",
  "serverId": "your_discord_server_id"
}
```

# Make it 24/7
1. install pm2
  ```npm install pm2 -g```
2. start the bot
```pm2 start main.js```

# Example
![image](https://github.com/Darknessking13/Vps-Status-bot/assets/133841052/e1696b17-7969-48d0-8e80-9ae1ad01c625)
Hope you have a great day! 😊
