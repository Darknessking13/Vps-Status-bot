const { Client, Intents, MessageEmbed } = require('discord.js');
const { exec } = require('child_process');
const os = require('os');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const config = require('./config.json');
const { token, channelId, serverId } = config;

let message = null;

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} is ready!`);
  startUpdatingStats();
});

client.login(token);

function getSystemStats(callback) {
  exec('top -bn1 | grep Cpu', (error, cpuOutput) => {
    if (error) {
      console.error(`Error executing top : ${error.message}`);
      return callback(error);
    }

    exec('free -m | grep Mem', (error, memOutput) => {
      if (error) {
        console.error(`Error executing free : ${error.message}`);
        return callback(error);
      }

      exec('df -h /', (error, diskOutput) => {
        if (error) {
          console.error(`Error executing df : ${error.message}`);
          return callback(error);
        }

        exec('cat /proc/cpuinfo | grep "model name"', (error, cpuInfoOutput) => {
          if (error) {
            console.error(`Error executing cat /proc/cpuinfo : ${error.message}`);
            return callback(error);
          }

          const CpuUsage = parseCpuUsage(cpuOutput);
          const { totalMem, usedMem } = parseMemoryUsage(memOutput);
          const { totalDisk, usedDisk } = parseStorageUsage(diskOutput);
          const cpuName = parseCpuName(cpuInfoOutput);

          const stats = {
            CpuUsage,
            totalMem,
            usedMem,
            totalDisk,
            usedDisk,
            cpuName
          };

          callback(null, stats);
        });
      });
    });
  });
}

function parseCpuName(cpuInfoOutput) {
  if (!cpuInfoOutput) {
    return 'N/A';
  }

  const cpuNameLine = cpuInfoOutput.split('\n')[0];
  const cpuNameParts = cpuNameLine.split(':');

  if (cpuNameParts.length < 2) {
    return 'N/A';
  }

  return cpuNameParts[1].trim();
}

function parseCpuUsage(cpuOutput) {
  if (!cpuOutput) {
    return 'N/A';
  }

  const cpuParts = cpuOutput.split(/\s+/);
  const CpuUsage = cpuParts[1];

  return CpuUsage;
}

function parseMemoryUsage(memOutput) {
  if (!memOutput) {
    return { totalMem: 'N/A', usedMem: 'N/A' };
  }

  const memParts = memOutput.split(/\s+/);
  const totalMem = parseFloat(memParts[1]);
  const usedMem = parseFloat(memParts[2]);
  const RamUsage = ((usedMem / totalMem) * 100).toFixed(2);

  return { totalMem, usedMem, RamUsage };
}

function parseStorageUsage(diskOutput) {
  if (!diskOutput) {
    return { totalDisk: 'N/A', usedDisk: 'N/A' };
  }

  const diskParts = diskOutput.split(/\s+/);
  const totalDisk = diskParts[8];
  const usedDisk = diskParts[9];

  return { totalDisk, usedDisk };
}

async function updateStats() {
  const serverName = os.hostname();
  const osInfo = `${os.type()} ${os.release()}`;
  const uptime = formatUptime(os.uptime());
  const nextUpdate = calculateNextUpdate();
  const stats = await new Promise((resolve, reject) => {
    getSystemStats((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

  // Get the number of CPU cores
  const numCores = os.cpus().length;

  const embed = new MessageEmbed()
    .setTitle(`Stats for: SkyDevil - Dhaka`)
    .setImage('https://media.discordapp.net/attachments/1212409054945869876/1219964291084451860/standard_6.gif?ex=660d3748&is=65fac248&hm=b70769f6deac38a97a61e2c3e580c08d31cc448faca43aba940a0030eed145d2&=&width=440&height=247')
    .setDescription(`**System Information:**\n\n` +
      `> **<a:status:1207253934012497951> Status:** \`Online\` \n` +
      `> **<:system:1210868917925453865> OS:** \`${osInfo}\`\n` +
      `> **<:location:1219961063785631805> Location:** \`Asia/Dhaka\`\n` +
      `> **<:cpu:1210868786211852329> CPU Name:** \`${stats.cpuName}\`\n` +
      `> **<:cpu:1210868786211852329> CPU Usage:** \`${stats.CpuUsage}% / ${numCores * 100}%\`\n` +
      `> **<:ram:1210868717651632158> RAM Usage:** \`${stats.usedMem}MB / ${stats.totalMem}MB\` \n` +
      `> **<:disk:1219604389996793920> Disk Usage:** \`${stats.usedDisk}/${stats.totalDisk} \`\n` +
      `> **<:uptime:1219203605744189480> Uptime:** \`${uptime}\``)
    .setColor('RED');

  const guild = await client.guilds.fetch(serverId);
  if (!guild) {
    console.log(`Error server ID : ${serverId}`);
    return;
  }

  const channel = await guild.channels.fetch(channelId);
  if (!channel) {
    console.log(`Error channel ID : ${channelId}`);
    return;
  }

  if (message) {
    message.edit({
      embeds: [embed]
    }).catch((error) => {
      console.log('Error editing message :', error);
    });
  } else {
    message = await channel.send({
      embeds: [embed]
    }).catch((error) => {
      console.log('Error sending message :', error);
    });
  }
}



function formatUptime(uptimeInSeconds) {
  const uptimeInMinutes = Math.floor(uptimeInSeconds / 60);
  const uptimeInHours = Math.floor(uptimeInMinutes / 60);
  const uptimeInDays = Math.floor(uptimeInHours / 24);
  const hoursRemainder = uptimeInHours % 24;
  const minutesRemainder = uptimeInMinutes % 60;

  return `${uptimeInDays}d ${hoursRemainder}h ${minutesRemainder}m`;
}

function calculateNextUpdate() {
  const interval = 5000; // Update interval in milliseconds
  const timeLeft = interval - (Date.now() % interval);
  const secondsLeft = Math.floor(timeLeft / 1000);
  return `${secondsLeft}s`;
}

function startUpdatingStats() {
  setInterval(updateStats, 5000);
}



function startUpdatingStats() {
  setInterval(updateStats, 5000);
}
