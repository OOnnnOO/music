// var audio = document.getElementById('audio');

var playlist = [
    {
        "title": "悟",
        "artist": "刘德华",
        "filename": "悟_刘德华.mp3"
    },
    {
        "title": "寻",
        "artist": "三亩地",
        "filename": "三亩地 - 寻.mp3"
    },
    {
        "title": "理想",
        "artist": "赵雷",
        "filename": "赵雷 - 理想.mp3"
    },
    {
        "title": "离不开你",
        "artist": "陈小春",
        "filename": "陈小春 - 离不开你.mp3"
    }


];
var audio, timeout, song, songId;
songId = 1;


function loadMusic(songId) {
    var item = playlist[songId];
    var newAudio = "<audio src='https://dn-blogme.qbox.me/music/" + item['filename'] + "'></audio>";
    $('#music-box').append(newAudio);
    audio = $(newAudio)[0];
    $('.music-title').html(item['title']);
    $('.music-artist').html(item['artist']);
    audio.addEventListener('ended', ended, false);
    play();
}

var play = function () {
    audio.play();
    $('.playback').addClass('playing');
    timeout = setInterval(updateProgress, 500);
};
var pause = function () {
    audio.pause();
    $('.playback').removeClass('playing');
    clearInterval(timeout);
};

var updateProgress = function () {
    var p = parseInt(audio.currentTime / audio.duration * 100);
    var m = parseInt((audio.duration - audio.currentTime) / 60);
    var s = parseInt(audio.duration - audio.currentTime - 60 * m);
    $('.music-progress').attr('value', p).html(p + "%");
    $('#leftTime').html(m + ":" + s);
};

var switchTrack = function (i) {
    if (i < 0) {
        song = songId = playlist.length - 1;
    } else if (i >= playlist.length) {
        song = songId = 0;
    } else {
        song = songId = i;
    }
    $('audio').remove();
    loadMusic(song);
};


var ended = function () {
    pause();
    audio.currentTime = 0;
    switchTrack(songId += 1)
};

loadMusic(songId);

// click play button
$('.playback').on('click', function () {
    if ($(this).hasClass('playing')) {
        pause();
    } else {
        play();
    }
});

// prev
$('.prev').on('click', function () {
    switchTrack(songId -= 1)
});
// next
$('.next').on('click', function () {
    switchTrack(songId += 1)
});



