function setupPostSave(post) {

    const saveButton =
        post.querySelector(".post-save");

    if (!saveButton) return;


    saveButton.addEventListener(
        "click",
        async function () {

            if (
                typeof html2canvas ===
                "undefined"
            ) {
                alert("تعذر تجهيز البوست");
                return;
            }


            /* =========================
               مساحة الحفظ
            ========================== */

            const postRect =
                post.getBoundingClientRect();

            const postWidth =
                Math.ceil(postRect.width);

            const postHeight =
                Math.ceil(postRect.height);

            const paddingX = 24;
            const paddingY = 24;


            const captureStage =
                document.createElement("div");

            captureStage.style.position =
                "fixed";

            captureStage.style.left =
                "-100000px";

            captureStage.style.top =
                "0";

            captureStage.style.width =
                (
                    postWidth +
                    paddingX * 2
                ) + "px";

            captureStage.style.height =
                (
                    postHeight +
                    paddingY * 2
                ) + "px";

            captureStage.style.padding =
                paddingY +
                "px " +
                paddingX +
                "px";

            captureStage.style.boxSizing =
                "border-box";

            captureStage.style.overflow =
                "hidden";

            const bodyStyle =
                getComputedStyle(
                    document.body
                );

            captureStage.style.backgroundColor =
                bodyStyle.backgroundColor;

            captureStage.style.backgroundImage =
                bodyStyle.backgroundImage;

            captureStage.style.backgroundSize =
                bodyStyle.backgroundSize;

            captureStage.style.backgroundPosition =
                bodyStyle.backgroundPosition;

            captureStage.style.backgroundRepeat =
                bodyStyle.backgroundRepeat;


            /* =========================
               نسخة البوست
            ========================== */

            const clonedPost =
                post.cloneNode(true);

            clonedPost.style.width =
                postWidth + "px";

            clonedPost.style.maxWidth =
                postWidth + "px";

            clonedPost.style.margin =
                "0";

            clonedPost.style.boxSizing =
                "border-box";

            captureStage.appendChild(
                clonedPost
            );

            document.body.appendChild(
                captureStage
            );


            await new Promise(
                function (resolve) {

                    requestAnimationFrame(
                        function () {

                            requestAnimationFrame(
                                resolve
                            );

                        }
                    );

                }
            );


            const originalVideo =
                post.querySelector(
                    ".post-content-video"
                );


            /* =========================
               حفظ الصورة
            ========================== */

            if (!originalVideo) {

                const canvas =
                    await html2canvas(
                        captureStage,
                        {
                            scale: 4,
                            useCORS: true,
                            allowTaint: false,
                            backgroundColor: null,
                            logging: false
                        }
                    );

                document.body.removeChild(
                    captureStage
                );


                const imageData =
                    canvas.toDataURL(
                        "image/png"
                    );


                const a =
                    document.createElement(
                        "a"
                    );

                a.href =
                    imageData;

                a.download =
                    "Ali-Kivex-Post.png";

                document.body.appendChild(a);

                a.click();

                a.remove();

                return;
            }


            /* =========================
               حفظ الفيديو
            ========================== */

            if (
                !originalVideo.duration ||
                !Number.isFinite(
                    originalVideo.duration
                )
            ) {

                document.body.removeChild(
                    captureStage
                );

                alert(
                    "استنى الفيديو يجهز الأول"
                );

                return;
            }


            const clonedVideo =
                clonedPost.querySelector(
                    ".post-content-video"
                );


            clonedVideo.style.opacity =
                "0";


            const clonedCountdown =
                clonedPost.querySelector(
                    ".video-countdown"
                );

            if (clonedCountdown) {

                clonedCountdown.style.opacity =
                    "0";

            }


            const baseCanvas =
                await html2canvas(
                    captureStage,
                    {
                        scale: 3,
                        useCORS: true,
                        allowTaint: false,
                        backgroundColor: null,
                        logging: false
                    }
                );


            const canvas =
                document.createElement(
                    "canvas"
                );

            canvas.width =
                baseCanvas.width;

            canvas.height =
                baseCanvas.height;


            const ctx =
                canvas.getContext(
                    "2d"
                );


            const clonedVideoRect =
                clonedVideo.getBoundingClientRect();

            const stageRect =
                captureStage.getBoundingClientRect();


            const videoX =
                (
                    clonedVideoRect.left -
                    stageRect.left
                ) * 3;

            const videoY =
                (
                    clonedVideoRect.top -
                    stageRect.top
                ) * 3;

            const videoWidth =
                clonedVideoRect.width * 3;

            const videoHeight =
                clonedVideoRect.height * 3;


            /* =========================
               حواف الفيديو
            ========================== */

            const videoStyle =
                getComputedStyle(
                    clonedVideo
                );

            let radius =
                parseFloat(
                    videoStyle.borderRadius
                );

            if (
                !Number.isFinite(radius)
            ) {
                radius = 18;
            }

            radius *= 3;


            function drawRoundedVideo() {

                ctx.save();

                ctx.beginPath();


                if (
                    typeof ctx.roundRect ===
                    "function"
                ) {

                    ctx.roundRect(
                        videoX,
                        videoY,
                        videoWidth,
                        videoHeight,
                        radius
                    );

                } else {

                    const r =
                        Math.min(
                            radius,
                            videoWidth / 2,
                            videoHeight / 2
                        );


                    ctx.moveTo(
                        videoX + r,
                        videoY
                    );

                    ctx.lineTo(
                        videoX +
                        videoWidth -
                        r,
                        videoY
                    );

                    ctx.quadraticCurveTo(
                        videoX +
                        videoWidth,
                        videoY,
                        videoX +
                        videoWidth,
                        videoY + r
                    );

                    ctx.lineTo(
                        videoX +
                        videoWidth,
                        videoY +
                        videoHeight -
                        r
                    );

                    ctx.quadraticCurveTo(
                        videoX +
                        videoWidth,
                        videoY +
                        videoHeight,
                        videoX +
                        videoWidth -
                        r,
                        videoY +
                        videoHeight
                    );

                    ctx.lineTo(
                        videoX + r,
                        videoY +
                        videoHeight
                    );

                    ctx.quadraticCurveTo(
                        videoX,
                        videoY +
                        videoHeight,
                        videoX,
                        videoY +
                        videoHeight -
                        r
                    );

                    ctx.lineTo(
                        videoX,
                        videoY + r
                    );

                    ctx.quadraticCurveTo(
                        videoX,
                        videoY,
                        videoX + r,
                        videoY
                    );

                    ctx.closePath();

                }


                ctx.clip();


                ctx.drawImage(
                    originalVideo,
                    videoX,
                    videoY,
                    videoWidth,
                    videoHeight
                );


                ctx.restore();

            }


            /* =========================
               العداد
            ========================== */

            function drawCountdown() {

                const remaining =
                    Math.max(
                        0,
                        Math.ceil(
                            originalVideo.duration -
                            originalVideo.currentTime
                        )
                    );


                const countdownX =
                    videoX +
                    videoWidth -
                    10 * 3;


                const countdownY =
                    videoY +
                    10 * 3;


                ctx.save();


                ctx.fillStyle =
                    "#ffffff";


                ctx.font =
                    "600 " +
                    (12 * 3) +
                    "px -apple-system, BlinkMacSystemFont, Arial, sans-serif";


                ctx.textAlign =
                    "right";


                ctx.textBaseline =
                    "top";


                ctx.fillText(
                    String(remaining),
                    countdownX,
                    countdownY
                );


                ctx.restore();

            }


            /* =========================
               نوع الفيديو
            ========================== */

            let mimeType =
                "video/webm;codecs=vp9,opus";


            if (
                !MediaRecorder.isTypeSupported(
                    mimeType
                )
            ) {

                mimeType =
                    "video/webm;codecs=vp8,opus";

            }


            if (
                !MediaRecorder.isTypeSupported(
                    mimeType
                )
            ) {

                mimeType =
                    "video/webm";

            }


            /* =========================
               الصوت
            ========================== */

            const stream =
                canvas.captureStream(30);


            if (
                typeof originalVideo.captureStream ===
                "function"
            ) {

                const videoStream =
                    originalVideo.captureStream();


                videoStream
                    .getAudioTracks()
                    .forEach(
                        function (track) {

                            stream.addTrack(
                                track
                            );

                        }
                    );

            }


            const recorder =
                new MediaRecorder(
                    stream,
                    {
                        mimeType:
                            mimeType,

                        videoBitsPerSecond:
                            16000000
                    }
                );


            const chunks = [];


            recorder.ondataavailable =
                function (event) {

                    if (
                        event.data &&
                        event.data.size > 0
                    ) {

                        chunks.push(
                            event.data
                        );

                    }

                };


            recorder.onstop =
                function () {

                    const blob =
                        new Blob(
                            chunks,
                            {
                                type:
                                    mimeType
                            }
                        );


                    const url =
                        URL.createObjectURL(
                            blob
                        );


                    const a =
                        document.createElement(
                            "a"
                        );


                    a.href =
                        url;


                    a.download =
                        "Ali-Kivex-Post.webm";


                    document.body.appendChild(
                        a
                    );


                    a.click();


                    a.remove();


                    setTimeout(
                        function () {

                            URL.revokeObjectURL(
                                url
                            );

                        },
                        3000
                    );


                    if (
                        captureStage.parentNode
                    ) {

                        document.body.removeChild(
                            captureStage
                        );

                    }


                    stream
                        .getTracks()
                        .forEach(
                            function (track) {

                                track.stop();

                            }
                        );

                };


            /* =========================
               بداية الفيديو
            ========================== */

            originalVideo.currentTime =
                0;

            originalVideo.muted =
                false;


            recorder.start();


            try {

                await originalVideo.play();

            } catch (error) {

                if (
                    recorder.state ===
                    "recording"
                ) {

                    recorder.stop();

                }

                if (
                    captureStage.parentNode
                ) {

                    document.body.removeChild(
                        captureStage
                    );

                }

                alert(
                    "تعذر تشغيل الفيديو للحفظ"
                );

                return;
            }


            /* =========================
               رسم الفيديو
            ========================== */

            function drawFrame() {

                if (
                    recorder.state !==
                    "recording"
                ) {

                    return;

                }


                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                ctx.drawImage(
                    baseCanvas,
                    0,
                    0
                );


                drawRoundedVideo();


                drawCountdown();


                requestAnimationFrame(
                    drawFrame
                );

            }


            drawFrame();


            /* =========================
               نهاية الفيديو
            ========================== */

            originalVideo.onended =
                function () {

                    if (
                        recorder.state ===
                        "recording"
                    ) {

                        recorder.stop();

                    }

                };

        }
    );
}