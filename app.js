angular.module('app', [])
    .controller('zdToolsController', function ($scope) {
        //var zdTools = this;
        var self = $scope;
        self.tagCyrillicFoundValid = true;
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
            // If checking for Cyrillic characters, tag must be specified
            self.tagCyrillicFoundValid = (!self.checkCyrillic) || (self.checkCyrillic && self.tagCyrillicFound)

            // email and token must be specified
            self.zdApiTokenValid = !!self.zdApiToken;
            self.zdEmailValid = !!self.zdEmail;
            return self.tagCyrillicFoundValid && self.zdApiTokenValid && self.zdEmailValid;
        };

    });