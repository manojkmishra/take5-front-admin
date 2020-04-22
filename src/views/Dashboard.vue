<template>
  <div>
 Dashboard
             <template v-if="authenticated">
                <li> User={{user.name}} email={{user.email}}</li>
                <li> <router-link :to="{name:'dashboard'}">Dashboard</router-link> </li>
            </template>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      })
    },

}
</script>
