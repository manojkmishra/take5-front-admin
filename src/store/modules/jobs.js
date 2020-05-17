import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {getjobs:null
        },
  getters:{
      
  },
  mutations: 
  {
    [types.GET_JOBS ] (state, payload) 
    { state.getjobs = payload.getjobs;
     console.log('/store/saw.js-types.GET_JOBS state=', state);
    },
  },
  actions:{
      //get jobs --currently get used-thinking of getting just 500 jobs for admin so no post
      //in future post will be used to get jobs filtered based on field user logedin
    async getjobs ({commit,dispatch}) 
    { let res= await axios.get(api.getjobs);  
      commit({type:types.GET_JOBS ,  getjobs: res.data} ); 
      return res;    },
  }

}