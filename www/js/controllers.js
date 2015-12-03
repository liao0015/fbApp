angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $ionicPopup, $ionicLoading) {

    //facebook authetication
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function(){
            $ionicPopup.alert({
            title:'Success',
            content:'You have logged in'
            });
        })
        .catch(function(response){
            $ionicPopup.alert({
            title:'Error',
            content:response.data ? response.data ||
                    response.data.message : response
            });
        });
    };
    
    $scope.isAuthenticated = function(){
        return $auth.isAuthenticated();
    };
    
    $scope.logout = function(){
        return $auth.logout();
    };
    
    //show/hide aunthetication httpInterceptor
    $scope.$on("authentication-failed", function(){
        $auth.logout();
        $scope.login();
    });
    
    $scope.$on("loader_show", function(){
        $ionicLoading.show({template: "loading..."});
    });
    
    $scope.$on("loader_hide", function(){
        $ionicLoading.hide();
    });

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MeCtrl', function($scope, aboutMe){
    $scope.me = aboutMe;
})

.controller('FriendsCtrl', function($scope, aboutFriends){
    $scope.friends = aboutFriends;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
