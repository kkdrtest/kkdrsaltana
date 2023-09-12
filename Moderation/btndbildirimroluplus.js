import { MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "btndbildirimroluplus",
    description:"Kullancıya duyuru yetkisi verir.",
    cooldown: 10,     
    async execute(interaction) {  
        console.log("btndestekduyuruyetkiplus")
        if(interaction.type === "DEFAULT") return
        
        const { embed } = interaction.client

        try{

        const selectedmembers = interaction.member.id
        await interaction.deferUpdate();
        
        const role = interaction.guild.roles.cache.get(`${interaction.values}`);
            if (!role) {
                interaction.editReply({ embeds: [ embed(`Rol verme hatası oluştu.`,"RED",) ], ephemeral: true })
            }

            const SelectedUserId = `${selectedmembers}`
            const usercontrol = interaction.guild.members.cache.get(SelectedUserId)
            try {
                await usercontrol.roles.add(role);
                await interaction.editReply({
                    embeds: [embed(`Bildirim rolü başarıyla verildi.\nKullanıcı: <@${selectedmembers}>`,"GREEN")],
                    components: [], ephemeral: true 
                })        
            } catch (error) {
                interaction.editReply({ embeds: [ embed(`Rol verme hatası oluştu.`,"RED",) ], ephemeral: true })
            }

        
       
    } catch (error) {
        console.log(error)
        interaction.editReply({ embeds: [ embed(`Bu komut \`${data.name}\` kullanılırken hata oluştu.`,"RED",) ], ephemeral: true })
        
    }

        
    }
}