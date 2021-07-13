<?php

var_dump($_FILES);

move_uploaded_file($_FILES['blobFile']['tmp_name'], 'streamed_video.mp4');