<template>
  <div class="home">
   <v-col>
     <v-text-field :rules="rules.name" @mouseover="tooltip=$t('what_is_your_project_name')" @mouseleave="tooltip=''"  background-color="#0C0C0D" class="black300t" color="#ffffff" flat dense solo :label="$t('project_name')" prepend-icon="mdi-card-text-outline">

     </v-text-field>
      <v-select
      
      background-color="#0C0C0D"
      class="black300t"
     
      prepend-icon="mdi-code-json"
      flat dense solo 
          :items="items"
          label="Language"
        ></v-select>

      <v-row class="pl-3">
       
       <v-icon class="black200t pr-3">mdi-folder-outline</v-icon> <v-chip :class="`${(selected)?'primary':'primary'}`"  @click="selectFolder()" > <label for="" id="caminho" @mouseover="tooltip=$('what_is_your_project_name')" @mouseleave="tooltip=''">{{project_folder}}</label></v-chip>
       
      </v-row>
      <v-divider class="mt-5 black600"  ></v-divider>
      <v-row>
         <v-subheader class="black200t">Database Connection</v-subheader>
      </v-row>
      <v-row>
        <v-col cols="6">
          
             <v-text-field @mouseover="tooltip='The name of the Server Host Ex: Localhost '" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t" value="http://127.0.0.1" color="#ffffff" flat dense solo label="Host" prepend-icon="mdi-domain"></v-text-field>
         
             <v-text-field @mouseover="tooltip='The name of the Database'" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t" color="#ffffff" flat dense solo label="Database" prepend-icon="mdi-database"></v-text-field>
        </v-col>
        <v-col cols="6">
             <v-text-field @mouseover="tooltip='The name of the Server User Ex: root '" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t" value="root" color="#ffffff" flat dense solo label="Server Username" prepend-icon="mdi-account"></v-text-field>
            <v-text-field  @mouseover="tooltip='The password of the Server : root '" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t" color="#ffffff" flat dense solo label="Server Password" prepend-icon="mdi-form-textbox-password"></v-text-field>

        </v-col>
      </v-row>
     
      <v-row>
         <v-col cols="6">
        <v-btn rooter to="/nodeEditor" small color="primary elevation-0">Start Project</v-btn>
         </v-col>
      </v-row>
   </v-col>

      <v-footer
      absolute
      class="font-weight-medium black500 black200t pa-0 px-3" color="#0C0C0D"
    > <v-icon class=" yellow100t">mdi-alert-box-outline</v-icon> <v-subheader class="pa-0 ma-0 black200t">{{tooltip}}</v-subheader>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src 
import i18n from '../i18n';
const {ipcRenderer} = require("electron");
import Vue from 'vue';

// eslint-disable-next-line no-unused-vars
ipcRenderer.on('selectFolder-result', (event, arg) => {
  if(arg == "" || arg == null){
     home.methods.setProjectFolder(i18n.t('what_is_your_project_name')) 
     return
  }

   home.methods.setProjectFolder(arg) 
 
})

const home = {
  name: "Home",
  components: {
 
  },
  data(){
    return{
      items:['Php','Php/Laravel'],
      project_folder: i18n.t('what_is_your_project_name'),
      selected:false,
      tooltip:"",
      rules: {
          
          name: [val => (val || '' ).length > 0 || 'This field is required', val =>(val|| "").split(' ').length<=1||"Remove the blank Space or replace it with _"],
        },
    }
  },
  methods:{
    selectFolder(){
      ipcRenderer.send("selectFolder","hello!")
    },
    setProjectFolder:function(path){
     
      this.project_folder = path
      document.getElementById("caminho").innerText = path
      console.log( this.project_folder);
    },
    openNodeWindow(){
        ipcRenderer.send("startProject","hello!")
    }
  
  },
  watch: {
    project_folder: function (val) {
      alert(val)
    },
  
  }
};

export default home;
</script>

<style lang="scss" scoped>

/* .v-text-field.v-text-field--solo .v-input__control input {
   color: rgb(67, 67, 145) ;
} */
.v-divider{
  border-width: 1px;
}

</style>
