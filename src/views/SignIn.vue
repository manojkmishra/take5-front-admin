<template>

    <v-container fill-height fluid >
<v-row  align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="text-center">
<h1 style="color: #5d7498;"> Login</h1> 
                <v-form ref="loginForm" :value="formValid">
                  <v-text-field label="Email" name="email" prepend-icon="mdi-email" :rules="emailRules" type="email" v-model="user.email"/>
                  <v-text-field id="password" label="Password" prepend-icon="mdi-lock" :rules="passwordRules" name="password" type="password" v-model="user.password"/>
                </v-form>

                <v-spacer />
                <v-btn color="primary" rounded @click="loginUser" >Login</v-btn>

          </v-col>
        </v-row>
<!--
 Sign In
    <form @submit.prevent="submit">
      {{form}}
      <div> <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="form.email"> 
      </div>
      <div> <label for="password">Pass</label> 
            <input type="password" name="password" id="password" v-model="form.password"> 
      </div>
      <div><button type="submit">Submit</button> </div>
    </form> -->
    </v-container>
</template>

<script>
//import axios from 'axios';
import navi1 from './TheNavigation';
import {mapActions} from 'vuex';
export default {
  name: 'signin',
  components: { },
 // data(){return {form:{email:'',password:''}}},
  data(){return {formValid:false, user:{email:'',password:''}, 
                  emailRules: [ v => !!v || 'The Email is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
                  passwordRules: [ v => !!v || 'The Password is required' ],
                 // form:{email:'',password:''}
                }},
  methods: { 
        ...mapActions({signIn:'auth/signIn'}),
        /* submit()
            { console.log('submit pressed form=',this.form);
            // let resp=axios.post('http://127.0.0.1:8000/api/auth/signin',this.form); // eslint-disable-line
            // let resp=axios.post('/auth/signin',this.form); // eslint-disable-line
            // console.log('signin res=',resp);
              this.signIn(this.form).then(()=>
              {
                console.log('authenticated- forwarding to dashboard')
                this.$router.replace({name:'dashboard'})
              }).catch(()=>{console.log('singin view-sigin failed')})
            }, */
          loginUser(event)
                {console.log({event,$form:this.$refs.loginForm})
                    if(this.$refs.loginForm.validate())
                    {  console.log('validated');   
                    console.log('user=',this.user)
                      // this.$store.dispatch('user/loginUser',this.user)
                        this.signIn(this.user).then(()=>
                        {
                          console.log('authenticated- forwarding to dashboard')
                          this.$router.replace({name:'dashboard'})
                        }).catch(()=>{console.log('singin view-sigin failed')})
                    }
                }    
    }
}
</script>
<style scoped>
    .frame {
      max-width: 520px;
      margin: auto;
    }
</style>
