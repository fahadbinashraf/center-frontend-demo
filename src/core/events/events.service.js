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
        var current_events = DEMO_EVENTS.filter(
            item => item.time.isSame(period, 'day'));

        var prev_events = DEMO_EVENTS.filter(
            item => item.time.isSame(moment(period).subtract(1, 'day'), 'day'));


        events.stats = calculateStats(current_events, prev_events);
    };

    function calculateStats(events, prev_events) {
        return [
            {
                title: "Total blood sugar events",
                value: events.length > 0 ? events.length : undefined,
                value_class: "normal",
                unit: "events",
                context_value: prev_events.length > 0 ? prev_events.length : undefined,
                context_class: "normal"
            },
            {
                title: "Average blood sugar",
                value: events.length > 0 ? (events.reduce(function (accumulator, current_value) {
                    return accumulator + current_value.value
                }, 0) / events.length).toFixed(0) : undefined,
                value_class: "normal",
                unit: "mg/dl",
                context_value: prev_events.length > 0 ? (prev_events.reduce(function (accumulator, current_value) {
                    return accumulator + current_value.value
                }, 0) / prev_events.length).toFixed(0) : undefined,
                context_class: "warning"
            },
            {
                title: "Events between 70 and 180",
                value: events.length > 0 ? (events.filter(function (item) {
                    return item.value >= 70 && item.value <= 180
                }).length * 100 / events.length).toFixed(0) : undefined,
                value_class: "good",
                unit: "%",
                context_value: prev_events.length > 0 ? (prev_events.filter(function (item) {
                    return item.value >= 70 && item.value <= 180
                }).length * 100 / prev_events.length).toFixed(0) + '%' : undefined,
                context_class: "good"
            }
        ];
    }

    return events;

});
