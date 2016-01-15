// var myApp = angular.module('myApp',[]);
/**
  * 
  * @ngdoc myApp
  * @name insertsavedController 
  * @description 
  *
  *  
  */

myApp.controller('insertsavedController',function($scope, insertSavedFactory){ //scope enabling accessability from html 
   
   $scope.registerUserNonAccount = function(){
      console.log("controller");
       var insertSaved = $scope.answer;      //currently assigning values entered through ng-model

 
insertSavedFactory.insertSaved(insertSaved, bankID).then(function(response){
               $scope.message = "User successfully registered.";
               console.log("User successfully registered.");
               },
         function(error){
             console.log("User was unable to register");
               alert("Please try again");
               $scope.message = "User cannot be register.";
      });
       };
});
/**
  * 
  * @ngdoc myApp
  * @name RegisterController 
  * @description the user is enabled to register, the user is without a bank account for this registration
  *
  *  
  */

myApp.controller('RegisterController',function($scope, regFactory){	//scope enabling accessability from html 
   
   $scope.registerUserNonAccount = function(){
   	 	console.log("controller");
       var firstname = $scope.firstname;			//currently assigning values entered through ng-model
       var surname = $scope.surname;
       var email = $scope.email;
       var myPassword = $scope.myPassword;
       var bankID = $scope.bankID;
       var cellphone = $scope.cellphone;

       if (bankID == null){
           bankID = 1;
       }
regFactory.registerUserNonAccount(firstname, surname, bankID, email, myPassword, cellphone).then(function(response){
		           $scope.message = "User successfully registered.";
		           console.log("User successfully registered.");
		           },
  			 function(error){
	           console.log("User was unable to register");
               alert("Please try again");
               $scope.message = "User cannot be register.";
			});
       };
});

/**
  * 
  * @ngdoc myApp
  * @name LoginController 
  * @description the user is enabled to login - using their email and password
  * 
  */
  
myApp.controller('LoginController',function($scope, userSessionFactory){
	$scope.login = function()
{
	var email = $scope.email;
	var myPassword = $scope.myPassword;
	
	userSessionFactory.login(email, myPassword).then(function(response)		
											//obtains the email, password from user and allows the factory to do the rest
	{
		console.log("user successfully logged in");
	}, function(error)
           {
	           console.log(error);
           });
      };
});

/**	GETTING OF THE CURRENT USER EMAIL 
 *	lists all the details of the currently loged in user, the email is used to track the exact user 
 */

myApp.controller('homeControllerLogin',function($scope, userSessionFactory,userListFactory,sessionService){		
$scope.login = function()
{

	var prints = sessionService.get('eml');
	$scope.printers = prints;
      
		console.log("ID IS  : " + $scope.printers);


		userListFactory.userlist(prints).then(function(response)
		{
			console.log(response);
			$scope.show = response.data[0];
		}, 
		function(error)
        {
	           console.log(error);
           });
	};
});
/*
  * 
  * @ngdoc myApp
  * @name Account nr login
  * @description this approach is only used by people with a bank account 
  * 
  */
  
  myApp.controller('RegisterControllerMem',function($scope, accntFctry){
		console.log("in");
$scope.registerAccount = function()
{	
	var accountNr = $scope.accountNr;
	var bankPassword = $scope.bankPassword;

	accntFctry.registerAccount(accountNr, bankPassword).then(function(response){

		console.log("user successfully register");
	}, function(error)
           {
	           console.log(error);
           });
      };
});

/*	GETTING OF THE CURRENT USER BANKID  
*	This list is then printed on the verify.html
*	Showing all neccessary info of the logged in user
*/

