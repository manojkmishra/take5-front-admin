<template>
    <div class="container">
      <v-row no-gutters justify="center" align="center">
         <v-col cols="12">
            <v-file-input v-model="files" small-chips  show-size  multiple clearable @change="inputChanged">
                  <template v-slot:selection="{ text, index, file }">
                    <v-chip  small text-color="white" color="#295671" close @click:close="remove(index)">
                      {{ text }}
                    </v-chip>
                  </template>
                  
            </v-file-input>
        </v-col>
     </v-row>
     <v-row>
      <v-col cols="12" class="pr-5">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
      </v-row>
    <div v-show="previews.length">
        <h5>preview</h5>
       <!-- {{previews.length}} -->
       <v-layout row>
        <div v-for="(image, index) in previews" :key="index">
            <v-flex>
                <img :src="image" height="200" width="200"> 
                <br>
                <v-chip close
                            @click:close="remove(index)"><span class="name" v-text="files[index].name"></span>-
                        <span class="size"  v-text="getFileSize(files[index].size)" ></span>
                        <span ></span>
                </v-chip>
            </v-flex>
        </div>
       </v-layout>

    </div>
   <hr>
    <div v-show="getpic.length">
       <v-layout row>
        <div v-for="(image, index) in getpic" :key="index">
            <v-col cols="12" sm="3" md="3">>
            
                <img :src="`http://localhost:8000${image.picname}`" height="200" width="200"
                > <br>
                  {{image.picname}}
            </v-col>
        </div>
       </v-layout>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapState, mapActions} from 'vuex';
export default {
    computed: 
      { 
        ...mapState({ selectedsjc: state => state.jobs.selectedsjc, 
                      user: state => state.auth.user,    
                      getpic: state => state.jobs.getpic, 
                    }),
        savedimages(){
            if(this.selectedsjc.PICS && this.selectedsjc.PICS !=null)
            console.log('computed savedimages',this.selectedsjc.PICS)
            var xx=JSON.parse(this.selectedsjc.PICS)
            return xx;
        }
      },
   data: () => ({
    files: [],images: [], previews : [],ress:[],formd:{id:''}
  }),
  methods: {
    
    remove (index) {
      this.files.splice(index, 1)
      this.previews.splice(index, 1)
    },
   // inputChanged () {
    //  console.log(this.files)
   // },
   inputChanged(e) { // this.files = e.target.files;
   console.log(e)
    console.log('files selected-',this.files)
    this.previews = [];
    this.files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => this.previews.push(e.target.result);
                        reader.readAsDataURL(file);
    });
    console.log('previews=',this.previews)
    console.log('previews len=',this.previews.length)
    console.log('files len=',this.files.length)

                        },
            getFileSize(size) { const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
                            let i = 0;
                            while(size > 900) { size /= 1024; i++; }
                            return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
                          },
//--------------------------------
       async upload(){
                    const formData = new FormData();
                    formData.append('sjcid',this.selectedsjc.id);
                    // const sjcid=this.selectedsjc.id;
                    
                    this.files.forEach(file => 
                    {    formData.append('images[]', file, file.name);   });
                    console.log('upload this.files=',this.files)
                    console.log('upload triggered FormData=',formData)
                   // resp=axios.post('http://127.0.0.1:8000/sendemail1',this.formData); 
                    await axios.post('http://127.0.0.1:8000/api/take5/imagesupload', formData,
                   // axios.post('http://54.79.50.225/api/take5/imagesupload', formData,
                                { //onUploadProgress:uploadEvent=>{ this.progress=Math.round(uploadEvent.loaded/uploadEvent.total*100);
                                   //     console.log('upld prges:'+ Math.round(uploadEvent.loaded/uploadEvent.total*100)+'%')
                                   // }
                                })
                    //axios.post('https://uat.oms.dowell.com.au/api/imagesupload', formData)
                        .then(response => {
                          this.formd.id=this.selectedsjc.id;
                         // let id=this.selectedsjc.id;
                          this.$store.dispatch('getpic', this.formd) 
                         // this.$store.dispatch('getpic', x);
                        //  this.getpic=response.data;
                        //  console.log('all images uploaded',this.ress)

                            this.images = [];
                            this.files = [];
                            this.previews = [];
                           // this.progress = 0;
                            })
                        .catch((e) => {
                                    console.log('images error',e)
                                  //  this.$toastr.e('Could not upload the files!');
                                    this.images = [];
                                    this.files = [];
                                    this.previews = [];
                                    //this.progress = 0;
                                    });

    },

  }  
}
</script>