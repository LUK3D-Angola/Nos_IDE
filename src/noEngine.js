
import Vue from 'vue'
(function (window) {
    window.Nos = {
        log: function () {
            console.log('Mensagem do nos');
        },
        /* Funcao para carregar arquivos .nosx */
        loadPlugin: async function () {
            const {dialog} = require('electron').remote
            let files = await dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [{
                        name: '{Nos} Extensions',
                        extensions: ['nosx', 'nosex', 'nos']
                    },
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ]
            }).then(result => {
                return result
            }).catch(err => {
                return err
            })
            files.filePaths.forEach((element, i) => {
                 this.installPlugin(element)

                Vue.toasted.show(element.toString().split('\\')[element.toString().split('\\').length - 1], {
                    position: 'bottom-right',
                    duration: 2000 + (i * 200)
                })
            });
            return files

        },
        installPlugin:async function(path){

            var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

            fs.readFileSync(path, 'utf-8', (err, data) => {
                if(err){

                    Vue.toasted.show("An error ocurred reading the file :" + err.message, {
                        position: 'bottom-right',
                        type:'error',
                        duration: 2000
                    })
                    // alert();
                    return;
                }
                // Change how to handle the file content
                let menus = JSON.parse(localStorage.salvos)
                

               return menus
            });


        },
        exportPlugin:async function(){
           let val =  {title:'Filas', icon:'mdi-code-brackets', function:"function(args = null){console.log(\"Estou ViVO!!!!\")}"}

             localStorage.salvos = JSON.stringify(val);

             Vue.toasted.show("Plugin Salvo com sucesso!", {
                position: 'bottom-right',
                type:'info',
                duration: 2000
            })
        },
        /* Esta funcção procura por  Arquivos de uma determinada extencao dentro de pastas*/
        getFilesByExtentio:async function getFiles(startPath,filter){

            window.Nos.isLoading(true)

            

            setTimeout(() => {


                var path = require('path'), 
                fs   = require('fs');
                var results = [];
                
                if (!fs.existsSync(startPath)){
                    console.log("no dir ",startPath);
                    return;
                }
                var files=fs.readdirSync(startPath);
                for(var i=0;i<files.length;i++){
                    var filename=path.join(startPath,files[i]);
                    var stat = fs.lstatSync(filename);
                    if (stat.isDirectory()){
                        results = results.concat(getFiles(filename,filter)); //recurse
                    }
                    else if (filename.indexOf(filter)>=0) {
                        console.log('#-> Found: ',filename);
                        results.push(filename);
                    }
                }

               
                window.Nos.isLoading(false)
                return results;
                
            }, 3000);

           

            },
        isLoading:(valor)=>{
            window.eventBus.$emit('loading', valor);
        }
        
    }



})(window);