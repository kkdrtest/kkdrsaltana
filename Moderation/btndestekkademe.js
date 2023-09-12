import { MessageEmbed } from "discord.js"
import fs from 'fs';

export const data = {
    name: "btndestekkademe",
    description:"Ceza kademenizi gösterir",
    cooldown: 10,    
    execute(interaction) {

        const categories = [
          [6, 12, 24, 72, 120, 168, 240, 360, 720, 1440, 2160, 2880, 8640],
          [24, 120, 168, 240, 360, 720, 1440, 2160, 2880, 8640],
          [120, 360, 720, 1440, 2160, 2880, 8640],
          [2160, 8640]
        ];

        function calculateResult(categoryIndex, lvl) {
          const selectedCategory = categories[categoryIndex];
          
          if (lvl >= selectedCategory.length) {
            return selectedCategory[selectedCategory.length - 1];
          }
          
          return selectedCategory[lvl];
        }


        try {          
          const data = fs.readFileSync('./database/mutedata.json', 'utf8');
          const jsonData = JSON.parse(data);
          const desiredKey = interaction.member.id;
          if (jsonData.hasOwnProperty(desiredKey)) {
            let levelValue = jsonData[desiredKey].level;
            if(levelValue === "0") levelValue = "1"
            const category1 = calculateResult(0, levelValue-1)
            const category2 = calculateResult(1, levelValue-1)
            const category3 = calculateResult(2, levelValue-1)
            const category4 = calculateResult(3, levelValue-1)
            const response = new MessageEmbed()
            .setDescription(`• Her ban yediğinizde ban kademeniz artar.\n• Ceza kademeniz ne kadar yüksekse kategoriye göre ceza süreniz değişir.\n\`\`\`yaml\nCeza Kademeniz: ${levelValue}\`\`\``)
            .addFields({ name: `[Kategoriye Göre Yiyeceğiniz Cezalar]:`, value: `\`\`\`md\n[Kategori 1]:${category1} saat\n[Kategori 2]:${category2} saat\n[Kategori 3]:${category3} saat\n[Kategori 4]:${category4} saat\`\`\``})
            .setAuthor({ name: "Ceza Kademesi"})
            .setColor('GREEN');
        
            interaction.reply({ embeds: [response], ephemeral: true  })
          
          } else {
            const response = new MessageEmbed()
            .setDescription(`• Her ban yediğinizde ban kademeniz artar.\n• Ceza kademeniz ne kadar yüksekse kategoriye göre ceza süreniz değişir.\n\`\`\`yaml\nCeza Kademeniz: 1\`\`\``)
            .addFields({ name: `[Kategoriye Göre Yiyeceğiniz Cezalar]:`, value: `\`\`\`md\n[Kategori 1]:6 saat\n[Kategori 2]:24 saat\n[Kategori 3]:120 saat\n[Kategori 4]:260 saat\`\`\``})
            .setAuthor({ name: "Ceza Kademesi"})
            .setColor('GREEN');        
            interaction.reply({ embeds: [response], ephemeral: true  })
          }
        } catch (error) {
          console.error('Bir hata oluştu:', error);
        }       

        
    }
}