var myApp = angular.module('myApp', []);

myApp.controller('appCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
	$log.debug('Starting...');
	var aC = this;
	
	aC.addContact = function() {
		$http.post("/api/addContact", JSON.stringify(aC.contact)).then(function(res){
			$log.debug('Adding Contact...');
			if (res.status === 200) {
				$log.info('Added Contact...');

				aC.contact.name = '';
				aC.contact.email = '';
				aC.contact.number = '';

				console.log(res.data);
				aC.refreshList();
			} else {
				$log.error('Did not receive 200 Status Code');
			};
		});
	}
	aC.refreshList = function() {
		$http.get('/contactList').then(function(res) {
			$log.debug('Refreshing List...');
			console.log(res);
			if (res.status === 200) {
				$log.info('Refreshed List...');
				aC.contactList = res.data
			} else {
				$log.error('Did not receive 200 Status Code');
			};
			
		});
	}

	aC.remove = function(id) {
		$log.debug('Removing ' + id);
		$http.delete('/contactList/' + id).then(function(res) {
			console.log(res);
			aC.refreshList();
		});
	}
	aC.refreshList();
}]);

