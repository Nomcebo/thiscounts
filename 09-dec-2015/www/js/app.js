/*Where routing takes place*/
var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/login',{ 
		templateUrl: 'partials/login.html',
		controller: 'LoginController'
	}).
	when('/registerMember',{ 
		templateUrl: 'partials/registerMember.html',
		controller: 'RegisterControllerMem'
	}).
	when('/registerNew',{ 
		templateUrl: 'partials/registerNew.html',
		controller: 'RegisterController'
	}).
	when('/main',{ 
		templateUrl: 'partials/main.html',
		controller: 'RetrivePController'

	}).
	when ('/purchase',{ 
		templateUrl: 'partials/purchase.html',
//		controller:'myControllerClass'
		controller:'transInsertrController'
		})
        .
	when ('/verify',{ 
		templateUrl: 'partials/verify.html',
		controller:'homeControllerRegister'	
		}).
	when ('/testing',{ 
		templateUrl: 'partials/testing.html',
		controller:'homeController22'	
		}).
	when ('/all',{ 
		templateUrl: 'partials/mtn.html',
        controller: 'retrieveList'
		}).
	when ('/profile',{ 
		templateUrl: 'partials/profile.html',
		//controller:'homeController22'	
		}).
	when ('/compare',{ 
		templateUrl: 'partials/compare.html',
		controller:'ControllerJson'	
		}).
	otherwise({redirectTo: '/login'
	});
}]);