myApp.controller('homeControllerRegister',function($scope, accntFctry,accountListFactory,sessionService, regFactory ){
$scope.registerAccount = function()
{

	var meShow = sessionService.get('me');			//catering for verify.html
	$scope.meShowScope = meShow;

		console.log("BANK ID IS  : " + $scope.meShowScope);

		accountListFactory.accountList(meShow).then(function(response)
		{
			$scope.details = response.data[0];
		 
       var firstname = response.data[0].firstname;
       var surname = response.data[0].surname;
       var email =response.data[0].email;
       var myPassword = response.data[0].surname; 
       $scope.temporaryP = myPassword;
       var bankID = response.data[0].bankID;
       var cellphone = response.data[0].cellphone;
       		console.log(myPassword);

regFactory.registerUserNonAccount(firstname, surname, bankID, email, myPassword, cellphone).then(function(response){
		           $scope.message = "User successfully registered.";
		           console.log("User successfully Added.");
		           })
		     },
  			 
		function(error)
        {
	           console.log(error);
           });
	};
});

/*
  * 
  * @ngdoc myApp
  * @name controller Retrieving Service Provider names
  * @description the user will be able to view all service providers available 
  * 
 */

myApp.controller('RetriveController',function($scope, RetrieveFactory, spListFactory, sessionService,$location){
  console.log("controller Retrieve ..."); 

   	 console.log("controller Retrieve member");
   	 var retrievePromise = RetrieveFactory.details();
    
     var prints = sessionService.get('spID');
	 $scope.printers = prints;
   	 
   	  console.log(retrievePromise);
      retrievePromise.then(function(response){			
		  
		           console.log("retrieve successful. ");
		           $scope.names = response.data;
          
			  
			});

  spListFactory.spList(prints).then(function(response)
		{
			console.log(response.data);
			$scope.display = response.data;
            
      
		}, 
		function(error)
        {
	           console.log(error);
           });

});


/*
  * 
  * @ngdoc myApp
  * @name controller Retrieving promo names
  * @description the user will be able to view all service providers available 
  * 
 */

myApp.controller('RetrivePController',function($scope, RetrieveFactory, promoListFactory, sessionService,$location){
  console.log("controller Retrieve ..."); 

   	 console.log("controller Retrieve member");
   	 var retrievePromise = RetrieveFactory.details();
    
     var prints = sessionService.get('spID');
	 $scope.printers = prints;
   	 
   	  console.log(retrievePromise);
      retrievePromise.then(function(response){			
		  
		          
		           $scope.names = response.data; 
                     console.log("retrieve successful. " + $scope.names);
			});

    promoListFactory.spList(prints).then(function(response)
		{
			console.log(response.data);
			$scope.display = response.data;
                    
		}, 
		function(error)
        {
	           console.log(error);
           });

});


myApp.controller('retrieveList',function($scope, RetrieveFactory, spListFactory, sessionService){		

	var prints = sessionService.get('spID');
	$scope.printers = prints;
      
		console.log("ID IS  : " + $scope.printers);

		spListFactory.spList(prints).then(function(response)
		{
			console.log(response);
			if(prints == "1"){
               $scope.display = response.data; 
            }
		}, 
		function(error)
        {
	           console.log(error);
           });


});

/*INJECTION OF THE MULTIPLE FACTORIES
*Getting bankID
*Lists all the transaction details of the currently logged in bank user, the bankID is used to track the exact bank user transactions
*Printed on the testing.html soon to be transDetails.html
*/

myApp.controller('homeController22',function($scope, accntFctry,userSessionFactory, transListFactory, sessionService, accountListFactory){		
$scope.registerAccount = function()
{
	
console.log("user successfully retrieved");

	var prints = sessionService.get('me'); //getting bankID
	var prints = sessionService.get('eml'); //getting bankID
	$scope.printers = prints;

		console.log("ID IS  : " + $scope.printers);

		transListFactory.translist(prints).then(function(response)
		{
			console.log(response);
			$scope.show = response.data;
		}, 
		accountListFactory.accountList(prints).then(function(response)
		{
			console.log(response);
			$scope.show2 = response.data[0];
		},
		function(error)
        {
	           console.log(error);
           }));
	};
});

