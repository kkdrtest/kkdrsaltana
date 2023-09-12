import { MessageActionRow, Modal, TextInputComponent } from "discord.js"

export const data = {
    name: "btniletikutusut",
    description:"İleti kutusu aracını atar",
    cooldown: 21000,    
    async execute(interaction) {
        
        if(interaction.type === "DEFAULT") return
        if(interaction.isButton()){
            const modal = new Modal()
            .setCustomId("btniletikutusuplus")
            .setTitle("Saltanat(Discord) İleti")
            .setComponents(
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("saltanatileti")
                            .setLabel("İletiniz")
                            .setMinLength(4)
                            .setMaxLength(256)
                            .setPlaceholder("Buraya Yazınız")
                            .setRequired(true)
                            .setStyle("PARAGRAPH")
                )
            )
            

            interaction.showModal(modal)
            return
        }
    }
}
