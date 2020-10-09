'use strict';

// Register `statistics` component, along with its associated controller and template
angular.module('statsView').component('statsView', {
    templateUrl: 'stats-view/stats-view.template.html',
    controller: ['Events',
        function StatsListController(Events) {
            var self = this;
            self.events = Events;
        }]

});
