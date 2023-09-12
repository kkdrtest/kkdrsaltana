import { MessageActionRow, MessageButton, Modal, TextInputComponent } from "discord.js"
const modrole = process.env.modrole.split(",")

export const data = {
    name: "btnmodroldestekreverse",
    description:"Kullanıcıya rol alıp verme aracı için butonlar getirir.",
    cooldown: 5,    
    async execute(interaction) { 
        if(interaction.type === "DEFAULT") return             
        
        const { embed } = interaction.client 


        const targetRoles = [process.env.balonroleid, process.env.prodroleid, process.env.bvroleid, process.env.morroleid, process.env.bandoroleid, process.env.ogroleid, process.env.twmodroleid ];

        if (!(interaction.member.roles.cache.some(role => targetRoles.includes(role.id)))) {
            if(interaction.type !== "DEFAULT") interaction.reply({  embeds: [ embed(`Bunu yapmaya yetkiniz yok.`, "RED") ], ephemeral:true })
            return
        }

       
        if(interaction.type === "DEFAULT") return
        if(interaction.isButton()){
            const modal = new Modal()
            .setCustomId("btnmodroldestek")
            .setTitle("Kullanıcı")
            .setComponents(
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("kullaniciid")
                            .setLabel("ID:")
                            .setMinLength(10)
                            .setMaxLength(30)
                            .setPlaceholder("Kullanıcı ID")
                            .setRequired(true)
                            .setStyle("SHORT")
                )
            )
            interaction.showModal(modal)
        }
    }
}