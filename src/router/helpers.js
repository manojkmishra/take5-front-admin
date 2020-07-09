export function initialize(store, router) 
{   router.beforeEach((to,from,next)=>{ //next= check applied before going towards 'to'
    //console.log('/resources/js/app.js-router.beforeEach Store.state+++++++=', store.state);
    console.log('helper.js-router from,to=', from, to);
    console.log('/resources/js/app.js-router.beforeEach to+++++++=', to);
    const requiresAuth= to.matched.some(record=>record.meta.requiresAuth)
    const currentUser = store.state.user;
     if(requiresAuth && !currentUser){ next('/login');} 
     else if(to.path=='/login' && currentUser){ next('/')}
     else { next()}
   })
   axios.interceptors.request.use(function (config) 
   {  console.log('req=',config)
      return config;
    });
 axios.interceptors.response.use(function (response) 
    { console.log('res=',response)
      return response;
    }, 
    function (error) 
        { if(error.response.status === 401) { // redirect to login page //console.log('401 rcvd')
        window.location.href = "/login";
            }
        return Promise.reject(error); 
    });
}