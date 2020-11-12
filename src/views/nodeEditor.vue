<template>
 <v-container   style="height:100%;" class="pa-0 ma-0">
     
     <v-row class=" pa-0 ma-0   d-flex align-stretch" style="height:100%;">
          <v-col cols="1" class="pa-0 ma-0" style="max-width:30px; padding-left:10px;">
             <v-btn flat icon color="primary"  @click="drawer = !drawer">
                 <v-icon>mdi-hammer-screwdriver</v-icon>
             </v-btn>
          </v-col>
      <v-col cols="11" class="pa-0 ma-0 ">
         <!--   <v-btn flat router to="/" color="primary">text</v-btn>
            <v-btn @click="addNode()" color="primary">Add Node</v-btn>
            <h1>Node Editor</h1> -->
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
                <p id="debug"> {{this.data}}</p>
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

      </v-col>
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
import 'prismjs'
import 'prismjs/themes/prism-coldark-dark.css'
import Prism from  'vue-prism-component'


export default {

    components: {
    SimpleFlowchart,
    Prism
  },
  data() {
    return {
        drawer: true,
         tab: null,
        nodeCounts:1,
         sideMenuItens: [
          { title: 'Query', item: [{title:'Select'},{title:'Delete'},{title:'Update'},{title:'Insert'}] },
          { title: 'Conditions', item: [{title:'If'},{title:'Swich'}] },
          { title: 'Repetition', item: [{title:'For'},{title:'While'},{title:'doWhile'},{title:'Foreach'}] },
          { title: 'Columns', item: [{title:'User'},{title:'Password'},{title:'Email'},{title:'Status'}] },
          { title: 'Variables', item: [{title:'User'},{title:'Password'},{title:'Email'},{title:'Status'}] },
        
        ],
        showMenu: false,
            x: 0,
            y: 0,
            items: [
                { title: 'Talbe', node:{id:0, x:0, y:0, type:"terminator",label:"Utilizadores"}},
                { title: 'Row', node:{id:0, x:0, y:0, type:"manual_input",label:"Utilizadores1"} },
                { title: 'Select', node:{id:0, x:0, y:0, type:"process",label:"Utilizadores2"} },
                {title: 'Insert', node:{id:0, x:0, y:0, type:"display",label:"Utilizadores3"} },
                {title: 'Where', node:{id:0, x:0, y:0, type:"decision",label:"Utilizadores4"} },
                {title: 'Preparation', node:{id:0, x:0, y:0, type:"preparation",label:"Utilizadores4"} },
                {title: 'Pre Process', node:{id:0, x:0, y:0, type:"predefined_process",label:"Utilizadores4"} },
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
    addNode:function(node){

        this.nodeCounts +=1;
         var n = {id:  this.nodeCounts, label: node['label'], x: node['x'], y:node['y'], type:node['type']}
        this.data.nodes.push(n); 


        
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
},
/* 
watch: {
    data: function (val) {
     console.log("Changed " + val)
    }
   
  } */

}
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