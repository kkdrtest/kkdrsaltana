
import mute_control from '../utils/bot/mute_control.js';
import fs from 'fs';
export default client => {
    
    client.on('guildMemberAdd', async (member) => {
        try {
          
          if (member) {
            

            const dosyaYolu = 'settings.json';
            let girisalimiti = 14
            try {
                const veri = fs.readFileSync(dosyaYolu, 'utf8');
                const settings = JSON.parse(veri);
                girisalimiti = settings.girislimiti;
            } catch (hata) {
                console.error('Hata:', hata);
            }

              const UserCratedDate = Math.floor(member.user.createdTimestamp / 1000);
              const currentTimeUnix = Math.floor(Date.now() / 1000);
              const TargetDaysAgoUnix = 14 * 24 * 60 * 60;

              let banlifttime
              let teyitcontrol

              try {
                  const data = fs.readFileSync("./database/mutedata.json", 'utf8');          
                  const jsonData = JSON.parse(data);
                  banlifttime = jsonData[member.id]?.banlifttime;
                  teyitcontrol = jsonData[member.id]?.roles;
              } catch (error) {
                  console.error('Hata:', error);
              }
              if(banlifttime){
                const cezarole = member.guild.roles.cache.get(process.env.banroleid);            
                if (cezarole) {
                  await member.roles.add(cezarole);
                }
                
                const simdikiban = banlifttime
                const currentTimeUnixa = Math.floor(Date.now() / 1000)
                let ikikatban
                if ((simdikiban - currentTimeUnixa) * 2 > 8640 * 60 * 60) {
                  ikikatban = (8640 * 60 * 60) + currentTimeUnixa
                }
                else {
                  ikikatban = ((simdikiban - currentTimeUnixa) * 2) + currentTimeUnixa
                }                

                const customsettingsmute = "ikikatban"
                mute_control("nothing",member.id,ikikatban,"nothing","nothing",customsettingsmute)
              }
              else if(teyitcontrol){
                const cezarole = member.guild.roles.cache.get(process.env.teyitoleid);            
                if (cezarole) {
                  await member.roles.add(cezarole);
                }
                
                const simdikiban = banlifttime
                const currentTimeUnixa = Math.floor(Date.now() / 1000)
                let ikikatban
                if ((simdikiban - currentTimeUnixa) * 2 > 8640 * 60 * 60) {
                  ikikatban = (8640 * 60 * 60) + currentTimeUnixa
                }
                else {
                  ikikatban = ((simdikiban - currentTimeUnixa) * 2) + currentTimeUnixa
                }                

                const customsettingsmute = "ikikatban"
                mute_control("nothing",member.id,ikikatban,"nothing","nothing",customsettingsmute)
              }
              else if ((currentTimeUnix-UserCratedDate > TargetDaysAgoUnix)  ){   

                  const role2 = member.guild.roles.cache.get(process.env.memberroleid);            
                  if (role2) {
                    await member.roles.add(role2);
                  }

              }
              else {                

                  const role1 = member.guild.roles.cache.get(process.env.teyitoleid);            
                  if (role1) {
                    await member.roles.add(role1);
                  }
                  
              }

              return

          } else {
              console.log('Üye bilgisi alınamıyor.');
          }


          } catch (error) {
            console.error('Roller verilirken bir hata oluştu:', error);
          }
        
        
    })
}