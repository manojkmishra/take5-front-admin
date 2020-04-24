import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default{
 // namespaced:true,
  state: {userlist:null,  },
  getters:{ },
  mutations: 
  { 
   
    [types.GET_USER_LIST ] (state, payload) 
        {
          state.userlist = payload.userlist;   
          console.log('/store---types.GET_USER_LIST state=', state);
         },
  
  },
  actions: 
  { //actions take first option as dispatch(action) or commit(mutation)
      async getuserlist({commit})
      { let resp= await axios.get(api.getuserlist);
        commit({type:types.GET_USER_LIST ,  userlist: resp.data} );
      },
      adduser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.adduser, payload)
                .then((response) => 
                {  console.log('actions-reguser-res=',response);
                    ctx.dispatch('getuserlist');
                    if (response.data) { console.log('actions-res=',response)
                                        resolve(response);
                        }
                    else { reject(response);  }
                }).catch((error) => { console.log('actions-adduser-res=',error);
                  reject(error);  })
        })
      },
      
  }
}
