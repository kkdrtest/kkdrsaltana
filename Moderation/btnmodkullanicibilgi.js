import { MessageEmbed } from "discord.js"
import fs from 'fs';

const modrole = process.env.modrole.split(",")

export const data = {
    name: "btnmodkullanicibilgi",
    description:"Kullanıcı bilgi getirir.",
    cooldown: 5,    
    async execute(interaction) { 
        if(interaction.type === "DEFAULT") return             
        
        const { client } = interaction   
        const { embed } = interaction.client 


        const targetRoles = process.env.modrole.split(",")

        if ((interaction.member.roles.cache.some(role => targetRoles.includes(role.id)))) {
            if(interaction.type !== "DEFAULT") interaction.reply({  embeds: [ embed(`Malesef bunu kullanmaya yetkiniz yetmiyor.`, "RED") ], ephemeral:true })
            return
        }


        const SelectedUserId = `${interaction.components[0].components[0].value}`

        const usercontrol = await interaction.guild.members.fetch(SelectedUserId)
        if(!usercontrol) return interaction.reply({ embeds: [ embed(`Bu \`${SelectedUserId}\` id'de kullanıcı bulunamadı.`, "RED") ], ephemeral:true})

        await interaction.deferReply({ ephemeral:true })
        
        let device = "Bilinmiyor veya Offline"

        const avatar = usercontrol.displayAvatarURL({dynamic: true, size: 2048})
        const png = usercontrol.displayAvatarURL({dynamic: true, size: 2048, format: "png"})
        const jpg = usercontrol.displayAvatarURL({dynamic: true, size: 2048, format: "jpg"})
        const jpeg = usercontrol.displayAvatarURL({dynamic: true, size: 2048, format: "jpeg"})
        const gif = usercontrol.displayAvatarURL({dynamic: true, size: 2048, format: "gif"})
        const webp = usercontrol.displayAvatarURL({dynamic: true, size: 2048, format: "webp"}) 

          let wherechanneltext
          const wherechannel = usercontrol.voice.channel;
          if (wherechannel) {
            wherechanneltext = `<#${wherechannel.id}>.`
          } else {
            wherechanneltext = `Kanalda gözükmüyor.`
          }

          let levelValue = "Yok"
          let banlifetime = "Yok"
          try {          
            const data = fs.readFileSync('./database/mutedata.json', 'utf8');
            const jsonData = JSON.parse(data);
            const desiredKey = SelectedUserId;
            if (jsonData.hasOwnProperty(desiredKey)) {
              levelValue = jsonData[desiredKey].level;            
              banlifetime = `<t:${jsonData[desiredKey].banlifttime}:R>`
              if(!jsonData[desiredKey].banlifttime) banlifetime = "Ceza yok" 
            } 
          } catch (error) {
            console.error('Bir hata oluştu:', error);
          }      



        const response = new MessageEmbed()
            .setColor("GREEN")
            .addFields(
                {name: `Kullanıcı Sunucu Bilgileri:`, value:`
**• ID:** ${usercontrol.id}
**• Kullanıcı Adı:** ${usercontrol.user.username}
**• Sunucu Adı:** ${usercontrol.displayName === usercontrol.user.username ? "yok":usercontrol.displayName}
**• Hesap Kurulum:** <t:${parseInt(`${(usercontrol.user.createdTimestamp || 1000) / 1000}`)}:R>
**• Sunucuya Katılma:** <t:${parseInt(`${(usercontrol.joinedTimestamp || 1000) / 1000}`)}:R>       
**• Bulunduğu Kanal:** ${wherechanneltext}
**• Ceza Puanı:** ${levelValue}
**• Ceza Süresi:** ${banlifetime}
---
`},
{name: `Avatar Bilgileri:`, value:`Kendi Avatarı: [PNG](${png}) | [JPG](${jpg}) | [JPEG](${jpeg}) | [GIF](${gif}) | [WEBP](${webp})`}
            )
            .setThumbnail(`${usercontrol?.displayAvatarURL()}`)

        await interaction.editReply({ embeds: [response], ephemeral: true })
       
    }
}