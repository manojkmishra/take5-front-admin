<template> 
<div class="mt-10">
  <v-data-table :headers="headers" :items="bb"   class="elevation-1" :search="search"
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
            <v-card-title><span class="headline" >{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.comment" label="Comments"></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="12" md="4">
                    <v-text-field v-model="editedItem.red" label="red"></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="12" md="4">
                    <v-text-field v-model="editedItem.green" label="green"></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="12" md="4">
                    <v-text-field v-model="editedItem.blue" label="blue"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
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
 <!--
    <template v-slot:item.status_id="{ item }" >
       <v-btn ripple small v-if="item.status_id =='9'"  color="red lighten-2" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="blue lighten-3" rounded dark :loading="loading"   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
    </template>
    <template v-slot:item.flag="{ item }">
        <v-icon small > mdi-flag-outline </v-icon>
    </template>
-->
        </v-toolbar>
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
import axios from "axios";
export default
{  computed: 
   {  ...mapState({ //sawbars: state => state.sawtables.sawbars, 
              }),
            },
    props:{bb:Array},
    data() { return {dialog: false,search: '',dialogDelete: false, loading:false,
          editedItem: { name: '', red: '', green:'', blue:'',  comment: '',   },
      editedIndex: -1,
      typeOptions: [ "saw_schedules",  "optimised_bars", "optimised_cuts", "Flag" ],
          headers: [
              { text: 'created_at', align: 'left', value: 'created_at'},
              { text: 'updated_at', align: 'left',  value: 'updated_at'},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
             //  { text: 'updated_by', align: 'left',  value: 'updatedby.name'},
              { text: 'V6 Ord', align: 'left',  value: 'V6_ORDER_NO'},
              { text: 'SJC No', align: 'left',  value: 'SJC_NO'},
              { text: 'Type', align: 'left',  value: ''},
              { text: 'Address', align: 'left',  value: 'SITE_ADDRESS'},
               { text: 'Contact', align: 'left',  value: 'CONTACT'},
              { text: 'Date', align: 'left',  value: 'DELIVERY_DATE'},
             // { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              { text: 'BOM', align: 'left',  value: 'cut_saw'},
              { text: 'Pics', value: 'quote_ID',sortable: false },
              { text: 'C19', value: 'order_ID' ,sortable: false},
              { text: 'T5', value: 'cut_time',sortable: false },
              { text: 'JC', value: 'status_id', sortable: false },
              { text: 'Action', value: 'actions', sortable: false },
            ],
            }
          },
  methods: {  
          editItem (item) {  this.dialogDelete = false;
        console.log('edit-item',item)
        this.editedIndex = this.sawflags.indexOf(item); console.log('editedIndex',this.editedIndex)
        this.editedItem = Object.assign({}, item); console.log('editedItem',this.editedItem)
      //  this.editedItem=item;
        this.dialog = true
        },
         save () 
      {  //console.log('save-item=',item);
        if (this.editedIndex > -1) //save clicked when editing
                  {  console.log('edit',this.editedItem)
                    //edit api here
                    this.$store.dispatch('editflag', this.editedItem) 
                        .then((response) => {})     .catch((error) => {});
                    } 
           //--------save clicked when adding new
        else {  console.log('add-item',this.editedItem)
                    //add new api here
                    this.$store.dispatch('addflag', this.editedItem) 
                      .then((response) => {})     .catch((error) => {});
            }
                this.close()
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
                  this.$store.dispatch('deleteflag', this.editedItem)  
                                .then((response) => {})
                                .catch((error) => {});
                             
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
</style>