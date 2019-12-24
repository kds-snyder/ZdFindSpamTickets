angular.module('app', [])
    .controller('zdToolsController', function ($scope) {
        //var zdTools = this;
        var self = $scope;
        self.zdEmailNotValid = false;

        // Get Zendesk credentials: base64-encode [email + '/token:' + token]
        self.getZdCredentials = function (email, token) {
            var zdCredentials = btoa(email + '/token:' + token);
            console.log('Credentials to encode: ' + email + '/token:' + token + ', encoded credentials: ' + zdCredentials);
            return zdCredentials;
        };

        // Start checking tickets
        self.startCheckTickets = function () {
            if (!self.validateInput()) {
                return;
            }

            self.zdCredentials = self.getZdCredentials(self.zdEmail, self.zdApiToken);
            console.log('self.zdCredentials: ' + self.zdCredentials);
        };

        self.validateInput = function () {
            return true;
        };

    });