import mute_control from "../../utils/bot/mute_control.js"
import { MessageActionRow, Modal, TextInputComponent, MessageEmbed } from "discord.js"

export const data = {
    name: "mutereverse",
    description:"Kullanıcıya mute atacak aracı açar.",
    cooldown: 5,    
    async execute(interaction) {
        if (interaction.type === "REPLY") return
        

        const { client } = interaction   
        const { embed } = interaction.client 

        const targetRoles = process.env.yasakyetkirole.split(",")

        if (!(interaction.member.roles.cache.some(role => targetRoles.includes(role.id)))) {
            //if(interaction.type !== "DEFAULT") interaction.reply({  embeds: [ embed(`Malesef bunu kullanmaya yetkiniz yetmiyor.`, "RED") ], ephemeral:true })
            //return
        }       

        if(interaction.isButton()){
            const modal = new Modal()
            .setCustomId("mute")
            .setTitle("Saltanat(Discord) Yasaklama")
            .setComponents(
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("kullaniciid")
                            .setLabel("Kullanıcı ID:")
                            .setMinLength(4)
                            .setPlaceholder("Kullanıcı ID")
                            .setRequired(true)
                            .setStyle("SHORT")
                ),
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("kuralaykiri")
                            .setLabel("KURAL AYKIRILIĞI:")
                            .setPlaceholder("KURAL AYKIRILIĞI")
                            .setRequired(true)
                            .setStyle("SHORT")
                ),
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("reason")
                            .setLabel("Sebep:")
                            .setMinLength(4)
                            .setPlaceholder("Sebep")
                            .setRequired(true)
                            .setStyle("SHORT")
                ),
            )            

            interaction.showModal(modal)
            return
        }
        
    }
}