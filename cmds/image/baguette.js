const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        needle.get(`https://nekobot.xyz/api/imagegen?type=baguette&url=${args[0]}`, function(err, res) {
            if (err && res.body.status != 200) {
                console.log(err);
                msg.channel.send({
                    embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
                return;
            }
            const embed = new Discord.MessageEmbed()
            .setColor(0x53e677)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
            .setTitle(`Baguette`)
            .setImage(res.body.message);
            msg.channel.send(embed);
        });
        return;
    }

    if (msg.attachments.size > 0) {
        msg.attachments.forEach(img => {
            needle.get(`https://nekobot.xyz/api/imagegen?type=baguette&url=${img.url}`, function(err, res) {
                if (err && res.body.status != 200) {
                    console.log(err);
                    msg.channel.send({
                        embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({timeout: 5000}));
                    return;
                }
                const embed = new Discord.MessageEmbed()
                .setColor(0x53e677)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setTitle(`Baguette`)
                .setImage(res.body.message);
                msg.channel.send(embed);
            });
        });
        return;
    }
};


module.exports.help = {
  name: "baguette",
  arguments: "[img]",
  description: "baguette. \nimg: image url or attatched image",
  category: "image"
}
