<template>
 <v-container   style="height:100%;" class="pa-0 ma-0">
     
     <v-row class=" pa-0 ma-0   d-flex align-stretch" style="height:100%;">
          <v-col cols="2" class="pa-0 ma-0" style="max-width:40px; padding-left:10px;">
             <v-btn v-for="(item, i) in sideMenu2Item" :key="i" flat icon color="primary"  @click="item.function()">
                 <v-icon>{{item.icon}}</v-icon>
             </v-btn>
          </v-col>
    <v-row cols="11" class="pa-0 ma-0 ">
         <!--   <v-btn flat router to="/" color="primary">text</v-btn>
            <v-btn @click="addNode()" color="primary">Add Node</v-btn>
            <h1>Node Editor</h1> -->
    <v-col cols="10" lg="9" sm="8" class="pa-0 ma-0">
        
        <v-tabs
        v-model="tab"
        background-color="#131414"
        left
        show-arrows
        dark
        icons
        color="grey"
        >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
            Node Editor
            <v-icon class="ml-2">mdi-family-tree</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
            Code Preview
            <v-icon  class="ml-2">mdi-code-json</v-icon>
        </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab" style="height:87%;" class="black500 pa-0 ma-0" >
            <v-tab-item
            value="tab-1"
            style="height:100%;"
            class="black500 pa-0 ma-0"
            >

            
                <v-col style="height:100%;" class="pa-0 ma-0">

            
                    <v-card
                        :ripple="false" 
                        @contextmenu="show"
                        style="height:100%;"
                        class="pa-0 ma-0"
                        color="#000000"
                        elevation="0"
                    >
                    <simple-flowchart @contextmenu="show" :scene.sync="data" class="black100"  style="height:100%; background-image:url(../img/grid.png) !important;"></simple-flowchart>
                    <!-- <p id="debug"> {{this.data}}</p> -->
                    </v-card>
                </v-col>
            
            <!-- Code Preview -->
        </v-tab-item >
            <v-tab-item value="tab-2" style="height:100%;" class="black500" >
                <v-card flat  style="max-height:90vh !important; overflow:auto;" class="black500 pa-0 ma-0" >
                    <Prism  class="codePreview" language="javascript" style="max-height:100%;">
                    
                        {{this.data}}
                    </Prism>

                
                </v-card>
        </v-tab-item>
        </v-tabs-items>

        
    </v-col>
    <v-col cols="2" lg="3" sm="4" class="pa-0 ma-0">
        <n-properties></n-properties>
    </v-col>
                
      <Definicoes v-on:addplugin="addAddExtensions($event)" v-on:closeSettings="toggleSettings()" :dialog="this.settings"></Definicoes>    

        <!-- MENU DE CONTESTO / CONTEXT MENU -->
            <v-menu
            @mouseleave="showMenu = !showMenu"
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
           disable-keys
            >
            <v-list  class="black400">
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                
                >
                <v-list-item-title>
                    <v-btn  @click="addNode(item.node)" elevation-1 small color="primary">{{ item.title }}</v-btn>
                </v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>

        <!-- SIDE BAR MENU -->

      </v-row>
     </v-row>
     
 <v-navigation-drawer
      v-model="drawer"
    
    class="black400"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="black100t">mdi-hammer-screwdriver</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="black100t">ToolBox</v-list-item-title>
        </v-list-item-content>
         <v-list-item-avatar>
              <v-btn flat icon color="primary"  >
                   <v-icon class="black100t">mdi-plus-box-multiple</v-icon>
             </v-btn>
        
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-expansion-panels >
        <v-expansion-panel
      class="black400"

        v-for="menu in sideMenuItens" :key="menu.title"
        >
        <v-expansion-panel-header class="black100t">
            {{menu.title}}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="black500">
          
            <v-list dense>
                <v-list-item
                v-for="item in menu.item"
                :key="item.title"
                link
                >

                <v-col class="pa-0 ma-0">
                    <v-row>
                    <v-list-item-icon>
                    <v-badge
                        dot
                        offset-x="-10"
                        offset-y="15"
                        color="primary"
                    ></v-badge>
                       <!--  <v-icon class="black100t">{{ item.icon }}</v-icon> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="black100t">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    </v-row>
                    <v-divider></v-divider>
                </v-col>
                
                </v-list-item>
            </v-list>
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    </v-navigation-drawer>

  
        
    
 </v-container>
</template>

<script>


import SimpleFlowchart from '../components/simpleFlowChart/SimpleFlowchart.vue'
import Definicoes from '../components/settings'
import propertiePanel from '../components/propertiePanel'
import 'prismjs'
import 'prismjs/themes/prism-coldark-dark.css'
import Prism from  'vue-prism-component'
import router from "../router";
import { ipcRenderer } from 'electron'
import LoadScript from 'vue-plugin-load-script';

ipcRenderer.on('addPlugin',(ev, args)=>{
    console.log(args);
    alert('PluginCarregado!!');
    vm.methods.addAddExtensions(args);
})