/*
  * 
  * @ngdoc myApp
  * @name updateController
  * @description updating the balance in tbltransaction, updating an existing transAmount
  * 
 */


myApp.controller('UpdateController',function($scope, accntFctry, userSessionFactory, balanceCalcFactory,sessionService, updateTransFactory){
   
   $scope.updateCalc = function(){
   	 	console.log("controller");
 
     var bankID = sessionService.get('eml');	//Getting the bankID and user email and assigning it to a varriable
     var bankID = sessionService.get('me');
     var transAmount = $scope.balance;
     var balance = $scope.balance;
  
	balanceCalcFactory.updateBalancelist(balance,bankID).then(function(response){	//obtains bank bankID to pdate balance of user
		           $scope.message = "User successfully registeredddd.";
		           console.log("bankID" + bankID);							
		           console.log("bankID" + balance);
		           },
	updateTransFactory.updateTrans(transAmount, bankID).then(function(response){	//obtains how much the user transacted
		           $scope.message = "User successfully registeredddd.";
		           console.log("transAmount" + transAmount);
		           console.log("bankID" + balance);
		           },
           function(error){
	           console.log(error);
               alert("Please try again");
               $scope.message = "User cannot be register.";
			}));
       };
});

/*
  * 
  * @ngdoc myApp
  * @name transInsertrController
  * @description updating the balance in tbltransaction, inserting into the transaction table every transaction made
  * This is a better approach compared to the one above
  * Used in purchase.html
  * 
 */
  
