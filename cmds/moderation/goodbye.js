const embeds = require('../../utils/embeds.js');
const roles = require('../../utils/roles.js');
const utils = require('../../utils/utils.js');
const jt = require('json-toolkit');
const fs = require('fs');

module.exports.run = async (bot, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    msg.channel.send({
      embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
    }).then(async msg => msg.delete({timeout: 5000}));
    return;
  }
  if(args[0]) {
    switch(args[0]) {
      case "enable": 
      jt.saveToFile("enabled", 'json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_goodbye.json', '\t', (error) => {
        if (error) {
          console.log(error);
          return;
        }
        msg.channel.send({
          embed: embeds.notifEmbed('Success!', 'Goodbye messages have been activated.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
      });
      break;
      case "disable": 
      jt.saveToFile("disabled", 'json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_goodbye.json', '\t', (error) => {
        if (error) {
          console.log(error);
          return;
        }
        msg.channel.send({
          embed: embeds.notifEmbed('Success!', 'Goodbye messages have been disabled.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
      });
      break;
      case "channelID": 
      if(args[1]) {
        if(msg.guild.channels.cache.get(args[1])) {
          jt.saveToFile(args[1], 'json/servers/goodbye/' + bot.guilds.cache.get(msg.guild.id) + '.json', '\t', (error) => {
            if (error) {
              console.log(error);
              return;
            }
            msg.channel.send({
              embed: embeds.notifEmbed('Success!', args[1] + ' has been set at the goodbye message channel.', msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({timeout: 5000}));
          });
        } else {
          msg.channel.send({
            embed: embeds.errorEmbed('That channel doesn\'t exist!', msg.author.avatarURL(), msg.author.tag)
          }).then(async msg => msg.delete({timeout: 5000}));
        }
      } else {
        msg.channel.send({
          embed: embeds.errorEmbed('Not enough arguments specified! Use acry$ goodbye <channelID> <id>.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
      }
      break;
    }
  } else {
    msg.channel.send({
      embed: embeds.errorEmbed('No arguments specified! Use acry$ goodbye <enable/disable/channelID> [id].', msg.author.avatarURL(), msg.author.tag)
    }).then(async msg => msg.delete({timeout: 5000}));
    return;
  }
};

module.exports.help = {
  name: "goodbye",
  arguments: "<enable/disable/channelID> [id]",
  description: "enables goodbye messages/sets a goodbye message channel. requires ADMINISTRATOR permission.",
  category: "moderation"
}
