weather.controller('homeController', ['$scope', '$location', '$resource', '$filter', 'weatherService', function($scope, $location, $resource, $filter, weatherService) {

    // Set temperature units to fahrenheit by default
    $scope.radioUnits = 'f';

    $scope.$watch('radioUnits', function() {
        weatherService.units = $scope.radioUnits;
    });

    // Watch for city changes in the service (ex. when a default is saved to localStorage)
    $scope.$watch(function() {
        return weatherService.city;
    }, function(newVal) { 
        $scope.txtCity = newVal;
        $scope.submit();
    }, true);

    // Grab the date
    $scope.date = ($filter('date')(Date.now(), 'fullDate'));

    $scope.txtCity = weatherService.city;

    $scope.$watch(function() { 
            return weatherService.currentForecast; 
        }, function(newVal) { 
            if(!newVal) return;
            $scope.currentForecast = newVal;
        }, true);

    $scope.submit = function() {

        weatherService.city = $scope.txtCity;

        weatherService.getForecast(weatherService.city).then(
            function(data) {
                weatherService.currentForecast = data;
                console.log(data);
            }
        );

    };

    // Run the submit function initially to retrieve weather data for the default city
    $scope.submit();

	// Function to determine the active tab, sets its class as "active"
    $scope.isActive = function (path) {
	  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}

}]);

weather.controller('todayController', ['$scope', '$filter', 'weatherService', function($scope, $filter, weatherService) {

    $scope.convertToDate = weatherService.convertToDate;
    $scope.convertTemp = weatherService.convertTemp;
    $scope.toLocaleTime = weatherService.toLocaleTime;

    $scope.$watch(function() {
        return weatherService.city;
    }, function(newVal) { 
        
        $scope.city = newVal;
    }, true);

    $scope.$watch(function() {
        return weatherService.units;
    }, function(newVal) { 
        if(!newVal) return;
        $scope.radioUnits = newVal;
    }, true);
    
    $scope.$watch(function() { 
        return weatherService.currentForecast; 
    }, function(newVal) { 
        if(!newVal) return;
        $scope.currentForecast = newVal;
    }, true);

}]);

weather.controller('weekController', ['$scope', '$filter', 'weatherService', function($scope, $filter, weatherService) {

    $scope.convertToDate = weatherService.convertToDate;
    $scope.convertTemp = weatherService.convertTemp;
    $scope.toLocaleTime = weatherService.toLocaleTime;

    $scope.$watch(function() {
        return weatherService.city;
    }, function(newVal) { 
        if(!newVal) return;
        $scope.city = newVal;
    }, true);

    $scope.$watch(function() {
        return weatherService.units;
    }, function(newVal) { 
        if(!newVal) return;
        $scope.radioUnits = newVal;
    }, true);
    
    $scope.$watch(function() { 
        return weatherService.currentForecast; 
    }, function(newVal) { 
        if(!newVal) return;
        $scope.currentForecast = newVal;
    }, true);

}]);

weather.controller('settingsController', ['$scope', 'weatherService', function($scope, weatherService) {
    var storageAvailable = weatherService.storageAvailable;

    if (storageAvailable('localStorage') && localStorage.getItem('weatherLocation')) {
        $scope.weatherLocation = localStorage.getItem('weatherLocation');
    }

    $scope.submit = function() {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('weatherLocation', $scope.weatherLocation);
            weatherService.city = $scope.weatherLocation;
        } else {
            alert('Sorry, your browser does not allow for storage of a default location.')
        }
    };
}]);
