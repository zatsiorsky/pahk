'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
  
  $scope.post = function() {
    if ($scope.minutes >= 5 && $scope.minutes <= 120) {
      alert("Thanks for posting your spot with " + $scope.minutes + " minutes remaining!");
    }
    else {
      alert("Bad request.");
    }
  }
  
  $scope.minutes = 0;
  
  $scope.minChange = function() {
    if ($scope.minutes != null) {
      $scope.minutes = Math.round($scope.minutes);
      if ($scope.minutes < 0) {
        $scope.minutes = 0;
        return "Error: minutes cannot be less than 0";
      }
      else if ($scope.minutes > 120) {
        $scope.minutes = 120;
        return "Error: minutes cannot be greater than 120";
      }
      else {
        return "Success.";
      }
    }
  }
  
  $scope.buttonActive = function() {
    return $scope.minutes >= 5 && $scope.minutes <= 120;
  }
  
  
  // A bunch of maps stuff
  
  $scope.initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        var infowindow = new google.maps.InfoWindow({
          map: $scope.map,
          position: pos,
          content: 'Here you are!'
        });

        $scope.map.setCenter(pos);
      }, function() {
        $scope.handleNoGeolocation(true);
      });
    } 
    else {
      // Browser doesn't support Geolocation
      $scope.handleNoGeolocation(false);
    }
  };
    
  $scope.handleNoGeolocation = function() {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: $scope.map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    $scope.map.setCenter(options.position);
  };
  
  $scope.initialize();
});

