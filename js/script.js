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
var audio, timeout, currentTrack = 0;
var volume = localStorage.volume || 0.5;
var playlistItem = "";
for (var i = 0; i < playlist.length; i++) {
    playlistItem += "<li>" + playlist[i]['title'] + "-" + playlist[i]['artist'] + "</li>";

}
$("#playlist").html(playlistItem);


function loadMusic(song) {
    var item = playlist[song];
    var newAudio = $("<audio>").html("<source src='https://dn-blogme.qbox.me/music/" + item['filename'] + "'>").appendTo('#music-box');
    // var newAudio = $("<audio>").html("<source src='./music/" + item['filename'] + "'>").appendTo('#music-box');
    audio = $(newAudio)[0];
    $('.music-title').html(item['title']);
    $('.music-artist').html(item['artist']);
    audio.addEventListener('ended', ended, false);
    audio.addEventListener('timeupdate', updateProgress, false);
    audio.addEventListener('canplay', play, false);
    $('#downloadLink').attr('href', "./music/" + item['filename']);
    audio.volume = volume;
    $('#volume').val(volume);
    $('#playlist').children().removeClass('active').eq(song).addClass('active');
}

var play = function () {
    audio.play();
    $('#play-btn').css('display', 'none');
    $('#pause-btn').css('display', 'inline');
};
var pause = function () {
    audio.pause();
    $('#play-btn').css('display', 'inline');
    $('#pause-btn').css('display', 'none');
};
// 更新时间，进度条
var updateProgress = function () {
    var currentProgress = parseInt(audio.currentTime / audio.duration * 100);
    var m = parseInt(audio.currentTime / 60);
    var s = parseInt(audio.currentTime % 60);
    var am = parseInt(audio.duration / 60);
    var as = parseInt(audio.duration % 60);
    if (s < 10) {
        s = '0' + s;
    }
    if (as < 10) {
        as = '0' + as;
    }
    $('.music-progress').attr('value', currentProgress).html(currentProgress + "%");
    $('#leftTime').html(m + ":" + s + " / " + am + ":" + as);
};

var switchTrack = function (i) {
    if (i < 0) {
        currentTrack = playlist.length - 1;
    } else if (i >= playlist.length) {
        currentTrack = 0;
    } else {
        currentTrack = i;
    }
    $('audio').remove();
    loadMusic(currentTrack);
};

var ended = function () {
    audio.currentTime = 0;
    switchTrack(currentTrack += 1);
};


loadMusic(currentTrack);

// click play button
$('#play-btn').on('click', function () {
    play();
});
$('#pause-btn').on('click', function () {
    pause();
});

// prev
$('.prev').on('click', function () {
    switchTrack(--currentTrack);
});
// next
$('.next').on('click', function () {
    switchTrack(++currentTrack);
});
// 设置声音
$('#volume').on('input', function () {
    $('audio')[0].volume = localStorage.volume = volume = $('#volume').val();

});

$('#playlist').children().on('click', function () {
    switchTrack($(this).index());

});


