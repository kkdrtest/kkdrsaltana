import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js"

export const data = {
    name: "btniletikutus0",
    description:"ileti panelini atar",
    cooldown: 60,    
    async execute(interaction) {

        const response = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`
**İleti**
Saltanat Online hakkındaki önerilerinizi ve şikayetlerinizi iletebilirsiniz. Bu öneriler/şikayetler herhangi bir kişi veya herhangi bir olayı kapsayabilir. Mesajlarınız genel yetkililere veya sadece topluluk yöneticisine özel olabilir.   ( Topluluk yöneticisine iletilen mesajlar sadece topluluk yöneticisi tarafından değerlendirilmektedir ve özeldir.)
        
**Ceza Bilgi**
Ceza bilgi üzerinden ceza durumu, ceza puanı ve cezalandırma sistemi detaylarına ulaşabilirsiniz.
        
**Bildirim Rolleri**
Bildirim rolleri bölümünden haberdar olmak istediğiniz konular ile ilgili bildirim rollerini seçebilirsiniz.
        `)

        const row = new MessageActionRow()
        .setComponents(
            new MessageButton()
            .setCustomId("btniletikutusu")
            .setLabel("İleti")
            .setStyle("DANGER"),        
            new MessageButton()
            .setCustomId("btniletikutusut")
            .setLabel("Topluluk Yöneticisi")
            .setStyle("PRIMARY"),        
            new MessageButton()
            .setCustomId("btndcezadurumu")
            .setLabel("Ceza Bilgi")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("btndbildirimrolu")
            .setLabel("Bildirim Rolleri")
            .setStyle("SUCCESS"),
        )
        interaction.channel.send({ embeds:[response], components: [row] })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}