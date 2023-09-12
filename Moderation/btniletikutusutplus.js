import { MessageEmbed } from "discord.js"

export const data = {
    name: "btniletikutusutplus",
    description:"İleti kutusu aracını atar",
    cooldown: 3600,    
    async execute(interaction) {

        
        
        if(interaction.type === "DEFAULT") return
        let { client } = interaction 
        await interaction.deferUpdate();

        const response = new MessageEmbed()
        .addFields({ name: `İleti`, value: `${interaction.components[0].components[0].value}`})
        .setColor('GREEN')
        .setAuthor({ name: `${interaction.member.displayName}(${interaction.member.id})`})
        .setTimestamp();       

        const LogForChannel = await client.channels.fetch(process.env.iletikutusuchanneltid);
        await LogForChannel.send({ embeds: [ response ] })

    }
}
