$(document).ready(function() {

    var peer_id = $.url().param('id');
    var peer = new Peer({key: 'lwjd5qra8257b9'});

    peer.on('open', function(id) {

        $('#the_link').prop('href', 'http://esneider.github.io/files/index.html?id=' + id);
        $('#the_link').text('Click here');
    });

    if (typeof peer_id === 'undefined') {

        peer.on('connection', function(conn) {

            console.log('Received a new connection');

            // while (true) {
                conn.send('Hello world!');
            // }
        });

    } else {

        var conn = peer.connect(peer_id);

        conn.on('open', function() {

            console.log('Opened connection');

            conn.on('data', function(data) {

                console.log('Received:', data);
            });
        });
    }
});
