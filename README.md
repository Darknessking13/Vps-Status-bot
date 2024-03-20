# VPS Status Bot

VPS Status Bot is a simple Discord bot that provides real-time updates on your VPS (Virtual Private Server) status within your Discord server. It fetches and displays information such as CPU usage, RAM usage, disk usage, and uptime.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Darknessking13/Vps-Status-bot.git

 Navigate to the project directory:
cd Vps-Status-bot
Edit the config.json file with your bot token, Discord channel ID, and server ID. You can use a text editor like Nano:
nano config.json
Example `config.json`:
{
  "token": "your_bot_token",
  "channelId": "your_discord_channel_id",
  "serverId": "your_discord_server_id"
}
Install the required dependencies using npm:
npm install discord.js@13 child_process os
Start the bot by running the main script:
node main.js


Sure, here's a basic README.md file for your VPS status bot GitHub repository:

markdown
Copy code
# VPS Status Bot

VPS Status Bot is a simple Discord bot that provides real-time updates on your VPS (Virtual Private Server) status within your Discord server. It fetches and displays information such as CPU usage, RAM usage, disk usage, and uptime.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Darknessking13/Vps-Status-bot.git
Navigate to the project directory:
bash
Copy code
cd Vps-Status-bot
Edit the config.json file with your bot token, Discord channel ID, and server ID. You can use a text editor like Nano:
bash
Copy code
nano config.json
Example config.json:

json
Copy code
{
  "token": "your_bot_token",
  "channelId": "your_discord_channel_id",
  "serverId": "your_discord_server_id"
}
Install the required dependencies using npm:
bash
Copy code
npm install discord.js@13 child_process os
Start the bot by running the main script:
bash
Copy code
node main.js

Usage
Once the bot is running, it will periodically update the specified Discord channel with the VPS status information.


