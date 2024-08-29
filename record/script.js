const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const qualitySelect = document.getElementById('qualitySelect');
const audioToggle = document.getElementById('audioToggle');
const cameraToggle = document.getElementById('cameraToggle');
const preview = document.getElementById('preview');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const screenPreview = document.getElementById('screenPreview');
const cameraPreview = document.getElementById('cameraPreview');
const cameraContainer = document.getElementById('cameraContainer');
const resizeHandle = document.getElementById('resizeHandle');
const combinedPreview = document.getElementById('combinedPreview');
const ctx = combinedPreview.getContext('2d');

let mediaRecorder;
let recordedChunks = [];
let isPaused = false;
let isDragging = false;
let dragStartX, dragStartY;

startBtn.addEventListener('click', startRecording);
pauseBtn.addEventListener('click', pauseRecording);
resumeBtn.addEventListener('click', resumeRecording);
stopBtn.addEventListener('click', async () => {
    console.log("Stop button clicked");
    try {
        await stopRecording();
        console.log("Synth Records: Recording stopped and saved");
    } catch (error) {
        console.error("Synth Records: Error stopping recording:", error);
    }
});

async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        console.error("getDisplayMedia is not supported in this browser");
        alert("Screen recording is not supported in this browser. Please try a modern browser like Chrome, Firefox, or Edge.");
        return;
    }

    const displayMediaOptions = {
        video: {
            cursor: "always"
        },
        audio: false
    };

    if (qualitySelect.value === '1080p') {
        displayMediaOptions.video.width = 1920;
        displayMediaOptions.video.height = 1080;
    } else if (qualitySelect.value === '4k') {
        displayMediaOptions.video.width = 3840;
        displayMediaOptions.video.height = 2160;
    }

    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        let audioStream = null;
        let cameraStream = null;

        if (audioToggle.checked) {
            audioStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
        }

        if (cameraToggle.checked) {
            cameraStream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 320, height: 240 }
            });
            cameraPreview.srcObject = cameraStream;
            cameraContainer.style.display = 'block';
        } else {
            cameraContainer.style.display = 'none';
        }

        // Create a canvas to combine screen and camera
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = screenStream.getVideoTracks()[0].getSettings().width;
        canvas.height = screenStream.getVideoTracks()[0].getSettings().height;

        // Function to draw both streams on the canvas
        function drawCanvas() {
            ctx.drawImage(screenPreview, 0, 0, canvas.width, canvas.height);
            if (cameraToggle.checked && cameraStream) {
                const previewRect = preview.getBoundingClientRect();
                const cameraRect = cameraContainer.getBoundingClientRect();
                
                const cameraWidth = (cameraRect.width / previewRect.width) * canvas.width;
                const cameraHeight = (cameraRect.height / previewRect.height) * canvas.height;
                const x = ((cameraRect.left - previewRect.left) / previewRect.width) * canvas.width;
                const y = ((cameraRect.top - previewRect.top) / previewRect.height) * canvas.height;
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(x + cameraWidth / 2, y + cameraHeight / 2, cameraWidth / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(cameraPreview, x, y, cameraWidth, cameraHeight);
                ctx.restore();
            }
            requestAnimationFrame(drawCanvas);
        }

        drawCanvas();

        // Create a stream from the canvas
        const canvasStream = canvas.captureStream();

        // Combine the streams
        const videoTrack = canvasStream.getVideoTracks()[0];
        const audioTrack = audioStream ? audioStream.getAudioTracks()[0] : null;
        const combinedStream = new MediaStream([videoTrack, ...(audioTrack ? [audioTrack] : [])]);

        console.log("Combined stream tracks:", combinedStream.getTracks().map(track => track.kind));

        screenPreview.srcObject = screenStream;
        screenPreview.play();

        mediaRecorder = new MediaRecorder(combinedStream, {
            mimeType: 'video/webm;codecs=vp9,opus',
            videoBitsPerSecond: 3000000, // 3 Mbps
            audioBitsPerSecond: 128000 // 128 kbps
        });

        mediaRecorder.ondataavailable = (event) => {
            console.log("Data available event fired. Data size:", event.data.size);
            if (event.data && event.data.size > 0) {
                recordedChunks.push(event.data);
                console.log("Chunk added. Total chunks:", recordedChunks.length);
            } else {
                console.warn("Received empty data chunk");
            }
        };

        // Add event listener for when the stream ends
        screenStream.getVideoTracks()[0].onended = () => {
            handleStreamEnd();
        };

        mediaRecorder.start(1000); // Collect data every second
        console.log("MediaRecorder started");
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;

        // Call setupCameraDrag and setupCameraResize at the end of startRecording
        setupCameraDrag();
        setupCameraResize();
    } catch (err) {
        console.error("Error: " + err);
        handleStreamEnd();
    }
}

function pauseRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        isPaused = true;
        pauseBtn.disabled = true;
        resumeBtn.disabled = false;
    }
}

function resumeRecording() {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        isPaused = false;
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;
    }
}

async function stopRecording() {
    console.log("Entering stopRecording function");
    console.log("MediaRecorder state:", mediaRecorder ? mediaRecorder.state : "MediaRecorder not initialized");
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        return new Promise((resolve, reject) => {
            mediaRecorder.onstop = async () => {
                try {
                    console.log("MediaRecorder stopped. Attempting to save recording...");
                    console.log("Number of chunks before saving:", recordedChunks.length);
                    await saveRecording();
                    handleStreamEnd();
                    resolve();
                } catch (error) {
                    console.error("Error in onstop handler:", error);
                    reject(error);
                }
            };
            
            // Ensure we get the last bit of data
            mediaRecorder.requestData();
            
            console.log("Stopping MediaRecorder...");
            mediaRecorder.stop();
            resetButtons();
        });
    } else {
        console.warn("MediaRecorder is not active. Cannot stop recording.");
    }
}

function resetButtons() {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    stopBtn.disabled = true;
}

function handleStreamEnd() {
    screenPreview.srcObject = null;
    cameraPreview.srcObject = null;
    preview.innerHTML = '<p>Recording ended. Click "Start Recording" to begin a new recording.</p>';
    resetButtons();
    
    // Clear the combined preview
    if (ctx) {
        ctx.clearRect(0, 0, combinedPreview.width, combinedPreview.height);
    }
    
    // Stop all tracks in the stream
    if (mediaRecorder && mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
}

async function saveRecording() {
    console.log("Entering saveRecording function");
    console.log("Number of recorded chunks:", recordedChunks.length);
    
    if (recordedChunks.length === 0) {
        console.error("Synth Records: No recorded data available.");
        alert("No data was recorded. Please try again and ensure you've granted the necessary permissions.");
        return;
    }

    const blob = new Blob(recordedChunks, {
        type: "video/webm"
    });
    console.log("Blob created. Size:", blob.size, "bytes");
    
    try {
        console.log("Attempting to use showSaveFilePicker...");
        // Ask user for file location
        const handle = await window.showSaveFilePicker({
            suggestedName: 'synth-records-recording.webm',
            types: [{
                description: 'WebM Video',
                accept: {'video/webm': ['.webm']},
            }],
        });
        
        console.log("File picker dialog shown successfully");
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log("Synth Records: Recording saved successfully");
    } catch (err) {
        console.error("Synth Records: Error saving file:", err);
        console.log("Falling back to direct download method");
        // Fallback to downloading directly
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "synth-records-recording.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        console.log("Direct download initiated");
    }
    
    recordedChunks = [];
    console.log("recordedChunks reset");
}

function setupCameraDrag() {
    cameraContainer.addEventListener('mousedown', initDrag, false);
    document.addEventListener('mousemove', drag, false);
    document.addEventListener('mouseup', stopDrag, false);

    function initDrag(e) {
        isDragging = true;
        const rect = cameraContainer.getBoundingClientRect();
        dragStartX = e.clientX - rect.left;
        dragStartY = e.clientY - rect.top;
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        const previewRect = preview.getBoundingClientRect();
        let newX = e.clientX - previewRect.left - dragStartX;
        let newY = e.clientY - previewRect.top - dragStartY;

        // Ensure the camera stays within the preview bounds
        newX = Math.max(0, Math.min(newX, previewRect.width - cameraContainer.offsetWidth));
        newY = Math.max(0, Math.min(newY, previewRect.height - cameraContainer.offsetHeight));

        cameraContainer.style.left = `${newX}px`;
        cameraContainer.style.top = `${newY}px`;
        cameraContainer.style.right = 'auto';
        cameraContainer.style.bottom = 'auto';
    }

    function stopDrag() {
        isDragging = false;
    }
}

function setupCameraResize() {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener('mousedown', initResize, false);
    document.addEventListener('mousemove', resize, false);
    document.addEventListener('mouseup', stopResize, false);

    function initResize(e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(cameraContainer).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(cameraContainer).height, 10);
        e.preventDefault();
    }

    function resize(e) {
        if (!isResizing) return;
        const width = startWidth + e.clientX - startX;
        const height = startHeight + e.clientY - startY;
        
        // Maintain aspect ratio and minimum size
        const aspectRatio = startWidth / startHeight;
        const newWidth = Math.max(100, Math.min(width, preview.offsetWidth / 2));
        const newHeight = Math.max(100, Math.min(newWidth / aspectRatio, preview.offsetHeight / 2));

        cameraContainer.style.width = `${newWidth}px`;
        cameraContainer.style.height = `${newHeight}px`;
    }

    function stopResize() {
        isResizing = false;
    }
}

// Call both setupCameraDrag and setupCameraResize at the end of your script
setupCameraDrag();
setupCameraResize();