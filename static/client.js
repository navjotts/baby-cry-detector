var loc = window.location;
const HOSTURL = `${loc.protocol}//${loc.hostname}:${loc.port}`;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioStream;
var recorder;
var audioChunkInterval = 5000; // 5 seconds
var stopped = false;

function startRecording() {
    stopped = false;
    $('#display').html(htmlForRecording());
    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function(stream) {
        var audioContext = new AudioContext();
        audioStream = stream;
        var audioInput = audioContext.createMediaStreamSource(stream);
        recorder = new Recorder(audioInput, {numChannels:1});
        recorder.record();
        console.log('recording started...');
    }).catch(err => {
        console.log('recording failed...', err);
        backToInitialState();
    });

    setTimeout(stopChunk, audioChunkInterval);
}

function stopRecording() {
    stopped = true;
    $('#display').html(htmlForStopping());
}

function stopChunk() {
    recorder.stop();
    audioStream.getAudioTracks()[0].stop(); // microphone access
    recorder.exportWAV(uploadAudio);
}

function uploadAudio(blob) {
    $('#display').html(htmlForAnalyzing());
    var audioData = new FormData();
    audioData.append('file', blob, 'test.wav');
    $.ajax({
        url: `${HOSTURL}/analyze`,
        type: 'POST',
        data: audioData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log('uploadAudio()', response);
            $('#display').html(htmlForResult(response['crying']));
            chunkEnded(response['crying'])
        },
        error: function(response) {
            $('#try_again').html(htmlForTryAgain());
        }
    });
}

function chunkEnded(result) {
    if (stopped) {return;}
    var number = '+16507402077';
    if (number && result) {
        $.ajax({
            url: `${HOSTURL}/notify?number=${number}`,
            success: function(response) {
                console.log('notify()', response);
            },
            error: function(response) {
                $('#try_again').html(htmlForTryAgain());
            }
        });
    }
    startRecording();
}

function backToInitialState() {
    $('#display').html(htmlForRecord());
    $('#try_again').html("<button class=\"secondary_button\" type=\"button\" onclick=\"backToInitialState()\">Listening to audio</button>");
}

function htmlForRecord() {
    return "<button id=\"record_button\" class=\"record_button\" type=\"button\" onclick=\"startRecording()\">START</button>";
}

function htmlForRecording() {
    return "<button id=\"record_button\" class=\"record_button\" type=\"button\" onclick=\"stopRecording()\">STOP</button>";
}

function htmlForStopping() {
    return "<button id=\"record_button\" class=\"record_button\" type=\"button\">STOPPING</button>";
}

function htmlForAnalyzing() {
    return "<button id=\"record_button\" class=\"record_button\" type=\"button\">Analyzing...</button>";
}

function htmlForResult(prediction) {
    if (prediction) {
        return "<button id=\"record_button\" class=\"record_button\" type=\"button\" onclick=\"backToInitialState()\">CRYING :(</button>";
    }
    return "<button id=\"record_button\" class=\"record_button\" type=\"button\" onclick=\"backToInitialState()\">NOT CRYING :)</button>";
}

function htmlForTryAgain() {
    return "<button class=\"secondary_button\" style=\"cursor: pointer;\" type=\"button\" onclick=\"backToInitialState()\">Try again</button>";
}