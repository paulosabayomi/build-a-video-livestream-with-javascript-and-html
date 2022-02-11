const videoElem = document.getElementById('stream-elem')

var startBtn = document.getElementById('start-stream')
var endBtn = document.getElementById('stop-media')

var recorder;

const settings = {
video: true,
audio: true
}

startBtn.addEventListener('click', function (e) {
    navigator.mediaDevices.getUserMedia(settings).then((stream) => {
        console.log(stream);
        videoElem.srcObject = stream

        recorder = new MediaRecorder(stream)
        console.log(recorder);

        recorder.start();

        const blobContainer = [];

        recorder.ondataavailable = function (e) {
            
            blobContainer.push(e.data)
        }

        recorder.onerror = function (e) {
            return console.log(e.error || new Error(e.name));
        }

        

        
        recorder.onstop = function (e) {
            console.log(window.URL.createObjectURL(new Blob(blobContainer)));
            var newVideoEl = document.createElement('video')
            newVideoEl.height = '400'
            newVideoEl.width = '600'
            newVideoEl.autoplay = true
            newVideoEl.controls = true
            newVideoEl.innerHTML = `<source src="${window.URL.createObjectURL(new Blob(blobContainer))}"
             type="video/mp4">`
            document.body.removeChild(videoElem)
            document.body.insertBefore(newVideoEl, startBtn);

            var formdata = new FormData();
            formdata.append('blobFile', new Blob(blobContainer));


            fetch('uploader.php', {
                method: 'POST',
                body: formdata
            }).then(()=>{
                alert('streamed video file uploaded')
            })
        }




    })
    
})

endBtn.addEventListener('click', function (e) {
    videoElem.pause();
    recorder.stop();
})

