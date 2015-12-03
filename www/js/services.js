angular.module('starter.services', [])

.factory("httpInterceptor", function($q, $rootScope, $log){
        var numLoading = 0;
        return {
            request: function(config){
                numLoading++;
                $rootScope.$broadcast("loader_show");
                return config || $q.when(config)
            },
            response: function(response){
                if((--numLoading) == 0){
                    $rootScope.$broadcast("loader_hide");
                }
                return response || $q.when(response);
            },
            responseError: function(response){
                if(!(--numLaoding)){
                    $rootScope.$broadcast("loader_hide");
                }
                return $q.reject(response);
            }
        };
})

.factory('FacebookService', function($auth, $http, $ionicPopup){
    var facebookApiURL = 'https://graph.facebook.com/v2.2';
    
    return {
        me: function(){
            if($auth.isAuthenticated()){
                return $http.get(facebookApiURL + '/me',
                                 { 
                                    params: {
                                            access_token: $auth.getToken(),
                                            fields: 'id, name, link, gender, location, website, picture, relationship_status',
                                            format: 'json'
                                            }
                                });
            
            }
            else{
                $ionicPopup.alert({
                    title: 'error',
                    content: 'user not authenticated'   
                });
            }
        },
        
        friends: function(userId){
            if($auth.isAuthenticated() && userId){
                return $http.get(facebookApiURL +'/'+userId +'/friends',
                                 { 
                                    params: {
                                            access_token: $auth.getToken()
                                            }
                                });
            
            }
            else{
                $ionicPopup.alert({
                    title: 'error',
                    content: (userId) ? 'user not authenticated' : 'User is unknown'  
                });
            }
        }
        
    };
});