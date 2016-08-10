/* global eventHelper */

var newAudio = new Audio();
if (newAudio.canPlayType('audio/mpeg')) {
    newAudio.src = 'media/837[kb]074_heartbeat-noise-machine.wav.mp3';
    if (newAudio.readyState === newAudio.HAVE_ENOUGH_DATA) {
        newAudio.play();
    }
    if (
            newAudio.error &&
            newAudio.error.code === newAudio.error.MEDIA_ERR_DECODE
            ) {
        alert('Can\'t play song: corrupt audio data.');
    }
}
eventHelper.addEvent(window, 'load', function () {
    document.getElementById('music').play();
});
var percentLoaded;
try {
    percentLoaded = Math.floor(
            newAudio.buffered.end(0) / newAudio.duration * 100
            );
} catch (e) {

}
