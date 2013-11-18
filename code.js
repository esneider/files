var file_list = []

function create_link(id) {

    $('#the_link').prop('href', 'http://esneider.github.io/files/index.html?sid=' + id);
    $('#the_link').text('Click here');
}

function server_peer(peer) {

    peer.on('open', create_link);

    peer.on('connection', function(conn) {

        console.log('Received a connection');

        var client_id = conn.peer;

        conn.close();
        conn = peer.connect(client_id);

        conn.on('error', function(err) { console.log('Double damnation! ' + err.type); })

        conn.on('open', function() {

            conn.send(file_list[0]);
            // conn.send('Hey there! :)');
        });
    });
}

function client_peer(peer, server_id) {

    var conn = peer.connect(server_id);

    conn.on('open', function() { console.log("Poking server"); });

    peer.on('connection', function(conn) {

        conn.on('error', function(err) { console.log('Double damnation! ' + err.type); })

        conn.on('data', function(data) {

            console.log('Received:', data);

            if (data instanceof ArrayBuffer) {

                console.log("ArrayBuffer!");
                var blob = new Blob([data]);
                var url = window.URL.createObjectURL(blob);
                $('the_link').attr('href', url);
                $('the_link').text('Download');
            }
        });
    });
}

function update_file_list(list) {

    var output = [];

    for (var i = 0, f; f = list[i]; i++) {

        output.push('<li>',
                        '<strong>', $('<div/>').text(f.name).html(), '</strong> ',
                        '(', f.type || 'n/a', ') - ',
                        f.size, ' bytes, last modified: ',
                        f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
    }

    $('#file_list').html('<ul>' + output.join('') + '</ul>');
}

function handleFileSelect(evnt) {

    evnt.stopPropagation();
    evnt.preventDefault();

    var list = evnt.originalEvent.dataTransfer.files;

    for (var i = 0, f; f = list[i]; i++) {
        file_list.push(f);
    }

    update_file_list(file_list);
}

function handleDragOver(evnt) {

    evnt.stopPropagation();
    evnt.preventDefault();

    evnt.originalEvent.dataTransfer.dropEffect = 'copy';
}

function init_drop_zone() {

    var $dropZone = $('#drop_zone');

    $dropZone.on('dragover', handleDragOver);
    $dropZone.on('drop', handleFileSelect);
}

$(document).ready(function() {

    var server_id = $.url().param('sid');
    var peer = new Peer({key: 'lwjd5qra8257b9'});

    peer.on('error', function(err) { console.log('Damnation! ' + err.type); });

    if (typeof server_id === 'undefined') {

        console.log("I'm a server");
        init_drop_zone();
        server_peer(peer);

    } else {

        console.log("I'm a client");
        client_peer(peer, server_id);
    }
});