myApp.controller('transInsertrController',function($scope, $filter, accntFctry, userSessionFactory, balanceCalcFactory,sessionService, insertTransFactory, accountListFactory, userListFactory, $http, vodBunduleService){

  $scope.spDetails = [{ Id: 1, airtime: 100  }, { Id: 2, airtime: 200 }, { Id: 3, airtime: 200 }];

          $scope.GetValue = function (spDetail) {
  console.log("i'm in the vodacom airtime");

                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetails, function (spDetail) {
                    return spDetail.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }


  $scope.spDetailsA = [{ Id: 1, airtime: 30}, { Id: 2, airtime: 40 }, { Id: 3, airtime: 100 }];

            $scope.GetValueA = function (spDetailA) {
                console.log("i'm in the vodacom data");
                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetailsA, function (spDetailA) {
                    return spDetailA.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }

  $scope.spDetailsMtnB = [{ Id: 1, airtime: 1000}, { Id: 2, airtime: 2000}, { Id: 3, airtime: 2000}];

        $scope.GetValueMtnB = function (spDetailMtnB) {
              console.log("i'm in the mtn data");
                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetailsMtnB, function (spDetailMtnB) {
                    return spDetailMtnB.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }

    $scope.spDetailsMtn = [{ Id: 1, airtime: 12}, { Id: 2, airtime: 15}, { Id: 3, airtime: 20}];
      
             $scope.GetValueMtn = function (spDetailMtn) {
              console.log("i'm in the mtn airtime");
                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetailsMtn, function (spDetailMtn) {
                    return spDetailMtn.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }
            
  $scope.spDetails8taB = [{ Id: 1, airtime: 1000}, { Id: 2, airtime: 2000}, { Id: 3, airtime: 2000}];

        $scope.GetValue8taB = function (spDetail8taB) {
            console.log("i'm in the 8ta airtime");
                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetails8taB, function (spDetail8taB) {
                    return spDetails8taB.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }

  $scope.spDetails8ta = [{ Id: 1, airtime: 00}, { Id: 2, airtime: 3000}, { Id: 3, airtime: 2050}];

$scope.GetValue8ta = function (spDetail8ta) {
    console.log("i'm in the 8ta data");
                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetails8ta, function (spDetail8ta) {
                    return spDetails8ta.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }

            
   $scope.transInsert = function(){
   	 //	console.log(response);
    
	var bankID = sessionService.get('eml');
   // var bankID = sessionService.get('me');

  	var balance = 0;
      // console.log(balance);
       
       
	accountListFactory.accountList(bankID).then(function(response)		
											//gets data from the account list which has all details of user from bank
		{
        
        var bankID = sessionService.get('eml');
       // var transAmount = $scope.balance;
        var transAmount = vodBunduleService.get();
    	var balance = vodBunduleService.get();
        
        console.log("u " + balance);
        console.log("u " + transAmount);
   		var promoID;
        //  var promoID = $scope.purchaseS;
        if($scope.sprovider == "partials/vodacomPartials/purchaseSP.html"){
            promoID = "1";
        }
        else if($scope.sprovider == "partials/mtnPartials/purchaseMtn.html"){
             promoID = "2";
             console.log("bank balance" + balance);
            
        }
        else if($scope.sprovider == "partials/8taPartial/purchase8ta.html"){
             promoID = "3";
        }
       
    	var accountNr = response.data[0].accountNr;
        console.log(accountNr);
        var username = response.data[0].email;
        var transBalance = response.data[0].balance;
        var transTime = $filter('date')(new Date(), 'yyyy-MM-dd  HH:mm:ss');
   
            console.log("b: " +balance + " : " + $scope.balance);
            console.log("t: " +transBalance);
        console.log("promoid" + promoID);
        console.log(transBalance);
			  									//inserts all data recived from accntlist into usertble
        
        var savedAmount =  parseFloat(transBalance) - parseFloat(transAmount);
        // var savedAmount = $scope.savedAmount;
        $scope.saved = savedAmount;
           console.log("saved " + savedAmount);

insertTransFactory.transInsert(transAmount, promoID, username, bankID, accountNr, transTime, savedAmount, transBalance).then(function(response){
		           $scope.message = "User successfully registered.";
		           console.log("User successfully Added.");

		        })

		           },

	balanceCalcFactory.updateBalancelist(balance,bankID).then(function(response){
		           $scope.message = "User successfully registered.";
		           console.log("bankID" + bankID);
		          

		           },

           function(error){
	           console.log(error);
               alert("Please try again");
               $scope.message = "User cannot be register.";
			}));
      } 
   

    $scope.purchaseButtons = "partials/purchasePartial.html";
     $scope.purchaseSP = "vodacomPartials/partials/purchaseSP.html";
//     $scope.purchaseSP8ta = "8taPartial/partials/purchase8ta.html";
});
	

/**
  * 
  * @ngdoc myApp
  * @name myControllerJson
  * @description obtains all service providers data from json
  *
  *  
  */

myApp.controller('ControllerJson',['$scope', '$http','vodBunduleService', function($scope, $http, vodBunduleService){

/*HOMEWORK
$scope.airtimeCompare = [{ Id: 1, airtime: 100  }, { Id: 2, airtime: 200 }, { Id: 3, airtime: 200 }];

          $scope.GetValue = function (airCompare) {
  console.log("i'm in the vodacom airtime");

                var sId = $scope.balance;
                var airtime = $.grep($scope.airtimeCompare, function (airCompare) {
                    return airCompare.Id == sId;
                })[0].airtime;
                
                vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }


  $scope.spDetailsA = [{ Id: 1, airtime: 30}, { Id: 2, airtime: 40 }, { Id: 3, airtime: 100 }];

            $scope.GetValueA = function (spDetailA) {
                console.log("i'm in the vodacom data");
                var sId = $scope.balance;
                var airtime = $.grep($scope.spDetailsA, function (spDetailA) {
                    return spDetailA.Id == sId;
                })[0].airtime;
                
                   vodBunduleService.set(airtime);
                console.log(airtime);
               // $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
            }

*/


$scope.compare = function(){
   $http.get('json/data.json').success(function(data){	

if ($scope.comparisonOption == '2') {						//bundle package that ranges from 30MB
 
   	if($scope.ranges == '1'){			//data bundle option
   		$scope.vodacom = data[0].vodacom_data;	
   		$scope.mtn = data[0].mtn_data;
   		$scope.tadata = data[0].ta_data;
   		$scope.virginMobile = data[0].virginMobile;
   		$scope.CellC = data[0].CellC;
   		console.log(data.data);
   	}  
    else if($scope.ranges == '2'){
   		$scope.vodacom = data[1].vodacom_data;	
   		$scope.mtn = data[1].mtn_data;
   		$scope.tadata = data[1].ta_data;
   		$scope.virginMobile = data[1].virginMobile;
   		$scope.CellC = data[1].CellC;
   		}  
    else if($scope.ranges == '3'){
   		$scope.vodacom = data[2].vodacom_data;	
   		$scope.mtn = data[2].mtn_data;
   		$scope.tadata = data[2].ta_data;
   		$scope.virginMobile = data[2].virginMobile;
   		$scope.CellC = data[2].CellC;
   		}  
 }

else if ($scope.comparisonOption == 'partials/comparePartial/airtimeCompare.html') {				//bundle package that ranges from 
	if($scope.rangesAirtime == '1'){
   		$scope.vodacom = data[3].vodacom_data;	
   		$scope.mtn = data[3].mtn_data;
   		$scope.tadata = data[3].ta_data;
   		$scope.virginMobile = data[3].virginMobile;
   		$scope.CellC = data[3].CellC;
   		}  
  
	else if($scope.rangesAirtime == '2'){
   		$scope.vodacom = data[4].vodacom_data;	
   		$scope.mtn = data[4].mtn_data;
   		$scope.tadata = data[4].ta_data;
   		$scope.virginMobile = data[4].virginMobile;
   		$scope.CellC = data[4].CellC;
   		}  

	else if($scope.rangesAirtime == '3'){
   		$scope.vodacom = data[5].vodacom_data;	
   		$scope.mtn = data[5].mtn_data;
   		$scope.tadata = data[5].ta_data;
   		$scope.virginMobile = data[5].virginMobile;
   		$scope.CellC = data[5].CellC;
   		}  
  	}
});
}
}]);



/**
  * 
  * @ngdoc myApp
  * @name testingClass
  * @description
  *
  *  
  */
//myApp.controller('myControllerClass', function( Friend, $scope) {
//                // Create Tricia using the vanilla constructor.
//                var tricia = new Friend( 1000, 100, 't' );
//    
//                 $scope.balance =
//                        [{
//                             airtime :  tricia.getserviceProvider,
//                             price : 13
//
//                        }];
//    
//                console.log(
//                    tricia.getairtime(),
//                   
//                    tricia.getdiscount(),
//                    
//                    tricia.getserviceProvider()
//                );
//              
//            }
//        );
//
//

// myApp.factory('Friend', function() {
//
//                function Friend( airtime, discount, serviceProvider ) {
//                    this.airtime = 10;
//                    this.discount = 10;
//                    this.serviceProvider[10] = {};
//                    
//                }
//
//                Friend.prototype = {
//                    getairtime: function() {
//                        return( this.airtime );
//                    },
//                    getdiscount: function() {
//                        return( this.discount);
//                    },
//                    getserviceProvider: function() {
//                        return( this.serviceProvider);
//                    },
//                };
//               
//               
//                return( Friend );
//            }
//        );




    // myApp.controller('vodBunduleController', function ($scope, $window, vodBunduleService) {
    //         $scope.spDetails = [{
    //             Id: 1,
    //            airtime: 100
    //         }, {
    //             Id: 2,
    //             airtime: 200
    //         }, {
    //             Id: 3,
    //             airtime: 200
    //         }];
 
    //         $scope.GetValue = function (spDetail) {
    //             var sId = $scope.balance;
    //             var airtime = $.grep($scope.spDetails, function (spDetail) {
    //                 return spDetail.Id == sId;
    //             })[0].airtime;
                
    //                vodBunduleService.set(airtime);
    //             console.log(airtime);
    //             $window.alert("Selected Value: " +  sId + "\nSelected Text: " + airtime);
    //         }
    //     });






