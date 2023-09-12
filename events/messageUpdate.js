
import { MessageEmbed } from "discord.js"

export default client => {
    client.on('messageUpdate', async (oldmessage, newmessage) => {
        if(oldmessage.author.bot || newmessage.author.bot) return

        const UpdatedMessageLog = new MessageEmbed()
        .setColor('BLUE')
        .addFields({ name: 'Kanal:', value: `<#${newmessage.channel.id}>\n **${newmessage.channel.name}**(${newmessage.channel.id})`})
        .addFields({ name: 'Eski Mesaj:', value: oldmessage.content})
        .addFields({ name: 'Yeni Mesaj:', value: newmessage.content})
        .setAuthor({ name: `${newmessage.author.username}(${newmessage.author.id}) mesajı düzenlendi`, iconURL: newmessage.author.avatarURL()})
        .setTimestamp();
        const LogForChannel = await client.channels.fetch(process.env.chatlogchannelid)        
        await LogForChannel.send({embeds : [UpdatedMessageLog]})
    });

}