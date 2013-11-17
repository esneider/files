function server_peer() {

    var peer = new Peer({key: 'lwjd5qra8257b9'});

    peer.on('error', function(err) {

        console.log('(client_peer) Damnation! ' + err.type);
    });

    peer.on('open', function(id) {

        $('#the_link').prop('href', 'http://esneider.github.io/files/index.html?sid=' + id);
        $('#the_link').text('Click here');
    });

    peer.on('connection', function(conn) {

        var client_id = conn.peer;

        conn.destroy();

        var conn2 = peer.connect(client_id);

        conn2.on('open', function() {

            conn2.send('Hey there! :)');
        });
    });
}

function client_peer(server_id) {

    var peer = new Peer({key: 'lwjd5qra8257b9'});
    var conn = peer.connect(server_id);

    conn.on('open', function() {

        conn.destroy();
    });

    peer.on('error', function(err) {

        console.log('(client_peer) Damnation! ' + err.type);
    });

    peer.on('connection', function(conn) {

        conn.on('data', function(data) {

            console.log('Receiced:', data);
        });
    });
}

$(document).ready(function() {

    var server_id = $.url().param('sid');

    if (typeof server_id === undefined) {

        server_peer();

    } else {

        client_peer(server_id);
    }
});
