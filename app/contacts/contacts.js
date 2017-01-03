'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$firebase','$scope',function($firebase,$scope) {



  var ref = new Firebase("https://angular-firebase-sample.firebaseio.com/contacts");
        var sync = $firebase(ref);


  $scope.contacts = sync.$asArray();


$scope.isAdd=true;


  $scope.contactobj={name:"",email:"",mobile:""}


  $scope.addContact=function(){

	$scope.contact={name:$scope.contactobj.name,email:$scope.contactobj.email,mobile:$scope.contactobj.mobile}  	

	  $scope.contacts.$add($scope.contact);
		
	  alert("added");		

	  $scope.contactobj={name:"",email:"",mobile:""};

	

  }


$scope.doEdit=function(contact){

	$scope.isAdd=false;
	$scope.isEdit=true;

	$scope.contactEdit=contact;
	$scope.contactobj=contact;
  	
}

$scope.editContact=function(){


$scope.contactEdit.name=$scope.contactobj.name;

$scope.contactEdit.email=$scope.contactobj.email;

$scope.contactEdit.mobile=$scope.contactobj.mobile;

$scope.contacts.$save($scope.contactEdit);

	alert("updated ");

  $scope.contactobj={name:"",email:"",mobile:""}
}

$scope.deleteContact=function(contact){

	$scope.contacts.$remove(contact);
	alert("removed");

}




}]);

