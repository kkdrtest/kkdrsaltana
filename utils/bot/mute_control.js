import fs from 'fs';
import { MessageEmbed } from "discord.js"
import databasebackup from '../databasebackup.js';
export default (interaction,userId,selectedresult,selectedreason,roles,customsettingsmute) => {

    // KURAL AYKIRILIĞI 1 = 5 Puan
    // KURAL AYKIRILIĞI 2 = 20 PUAN    
    // KURAL AYKIRILIĞI 3 = 40 Puan    
    // KURAL AYKIRILIĞI 4 = 80 Puan    
    // KADEMELER: 20 PUAN : 24 saat
    // KADEMELER: 40 PUAN : 64 saat
    // KADEMELER: 60 PUAN : 120 saat
    // KADEMELER: 80 PUAN : 360 saat
    // KADEMELER: 100 PUAN : 840 saat

    const kuralAykırılıkları = {1: 5, 2: 20, 3: 40, 4: 80};
    function hesaplaSure(puan) {
        const sureler = [0, 24, 64, 120, 360, 840];
        const indeks = Math.min(Math.floor(puan / 20), sureler.length - 1);
        return sureler[indeks];
    }

    let errorStatus = "false"

    fs.readFile("./database/mutedata.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            errorStatus = "true"    
        }
        if(errorStatus === "true") return console.log(`Data okunurken hata çıktı.`)

        let jsonData
        try{
            jsonData = JSON.parse(data)
        } catch (error) {   
            console.error(error)
            fs.readFile('./database/mutedatabackup.json', 'utf8', (err, data) => {
                if (err) {
                  console.error('Yedek dosya okunurken bir hata oluştu:', err);
                  return;
                }
              
                fs.writeFile('./database/mutedata.json', data, 'utf8', (err) => {
                  if (err) {
                    console.error('Yedek dosya yazılırken bir hata oluştu:', err);
                    return;
                  }
                  console.log('Yedek dosya başarıyla kopyalandı.');
                });
              });
            return
        }
        
        const validCommands = [
            "mute",
            "unmute",
            "puandegis"
        ];
        
        if (validCommands.includes(customsettingsmute)) {
              setTimeout(function() {databasebackup("mutedata")}, 3000);
        } 
        
        if(customsettingsmute === "mute"){

            const currentTimeUnix = Math.floor(Date.now() / 1000)
            if (jsonData[userId]) {
                let oldLevel = 0
                if (jsonData[userId].level) oldLevel = parseInt(jsonData[userId].level);
                const newLevel = Math.min(oldLevel + kuralAykırılıkları[selectedresult], 100);
                jsonData[userId].level = String(newLevel);
                console.log("Puan:",newLevel,"Kural Aykırlığı:",selectedresult,"Süre(saat):",hesaplaSure(newLevel))                
                if(newLevel >= 20) {
                    const addbantime = hesaplaSure(kuralAykırılıkları[selectedresult]) * 60 * 60
                    const resutbantime = currentTimeUnix + addbantime
                    jsonData[userId].banlifttime = resutbantime;
                    jsonData[userId].roles = roles;
                    async function updateRolesaa(member) {
                            const response = new MessageEmbed()
                            .setColor("GREEN")
                            .addFields(
                                {name:"Kullanıcıya Ceza Uygulandı", value: `
Topluluktaki kötü davranışlarınız sebebi ile ceza puanı aldınız lütfen dikkat edin bir süre sonra bu puan otomatik sıfırlanabilir. **Topluluk Kurallarımıza Uygun** davranışlar sergileyiniz.
<@${interaction.member.id}> tarafından <@${userId}> kişisine ceza uygulandı
**Kural Aykırılığı:** ${selectedresult}. kategori
**Ceza Puanı:** ${newLevel}
**Sebep:** ${selectedreason}`},
                            )
                            .setTimestamp()
                            const LogForChannel = await interaction.client.channels.fetch("1151232889061650565");
                            await LogForChannel.send({embeds:[response]})                    
                            const targetUserRoles = member.roles.cache;

                            const rolesToRemove = targetUserRoles.filter(role => roles.includes(role.id));

                            if (rolesToRemove.size === 0) return

                            try {
                                await member.roles.remove(rolesToRemove);
                            } catch (error) {
                                console.error("Rol güncelleme hatası:", error);
                            }    

                            try {
                                await member.roles.add(process.env.banroleid);
                            } catch (error) {
                                console.error("Rol güncelleme hatası:", error);
                            }

                    }
                    updateRolesaa(interaction.member)
                }
            } else {
                console.log("*Puan:",kuralAykırılıkları[selectedresult],"Kural Aykırlığı:",selectedresult,"Süre(saat):",hesaplaSure(kuralAykırılıkları[selectedresult]))
                if(hesaplaSure(kuralAykırılıkları[selectedresult]) >= 20) {       
                    const addbantime = hesaplaSure(kuralAykırılıkları[selectedresult]) * 60 * 60
                    const resutbantime = currentTimeUnix + addbantime
                    jsonData[userId] = {
                        "banlifttime": resutbantime,
                        "level": kuralAykırılıkları[selectedresult],
                        "roles": roles
                    };
                } else {
                    jsonData[userId] = {"level": kuralAykırılıkları[selectedresult]};
                }
            }
            
            fs.writeFile("./database/mutedata.json", JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.log("olamadaı")
                } else {
                    console.log("oldu")                    
                }
            });

        }     

        if(customsettingsmute === "unmute"){
            if (jsonData[userId]) {
                delete jsonData[userId].banlifttime;
                delete jsonData[userId].roles;
                fs.writeFile("./database/mutedata.json", JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.log("olamadaı")
                    } else {
                        console.log("oldu")                    
                    }
                });

            } else {
                console.log('User not found in the data.');
            }
        }     

        if(customsettingsmute === "puandegis"){
            if (jsonData[userId]) {
                jsonData[userId].level = String(selectedresult);
                fs.writeFile("./database/mutedata.json", JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.log("olamadaı")
                    } else {
                        console.log("oldu")                    
                    }
                });

            } else {
                console.log('User not found in the data.');
            }
        }
      
    })

    

}
