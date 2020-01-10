angular.module('app', [])
    .controller('zdToolsController', function ($scope) {
        //var zdTools = this;
        var self = $scope;
        self.validInput = {
            'checkCyrillicCheckedByZdTools': true,
            'checkCyrillicSpamDetected': true,
            'checkStringCheckedByZdTools': true,
            'checkStringSpamDetected': true,
            'zdApiBaseUrlValid': true,
            'zdApiTokenValid': true,
            'zdEmailValid': true
        };

        self.tagNames = {
            'checkCyrillic': {
                'spamDetected': '',
                'noSurvey': '',
                'checkedByZdTools': '',
                'reviewedForSpam': ''
            },
            'checkString': {
                'spamDetected': '',
                'noSurvey': '',
                'checkedByZdTools': '',
                'reviewedForSpam': ''
            }
        };

        // Get Zendesk credentials: base64-encode [email + '/token:' + token]
        self.getZdCredentials = function (email, token) {
            var zdCredentials = btoa(email + '/token:' + token);
            //console.log('Credentials to encode: ' + email + '/token:' + token + ', encoded credentials: ' + zdCredentials);
            return zdCredentials;
        };

        // Log message (to console)
        self.logMessage = function (message) {
            console.log(message);
        };

        // Start processing tickets
        self.processTicketsStart = function () {
            if (!self.validateInput()) {
                return;
            }

            self.zdCredentials = self.getZdCredentials(self.zdEmail, self.zdApiToken);
            //console.log('self.zdCredentials: ' + self.zdCredentials);

            self.logMessage('Starting ticket processing');

            self.processTickets();

        };

        // Process tickets
        self.processTickets = function () {
            var done = false;
            var apibrandUrlPart = self.zdBrand ? ' brand: "' + self.zdBrand + '"' : '';
            var defaultApiUrl = self.zdApiBaseUrl + '/api/v2/search.json?query=type:ticket' + apibrandUrlPart + ' status<closed';
            console.log('defaultApiUrl: ' + defaultApiUrl);

            var lastQueryResult = null;

            while (!done) {

                // query tickets 
                zdTicketService.queryTickets(defaultApiUrl, lastQueryResult).then(function (data) {
                    if (!data) {
                        done = true;
                        break;
                    }
                    lastQueryResult = data;

                    zdTicketService.processTickets(data).then(function () {

                    });
                });
                //if (result.count === 0) {
                //    done = true;
                //    break;
                //}

                // process tickets

                // set URL for next query, according to whether need to keep paging through results
                //if (result.next_page) {
                //    apiUrl = result.next_page;
                //    console.log('Next page, apiUrl: ' + apiUrl);
                //}
                //else {
                //    apiUrl = defaultApiUrl;
                //    console.log('Starting again, apiUrl: ' + apiUrl);
                //}
                //done = true;
            }
        };


        // Validate input
        self.validateInput = function () {
            // If checking for Cyrillic characters, tags for spam detected and checked by ZdTools must be specified
            self.validInput.checkCyrillicCheckedByZdTools = (!self.checkCyrillic) || (self.checkCyrillic && self.tagNames.checkCyrillic.tagCheckedByZdTools);
            self.validInput.checkCyrillicSpamDetected = (!self.checkCyrillic) || (self.checkCyrillic && self.tagNames.checkCyrillic.spamDetected);

            // If checking for string, tags for spam detected and checked by ZdTools must be specified
            self.validInput.checkStringCheckedByZdTools = (!self.checkString) || (self.checkString && self.tagNames.checkString.tagCheckedByZdTools);
            self.validInput.checkStringSpamDetected = (!self.checkString) || (self.checkString && self.tagNames.checkString.spamDetected);

            // API base URL must be specified
            self.validInput.zdApiBaseUrlValid = !!self.zdApiBaseUrl;

            // Email and token must be specified
            self.validInput.zdApiTokenValid = !!self.zdApiToken;
            self.validInput.zdEmailValid = !!self.zdEmail;
            return self.validInput.checkCyrillicSpamDetected && self.validInput.checkCyrillicCheckedByZdTools &&
                self.validInput.checkStringSpamDetected && self.validInput.checkStringCheckedByZdTools &&
                   self.validInput.zdApiBaseUrlValid && self.validInput.zdApiTokenValid && self.validInput.zdEmailValid;
        };

    });