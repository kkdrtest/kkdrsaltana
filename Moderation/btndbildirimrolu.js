import { MessageActionRow, MessageSelectMenu } from "discord.js"

export const data = {
    name: "btndbildirimrolu",
    description:"Kullanıcıya duyuru yetkileri verecek aracı getirir.",
    cooldown: 5,    
    async execute(interaction) { 
        if(interaction.type === "DEFAULT") return
        
        const { embed } = interaction.client 


    const RolesTarget = [
        {label: "Ekinlik bildirim",description: `Etkinlik Bildirimleri`,value: "1149617946629509201"},
        {label: "Hediye bildirim",description: `Hediye Bildirimleri`,value: "1149617947761979392"},
        {label: "İçerik bildirim",description: `İçerik Bildirimleri`,value: "1149617949003497533"}
    ];

        const row = new MessageActionRow()
        .setComponents(
            new MessageSelectMenu()
                .setCustomId("btndbildirimroluplus")
                .setPlaceholder("Rolü Kazan")
                .setOptions([RolesTarget])      
        )
        const row2 = new MessageActionRow()
        .setComponents(
            new MessageSelectMenu()
                .setCustomId("btndbildirimroluplus2")
                .setPlaceholder("Rolü Kaybet")
                .setOptions([RolesTarget])      
        )
        await interaction.deferReply({ ephemeral: true });

        await interaction.editReply({
            embeds: [embed(`Ekinlik Bildirim: Etkinlik duyurularını almak için kullanılır.\nHediye Bildirim: Hediye duyurularını almak için kullanılır.\nİçerik Bildirim: İçerik duyurularını almak için kullanılır.`,"GREEN","Duyuru Rolleri")],
            components: [row,row2], ephemeral: true })
        .catch(error => {
            console.error(error)
            interaction.editReply({ embeds: [ embed(`Bu komut \`${data.name}\` kullanılırken hata oluştu.`,"RED",) ], ephemeral: true })
       })
    }
}