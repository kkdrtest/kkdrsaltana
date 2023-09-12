import { MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "btndbildirimroluplus2",
    description:"Kullancıya duyuru yetkisi alır.",
    cooldown: 10, 
    async execute(interaction) {  
        if(interaction.type === "DEFAULT") return
        
        let { client, member } = interaction
        const { embed } = interaction.client

        try{

        const selectedmembers = interaction.member.id
        await interaction.deferUpdate();
        
        const role = interaction.guild.roles.cache.get(`${interaction.values}`);
        
            if (!role) {
                interaction.editReply({ embeds: [ embed(`Rol Bulunamadı.`,"RED",) ], ephemeral: true })
            }

            const SelectedUserId = `${selectedmembers}`
            const usercontrol = interaction.guild.members.cache.get(SelectedUserId)
            try {
                await usercontrol.roles.remove(role);
                await interaction.editReply({
                    embeds: [embed(`Duyuru rolünü başarıyla alındı.\nKullanıcı: <@${selectedmembers}>`,"GREEN")],
                    components: [], ephemeral: true 
                })        
            } catch (error) {
                interaction.editReply({ embeds: [ embed(`Rol alma hatası oluştu.`,"RED",) ], ephemeral: true })
            }

        
       
    } catch (error) {
        console.log(error)
        interaction.editReply({ embeds: [ embed(`Bu komut \`${data.name}\` kullanılırken hata oluştu.`,"RED",) ], ephemeral: true })
        
    }

        
    }
}