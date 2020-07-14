<template>
  <div>

    <dashboard/>
         <!--   Dashboard
             <template v-if="authenticated">
                <li> User={{user.name}} email={{user.email}}</li>
                <li> <router-link :to="{name:'dashboard'}">Dashboard</router-link> </li>
            </template>  -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import dashboard from '@/components/dashboard/dashboard.vue'

export default {
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                      user:'auth/user'
                      })
    },
    components: { 'dashboard': dashboard, },
     created(){ // this.$store.dispatch('getjobs');
                this.$store.dispatch('getuserlist')
                this.$store.dispatch('getjobtypes')
                this.$store.dispatch('getuserjobs')
                }

}
</script>
