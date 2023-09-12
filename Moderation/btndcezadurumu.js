import { MessageEmbed } from "discord.js"
import fs from 'fs';
import mute_control from "../../utils/bot/mute_control.js";
export const data = {
    name: "btndcezadurumu",
    description:"Kullanıcın ne kadar cezası kaldığını gösterir.",
    cooldown: 5,    
    async execute(interaction) { 
        
        const { embed } = interaction.client 

        // const membercntrl = await interaction.guild.members.fetch(interaction.member.id);
        // if(!membercntrl.roles.cache.has(process.env.banroleid)){
        //     const response = new MessageEmbed()
        //     .setColor("RED")
        //     .setDescription("Zaten bir cezanız yok.")
        //     interaction.reply({embeds:[response], ephemeral: true  })
        //     return
        // }

        await interaction.deferReply({ephemeral: true });        

        let roles = []
        try {
            const veri = fs.readFileSync("./database/mutedata.json", 'utf8');
            const jsonData = JSON.parse(veri);
            const istenenAnahtar = interaction.member.id;
          
                
            if (jsonData[istenenAnahtar] && jsonData[istenenAnahtar].banlifttime) {
                const banlifttime = jsonData[istenenAnahtar].banlifttime;
                const banlevel = jsonData[istenenAnahtar].level;
                if (jsonData[istenenAnahtar].banlifttime) roles = jsonData[istenenAnahtar].roles

                await interaction.editReply({ embeds: [embed(`Cezanızın bitmesi kalan süre: <t:${banlifttime}:R>\n Ceza Puanınız: ${banlevel}`,"GREEN","Ceza süresi")], ephemeral: true })

                const currentTimeUnix = Math.floor(Date.now() / 1000)
                if(currentTimeUnix > banlifttime){      
                    const customsettingsmute = "unmute"
                    mute_control(interaction,interaction.user.id,"nothing","nothing","nothing",customsettingsmute)


                    const member = await interaction.guild.members.fetch(istenenAnahtar);
                    const rolesToAdd = roles.filter((roleID) => !member.roles.cache.has(roleID));            
                    try {
                        await member.roles.remove(process.env.banroleid);
                    } catch (error) {
                        console.error('Roller eklenirken bir hata oluştu:', error);
                    }
            
                    if (rolesToAdd.length === 0) {
                      return console.log('Hedef kullanıcı zaten tüm rolleri almış durumda.');
                    }
            
                    try {
                        await member.roles.add(rolesToAdd);
                    } catch (error) {
                        console.error('Roller eklenirken bir hata oluştu:', error);
                    }  
                    
                }
            } else {
                
                await interaction.editReply({ embeds: [embed(`Herhangi bir yasaklanmanız bulunmamaktadır.`,"GREEN","Ceza süresi")], ephemeral: true })
            }
          } catch (hata) {
            console.error('Bir hata oluştu:', hata.message);
            interaction.editReply({ embeds: [ embed(`Bu komut \`${data.name}\` kullanılırken hata oluştu.`,"RED",) ], ephemeral: true })
          }
    }
}