$(document).ready(function() {

    var server_id = $.url().param('id');
    var client_id = undefined;
    var peer = new Peer({key: 'lwjd5qra8257b9'});

    peer.on('error', function(err) {

        console.log('Damnation! ' + err.type);
    });

    peer.on('open', function(id) {

        client_id = id;

        $('#the_link').prop('href', 'http://esneider.github.io/files/index.html?id=' + id);
        $('#the_link').text('Click here');
    });

    if (typeof server_id === 'undefined') {

        peer.on('connection', function(conn) {

            console.log('Received a new connection');

            console.log(conn);

            conn.on('data', function(data) {

                console.log('Received:', data);
            });

            conn.send('Hello world form server');
        });

    } else {

        var conn = peer.connect(server_id);

        conn.on('open', function() {

            console.log('Opened connection');

            conn.on('data', function(data) {

                console.log('Received:', data);
            });

            conn.send('Hello world from client');
        });
    }
});
