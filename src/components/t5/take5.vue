<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex  xs12 md8>
        <v-card color="grey lighten-4">
            <v-app-bar  dark  color="blue darken-4" text-center >
                <v-avatar  color=""><img src="@/assets/img/Take5-2.png"></v-avatar>
                <v-icon class="mr-2">mdi-coronavirus</v-icon>
                <v-toolbar-title >TAKE 5 - FOR SAFETY</v-toolbar-title>
            </v-app-bar>

            <!--
            <p class="mt-10 mx-4">
                We value the safety of our staff, customers and all whom visit our site. Dowell is obligated the follow the Australian Government guidelines, assessing any exposure to the Covid-19 virus.
            </p>-->
            <p class="my-5 mx-4">Please complete take 5 safety checklist below.  </p> 

<!----------    main form  =========================          ----------->
<v-form ref="loginForm" :value="formValid">
    <v-container py-0>
<!-------- task details table======  ------->
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Task Details</v-toolbar-title>
    </v-toolbar>
<v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr><td>Client</td> <td>{{selectedsjc.CLIENT_NAME }}</td> </tr>
        <tr><td>Site</td> <td>{{selectedsjc.SITE_ADDRESS }}</td>  </tr>
        <tr><td>Date</td> <td>{{selectedsjc.DELIVERY_DATE }}</td>  </tr>
        <tr><td>Task</td> <td><v-text-field class="purple-input" label="Describe Task..."/> </td>  </tr>
      </tbody>
    </template>
  </v-simple-table>
  <!-------pre-task checks table  ----->
  <div class="aaa"></div>
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Pre-Task Cheks</v-toolbar-title>
    </v-toolbar>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Please read the statements & tick the appropriate response <span class="star">*</span> </th>
          <th class="text-left">Yes</th> <th class="text-left">No</th>  <th class="text-left">NA</th>
        </tr>
      </thead>
      <tbody>
        <tr class="rowht">
          <td>Am I fit to do the task?</td>
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td class="pr-5">Do I clearly understand the task?</td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Am I authorised/ competent to do the task? </td>
          <td><v-radio-group v-model="rad.rad3" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad3" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad3" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Do I have the correct PPE & tools for the task? </td>
          <td><v-radio-group v-model="rad.rad4" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad4" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad4" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I done all pre-start checks on equipment </td>
          <td><v-radio-group v-model="rad.rad5" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad5" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad5" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I identified, isolated & tagged out all energy sources </td>
          <td><v-radio-group v-model="rad.rad6" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad6" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad6" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I done the required High Risk or Authority to Work Permits for the task? </td>
          <td><v-radio-group v-model="rad.rad7" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad7" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad7" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I told others that may be affected by my work? </td>
          <td><v-radio-group v-model="rad.rad8" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad8" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad8" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table> 
     <!-------hazards identification  ----->
  <div class="aaa"></div>
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Hazard Identifcation</v-toolbar-title>
    </v-toolbar>
    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Please read the statements & tick the appropriate response <span class="star">*</span> </th>
          <th class="text-left">Yes</th>
          <th class="text-left">No</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Have I used the check list to identify hazards</td>
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I identified, risk ranked and managed the hazards in my work area </td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>

      </tbody>
    </template>
  </v-simple-table>
    <div class="aaa"></div>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">What is the highest residential risk identified (please select)  <span class="star">*</span> </th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
                <td>HIGH - STOP WORK AND SEE YOU MANAGER/ SUPERVISOR</td>
                <td> <v-radio-group v-model="radios">
                    <v-radio label="HIGH" value="radio-1"></v-radio>
                    </v-radio-group>
                </td>
        </tr>
        <tr>    <td>MEDIUM- Prepare Risk Assessment/SWMS/JSEA – Must be controlled before work starts</td>
                <td> <v-radio-group v-model="radios">
                    <v-radio label="MEDIUM" value="radio-1"></v-radio>
                    </v-radio-group>
                </td>
        </tr>
        <tr>
                <td>LOW - Begin Task </td>
                <td> <v-radio-group v-model="radios">
                    <v-radio label="LOW" value="radio-1"></v-radio>
                    </v-radio-group>
                </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

    <!-------hazards table  ----->
  <div class="aaa"></div>
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Hazards</v-toolbar-title>
    </v-toolbar>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr><th class="text-left">SNo</th>
        <th class="text-left">Hazards</th>
          <th class="text-left">Please select appropriate hazards <span class="star">*</span> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td> <td>Atmosphere</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz1.one" class="mx-2" label="Flammable"></v-checkbox>
                    <v-checkbox v-model="haz1.two" class="mx-2" label="Contaminated"></v-checkbox>
                    <v-checkbox v-model="haz1.three" class="mx-2" label="Dusty"></v-checkbox>
                </v-row>
            </td>
          </tr>
        <tr>
          <td>2</td> <td>Chemical</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz2.one" class="mx-2" label="Reaction"></v-checkbox>
                    <v-checkbox v-model="haz2.two" class="mx-2" label="Absorb/Ingest/Inhale"></v-checkbox>
                    <v-checkbox v-model="haz2.three" class="mx-2" label="Spill"></v-checkbox>
                    <v-checkbox v-model="haz2.four" class="mx-2" label="Burn"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>3</td> <td>Electrical</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz3.one" class="mx-2" label="High Voltage"></v-checkbox>
                    <v-checkbox v-model="haz3.two" class="mx-2" label="Overhead"></v-checkbox>
                    <v-checkbox v-model="haz3.three" class="mx-2" label="Underground"></v-checkbox>
                    <v-checkbox v-model="haz3.three" class="mx-2" label="Leads"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>4</td> <td>Environment</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz3.one" class="mx-2" label="Wind"></v-checkbox>
                    <v-checkbox v-model="haz3.two" class="mx-2" label="Rain"></v-checkbox>
                    <v-checkbox v-model="haz3.three" class="mx-2" label="Hail/Snow"></v-checkbox>
                    <v-checkbox v-model="haz3.three" class="mx-2" label="Fog"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>5</td> <td>General</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz4.one" class="mx-2" label="Bites/Stings"></v-checkbox>
                    <v-checkbox v-model="haz4.two" class="mx-2" label="Sharp Edges"></v-checkbox>
                    <v-checkbox v-model="haz4.three" class="mx-2" label="Vibration"></v-checkbox>
                    <v-checkbox v-model="haz4.four" class="mx-2" label="Body of Water"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>6</td> <td>Gravity</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz5.one" class="mx-2" label="Slip/Trip"></v-checkbox>
                    <v-checkbox v-model="haz5.two" class="mx-2" label="Fall from height"></v-checkbox>
                    <v-checkbox v-model="haz5.three" class="mx-2" label="Falling Object"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>6</td> <td>Manual Handling</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz5.one" class="mx-2" label="Twisting/Grip"></v-checkbox>
                    <v-checkbox v-model="haz5.two" class="mx-2" label="Lifting/Lowering"></v-checkbox>
                    <v-checkbox v-model="haz5.three" class="mx-2" label="Falling Object"></v-checkbox>
                </v-row>
            </td>
        </tr>

       </tbody>
    </template>
  </v-simple-table> 
  <!------- ------>
             
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions} from 'vuex';
export default {
    computed: 
      {  ...mapState({   
                     selectedsjc: state => state.jobs.selectedsjc,
                    }),
      },
    data () {
      return {
          formValid:false,
          rad:{rad1:null,rad2:null,rad3:null,rad4:null,rad5:null,rad6:null,rad7:null, rad8:null},
          haz1:{one:null,two:null,three:null},
          haz2:{one:null,two:null,three:null,four:null},
          haz3:{one:null,two:null,three:null},
          haz4:{one:null,two:null,three:null,four:null},
          haz5:{one:null,two:null,three:null,four:null},

          formd:{
          }        
        }
    },
    methods: {
        inputChange(){
            console.log('this.rad1=',this.rad.rad1)
            console.log('this.rad2=',this.rad.rad2)
            console.log('this.rad3=',this.rad.rad3)
            console.log('this.rad4=',this.rad.rad4)
            console.log('this.rad5=',this.rad.rad5)
            console.log('this.rad6=',this.rad.rad6)
            console.log('this.rad7=',this.rad.rad7)
           // this.one.yes = !this.one.no
           // this.one.no = !this.one.yes
            //console.log(this.one)
        },
        submit(event){
    console.log({event,$form:this.$refs.loginForm})
      if(this.$refs.loginForm.validate())
      { console.log('validated-this.rad',this.rad)
        }
    }
    }
 
 
}
</script>
<style scoped>
.star{
    color:red
}
.aaa{
    padding-bottom:10px;
}
.my-toolbar {
        height: 40px !important;
    }
   table.cell-height tbody td, table tbody th {
        margin-top: -5%;
    } 
table.v-table tbody tr td, table.v-table tbody tr {
    height: 10px !important;
}
.rowht{
    height: 10px !important;
}
table.v-table thead tr {height: 10px !important; }

</style>
