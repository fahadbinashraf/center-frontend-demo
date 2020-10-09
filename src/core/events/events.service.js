'use strict';

angular.module('events').factory('Events', function () {

    var DEMO_EVENTS = [
        {value: 100, time: moment()},
        {value: 155, time: moment()},
        {value: 83, time: moment()},
        {value: 211, time: moment().subtract(1, 'day')},
        {value: 138, time: moment().subtract(1, 'day')},
        {value: 55, time: moment().subtract(1, 'day')},
        {value: 183, time: moment().subtract(2, 'day')},
        {value: 103, time: moment().subtract(2, 'day')},
        {value: 98, time: moment().subtract(3, 'day')}
    ];

    var events = {};

    events.updateStats = function (period) {
        events.current_events = DEMO_EVENTS.filter(
            item => item.time.isSame(period, 'day'));

        events.prev_events = DEMO_EVENTS.filter(
            item => item.time.isSame(moment(period).subtract(1, 'day'), 'day'));

        events.next_events = DEMO_EVENTS.filter(
            item => item.time.isSame(moment(period).add(1, 'day'), 'day'));

        events.current_stats = calculateStats(events.current_events);
        events.prev_stats = calculateStats(events.prev_events);
    };

    function calculateStats(events){
        var stats = {};
        if(events.length > 0){
            stats.total = events.length;
            stats.avg = events.length > 0 ? (events.reduce(function (accumulator, current_value){
                return accumulator + current_value.value
            }, 0) / stats.total).toFixed(0) : 0;

            stats.events_between_70_and_180 = (events.filter(item =>
                item.value >= 70 && item.value <= 180).length * 100 / stats.total).toFixed(0);
        }
        return stats;
    }

    return events;

});
