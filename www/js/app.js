
angular.module('starter', ['ionic', 'starter.controllers', 'satellizer', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//connect to facebook
.config(function($authProvider) {
    $authProvider.facebook({
        clientId: '538497892982158',
        scope: 'email, public_profile, user_photos, user_friends',
        responseType: 'token'
    });
})

//inject httpInterceptor service
.config(function($httpProvider){
    $httpProvider.interceptors.push("httpInterceptor");
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  
  .state('app.me', {
    url: '/me',
    views: {
      'menuContent': {
        templateUrl: 'templates/me.html',
        controller:'MeCtrl',
        resolve: {
            aboutMe:function($q, $rootScope, FacebookService){
                var deferred = $q.defer();
                FacebookService.me().success(function(data){
                                        $rootScope.userId=data.id;
                                        deferred.resolve(data);
                                    })
                                    .error(function(errorData){
                                        deferred.reject(errorData);
                                    });
                return deferred.promise;
            }
        }
      }
    }
  })
  
   .state('app.friends', {
      url: '/friends',
      views: {
        'menuContent': {
          templateUrl: 'templates/friends.html',
            controller:'FriendsCtrl',
            resolve: {
                aboutFriends:function($q, $rootScope, FacebookService){
                    var deferred = $q.defer();
                    FacebookService.friends($rootScope.userId)
                                        .success(function(data){
                                            deferred.resolve(data);
                                        })
                                        .error(function(errorData){
                                            deferred.reject(errorData);
                                        });
                    return deferred.promise;
                }
            }
        }
      }
    })


  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
