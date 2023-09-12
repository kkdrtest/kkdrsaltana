import { MessageEmbed } from "discord.js"
import mute_control from "../../utils/bot/mute_control.js"

export const data = {
    name: "mute",
    description:"Kullanıcıya mute atar.",
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
        let selectedresult
        let selectedreason
            selectedMember = `${interaction.components[0].components[0].value}`
            selectedresult = `${interaction.components[1].components[0].value}`
            selectedreason = `${interaction.components[2].components[0].value}`
            if(!(client.users.cache.get(selectedMember))) return interaction.reply({ embeds: [ embed(`Bu \`${selectedMember}\` id'de kullanıcı bulunamadı.`, "RED") ], ephemeral:true })
            if(!(selectedresult === "1" || selectedresult === "2" || selectedresult === "3" || selectedresult === "4")) return interaction.reply({ embeds: [ embed(`\`${selectedresult}\` kural aykırılığı bulunamadı.(1,2,3,4)`, "RED") ], ephemeral:true })


        const userId = selectedMember

      let member
          try {

        member = await interaction.guild.members.fetch(userId);
          } catch (error) {
        console.log("kullanıcı bulunmadı Q atmış olabilir.") 
          }   
        if(!member) {
            const response = new MessageEmbed()
            .setColor("RED")  
            .addFields({name:"Kullanıcıya Ceza Uygulanamadı", value: `Kullanıcı sunucuda gözükmüyor.`},)
            .setTimestamp()
            interaction.reply({ embeds:[response], ephemeral:true })
            return
        }


        if(!member.roles.cache.has(process.env.memberroleid) && !member.roles.cache.has(process.env.banroleid)){
            const response = new MessageEmbed()
            .setColor("RED")
            .addFields(
                {name:"unMute", value: `${member} kullanıcısının rolü bulunmaığı için işlem yapılamıyor.`},
            )
            interaction.reply({ embeds:[response], ephemeral:true})
            return
        }






        let roles = []
        const excludedRoleIds = process.env.mutednfrole.split(",")

        if (member) {
            roles = member.roles.cache.filter(role => !excludedRoleIds.includes(role.id) && role.id !== interaction.guild.roles.everyone.id).map(role => role.id);
        }
        const muteguardroles = process.env.muteguardroles.split(",")
        for (const valueToCheck of muteguardroles) {
            if (roles.includes(valueToCheck)) {

                const response = new MessageEmbed()
                .setColor("RED")
                .addFields(
                    {name:"Mute", value: `Yetkili ekibinden birine işlem yapamazsınız.`},
                )
                interaction.reply({embeds:[response]})

                return;
            }
        }

        if (roles.includes(process.env.banroleid)) {
            const response = new MessageEmbed()
            .setColor("RED")
            .addFields(
                {name:"Mute", value: `Kullanıcı zaten cezalı üye.`},
            )
            interaction.reply({embeds:[response], ephemeral:true})
            return
        }
        const customsettingsmute = "mute"

        mute_control(interaction,userId,selectedresult,selectedreason,roles,customsettingsmute)

        const response2 = new MessageEmbed()
        .setColor("GREEN")
        .addFields(
            {name:"Mute", value: `İşlem başarılı.`},
        )
        interaction.reply({embeds:[response2], ephemeral:true})
        // const LogForChannel = await client.channels.fetch(process.env.roomlogchannel);
        // const targetUserRoles = member.roles.cache;

        // const rolesToRemove = targetUserRoles.filter(role => roles.includes(role.id));

        // if (rolesToRemove.size === 0) return

        // try {
        //     await member.roles.remove(rolesToRemove);
        // } catch (error) {
        //     console.error("Rol güncelleme hatası:", error);
        // }    

        // try {
        //     await member.roles.add(process.env.banroleid);
        // } catch (error) {
        //     console.error("Rol güncelleme hatası:", error);
        // }
        
    }
}