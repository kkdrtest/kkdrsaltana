import { MessageEmbed } from "discord.js"

export default client => {
    client.on('messageDelete', async message => {
        if(message.author.bot) return
        const DeletedMessageLog = new MessageEmbed()
        .setColor('RED')
        .addFields({ name: `Kanal:`, value: `**${message.channel.name}**(${message.channel.id})`})
        .setAuthor({ name: `${message.author.username}(${message.author.id}) mesajı silindi`, iconURL: message.author.avatarURL()})
        .setTimestamp();

        if (message.attachments.size > 0){   
            DeletedMessageLog.setImage(message.attachments.first().url);
        }
        if (message.content){            
            DeletedMessageLog.addFields({ name: 'Mesaj:', value: message.content})
        }

        const LogForChannel = await client.channels.fetch(process.env.chatlogchannelid)        
        await LogForChannel.send({embeds : [DeletedMessageLog]})
    });

}