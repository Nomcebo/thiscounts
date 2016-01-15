/**
  * 
  * @ngdoc simApp
  * @name insertSavedFactory 
  * @description the user will be able to have the saved value inserted
  *  
  *  
  */


myApp.factory('insertSavedFactory',function($http, $q, $templateCache){
  return{
   insertSaved: function(savedAmount, bankID)
         {
             var action = 'insertSaved';
             var registerDeffered = $q.defer();
             return $http({
                            url: 'http://www.francefessa.co.za/registerMember.php',
                            method: "POST",
                            data: $.param({'value': action, 'savedAmount': savedAmount, 'bankID': bankID}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            cache: $templateCache
               })
             .success(function(response)
             {
                 registerDeffered.resolve(response);
                 return response;

             }, function(response)
         {
                 registerDeffered.reject(response);
                 return response;
        });
      return registerDeffered.promise;
         }
  };
});

/*
  * 
  * @ngdoc simApp
  * @name session factory
  * @description PREDEFINES THE KEY VALUES TO BE SEND OVER REFERENCE IN EVERY SESSION OR CLOSURE OF THE UNIQUE USER
  *  
  */

myApp.factory('sessionService', ['$http', function($http)
{
   return{
       set:function(key,value){
           return sessionStorage.setItem(key,value);
       },
       get:function(key){
           return sessionStorage.getItem(key);
       },
       destroy:function(key){
           $http.post('data/destroy_session.php');
           return sessionStorage.removeItem(key);
       }
   };
}]);

/**
  * 
  * @ngdoc simApp
  * @name regFactory 
  * @description the user will be able to register, injected within the RegisterController
  *  
  *  
  */


myApp.factory('regFactory',function($http, $q, $templateCache){
  return{
    registerUserNonAccount: function(firstname, surname, bankID, myPassword, email, cellphone)
         {
             var action = 'register';
             var registerDeffered = $q.defer();
             return $http({
                            url: 'http://www.francefessa.co.za/registerMember.php',
                            method: "POST",
                            data: $.param({'value': action, 'firstname': firstname, 'surname': surname, 'bankID': bankID, 'myPassword':myPassword, 'email':email, 'cellphone': cellphone}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            cache: $templateCache
               })
             .success(function(response)
             {
                 registerDeffered.resolve(response);
                 return response;

             }, function(response)
         {
                 registerDeffered.reject(response);
                 return response;
        });
      return registerDeffered.promise;
         }
  };
});

/**
  * 
  * @ngdoc simApp
  * @name userSessionFactory /login  / login list
  * @description  the user is enabled to login - using their email and password and  the email is used to track the exact user 
  * injected within the LoginController
  * 
  *  
  */

myApp.factory('userSessionFactory',['$http','$q','$location','$templateCache','sessionService', function($http, $q ,$location, $templateCache, sessionService){
  return{

    login : function(email, myPassword){
           var action = 'login';
           var loginDeffered = $q.defer();              

           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",

data: $.param({'value':action,'email':email, 'myPassword':myPassword}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){

                   var eml = response[0].bankID; // put the id into a variable
                   console.log(response);
  
               if(eml){
                   sessionService.set('eml',eml); //set the session user id.
                   $location.path('/main'); // take me to home.
                   return response;    
               } else {
                   $location.path('/login'); 
                   return response;
               }   
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
}]);

/**
  * 
  * @ngdoc simApp
  * @name userListFactory/ login list   
  * @description lists all the details of the currently logged in user, the userID is used to track the exact user 
  *  
  *  
  */
  
  myApp.factory('userListFactory', function ($http, $q ,$location, $templateCache, sessionService){
  return{

    userlist: function(userID){
           var action = 'userlist';
           var loginDeffered = $q.defer();             
           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'userID':userID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
               loginDeffered.resolve(response);
               return response; 
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});

/**
  * 
  * @ngdoc simApp
  * @name accntFctry   
  * @description the user is enabled to login(with account Nr) - the bankID is used to track the exact bank user 
  * 
  *  
  */
  
myApp.factory('accntFctry',function ($http, $q ,$location, $templateCache, sessionService){
 
  return{

    registerAccount:function(accountNr,bankPassword){
      var action = 'registerAccount';
      var accountDeffered = $q.defer();
      console.log("fact");

      return $http({
               url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'accountNr':accountNr,'bankPassword':bankPassword}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
      }).success(function(response){
  console.log(response);
                   var me = response[0].bankID; // put the id into a variable
               if(me){
                   sessionService.set('me',me); //set the session user id.
                   $location.path('/verify'); // take me to home.
                   return response;    
               } else {
                   $location.path('/registerMember'); 
                   return response;
               }   
              }).error(function(response){
        accountDeffered.reject(response);
        return response;
      });
      return accountDeffered.promise;
    }
  };
});

/**
  * 
  * @ngdoc simApp
  * @name accountListFactory   
  * @description lists all the details of the currently logged in bank user, the bankID is used to track the exact bank user 
  * 
  *  
  */
  
myApp.factory('accountListFactory', function ($http, $q ,$location, $templateCache, sessionService){
  return{

    accountList: function(bankID){
           var action = 'accountList';
           var loginDeffered = $q.defer();              

           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'bankID':bankID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
               loginDeffered.resolve(response);
               return response; 
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});

/**
  * 
  * @ngdoc simApp
  * @name promoFactoryList   
  * @description lists all the details of the currently appearing promo
  * 
  *  
  */
  
myApp.factory('spListFactory', function ($http, $q ,$location, $templateCache, sessionService){
  return{

   spList: function(spID){
           var action = 'retrievePromo';
           var loginDeffered = $q.defer();              

           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'spID':spID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
               loginDeffered.resolve(response);
     
               return response; 
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});

/**
  * 
  * @ngdoc simApp
  * @name promoFactoryList   
  * @description lists all the details of the currently appearing promo
  * 
  *  
  */
  
myApp.factory('promoListFactory', function ($http, $q ,$location, $templateCache, sessionService){
  return{

   spList: function(spID){
           var action = 'retrievetblPromo';
           var loginDeffered = $q.defer();              

           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
               loginDeffered.resolve(response);
     
               return response; 
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});

/**
  * 
  * @ngdoc simApp
  * @name RetrieveFactory  
  * @description listing all service provider names
  * 
  *  
  */

// myApp.factory('RetrieveFactory','templateCache',function($http, $q, $templateCache){
//   return{
//     details: function()
//          {
//              console.log("factory");
//              var action = 'retrieveSP';
//              var registerDeffered = $q.defer();
//               //var url = 'http://www.francefessa.co.za/registerNew.php';

//        //$http.get(url,{params: {value: action}})
//         return $http({
//                url: 'http://www.francefessa.co.za/registerMember.php',
//                method: "POST",
//                data: $.param({'value':action}),
//                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//                cache: $templateCache
//            })
//              .success(function(response)
//              {
//                 registerDeffered.resolve(response);
//                 return response;
//              });
//       return registerDeffered.promise;
//          }
//   }
// });

myApp.factory('RetrieveFactory',['$http','$q','$templateCache','sessionService', '$location', function($http, $q, $templateCache, sessionService, $location){
       console.log("dsgf");
   return{
         details : function(){

           var action = 'retrieveSP';
           var deferred = $q.defer();

       return $http({
               url: 'http://www.francefessa.co.za/registerMember.php',
               method: "POST",
               data: $.param({'value':action}),
               headers: {'Content-Type': 'application/x-www-form-urlencoded'},
               cache: $templateCache
           })
           .success(function(response){
                    console.log(response[0].$spName);
                   var spID = response[0].$spName; // put the id into a variable
           
               if(spID){
                   sessionService.set('spID',spID); //set the session user id.
                     $location.path('/main'); // take me to home.
                   return response;    
                   
               } else {
                   return response;
               }   
           })
           .error(function(response){

               deferred.reject();
               return response;
           });

           return deferred.promise;
       }    
   }                 
}]);


/**
  * 
  * @ngdoc simApp
  * @name loginFactory 
  * @description used within the transLogin factory
  * 
  *  
  */

myApp.factory('transSessionFactory',['$http','$q','$templateCache', function($http, $q, $templateCache){

   return{

       
         retrieveDetails : function(accountNr){

           var action = 'retrieveDetails';
           var deferred = $q.defer();

       return $http({
               url: 'http://www.francefessa.co.za/registerMember.php',
               method: "POST",
               data: $.param({'value':action,'accountNr':accountNr}),
               headers: {'Content-Type': 'application/x-www-form-urlencoded'},
               cache: $templateCache
           })
           .success(function(response){

               deferred.resolve(response);
               return response;

           })
           .error(function(response){

               deferred.reject();
               return response;
           });

           return deferred.promise;
       }    

   }        
           
}]);


/*
*
*Lists all the transaction details of the currently logged in bank user
*
*/

myApp.factory('transListFactory', function ($http, $q ,$location, $templateCache, sessionService){
  return{

    translist: function(bankID){
           var action = 'translist';
           var loginDeffered = $q.defer();             
           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'bankID':bankID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
               loginDeffered.resolve(response);
               return response; 
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});

/*
  * 
  * @ngdoc simApp
  * @name balanceCalcFactory
  * @description updating the balance in tbltransaction
  * 
 */

myApp.factory('balanceCalcFactory', function ($http, $q ,$location, $templateCache, sessionService){
       console.log("factory balnce");  
  return{
                //obtains the action to be performed so that calculation can be performed
    updateBalancelist: function(balance, bankID){
              console.log("factory balnce"); 
           var action = 'updateBalance';
           var loginDeffered = $q.defer();   
                  console.log("factory balnce");          
           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'balance':balance, 'bankID':bankID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
                     console.log(response); 
               loginDeffered.resolve(response);
               return response; 
              })
              .error(function(response){
                         console.log("factory balncjjjjje"); 
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});


/*
  * 
  * @ngdoc simApp
  * @name updateTransFactory
  * @description updating the balance in tbltransaction, updating an existing transAmount
  * 
 */

myApp.factory('updateTransFactory', function ($http, $q ,$location, $templateCache, sessionService){
       console.log("factory trans");  
  return{

   updateTrans: function(transAmount, bankID){
              console.log("factory balnce"); 
           var action = 'updateTrans';
           var loginDeffered = $q.defer();   
                  console.log("factory trans");          
           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'transAmount':transAmount, 'bankID':bankID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
                     console.log(response); 
               loginDeffered.resolve(response);
               return response; 
              })
              .error(function(response){
                         console.log("factory balncjjjjje"); 
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});


/*
  * 
  * @ngdoc simApp updatePFactory.updatePassword(email,bankID)
  * @name updatePassword
  * @description updating the password
  * 
 */

myApp.factory('updatePFactory', function ($http, $q ,$location, $templateCache, sessionService){
       console.log("factory trans");  
  return{

   updatePassword: function(email, bankID){
              console.log("factory "); 
           var action = 'updatePassword';
           var loginDeffered = $q.defer();   
                  console.log("factory");          
           return $http({
                           url: 'http://www.francefessa.co.za/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'email':email, 'bankID':bankID}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
                     console.log(response); 
               loginDeffered.resolve(response);
               return response; 
              })
              .error(function(response){
                         console.log("factory balncjjjjje"); 
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});

/*
  * 
  * @ngdoc simApp
  * @name insertTransFactory
  * @description updating the balance in tbltransaction, inserting into the transaction table every transaction made
  * This is a better approach compared to the one above
  * 
  * 
 */

myApp.factory('insertTransFactory',function($http, $q, $templateCache){
  return{
    transInsert: function(transAmount, promoID, username, bankID, accountNr, transTime, savedAmount, transBalance)
         {
             var action = 'insertTrans';
             var registerDeffered = $q.defer();
             return $http({
                            url: 'http://www.francefessa.co.za/registerMember.php',
                            method: "POST",
      data: $.param({'value': action, 'transAmount': transAmount, 'promoID': promoID, 'username': username,'bankID':bankID, 'accountNr': accountNr, 'transTime':transTime, 'savedAmount':savedAmount, 'transBalance':transBalance}),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            cache: $templateCache
               })
             .success(function(response)
             {
                 registerDeffered.resolve(response);
                 return response;

             }, function(response)
         {
                 registerDeffered.reject(response);
                 return response;
        });
      return registerDeffered.promise;
         }
  };
});

/*
myApp.factory('transSessionFactory', function ($http, $q ,$location, $templateCache, sessionService)
{
  
  return{

    retrieveDetails : function(accountNr){
           var action = 'retrieveDetails';
           var loginDeffered = $q.defer();              

           return $http({
                           url: 'http://localhost/cp/09-dec-2015/www/php/registerMember.php',
                           method: "POST",
                           data: $.param({'value':action,'accountNr':accountNr}),
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                           cache: $templateCache
              })
           .success(function(response){
                   var eml = response[0].bankID; // put the id into a variable
               if(eml){
                   sessionService.set('eml',eml); //set the session user id.
                   $location.path('/main'); // take me to home.
                   return response;    
               } else {
                   $location.path('/login'); 
                   return response;
               }   
              })
              .error(function(response){
                   loginDeffered.reject(response);
                   return response;
              });
              return loginDeffered.promise;
       }
  };
});*/
myApp.factory('vodBunduleService', ['$http', function($http)
{        
   var bundleValue;
   return{
       
       set:function(bundValue){
           bundleValue = bundValue;
       },
       get:function(){
           return bundleValue;
       }
   };
}]);

