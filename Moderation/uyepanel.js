import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js"

export const data = {
    name: "uyepanel",
    description:"Üye Panelini Atar",
    cooldown: 1,    
    async execute(interaction) {
        const response = new MessageEmbed()
        .setDescription("\`\`\`md\n1. Ceza Bilgi\n2. Bildirim Rolleri\n3. Eklenecek\n4. Eklenecek\`\`\`")
        .setAuthor({ name: "Üye Paneli"})
        .setThumbnail("https://cdn.discordapp.com/icons/811231197833068565/bd9eef85a7fcab6abf9b5d944d7e7a93.png?size=1024")
        .setColor('GREEN');

        const row = new MessageActionRow()
        .setComponents(
            new MessageButton()
                .setCustomId("btndcezadurumu")
                .setLabel("1")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("btndbildirimrolu")
                .setLabel("2")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("btndestek3")
                .setLabel("3")
                .setStyle("SUCCESS")                
                .setDisabled(true),
                new MessageButton()
                .setCustomId("btndestek4")
                .setLabel("4")
                .setStyle("SUCCESS")
                .setDisabled(true)
        )
    
        interaction.channel.send({ embeds: [response], components: [row] })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}