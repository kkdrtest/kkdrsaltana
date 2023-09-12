import { MessageEmbed } from "discord.js"
import fs from 'fs';
import mute_control from "../../utils/bot/mute_control.js";


export const data = {
    name: "unmute",
    description:"Kullanıcıya unmute atar.",
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
        let selectedreason
            selectedMember = `${interaction.components[0].components[0].value}`
            selectedreason = `${interaction.components[1].components[0].value}`
            if(!(client.users.cache.get(selectedMember))) return interaction.reply({ embeds: [ embed(`Bu \`${selectedMember}\` id'de kullanıcı bulunamadı.`, "RED") ], ephemeral:true })


        const userId = selectedMember  

        const membercntrl = await interaction.guild.members.fetch(userId);


        if(!membercntrl.roles.cache.has(process.env.banroleid)){
            const response = new MessageEmbed()
            .setColor("RED")
            .addFields(
                {name:"unMute", value: `Kullanıcı zaten cezalı değil.`},
            )
            interaction.reply({embeds:[response], ephemeral:true})
            //return
        }    

        const customsettingsmute = "unmute"
        mute_control(interaction,userId,"nothing",selectedreason,"nothing",customsettingsmute)
        let roles = []

        try {
            const data = fs.readFileSync("./database/mutedata.json", 'utf8');          
            const jsonData = JSON.parse(data);
            roles = jsonData[userId].roles;      
        } catch (error) {
            console.error('Hata:', error);
        }
        
        const member = await interaction.guild.members.fetch(userId);

        let rolesToAdd = []

        if(roles.length !== 0) rolesToAdd = roles.filter((roleID) => !member.roles.cache.has(roleID));

        try { 
            await member.roles.remove(process.env.banroleid);
        } catch (error) {
            console.error('Roller eklenirken bir hata oluştu:', error);
        }

        try {
            if (rolesToAdd.length > 0) await member.roles.add(rolesToAdd);
        } catch (error) {
            console.error('Roller eklenirken bir hata oluştu:', error);
        }     
          
        const formattedRoles = roles.map(role => `<@&${role}>`).join(', ');
        const response = new MessageEmbed()
        .setColor("GREEN")
        .addFields(
            {name:"Kullanıcının Yasağı Kaldırıldı", value: `<@${interaction.member.id}> tarafından <@${userId}> kişisinin yasağı başarıyla kaldırıldı.\nSebep: ${selectedreason}\nRolleri: ${formattedRoles}`},
        )
        .setTimestamp()
        // if(interaction.type === 'APPLICATION_COMMAND'){
          
        // await interaction.deferReply({embeds:[response],ephemeral:true})    
        // await interaction.editReply({embeds:[response],ephemeral:true})    
        //   return
        //   }
          interaction.reply({embeds:[response],ephemeral:true})   
        const LogForChannel = await interaction.client.channels.fetch("1151232889061650565");
        await LogForChannel.send({embeds:[response]})     
    }
}