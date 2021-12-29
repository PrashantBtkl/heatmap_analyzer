var ws = new WebSocket("ws://localhost:8765");
const ses_id = uuidv4();
const pg_id = "694da4d3-56c1-4ce5-a8e9-e5ab7462a78b";

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};

(function() {
    "use strict";


    initWatchers();
    console.log('Initializing Visitor Tracker done.');


    function initWatchers() {
        // watch mouse clicks
        watch(document, 'click', function(event) {
            return { session_id: ses_id, page_id: pg_id, x: event.clientX, y: event.clientY };
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
		ws.send(JSON.stringify(event));
        console.log(event);
    }
})();
