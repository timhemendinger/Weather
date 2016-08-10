weather.service('weatherService', function($resource, $http, $q, $filter){

    this.currentForecast = null;

    this.units = 'f';

    // default city
    this.city = 'Chicago, IL';

    this.getForecast = function(location) {

         return $q.all([
            $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q="+location+"&mode=json&cnt=7&appid=e92f550a676a12835520519a5a2aef4b"), 
            $http.get("http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=e92f550a676a12835520519a5a2aef4b")
        ]);

    };

    this.convertTemp = function(temp, units) {
        if(units === 'c') {
            return Math.round(temp-273.15);
        } else {
            return Math.round((1.8*(temp - 273))+32);
        }
        
    }

    this.convertToDate = function(dt) {  
        var date = new Date(dt * 1000);
        return ($filter('date')(date, 'EEEE, MMM d'));
    };

    this.toLocaleTime = function(timestamp) {
      var d = new Date(timestamp * 1000),   // Convert the passed timestamp to milliseconds
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            ampm = 'AM',
            time;
                
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
      
        // ie: 2013-02-18, 8:35 AM  
        time = h + ':' + min + ' ' + ampm;
            
        return time;
    }


});