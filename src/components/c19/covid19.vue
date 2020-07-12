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
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad1" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td class="pr-5">Have you or anyone that resides at the same address been tested for COVID-19 in the last 5 days?</td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad2" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Are you or anyone that resides at the same address currently under any form of self-isolation as the result of an order of any government authority or as the result of a recommendation of a health professional?</td>
          <td><v-radio-group v-model="rad.rad3" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad3" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have you knowingly come into CLOSE contact with anyone who has travelled overseas in the last 14 days?</td>
          <td><v-radio-group v-model="rad.rad4" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad4" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Within the last 30 days have you or anyone that resides at the same address been diagnosed with COVID-19 and/or been in hospital with pneumonia?</td>
          <td><v-radio-group v-model="rad.rad5" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad5" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Are you or anyone that resides at the same address experiencing fever, respiratory or flu like symptoms?</td>
          <td><v-radio-group v-model="rad.rad6" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad6" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Do you reside in an area which is part of a mandated government lockdown?</td>
          <td><v-radio-group v-model="rad.rad7" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad7" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <!------   ----->
             <v-layout wrap mt-10>
              <!--  <v-flex xs12 md4> <v-text-field  label="Company (disabled)" disabled/> </v-flex>
                <v-flex xs12 md4> <v-text-field class="purple-input" label="User Name"/> </v-flex>
                <v-flex xs12 md4> <v-text-field label="Email Address" class="purple-input"/> </v-flex> -->
                <v-flex xs12 md6> <v-text-field label="First Name (Occupant/Tenant)" class="purple-input"/> </v-flex>
                <v-flex xs12 md6> <v-text-field label="Last Name" class="purple-input"/> </v-flex>
                
                <v-flex xs12 md6> <v-text-field  label="Company" class="purple-input"/> </v-flex>
                <v-flex xs12 md6> <v-text-field class="purple-input" label="Phone No"/> </v-flex>
              <!--  <v-flex xs12 md4> <v-text-field label="City" class="purple-input"/> </v-flex>
                <v-flex xs12 md4><v-text-field label="Country" class="purple-input"/> </v-flex> -->
                <v-flex xs12 md8><v-text-field label="Address" class="purple-input"/></v-flex>
                <v-flex xs12 md4><v-text-field class="purple-input" label="Postal Code" type="number"/></v-flex>

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

    data () {
      return {
          formValid:false,
          rad:{rad1:null,rad2:null,rad3:null,rad4:null,rad5:null,rad6:null,rad7:null},
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
</style>
