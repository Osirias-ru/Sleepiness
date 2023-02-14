const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const client = require("../../index");
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: "guildMemberAdd"
};

client.on('guildMemberAdd' , async (member) => {
    if(!member.guild.channels.cache.get('1041653160026046512')) return;
    if(!member.guild) return;
    const canvas = createCanvas(1024, 350);
    const ctx = canvas.getContext('2d');
    const bg = await loadImage('./assets/bg.gif');
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    var text1 = `Добро пожаловать`;
    var text2 = `${member.username}`;
    var text3 = `${member.guild.name}`;

    ctx.font = 'bold 50px Sans-Serif'
    ctx.fillStyle = "#f2f2f2"
    ctx.fillText(text1, canvas.width/2 - canvas.width/4 + canvas.width/8 + 90, canvas.height/2 - canvas.height/4 - canvas.height/8 + canvas.height/16)

    ctx.font = 'bold 70px Sans-Serif'
    ctx.fillStyle = "#f2f2f2"
    ctx.fillText(text2, canvas.width/2 - canvas.width/4 + canvas.width/8 + 90, canvas.height/2 - canvas.height/4 + 60 + canvas.height/16)


    const avatar = await loadImage(member.displayAvatarURL({size: 256, extension: 'png' }))
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width/2 - canvas.width/4 - canvas.width/8 -  canvas.width/16 + 256/2, canvas.height/4 - 30 + 256/2, 256/2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar,  canvas.width/2 - canvas.width/4 - canvas.width/8 -  canvas.width/16, canvas.height/4 - 30, 256, 256);

    ctx.beginPath();
    ctx.arc(canvas.width/2 - canvas.width/4 - canvas.width/8 -  canvas.width/16, canvas.height/4 - 30, 256/2, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
    const attachment = new AttachmentBuilder(canvas.toBuffer, {name: "welcome-image.gif"});

    const randomSays = [
    `<@${member.id}> залетает на **${text3}**`, 
    `<@${member.id}> врывается на **${text3}**`,
    `<@${member.id}> желаем приятно провести время на **${text3}**`,
    `<@${member.id}> присоединился к **${text3}**`,
    `<@${member.id}> вся команда **${text3}** ждала тебя!`,
    `<@${member.id}> запрыгивает на **${text3}**`, 
]
    
    const channel = member.guild.channels.cache.get('1041653160026046512');

    return channel.send({
        files: [new AttachmentBuilder(canvas.toBuffer(), {name: "welcome-image.gif"})],
        embeds: [
            new EmbedBuilder()
            .setColor('White')
            .setTimestamp()
            .setTitle(randomSays[Math.floor(Math.floor(Math.random() * randomSays.length))])
            .setImage('attachment://welcome-image.gif')
        ]
    });
})

    