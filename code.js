function create_link(id) {

    $('#the_link').prop('href', 'http://esneider.github.io/files/index.html?sid=' + id);
    $('#the_link').text('Click here');
}

function server_peer(peer) {

    peer.on('open', create_link);

    peer.on('connection', function(conn) {

        console.log('Received a connection');

        var client_id = conn.peer;

        conn.destroy();

        var conn2 = peer.connect(client_id);

        conn2.on('open', function() {

            conn2.send('Hey there! :)');
        });
    });
}

function client_peer(peer, server_id) {

    var conn = peer.connect(server_id);

    conn.on('open', function() {

        console.log("I'm a peer");

        conn.destroy();
    });

    peer.on('connection', function(conn) {

        console.log('Received a connection');

        conn.on('data', function(data) {

            console.log('Receiced:', data);
        });
    });
}

$(document).ready(function() {

    var server_id = $.url().param('sid');
    var peer = new Peer({key: 'lwjd5qra8257b9'});

    peer.on('error', function(err) {

        console.log('Damnation! ' + err.type);
    });

    if (typeof server_id === 'undefined') {

        console.log("I'm a server");

        server_peer(peer);

    } else {

        console.log("I'm a client");

        client_peer(peer, server_id);
    }
});
