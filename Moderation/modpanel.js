import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js"

export const data = {
    name: "modpanel",
    description:"Mod Panelini Atar",
    cooldown: 1,    
    async execute(interaction) {
        const response = new MessageEmbed()
        .setDescription("Moderasyon işlemlerini buradan yapabilirsiniz.")
        .setAuthor({ name: "Moderatör Paneli"})
        .setThumbnail("https://cdn.discordapp.com/icons/811231197833068565/bd9eef85a7fcab6abf9b5d944d7e7a93.png?size=1024")
        .setColor('GREEN');

        const row = new MessageActionRow()
        .setComponents(
            new MessageButton()
            .setCustomId("mutereverse")
            .setLabel("Yasakla")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("unmutereverse")
            .setLabel("Yasak Kaldır")
            .setStyle("DANGER"),            
            new MessageButton()
            .setCustomId("puandegisreverse")
            .setLabel("Puan Değiş")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("btncezadurumureverse")
            .setLabel("Durum")
            .setStyle("SECONDARY")
        )
        const row2 = new MessageActionRow()
        .setComponents(
            new MessageButton()
            .setCustomId("afasfsfsafs")
            .setLabel("Puan Değiş")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("gsfgsfgfsdgfsd")
            .setLabel("Durum")
            .setStyle("SECONDARY")
        )
    
        interaction.channel.send({ embeds: [response], components: [row] })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}