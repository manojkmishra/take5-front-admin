<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex  xs12 md8>
        <v-card color="grey lighten-4" title="Edit Profile" text="Complete your profile">
            <v-app-bar  dark  color="blue darken-4" text-center >
                <v-avatar  color=""><img src="@/assets/img/coronavirus.svg"></v-avatar>
                <v-icon class="mr-2">mdi-coronavirus</v-icon>
                <v-toolbar-title >COVID-19 CLIENT / VISITOR FORM</v-toolbar-title>
            </v-app-bar>
            <p class="mt-10 mx-4">
                We value the safety of our staff, customers and all whom visit our site. Dowell is obligated the follow the Australian Government guidelines, assessing any exposure to the Covid-19 virus.
            </p><p class="mb-10 mx-4">Could you please kindly complete the declaration below.
                </p>
<!----------    main form            ----------->
          <v-form ref="loginForm" :value="formValid">
            <v-container py-0>
    <!-------table  ----->
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
          <td>Have you knowingly come into CLOSE contact with anyone who has travelled overseas in the last 14 days?</td>
          <td><v-radio-group  v-model="rad.rad1" :rules="rad1Rules" @change="inputChange()"><v-radio  :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group  v-model="rad.rad1" :rules="rad1Rules" @change="inputChange()"><v-radio :rules="[v => !!v || 'required']" :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td class="pr-5">Have you or anyone that resides at the same address been tested for COVID-19 in the last 5 days?</td>
          <td><v-radio-group v-model="rad.rad2" :rules="rad2Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad2" :rules="rad2Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Are you or anyone that resides at the same address currently under any form of self-isolation as the result of an order of any government authority or as the result of a recommendation of a health professional?</td>
          <td><v-radio-group v-model="rad.rad3" :rules="rad3Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad3" :rules="rad3Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have you knowingly come into CLOSE contact with anyone who has travelled overseas in the last 14 days?</td>
          <td><v-radio-group v-model="rad.rad4" :rules="rad4Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad4" :rules="rad4Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Within the last 30 days have you or anyone that resides at the same address been diagnosed with COVID-19 and/or been in hospital with pneumonia?</td>
          <td><v-radio-group v-model="rad.rad5" :rules="rad5Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad5" :rules="rad5Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Are you or anyone that resides at the same address experiencing fever, respiratory or flu like symptoms?</td>
          <td><v-radio-group v-model="rad.rad6" :rules="rad6Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad6" :rules="rad6Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Do you reside in an area which is part of a mandated government lockdown?</td>
          <td><v-radio-group v-model="rad.rad7" :rules="rad7Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad7" :rules="rad7Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <!------   ----->
             <v-layout wrap mt-10>
              <!--  <v-flex xs12 md4> <v-text-field  label="Company (disabled)" disabled/> </v-flex>
                <v-flex xs12 md4> <v-text-field class="purple-input" label="User Name"/> </v-flex>
                <v-flex xs12 md4> <v-text-field label="Email Address" class="purple-input"/> </v-flex> -->
                <v-flex xs12 md6> <v-text-field v-model="formd.fname" :rules="fieldRules" label="First Name (Occupant/Tenant)" class="purple-input"/> </v-flex>
                <v-flex xs12 md6> <v-text-field v-model="formd.lname" :rules="fieldRules" label="Last Name" class="purple-input"/> </v-flex>
                
                <v-flex xs12 md6> <v-text-field v-model="formd.cname" :rules="fieldRules" label="Company" class="purple-input"/> </v-flex>
                <v-flex xs12 md6> <v-text-field v-model="formd.phone" :rules="phoneRules" class="purple-input" label="Phone No" type="number"/> </v-flex>
              <!--  <v-flex xs12 md4> <v-text-field label="City" class="purple-input"/> </v-flex>
                <v-flex xs12 md4><v-text-field label="Country" class="purple-input"/> </v-flex> -->
                <v-flex xs12 md8><v-text-field v-model="formd.addr" :rules="fieldRules" label="Address" class="purple-input"/></v-flex>
                <v-flex xs12 md4><v-text-field v-model="formd.post" :rules="postRules" class="purple-input" label="Postal Code" type="number"/></v-flex>

               <!-- <v-flex xs12> <v-textarea class="purple-input" label="About Me"   value="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /> </v-flex> -->
                <v-flex xs12 text-center ><v-btn rounded class="mx-0 font-weight-light" color="success" @click="submit">Submit</v-btn></v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    rad1Rules() { return [this.rad.rad1 !=null || "Pls select one"  ]; },
    rad2Rules() { return [this.rad.rad2 !=null || "Pls select one"  ]; },
    rad3Rules() { return [this.rad.rad3 !=null || "Pls select one"  ]; },
    rad4Rules() { return [this.rad.rad4 !=null || "Pls select one"  ]; },
    rad5Rules() { return [this.rad.rad5 !=null || "Pls select one"  ]; },
    rad6Rules() { return [this.rad.rad6 !=null || "Pls select one"  ]; },
    rad7Rules() { return [this.rad.rad7 !=null || "Pls select one"  ]; }
  },
    data () {
      return {
        formd:{fname:'',lname:'',cname:'',phone:'',post:'',addr:''},
          formValid:false,
          rad:{rad1:null,rad2:null,rad3:null,rad4:null,rad5:null,rad6:null,rad7:null},
          fieldRules: [ (v) => (v && v.length >2)|| 'Required & Len > 2 ' ],
           phoneRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >8) || 'Must be more than 8 digits '
         ],
          postRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >2) || 'Must be more than 2 digits '
         ],

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
      console.log('validated-this.formd',this.formd)
        }
    }
    }
 
 
}
</script>
<style scoped>
.star{
    color:red
}
</style>
