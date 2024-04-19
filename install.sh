#!/bin/bash

# Function to prompt for confirmation
confirm() {
    read -p "$1 (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        return 0 # Return true for yes
    fi
    return 1 # Return false for no
}

# Check if Node.js and npm are installed
if ! command -v node &>/dev/null || ! command -v npm &>/dev/null; then
    echo "Node.js and/or npm are not installed. Please install them and try again."
    exit 1
fi

# Ask for confirmation
if ! confirm "Do you want to continue?"; then
    echo "Aborted."
    exit 1
fi

# Update apt repositories
echo "Updating apt repositories..."
sudo apt update

# Install Git
echo "Installing Git..."
sudo apt install git -y

# Clone the VPS Status Bot repository
echo "Cloning VPS Status Bot repository..."
git clone https://github.com/Darknessking13/Vps-Status-bot.git

# Navigate into the cloned directory
cd Vps-Status-bot || exit

# Install required Node.js packages
echo "Installing required Node.js packages..."
npm install discord.js@13 child_process os

# Prompt for bot token
read -p "Enter your bot token: " token

# Prompt for channel ID
read -p "Enter your Discord channel ID: " channelId

# Prompt for server ID
read -p "Enter your Discord server ID: " serverId

# Create config.json
cat << EOF > config.json
{
  "token": "$token",
  "channelId": "$channelId",
  "serverId": "$serverId"
}
EOF

# Start the bot
echo "Starting the bot..."
node main.js
