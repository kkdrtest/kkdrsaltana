import { MessageEmbed } from "discord.js"
import fs from 'fs';
import mute_control from "../../utils/bot/mute_control.js"


export const data = {
    name: "puandegis",
    description:"Kullanıcının kademesini değiştirir.",
    cooldown: 5,    
    async execute(interaction) {
        if (interaction.type === "REPLY") return

        const { client } = interaction   
        const { embed } = interaction.client 
        
        const targetRoles = process.env.modrole.split(",")
        if (!(interaction.member.roles.cache.some(role => targetRoles.includes(role.id)))) {
            if(interaction.type !== "DEFAULT") interaction.reply({  embeds: [ embed(`Malesef bunu kullanmaya yetkiniz yetmiyor.`, "RED") ], ephemeral:true })
            return
        }

        let selectedMember
        let selectedkademe
        let selectedreason
            selectedMember = `${interaction.components[0].components[0].value}`
            selectedkademe = `${interaction.components[1].components[0].value}`
            selectedreason = `${interaction.components[2].components[0].value}`
            if(!(client.users.cache.get(selectedMember))) return interaction.reply({ embeds: [ embed(`Bu \`${selectedMember}\` id'de kullanıcı bulunamadı.`, "RED") ], ephemeral:true })
      
    
        if(selectedkademe < 0 || selectedkademe > 100) return interaction.reply({ embeds: [ embed(`\`${selectedkademe}\` puanu bulunamadı.(0-100)`, "RED") ], ephemeral:true})

        const userId = selectedMember

        let kademe = "0"

        try {
            const data = fs.readFileSync("./database/mutedata.json", 'utf8');          
            const jsonData = JSON.parse(data);
            kademe = jsonData[userId].level;      
        } catch (error) {
            console.error('Hata:', error);
        }
        if (!kademe) kademe = "0"

        const customsettingsmute = "puandegis"
        mute_control(interaction,userId,selectedkademe,selectedreason,"nothing",customsettingsmute)

        const response = new MessageEmbed()
        .setColor("GREEN")
        .addFields(
            {name:"Kullanıcının Kademesi Değiştirildi", value: `<@${interaction.member.id}> tarafından <@${userId}> kişisinin ${kademe} ceza puanı ${selectedkademe} yapıldı\nSebep: ${selectedreason}`},
        )
        .setTimestamp()
        interaction.reply({embeds:[response], ephemeral:true})
        const LogForChannel = await client.channels.fetch("1151232889061650565");
        LogForChannel.send({embeds:[response]})


        
    }
}