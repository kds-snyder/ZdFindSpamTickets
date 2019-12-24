angular.module('app', [])
    .controller('zdToolsController', function ($scope) {
        //var zdTools = this;
        var self = $scope;
        self.validInput = {
            'tagCyrillicFoundValid': true,
            'tagStringFoundValid': true,
            'zdApiTokenValid': true,
            'zdEmailValid': true
        };

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
            self.validInput.tagCyrillicFoundValid = (!self.checkCyrillic) || (self.checkCyrillic && self.tagCyrillicFound)

            // If checking for string, tag must be specified
            self.validInput.tagStringFoundValid = (!self.checkString) || (self.checkString && self.tagStringFound)

            // email and token must be specified
            self.validInput.zdApiTokenValid = !!self.zdApiToken;
            self.validInput.zdEmailValid = !!self.zdEmail;
            return self.validInput.tagCyrillicFoundValid && self.validInput.tagStringFoundValid &&
                            self.validInput.zdApiTokenValid && self.validInput.zdEmailValid;
        };

    });