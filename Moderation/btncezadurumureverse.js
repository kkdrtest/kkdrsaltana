import { MessageActionRow, MessageButton, Modal, TextInputComponent } from "discord.js"
const modrole = process.env.modrole.split(",")

export const data = {
    name: "btncezadurumureverse",
    description:"Kullanıcı bilgi getirir.",
    cooldown: 5,    
    async execute(interaction) { 
        if(interaction.type === "DEFAULT") return   

        const targetRoles = process.env.modrole.split(",")

        if (!(interaction.member.roles.cache.some(role => targetRoles.includes(role.id)))) {
           // if(interaction.type !== "DEFAULT") interaction.reply({  embeds: [ embed(`Malesef bunu kullanmaya yetkiniz yetmiyor.`, "RED") ], ephemeral:true })
           // return
        }

       
        if(interaction.type === "DEFAULT") return
        if(interaction.isButton()){
            const modal = new Modal()
            .setCustomId("btnmodkullanicibilgi")
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