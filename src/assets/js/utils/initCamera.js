'use strict';

function initCamera () {

    var video = document.querySelector('#video');
    var canvas = document.querySelector('#canva');
    var button = document.querySelector('#button');
    var img = document.querySelector('#img');

    canvas.style.display = 'none';
    img.style.display = 'none';

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, function (error) { console.log(error); })
    } else alert("Tienes un navegador obsoleto");

    video.addEventListener('loadedmetadata', function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }, false);

    button.addEventListener('click', function () {
        canvas.getContext('2d').drawImage(video, 0, 0);
        var imgData = canvas.toDataURL('image/png');
        img.setAttribute('src', imgData);
        state.photoTaken = imgData;
        console.log(imgData);
        img.style.display = 'block';
        video.style.display = 'none';
    });
}