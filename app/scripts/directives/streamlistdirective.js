'use strict';
/**
 * @ngdoc directive
 * @name troutDashApp.directive:StreamListDirective
 * @description
 * # StreamListDirective
 */
angular.module('troutDashApp')
  .directive('streamList', function (StreamApiService) {
    return {
    	templateUrl: '/views/streamlisttemplate.html',
      	restrict: 'A',
      	link: function postLink(scope, element, attrs) {
      		scope.stage = {
      			isLoaded: false,
      			streams: null,
      			selectedStream: null
      		};

	        StreamApiService.getRegions()
    				.then(function(regions) {
                        // regions.sort(function(a, b) {
                        //     var nameA = a.RegionName.toLowerCase();
                        //     var nameB = b.RegionName.toLowerCase();

                        //     if (nameA < nameB) {
                        //         return -1;
                        //     }

                        //     if (nameA > nameB) {
                        //         return 1;
                        //     }

                        //     return 0;
                        // });
    					scope.stage.regions = regions;
    				});

			scope.$watch('stage.streams', function(newStreams, oldStreams) {
				if (newStreams == null) {
					return;
				}


			});

			scope.$watch('stage.selectedStream', function(newSelectedStream, oldSelectedStream) {
				if (newSelectedStream == null) {
					return;
				}


			});
      	}
	};
});
