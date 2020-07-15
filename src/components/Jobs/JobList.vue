<template> 
<div class="mt-10">
        <v-progress-linear :active="loading" :indeterminate="loading" absolute   top  color="deep-purple accent-4"
      ></v-progress-linear>
  <v-data-table :headers="headers" :items="sawflags" dense  class="elevation-1" :search="search"
        :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
    <template v-slot:top >
        <v-toolbar flat dark dense color="blue darken-4">
            <v-toolbar-title>JOBS</v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
          <!-- <v-toolbar-title class="pr-4" >JOBS </v-toolbar-title> -->            
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

     <!--------------modal------------------->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="red" dark rounded small class="ml-2" v-on="on">New Job</v-btn>
          </template>
          <!----popup---------------->
          <v-card>
            <v-card-title class="headline grey lighten-2"><span class="headline" >{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-form class="px-3" ref="form">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.SJC_NO" label="SJC No" :rules="postRules"  type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.V6_ORDER_NO" label="V6 OrdNo" :rules="postRules"  type="number" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select single-line bottom label="Type"  class="select" 
                      v-model="editedItem.type"   :items="jobtypeoptions" item-text="label" item-value='value'
                    > </v-select>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CLIENT_NAME" label="Cust Name" :rules="fieldRules"  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.SITE_ADDRESS" label="Addr" :rules="fieldRules"  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.POSTCODE" label="Post Code" :rules="postRules"  type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                      <v-menu max-width="290">
                      <template v-slot:activator="{ on }">
                            <v-text-field :value="formattedDate" label="Due date" :rules="[(v) => !!v || 'required']"
                            prepend-icon="mdi-calendar-range" v-on="on" ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.DELIVERY_DATE" ></v-date-picker>
                    </v-menu>

                  <!--  <v-text-field v-model="editedItem.SJC_NO" label="Date"></v-text-field>  -->
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CONTACT" label="Contact" :rules="phoneRules"  type="number" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select single-line bottom label="User"  class="select" :rules="[(v) => !!v || 'required']"
                    required v-model="editedItem.field_user"   :items="useroptions"  item-text="label" item-value='value'
                    > </v-select>
                  </v-col>

                </v-row>
              </v-container>
              </v-form >
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
                <div v-if="dialogDelete === true">
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="remove">Delete</v-btn>
                </div>
                <div v-else-if="dialogDelete === false">
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--------------modal--------------->
        </v-toolbar>
    </template>
     
    <template v-slot:item.bom="{ item }" >
       <v-btn ripple x-small  color="blue" rounded dark >BOM</v-btn>
     </template>

    <template v-slot:item.pics="{ item }">
       <v-btn ripple x-small  color="red lighten-2" rounded dark >Pics</v-btn>
    </template>

    <template v-slot:item.c19="{ item }">
       <v-btn v-if="item.C19STATUS==1" ripple x-small  color="teal" rounded dark @click.prevent="c19fn(item)"  >C19</v-btn>
       <v-btn v-else ripple x-small  color="red lighten-2" rounded dark @click.prevent="c19fn(item)"  >C19</v-btn>
    </template>

    <template v-slot:item.t5="{ item }">
       <v-btn ripple x-small  color="red lighten-2 " rounded dark @click.prevent="t5fn(item)" >Tk5</v-btn>
    </template>

    <template v-slot:item.jc="{ item }">
       <v-btn ripple x-small  color="red lighten-2 " rounded dark >SJC</v-btn>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon medium color="blue darken-2" class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
      <v-icon medium color="red" @click="deleteItem(item)" >mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <div></div> <!----show nothing when no data -->
    </template>
  </v-data-table>
 </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import axios from "axios";
export default
{ 
    //props:{bb:Array},
    data() { return {dialog: false,search: '',dialogDelete: false, loading:false, //jobtypeoptions1:[],
          editedItem: { name: '', DELIVERY_DATE: '', type:'', field_user:'',  comment: '', 
          V6_ORDER_NO:'', SJC_NO:'',SITE_ADDRESS:'' , type:''},
      editedIndex: -1, sawflags:[],// inputRules:[v=>v.length>=3||'Min len is 3 chars'],
      typeOptions: [ "saw_schedules",  "optimised_bars", "optimised_cuts", "Flag" ],
          headers: [
             // { text: 'created_at', align: 'left', value: 'created_at'},
              { text: 'SJC No', align: 'left',  value: 'SJC_NO'},
               { text: 'V6 Ord', align: 'left',  value: 'V6_ORDER_NO'},
              { text: 'Type', align: 'left',  value: 'type1.type'},
              { text: 'User', align: 'left',  value: 'fuser.name'},
              { text: 'Cust Nam', align: 'left',  value: 'CLIENT_NAME'},
              { text: 'Address', align: 'left',  value: 'SITE_ADDRESS'},
              { text: 'Postcd', align: 'left',  value: 'POSTCODE'},
              { text: 'Contact', align: 'left',  value: 'CONTACT'},
              { text: 'Due Dt', align: 'left',  value: 'DELIVERY_DATE'},
             // { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              { text: 'BOM', align: 'left',  value: 'bom'},
              { text: 'Pics', value: 'pics',sortable: false },
              { text: 'C19', value: 'c19' ,sortable: false},
              { text: 'T5', value: 't5',sortable: false },
              { text: 'JC', value: 'jc', sortable: false },
              { text: 'Action', value: 'actions', sortable: false },
               { text: 'updated_at', align: 'left',  value: 'updated_at'},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
               { text: 'updated_by', align: 'left',  value: 'updatedby.name'},
            ],

        phoneRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >8) || 'Must be more than 8 digits '
         ],
         fieldRules: [ (v) => (v && v.length >2)|| 'Required & should be more than 2 chars ' ],
         postRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >2) || 'Must be more than 2 digits '
         ],
         fieldRules: [ (v) => (v && v.length >2)|| 'Required & should be more than 2 chars ' ],
    }
          },
  created(){ this.loading=true;
             this.$store.dispatch('getjobs')
                    .then((res) => { //this.loading=false;
                                console.log('getjobs response',res.data)  
                                this.sawflags=res.data;
                                this.loading=false;
                        })
        },
  methods: {  
        c19fn(x)
          { console.log('c19fn-item=',x)
            this.$store.dispatch('selectedsjc', x);
            this.$store.dispatch('getc19', x);
            this.$router.push({name: 'covid19'});
          },
        t5fn(x)
          { console.log('t5fn-item=',x)
            this.$store.dispatch('selectedsjc', x);
            this.$router.push({name: 'take5'});
          },
        
        editItem (item) 
        {  this.dialogDelete = false;
          console.log('edit-item',item)
          this.editedIndex = this.sawflags.indexOf(item); 
          console.log('editedIndex',this.editedIndex)
          this.editedItem = Object.assign({}, item); 
          //this.editedItem.field_user = item.fuser.name;
          console.log('editedItem',this.editedItem)
          //  this.editedItem=item;
          this.dialog = true
        },
         save () 
      {  //console.log('save-item=',item);
        if(this.$refs.form.validate())
        {
       if (this.editedIndex > -1) //save clicked when editing
                  {  console.log('edit',this.editedItem)
                    //edit api here
                    this.$store.dispatch('editjobs', this.editedItem) 
                        .then((response) => { 
                           this.$store.dispatch('getjobs')
                           .then((res) => { this.sawflags=res.data; })
                        })     
                        
                    } 
           //--------save clicked when adding new
        else {  console.log('add-item',this.editedItem)
                    //add new api here
                    this.$store.dispatch('addjobs', this.editedItem) 
                      .then((response) => {   this.$store.dispatch('getjobs')
                                                  .then((res) => { this.sawflags=res.data; })
                                          })     
              }
          this.close()
          } //validate loop
        },
        //--------------delete start----------------------------------------------------------
      deleteItem (item) {console.log('delete-pressed-item',item)
                       // const index = this.desserts.indexOf(item)
                        this.dialogDelete = true;
                        this.editedIndex = this.sawflags.indexOf(item);
                        this.editedItem = Object.assign({}, item);
                        this.dialog = true;
               //after this now press delete on dialogue box to execure below fn
              },
      remove() { console.log('remove()- editedIndex', this.editedIndex)
                  // delete api here
                  this.$store.dispatch('deljobs', this.editedItem)  
                                .then((response) => {   this.$store.dispatch('getjobs')
                                                  .then((res) => { this.sawflags=res.data; })
                                          })
                             
                 // this.dialogDelete = false;
                  this.close(); 
                },
      //-------------------------------delete finish-----------------
      //------------------close modal---------------------------
      close () {  
                  this.dialog = false; 
                  setTimeout(() => {  
                    this.editedItem = Object.assign({}, this.defaultItem)
                          this.editedIndex = -1 
                          this.dialogDelete = false;}, 100)
              },
        
          },
  computed: { 
          ...mapState({
        
            jobtypeoptions:state => state.jobs.jobtypeoptions,
             useroptions:state => state.user.useroptions,
        }),
      formattedDate(){return this.editedItem.DELIVERY_DATE ? format(parseISO(this.editedItem.DELIVERY_DATE),'do MMM yyyy') : ''},
      formTitle() {  if (this.dialogDelete) { return "Delete Flag";} 
                     else if (this.editedIndex === -1) { console.log('formtitle()-this.editindx(-1=new)',this.editedIndex);
                                        return "New Job"; }
                    else if (this.editedIndex > -1) { console.log('formtitle()--this.editindx(>1=edit)',this.editedIndex);
                                return "Edit Flag";  }  
                   },
          },
  watch: { dialog (val) { console.log('inside watch- dialog- val=',val)
                          val || this.close()  },    
            },
}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>