angular.module('app', [])
    .controller('zdToolsController', function ($scope) {
        //var zdTools = this;
        var self = $scope;
        self.zdApiTokenValid = true;
        self.zdEmailValid = true;

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
            // email and token must be specified
            self.zdApiTokenValid = !!self.zdApiToken;
            self.zdEmailValid = !!self.zdEmail;
            return self.zdApiTokenValid && self.zdEmailValid;
        };

    });