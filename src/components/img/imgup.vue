<template>
    <div class="container">
<v-file-input
      v-model="files"
      small-chips
      show-size
      multiple
      clearable
      @change="inputChanged"
    >
      <template v-slot:selection="{ text, index, file }">
        <v-chip
          small
          text-color="white"
          color="#295671"
          close
          @click:close="remove(index)"
        >
          {{ text }}
        </v-chip>
      </template>
      
    </v-file-input>
    <div v-show="previews.length">
        <h5>preview</h5>
       <!-- {{previews.length}} -->
       <v-layout row>
        <div v-for="(image, index) in previews" :key="index">
            <v-flex>
                <img :src="image" height="50"> <br>
                <v-chip><span class="name" v-text="files[index].name"></span>-
                                  <span class="size" v-text="getFileSize(files[index].size)"></span>
                </v-chip>
            </v-flex>
        </div>
       </v-layout>
    </div>
    <div class="py-3">
        <v-btn>Upload all</v-btn>
    </div>
  </div>
</template>
<script>
export default {
   data: () => ({
    files: [],images: [], previews : []
  }),
  methods: {
    remove (index) {
      this.files.splice(index, 1)
      this.previews.splice(index, 1)
    },
   // inputChanged () {
    //  console.log(this.files)
   // },
   inputChanged(e) {  //const files = e.target.files;
   console.log(e)
    console.log('files selected-',this.files)
    //this.previews = [];
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
  }  
}
</script>