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

# Reminder to configure config.json
echo "Please configure your config.json file and then run 'node main.js' to start the bot."