var vm = {

    components: {
    SimpleFlowchart,
    Prism,
    Definicoes,
    "n-properties":propertiePanel
  },
  data() {
    return {
        drawer: true,
         tab: null,
        nodeCounts:1,
        settings:false,
         sideMenuItens: [
          { title: 'Query', item: [{title:'Select'},{title:'Delete'},{title:'Update'},{title:'Insert'}] },
          { title: 'Conditions', item: [{title:'If'},{title:'Swich'}] },
          { title: 'Repetition', item: [{title:'For'},{title:'While'},{title:'doWhile'},{title:'Foreach'}] },
          { title: 'Columns', item: [{title:'User'},{title:'Password'},{title:'Email'},{title:'Status'}] },
          { title: 'Variables', item: [{title:'User'},{title:'Password'},{title:'Email'},{title:'Status'}] },
        
        ],
        sideMenu2Item:[
            {title:'Assets', icon:'mdi-hammer-screwdriver', function:(args = null)=>{
               this.drawer = !this.drawer;
            }},
            {title:'Plugins / Extensions', icon:'mdi-puzzle-outline', function:(args = null)=>{
               ipcRenderer.send('loadPlugin');
            }},
            {title:'New Project', icon:'mdi-file-code-outline', function:(args = null)=>{
                router.push({ path: '/' });
            },},
            {title:'New Project', icon:'mdi-cog-outline', function:(args = null)=>{
                //ipcRenderer.send('settings')
                this.settings = !this.settings

                console.log(this.settings)
               
            },},
            {title:'', icon:'mdi-file-code-outline', function:(args = null)=>{
               // In the main process.
                    const {BrowserWindow} = require('electron').remote
                    
                    // Or use `remote` from the renderer process.
                    // const {BrowserWindow} = require('electron').remote
                    
                    let win = new BrowserWindow({width: 800, height: 600})
                    win.on('closed', () => {
                        win = null
                    })
                    
                    // Load a remote URL
                    win.loadURL('http://localhost/api')
                    
                    // Or load a local HTML file
                    // win.loadURL(`file://${__dirname}/app/index.html`)
            },},
        ],
        showMenu: false,
            x: 0,
            y: 0,
            items: [
                {title: 'Start', node:{id:0, x:0, y:0, type:"terminator",label:"Utilizadores",value:{var:"nome"}}},
                {title: 'Read', node:{id:0, x:0, y:0, type:"manual_input",label:"Utilizadores1", value:{}} },
                {title: 'Select', node:{id:0, x:0, y:0, type:"process",label:"Utilizadores2"}, value:{} },
                {title: 'Show', node:{id:0, x:0, y:0, type:"display",label:"Utilizadores3", value:{}}},
                {title: 'if', node:{id:0, x:0, y:0, type:"decision",label:"Utilizadores4", value:{}} },
                {title: 'Preparation', node:{id:0, x:0, y:0, type:"preparation",label:"Utilizadores4", value:{}} },
                {title: 'Pre Process', node:{id:0, x:0, y:0, type:"predefined_process",label:"Utilizadores4",value:{}} },
            ],
        data: {
            
                centerX: 614,
                centerY: 140,
                scale: 1,
                nodes: [
                 
                    ],
                    links: [
                   /*  {
                        id: 3,
                        from: 2, // node id the link start
                        to: 4,  // node id the link end
                    } */
                ]
        },
        
    };
},
methods:{
    toggleSettings:function(){
            this.settings = !this.settings
    },
    addAddExtensions:function(d){
        
         if(d == null || d == ''){
            
        return
        }else{
            var fs = require('fs');
            let fn =  fs.readFileSync( "C:/Users/filip/Documents/teste.nosx", 'utf-8', (err, data) => {
                        if(err){
                            return;
                        }
                        return data
                    });

            if(typeof d.function == "string"){
                var newMenuItem = {title: d.title, icon: d.icon, function: Function(fn)}
                /* d.function = new Function(d.function.split('('), "b", "return a + b"); */

                
            }
             console.log(newMenuItem)
             this.sideMenu2Item.push(newMenuItem)
             console.log(this.sideMenu2Item)
            this.$toasted.show('Plugin ' + newMenuItem.title + ' foi adicionado',  {
                                                                    type : 'alert',
                                                                    icon : 'mdi-alert',
                                                                    position:'bottom-right',
                                                                    action : {
                                                                        text : 'Cancel',
                                                                        onClick : (e, toastObject) => {
                                                                            toastObject.goAway(0);
                                                                        },
                                                                    
                                                                        className:'toast'
                                                                    }, duration:1000});
      }
    },
  
    addNode:function(node){
        if(node == null || node == ''){
            
        return
        }else{
            console.log(node)
            this.nodeCounts +=1;
            var n = {id:  this.nodeCounts, label: node['label'], x: node['x'], y:node['y'], type:node['type'],value:node['value']}
            this.data.nodes.push(n); 
            this.$toasted.show('No ' + node['label'] + ' foi adicionado',  {
                                                                    type : 'info',
                                                                    icon : 'mdi-alert',
                                                                    position:'bottom-right',
                                                                    action : {
                                                                        text : 'Cancel',
                                                                        onClick : (e, toastObject) => {
                                                                            toastObject.goAway(0);
                                                                        },
                                                                    
                                                                        className:'toast'
                                                                    }, duration:1000});
            return;
        }

        


        
    },
    show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
    mounted:function(){
        window.eventBus.on('nodeSelected',val=>{
            console.log("selected")
            console.log(val)
        })
    }
},

}
export default vm;
</script>

<style >
.flowchart-container{
    background: #0C0C0D !important;
}

.node-port.node-output{
    background: yellow;
}

*::-webkit-scrollbar {
    width: 8px;
}
 
*::-webkit-scrollbar-track {
     background: #0000009f;
  /*   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.535);  */
   /*  border-radius: 10px; */
}
 
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #4343FE;
    -webkit-box-shadow: inset 0 0 6px #4343FE; 
}

</style>