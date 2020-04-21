<template>

      <nav >
          <v-app-bar flat app dense ><!--toolbar  -->
            <div v-if="authenticated && user">
                <v-app-bar-nav-icon class="grey--text" @click="drwr = !drwr"></v-app-bar-nav-icon>
            </div>

            <!--  <router-link class="logoimg" to="/"> -->
            <img src="../assets/img/dowell.png" class="logoimg" alt="Dowell Windows and Doors">
            <!--  </router-link> -->
            <v-toolbar-title class="transparent"> 
                <span class="font-weight-light">Take</span><span>5</span>
            </v-toolbar-title>
  
            <v-spacer></v-spacer>
            <div v-if="authenticated">
                <v-btn text color="grey" @click.prevent="signOut"> Sign Out
                <v-icon >mdi-logout-variant</v-icon>  </v-btn>
            </div>
            <div v-else>
                  <v-btn text color="grey"> 
                      <router-link :to="{name:'signin'}"></router-link>
                   </v-btn>
            </div>
        </v-app-bar><!-- toolbar finish --drawer start-->
      
    </nav>

</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      })
    },
    methods:{
        ...mapActions({signOut1:'auth/signOut'}),
        signOut(){
            this.signOut1().then(()=>{
                this.$router.replace({name:'signin'})
            })
        }
    }
}
</script>
<style scoped>
.logoimg{
padding-right:10px;
}
</style>