'use strict';

// Register `dateSelector` component, along with its associated controller and template
angular.module('dateSelector').component('dateSelector', {
    templateUrl: 'date-selector/date-selector.template.html',
    controller:['Events',
        function DateSelectorController(Events) {
            var self = this;

            self.period = moment();
            Events.updateStats(self.period);

            self.updatePeriod = function updatePeriod(params) {
                switch (params.action) {
                    case 'prev':
                        self.period.subtract(1, 'day');
                        break;
                    case 'next':
                        self.period.add(1, 'day');
                        break;
                }
                Events.updateStats(self.period);
            };

            self.events = Events;
        }

]});
