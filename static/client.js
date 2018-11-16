var loc = window.location;
const HOSTURL = `${loc.protocol}//${loc.hostname}:${loc.port}`;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioStream;
var recorder;

function startRecording() {
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
}

function stopRecording() {
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
            $('#try_again').html(htmlForTryAgain());
        },
        error: function(response) {
            $('#try_again').html(htmlForTryAgain());
        }
    });
}

function backToInitialState() {
    $('#display').html(htmlForRecord());
    $('#try_again').html("<button class=\"secondary_button\" type=\"button\" onclick=\"backToInitialState()\">Upto 5 seconds</button>");
}

function htmlForRecord() {
    return "<button class=\"record_button\" type=\"button\" onclick=\"startRecording()\">RECORD</button>";
}

function htmlForRecording() {
    return "<button class=\"record_button\" type=\"button\" onclick=\"stopRecording()\">STOP</button>";
}

function htmlForAnalyzing() {
    return "<button class=\"record_button\" type=\"button\">Analyzing...</button>";
}

function htmlForResult(prediction) {
    if (prediction) {
        return "<button class=\"record_button\" type=\"button\" onclick=\"backToInitialState()\">CRYING :(</button>";
    }
    return "<button class=\"record_button\" type=\"button\" onclick=\"backToInitialState()\">NOT CRYING :)</button>";
}

function htmlForTryAgain() {
    return "<button class=\"secondary_button\" style=\"cursor: pointer;\" type=\"button\" onclick=\"backToInitialState()\">Try again</button>";
}