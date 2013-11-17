$(document).ready(function() {

    var peer = new Peer({key: 'lwjd5qra8257b9'});

    peer.on('open', function(id) {

        console.log('My peer ID is: ' + id);

        $('#the_link').prop('href', 'http://esneider.github.io/files/index.html?id=' + id);
        $('#the_link').text('Click here');
    });

    peer.on('connection', function(conn) {

        console.log('Received a new connection');
    });

    console.log('Got id=' + $.url().param('id'));
});
