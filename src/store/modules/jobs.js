import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {getjobs:null,getjobtypes:null,
        },
  getters:{
      
  },
  mutations: 
  {
    [types.GET_JOBS ] (state, payload) 
    { state.getjobs = payload.getjobs;
     console.log('/store/saw.js-types.GET_JOBS state=', state);
    },
    [types.GET_JOB_TYPES ] (state, payload) 
    { state.getjobtypes = payload.getjobtypes;
     console.log('/store/saw.js-types.GET_JOB_TYPES state=', state);
    },
  },
  actions:{
      //get jobs --currently get used-thinking of getting just 500 jobs for admin so no post
      //in future post will be used to get jobs filtered based on field user logedin
    async getjobs ({commit,dispatch}) 
    { let res= await axios.get(api.getjobs);  
      commit({type:types.GET_JOBS ,  getjobs: res.data} ); 
      return res;    
    },
    async getjobtypes ({commit,dispatch}) 
    { let res= await axios.get(api.getjobtypes);  
      commit({type:types.GET_JOB_TYPES ,  getjobtypes: res.data} ); 
      return res;    
    },
    async addjobtypes ({dispatch}, formData)
    {   console.log('addtype-- formData=', formData);
          let res= await axios.post(api.addjobtypes, formData)  
                .then(response => { dispatch('getjobtypes');  })
                .catch(response => {    });
            return res;
    },
    async editjobtypes ({dispatch}, formData)
    {   console.log('edittype-- formData=', formData);
          let res= await axios.post(api.editjobtypes, formData)  
                .then(response => { dispatch('getjobtypes');  })
                .catch(response => {    });
            return res;
    },
    async deljobtypes ({dispatch}, formData)
    {   console.log('delete-- formData=', formData);
          let res= await axios.post(api.deljobtypes, formData)  
                .then(response => { dispatch('getjobtypes');  })
                .catch(response => {    });
            return res;
    },
  }

}