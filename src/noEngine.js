
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
        getFilesByExtention:async function getFiles(startPath,filter, withDir= true,  _callback = function(){}){
            window.Nos.isLoading(true)
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
                    if (stat.isDirectory() && withDir){
                        results = results.concat(getFiles(filename,filter)); //recurse
                    }
                    else if (filename.indexOf(filter)>=0) {
                       // console.log('#-> Found: ',filename);
                        results.push(filename);
                    }
                }
               
                window.Nos.isLoading(false)
                _callback(results);
                return results;

            },
        isLoading:(valor)=>{
            window.eventBus.$emit('loading', valor);
        },
        compile:async ()=>{
          window.Nos.getFilesByExtention('C:/Users/filip/Documents/myFirstNoProject','.nos',false,(result)=>{
            window.Nos.readFile(result[0],(dados)=>{
                window.Nos.toBinary(dados);
            })
          })
        },
        /* FUncao para ler arquivo */
        readFile:(path,_callback=function(){})=>{
                var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
                fs.readFile(path, 'utf-8', (err, data) => {
                    // console.log("lendoArquivo " + path);
                    if(err){
                        // console.log("Hove um erro");
                        Vue.toasted.show("An error ocurred reading the file :" + err.message, {
                            position: 'bottom-right',
                            type:'error',
                            duration: 2000
                        })
                        // alert();
                        return;
                    }
                    _callback(data);
                });
        },
        /* Funcao para converter codigo nos para  */
        toBinary:(nosCode)=>{

            
            
            var newVal = nosCode.replace(/^\s*[\r\n]/gm, '\n');
            let nosCoreCode = [];
            var code = newVal.split('\n');
            for (let i = 0; i < code.length; i++) {
                if(code[i].includes('function')){
                    /* COndigo para as funcoes */
                    var functioname;
                    let codeFunction;
/* Pegando o nome da funcao */
                    try {
                        var el = code[i].split('function')[1]
                        
                        if(el !== undefined || el!== null || el !=="undefined")
                        functioname  = el.replace('{','').replace('}','').trim()
                       } catch (error) {
                            console.log("Erro! " + error)
                    }
                    // Pegando os valores da funcao
                        let tmp = []
                        let lastIndex = 0;
                        for (let tmpI = i+1; tmpI < code.length; tmpI++) {
                            if(!code[tmpI].includes('}'))
                            tmp.push(code[tmpI])
                            if(code[tmpI].includes('}')){
                                lastIndex = tmpI
                                break
                            }
                        }
                         let nv = code[i]/* .replace('{','').replace('}','') */
                         /* console.log(code)
                         console.log(code.indexOf('}')) */
                       /*   console.log(tmp);
                         console.log("++++++++++++++++++++++++++++++++++++++") */
                         if(!nv.includes('}')|| !nv.includes('{')){
                            codeFunction = (nv)
                         }
                         let subel=[];
                         tmp.forEach(cm=>{
                             if(cm.indexOf(':') > -1){
                                /*  console.log( cm.split(':')[0]) */
                                 let label = cm.split(':')[0].trimStart().trimEnd()
                                 window.Nos.dicionario(cm.split(':')[0].trim(),(valor)=>{
                                     subel.push({label:label, type: valor,value:cm.split(':')[1].trim().replace('.','')})
                                 }) 
                             }else{
                                 let label = cm.trimStart().trimEnd().split(' ')[0]
                                 let name = cm.trimStart().trimEnd().split(' ')[1]
                                  window.Nos.dicionario(label.trim(),(valor)=>{
                                     subel.push({label:name, type: label ,value:""})
                                 }) 
                             }
                         })
                         nosCoreCode.push({label:functioname, type:"function", value:subel})

                    i = lastIndex;

                }else{
                    let subel=[];
               
                   let cm = code[i]
                   
                       console.log(cm)
                        if(cm.indexOf(':') > -1){
                           /*  console.log( cm.split(':')[0]) */
                            let label = cm.split(':')[0].trimStart().trimEnd()
                            window.Nos.dicionario(cm.split(':')[0].trim(),(valor)=>{
                                nosCoreCode.push({label:label, type: valor,value:cm.split(':')[1].trim().replace('.','')})
                            }) 
                           
                        }else{
                           
                            let label = cm.trimStart().trimEnd().split(' ')[0]
                            let name = cm.trimStart().trimEnd().split(' ')[1]
                             window.Nos.dicionario(label.trim(),(valor)=>{
                                
                                nosCoreCode.push({label:name, type: label ,value:""})
                            }) 
                           
                        }
                      
                    
    
                  /*   nosCoreCode.push({label:functioname, type:window.Nos.dicionario(), value:subel}) */

                   /*  console.log(i.toString() + " " + code[i]); */

                }
                
            }
     
            
             console.log(JSON.stringify(nosCoreCode))

        },
        dicionario:(palavra, _callback = function(){})=>{
            let palavrasReservadas = [{"read":"internalFunction"},{"show":"internalFunction"},{"var":"var"},{"use":"injection"},{"add":"internalFunction"}]
           
           
            palavrasReservadas.forEach(element => {

                var keys = Object.keys(element);
                var value = Object.values(element);
               /*  console.log( keys[ 0 ] ); */
             /*    console.log( palavra +"=="+ keys[ 0 ] ); */
                if( palavra == keys[ 0 ] ){
                    _callback(value[ 0 ])
                    return 

                }
                
            
            });
           

           /*  return palavrasReservadas[palavra]; */

        }

        
    }



})(window);