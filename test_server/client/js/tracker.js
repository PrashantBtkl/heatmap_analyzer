var ws = new WebSocket("ws://localhost:8765");
(function() {
    "use strict";


    initWatchers();
    console.log('Initializing Visitor Tracker done.');


    function initWatchers() {
        // watch mouse clicks
        watch(document, 'click', function(event) {
            return { type: 'MOUSE_CLICK', x: event.clientX, y: event.clientY };
        });

        // watch mouse move
       // watch(document, 'mousemove', function(event) {
       //     return { type: 'MOUSE_MOVE', x: event.clientX, y: event.clientY };
       // });
    }

    function watch(target, eventName, transformEventCb, callCbOnInit) {
        if (callCbOnInit) {
            handleEvent(transformEventCb(null));
        }

        target.addEventListener(eventName, function(event) {
            handleEvent(transformEventCb(event));
        }, true);
    }

    function handleEvent(event) {
        event.ts = new Date().getTime();
		ws.send(JSON.stringify(event));
        console.log(event);
    }
})();
