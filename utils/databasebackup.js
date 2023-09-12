import fs from 'fs';

export default (arg) => {
    
    
    let errorStatus = "false"


    if(arg === "roombandata"){

      fs.readFile("./database/roombandata.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            errorStatus = "true"    
        }
        if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
        let jsonbackupcntrll
        let jsonData
        try{
            jsonData = JSON.parse(data)            
            jsonbackupcntrll = true
        } catch (error) {                      
            jsonbackupcntrll = false
        }

        if(jsonbackupcntrll) {
            fs.readFile('./database/roombandata.json', 'utf8', (err, data) => {
                if (err) {
                  console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                  return;
                }
              
                fs.writeFile('./database/roombandatabackup.json', data, 'utf8', (err) => {
                  if (err) {
                    console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                    return;
                  }
                  console.log('Gerçek dosya başarıyla yedeklendi.');
                });
              });
        } 
        else {
            console.log('data parsellere ayırılamadı.');
        }    
    });

    }

    if(arg === "mutedata"){

      fs.readFile("./database/mutedata.json", 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okuma hatası:', err);
            errorStatus = "true"    
        }
        if(errorStatus === "true") return console.log("Data okunurken hata çıktı.") 
        let jsonbackupcntrll
        let jsonData
        try{
            jsonData = JSON.parse(data)            
            jsonbackupcntrll = true
        } catch (error) {                      
            jsonbackupcntrll = false
        }

        if(jsonbackupcntrll) {
            fs.readFile('./database/mutedata.json', 'utf8', (err, data) => {
                if (err) {
                  console.error('Gerçek dosya okunurken bir hata oluştu:', err);
                  return;
                }
              
                fs.writeFile('./database/mutedatabackup.json', data, 'utf8', (err) => {
                  if (err) {
                    console.error('Gerçek dosya yazılırken bir hata oluştu:', err);
                    return;
                  }
                  console.log('Gerçek dosya başarıyla yedeklendi.');
                });
              });
        } 
        else {
            console.log('data parsellere ayırılamadı.');
        }    
    });

    }

}