weather.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/today');
    
    $stateProvider
        
        .state('today', {
            url: '/today',
            templateUrl: 'pages/today.html',
            controller: 'todayController'
        })

        .state('week', {
            url: '/week',
            templateUrl: 'pages/week.html',
            controller: 'weekController'
        })
        
        .state('settings', {
            url: '/settings',
            templateUrl: 'pages/settings.html',
            controller: 'settingsController'
        }) 
        
});