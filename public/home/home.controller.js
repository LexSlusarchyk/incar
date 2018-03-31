(function () {
	'use strict';

	angular
		.module('lnd')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$rootScope', 'adsService', 'eventsService', 'newsService', 'translateService'];
	/* @ngInject */
	function HomeController($rootScope, adsService, eventsService, newsService, translateService) {
		var vm = this;
        vm.home = translateService.data.lang['home'];


		activate();

		function activate() {

			adsService.getMainAd().then(function(response) {
				vm.mainAudio = response.data;
			});

			eventsService.getLastEvents().then(function(response) {
				vm.maxLength = 3;

                vm.events = response.data;
                eventsService.getFixedEvents().then(function(response) {
                    if(response.data.length < 6) {
                        vm.events = response.data.concat(vm.events).slice(0, 6);
                    } else {
                        vm.events = response.data;
                    }
                });
			});

			newsService.getLastNews().then(function(response) {
				vm.news = response.data;
			});

            $rootScope.$on('lang-changed', function() {
                vm.home = translateService.data.lang['home'];
            });

		}
	}
})();