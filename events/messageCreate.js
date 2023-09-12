import cooldown_control from "../utils/cooldown_control.js";
import embed from "../utils/bot/embed.js";
import { Collection, MessageEmbed } from "discord.js"

export default client => {
    const prefix = process.env.prefix
    const userCooldowns = new Collection()
    client.on('messageCreate', message => {



        // Kullanıcının link atarsa
        if (message.content.includes('discord.gg' || 'discordapp.com/invite'|| 'dc.gg')) {

            if(interaction.member.roles.cache.has(process.env.prodroleid))return
            if(interaction.member.roles.cache.has(process.env.balonroleid))return
            if(interaction.member.roles.cache.has(process.env.lovalytroleid))return
                
            message.delete()
            if (!userCooldowns.has(message.author.id)) {
                userCooldowns.set(message.author.id, {
                    count: 1,
                    timestamp: Date.now()
                });
            } else {
                const userCooldown = userCooldowns.get(message.author.id);
                const currentTime = Date.now();
                const timeDifference = currentTime - userCooldown.timestamp;

                if (timeDifference < 1800000) {
                    userCooldown.count++;

                    if (userCooldown.count === 2) {

                        const response = new MessageEmbed()
                        .setColor("GREEN")
                        .addFields({name:"Sistem Mesajı", value: `Sunucu daveti atmak yasaktır, devam edersen teyit rolü verilecek.`},)
                        message.channel.send({embeds:[response]});
                        } else if (userCooldown.count === 3) {
                        let roles = []
                        const excludedRoleIds = process.env.mutednfrole.split(",")
                
                        if (message.member) {
                            roles = message.member.roles.cache.filter(role => !excludedRoleIds.includes(role.id) && role.id !== message.guild.roles.everyone.id).map(role => role.id);
                        }
                        const rolesToRemove = message.member.roles.cache.filter(role => roles.includes(role.id));
                
                        if (rolesToRemove.size === 0) return
                
                        try {
                            message.member.roles.remove(rolesToRemove);
                        } catch (error) {
                            console.error("Rol güncelleme hatası:", error);
                        }    
                
                        try {
                            message.member.roles.add(process.env.teyitoleid);
                        } catch (error) {
                            console.error("Rol güncelleme hatası:", error);
                        }
                        const response = new MessageEmbed()
                        .setColor("GREEN")
                        .addFields({name:"Sistem Mesajı", value: `<@${message.author.id}> kullanıcısı teyite düştü`},)
                        message.channel.send({embeds:[response]});
                        userCooldowns.delete(message.author.id);
                    }
                } else {
                    userCooldowns.set(message.author.id, {
                        count: 1,
                        timestamp: currentTime
                    });
                }
            }
            return
        }


        if (message.type !== "DEFAULT") return
        if (message.content.startsWith(prefix) == false) return

        const args = message.content.slice(1).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = client.commands.get(commandName)
        if(!command) return

        // Permission Control
        if(command.permission && !message.member.permissions.has(command.permission)) return message.reply({
            embeds : [
                embed(`Bu komutu kullanmak için \`${command.permission}\` yetkisine sahip olman gerekiyor.`,"RED")
            ]
        })

        // Cooldown_control
        const cooldown = cooldown_control(command,message.member.id)
        if (cooldown) return message.reply({
            embeds: [
                embed(`Bu komutu tekrar kullanmak için \`${cooldown}\` saniye beklemelisiniz.`,"RED")
            ]
        }).then(async msg  => {
            setTimeout(() => {
                msg.delete()
              }, cooldown*1000 + 1000);
              
        })

        try{
            const interaction = message
            command.data.execute(interaction)
        } catch (e){
            console.log(e)
            message.reply(`Bu komutta \`${commandName}\` şu anda hata var!`)
        }
    });

}