document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       العناصر
    ========================= */

    const addButton =
        document.getElementById("add-button");

    const postsContainer =
        document.getElementById("posts-container");

    const editorPage =
        document.getElementById("editor-page");

    const savePost =
        document.getElementById("save-post");

    const cancelPost =
        document.getElementById("cancel-post");

    const profileInput =
        document.getElementById("profile-input");

  const postImageInput =
    document.getElementById("post-image-input");

  const postVideoInput =
    document.getElementById("post-video-input");

    const nameInput =
        document.getElementById("name-input");

    const usernameInput =
        document.getElementById("username-input");

    const usernameCheck =
        document.getElementById("username-check");

    const verifiedCheck =
        document.getElementById("verified-check");

    const verifiedPosition =
        document.getElementById("verified-position");

    const verifiedColor =
        document.getElementById("verified-color");

  const storyRingCheck =
    document.getElementById("story-ring-check");

const storyColor1 =
    document.getElementById("story-color-1");

const storyColor2 =
    document.getElementById("story-color-2");

const storyWhiteCheck =
    document.getElementById("story-white-check");

    const textInput =
        document.getElementById("text-input");

    const linkInput =
        document.getElementById("link-input");

    const followersInput =
        document.getElementById("followers-input");

    const likesInput =
        document.getElementById("likes-input");

    const postsInput =
        document.getElementById("posts-input");

    const repostsInput =
        document.getElementById("reposts-input");

    const sharesInput =
        document.getElementById("shares-input");


    /* =========================
       صورة التوثيق
    ========================= */

    const verificationImage =
        "PUT_VERIFICATION_IMAGE_HERE.png";


    /* =========================
       نسخة التوثيق الأبيض
    ========================= */

    let whiteVerificationImage = "";


    function makeWhiteVerification(src) {

        return new Promise(function (resolve) {

            const img =
                new Image();


            img.onload = function () {

                const canvas =
                    document.createElement("canvas");

                canvas.width =
                    img.naturalWidth;

                canvas.height =
                    img.naturalHeight;


                const ctx =
                    canvas.getContext("2d");


                ctx.drawImage(
                    img,
                    0,
                    0
                );


                const imageData =
                    ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );


                const pixels =
                    imageData.data;


                for (
                    let i = 0;
                    i < pixels.length;
                    i += 4
                ) {

                    const r =
                        pixels[i];

                    const g =
                        pixels[i + 1];

                    const b =
                        pixels[i + 2];


                    /*
                       الأبيض يصبح شفاف
                    */

                    if (
                        r > 220 &&
                        g > 220 &&
                        b > 220
                    ) {

                        pixels[i + 3] = 0;

                        continue;
                    }


                    /*
                       اللون يتحول لأبيض
                    */

                    pixels[i] = 255;
                    pixels[i + 1] = 255;
                    pixels[i + 2] = 255;

                }


                ctx.putImageData(
                    imageData,
                    0,
                    0
                );


                resolve(
                    canvas.toDataURL(
                        "image/png"
                    )
                );

            };


            img.onerror =
                function () {

                    resolve(src);

                };


            img.src = src;

        });

    }


    /* =========================
       تجهيز النسخة البيضاء
    ========================= */

    makeWhiteVerification(
        verificationImage
    ).then(function (whiteImage) {

        whiteVerificationImage =
            whiteImage;


        const topVerified =
            document.querySelector(
                ".top-verified"
            );


        if (topVerified) {

            topVerified.src =
                whiteImage;

        }

    });


    /* =========================
       صورة البروفايل
    ========================= */

    let profileImageData = "";
let postImageData = "";
  let postVideoData = "";
let editingPost = null;
  
    /* =========================
       فتح المحرر
    ========================= */

    addButton.addEventListener(
        "click",
        function () {

            addButton.style.display =
                "none";

            postsContainer.style.display =
                "none";

            editorPage.classList.add(
                "active"
            );

        }
    );


    /* =========================
       صورة البروفايل
    ========================= */

    profileInput.addEventListener(
        "change",
        function () {

            const file =
                profileInput.files[0];


            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    profileImageData =
                        event.target.result;

                };


            reader.readAsDataURL(file);

        }
    );

  postImageInput.addEventListener(
    "change",
    function () {

        const file =
            postImageInput.files[0];

        if (!file) {
            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function (event) {
                postImageData =
                    event.target.result;
            };

        reader.readAsDataURL(file);
    }
);

  postVideoInput.addEventListener(
    "change",
    function () {
        const file =
            this.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function (e) {
            postVideoData =
                e.target.result;
        };

        reader.readAsDataURL(file);
    }
);

    /* =========================
       حفظ البوست
    ========================= */

    savePost.addEventListener(
        "click",
        async function () {

            const name =
                nameInput.value.trim() ||
                "Ali Kivex";


            const username =
                usernameInput.value.trim();


            const text =
                textInput.value.trim();


            const link =
                linkInput.value.trim();


            const followers =
                followersInput.value.trim();


            const likes =
                likesInput.value.trim() ||
                "0";


            const posts =
                postsInput.value.trim() ||
                "0";


            const reposts =
                repostsInput.value.trim() ||
                "0";


            const shares =
                sharesInput.value.trim() ||
                "0";


            /* =========================
               اليوزر
            ========================= */

            const showUsername =
                usernameCheck.checked &&
                username !== "";


            /* =========================
               الفولوورز
               يظهر تلقائيًا لو مكتوب
            ========================= */

            const showFollowers =
                followers !== "";


            /* =========================
               التوثيق
            ========================= */

            const showVerified =
                verifiedCheck.checked;


            const position =
                verifiedPosition.value;


            const color =
                verifiedColor.value;

          const showStoryRing =
    storyRingCheck.checked;

const storyRingColor1 =
    storyColor1.value;

const storyRingColor2 =
    storyColor2.value;

const storyRingWhite =
    storyWhiteCheck.checked;

      let verifiedImage =
                verificationImage;


            /* =========================
               لون التوثيق
            ========================= */

            if (
                color === "white" &&
                showVerified
            ) {

                if (
                    whiteVerificationImage
                ) {

                    verifiedImage =
                        whiteVerificationImage;

                } else {

                    verifiedImage =
                        await makeWhiteVerification(
                            verificationImage
                        );

                }

            }


            /* =========================
               إنشاء البوست
            ========================= */

            const postData = {

                name:
                    name,
              
              postImage: postImageData,

                username:
                    username,

                text:
                    text,

                link:
                    link,

                followers:
                    followers,

                likes:
                    likes,

                posts:
                    posts,

                reposts:
                    reposts,

                shares:
                    shares,

                showUsername:
                    showUsername,

                showFollowers:
                    showFollowers,

                showVerified:
                    showVerified,

                verifiedPosition:
                    position,

                verifiedImage:
                    verifiedImage,

showStoryRing:
    showStoryRing,

storyRingColor1:
    storyRingColor1,

storyRingColor2:
    storyRingColor2,

storyRingWhite:
    storyRingWhite,

image:
    profileImageData,

postVideo:
    postVideoData
              
            };

if (editingPost) {

    const oldPost =
        editingPost;

    const newPost =
        createPost(postData);
  
    oldPost.replaceWith(newPost);

    editingPost =
        newPost;

} else {

    postsContainer.appendChild(
        createPost(postData)
    );

}

            /* =========================
               إغلاق
            ========================= */

            editorPage.classList.remove(
                "active"
            );


            postsContainer.style.display =
                "flex";


            addButton.style.display =
                "flex";


            resetEditor();

        }
    );


    /* =========================
       زر No
    ========================= */

    cancelPost.addEventListener(
        "click",
        function () {

            editorPage.classList.remove(
                "active"
            );


            postsContainer.style.display =
                "flex";


            addButton.style.display =
                "flex";


            resetEditor();

        }
    );


    /* =========================
       إنشاء البوست
    ========================= */

    function createPost(data) {

        const post =
            document.createElement("div");


        post.className =
            "glass-post";


        /* =========================
           توثيق الاسم
        ========================= */

        const nameVerifiedHTML =
            data.showVerified &&
            data.verifiedPosition === "name"
            ?
            `
            <img
                class="post-verified"
                src="${escapeAttribute(data.verifiedImage)}"
                alt="Verified">
            `
            :
            "";


        /* =========================
           توثيق اليوزر
        ========================= */

        const usernameVerifiedHTML =
            data.showVerified &&
            data.verifiedPosition === "username" &&
            data.showUsername
            ?
            `
            <img
                class="post-verified username-verified"
                src="${escapeAttribute(data.verifiedImage)}"
                alt="Verified">
            `
            :
            "";


        /* =========================
           توثيق صورة البروفايل
        ========================= */

        const profileVerifiedHTML =
            data.showVerified &&
            data.verifiedPosition === "profile"
            ?
            `
            <span class="profile-verified-circle">

                <img
                    src="${escapeAttribute(data.verifiedImage)}"
                    alt="Verified">

            </span>
            `
            :
            "";


        /* =========================
           اليوزر
        ========================= */

        const usernameHTML =
            data.showUsername
            ?
            `
            <div class="post-username">

                ${usernameVerifiedHTML}

                <span>
                    ${escapeHTML(data.username)}
                </span>

            </div>
            `
            :
            "";


        /* =========================
           الصورة
        ========================= */
const storyRingStyle =
    data.showStoryRing
    ?
    `
    style="
        --story-color-1: ${escapeAttribute(data.storyRingColor1)};
        --story-color-2: ${escapeAttribute(data.storyRingColor2)};
        --story-ring-color:
            ${data.storyRingWhite ? "#ffffff" : "transparent"};
    "
    `
    :
    "";


const storyRingClass =
    data.showStoryRing
    ?
    (
        data.storyRingWhite
        ?
        " story-ring story-ring-white"
        :
        " story-ring"
    )
    :
    "";

const imageHTML =
    data.image
    ?
    `
    <div
        class="profile-image-wrapper${storyRingClass}"
        ${storyRingStyle}>

        <img
            src="${escapeAttribute(data.image)}"
            alt="">

    </div>
    `
    :
    "";
      
const postImageHTML =
    data.postImage
    ?
    `
    <img
        class="post-content-image"
        src="${escapeAttribute(data.postImage)}"
        alt="">
    `
    :
    "";

const postVideoHTML =
    data.postVideo
    ?
    `
    <div class="post-video-wrapper">

        <video
            class="post-content-video"
            src="${escapeAttribute(data.postVideo)}"
            controls
            playsinline>
        </video>

        <span class="video-countdown">
            0
        </span>

    </div>
    `
    :
    "";
      
        /* =========================
           اللينك
        ========================= */

        const linkHTML =
            data.link
            ?
            `
            <a
                class="post-link"
                href="${escapeAttribute(data.link)}"
                target="_blank"
                rel="noopener noreferrer">

                ${escapeHTML(data.link)}

            </a>
            `
            :
            "";


        /* =========================
           محتوى البوست
        ========================= */

        post.innerHTML = `

            <div class="post-header">


                <div class="post-profile">

                    ${imageHTML}

                    ${profileVerifiedHTML}

                </div>


                <div class="post-user-info">


                    <div class="post-name">

                        ${nameVerifiedHTML}

                        <span>
                            ${escapeHTML(data.name)}
                        </span>

                    </div>


                    ${usernameHTML}


                    ${
                        data.showFollowers
                        ?
                        `
                        <div class="post-followers">

                            ${escapeHTML(data.followers)}

                            <span>
                                followers
                            </span>

                        </div>
                        `
                        :
                        ""
                    }


                </div>
<button class="post-follow">
    Follow
</button>
            </div>


            ${
                data.text
                ?
                `
                <div class="post-text" dir="rtl">${escapeHTML(data.text)}</div>
                `
                :
                ""
            }

${postImageHTML}

${postVideoHTML}

            ${linkHTML}

            <!-- =========================
                 التفاعلات
            ========================== -->

            <div class="post-stats">


                <!-- لايك -->

                <div class="post-action like">

                    <svg viewBox="0 0 24 24">

                        <path
                            d="M20.84 4.61
                            a5.5 5.5 0 0 0-7.78 0
                            L12 5.67
                            l-1.06-1.06
                            a5.5 5.5 0 0 0-7.78 7.78
                            L12 21.23
                            l8.84-8.84
                            a5.5 5.5 0 0 0 0-7.78z">
                        </path>

                    </svg>

                    <b>
                        ${escapeHTML(data.likes)}
                    </b>

                </div>


                <!-- التعليقات -->

                <div class="post-action comments">

                    <svg viewBox="0 0 24 24">

                        <path
                            d="M21 11.5
                            a8.38 8.38 0 0 1-.9 3.8
                            8.5 8.5 0 0 1-7.6 4.7
                            8.38 8.38 0 0 1-3.8-.9
                            L3 21
                            l1.9-5.7
                            A8.38 8.38 0 0 1 4 11.5
                            8.5 8.5 0 0 1 8.7 3.9
                            A8.38 8.38 0 0 1 12.5 3
                            h.5
                            a8.5 8.5 0 0 1 8 8
                            v.5z">
                        </path>

                    </svg>

                    <b>
                        ${escapeHTML(data.posts)}
                    </b>

                </div>


                <!-- Repost -->

                <div class="post-action repost">

                    <svg viewBox="0 0 24 24">

                        <path
                            d="M17 1l4 4-4 4">
                        </path>

                        <path
                            d="M3 11V9
                            a4 4 0 0 1 4-4
                            h14">
                        </path>

                        <path
                            d="M7 23l-4-4 4-4">
                        </path>

                        <path
                            d="M21 13v2
                            a4 4 0 0 1-4 4
                            H3">
                        </path>

                    </svg>

                    <b>
                        ${escapeHTML(data.reposts)}
                    </b>

                </div>


                <!-- مشاركة -->

                <div class="post-action share">

                    <svg viewBox="0 0 24 24">

                        <path
                            d="M22 2L11 13">
                        </path>

                        <path
                            d="M22 2L15 22
                            L11 13
                            L2 9
                            L22 2Z">
                        </path>

                    </svg>

                    <b>
                        ${escapeHTML(data.shares)}
                    </b>

                </div>


                <!-- حفظ -->

                <div class="post-save">

                    <svg viewBox="0 0 24 24">

                        <path
                            d="M6 3
                            h12
                            a1 1 0 0 1 1 1
                            v17
                            l-7-4
                            -7 4
                            V4
                            a1 1 0 0 1 1-1z">
                        </path>

                    </svg>

                </div>


            </div>

        `;


const video =
    post.querySelector(
        ".post-content-video"
    );

if (video) {

    const countdown =
        post.querySelector(
            ".video-countdown"
        );

    function updateCountdown() {

        if (!Number.isFinite(video.duration)) {
            return;
        }

        const remaining =
            Math.ceil(
                video.duration -
                video.currentTime
            );

        countdown.textContent =
            remaining > 0
            ? remaining
            : 0;
    }

    video.addEventListener(
        "loadedmetadata",
        updateCountdown
    );

    video.addEventListener(
        "timeupdate",
        updateCountdown
    );
}


      post._postData = data;
      
const followButton =
    post.querySelector(".post-follow");

if (followButton) {

    followButton.addEventListener(
        "click",
        function () {

            editingPost = post;

            nameInput.value =
                data.name || "";

            usernameInput.value =
                data.username || "";

            usernameCheck.checked =
                data.showUsername || false;

            verifiedCheck.checked =
                data.showVerified || false;

            verifiedPosition.value =
                data.verifiedPosition || "name";

            textInput.value =
                data.text || "";

            linkInput.value =
                data.link || "";

            followersInput.value =
                data.followers || "";

            likesInput.value =
                data.likes || "";

            postsInput.value =
                data.posts || "";

            repostsInput.value =
                data.reposts || "";

            sharesInput.value =
                data.shares || "";

            verifiedColor.value =
                "normal";

            profileImageData =
                data.image || "";

            addButton.style.display =
                "none";

            postsContainer.style.display =
                "none";

            editorPage.classList.add(
                "active"
            );

        }
    );

}
const saveButton =
    post.querySelector(".post-save");

if (saveButton) {

    saveButton.addEventListener(
        "click",
        async function () {

            if (typeof html2canvas === "undefined") {
                alert("تعذر تجهيز البوست");
                return;
            }

            const video =
                post.querySelector(".post-content-video");

            /* =========================
               حفظ بوست الفيديو
            ========================== */

            if (video) {

                if (!video.duration || !Number.isFinite(video.duration)) {
                    alert("استنى الفيديو يجهز الأول");
                    return;
                }

                const postRect =
                    post.getBoundingClientRect();

                const videoRect =
                    video.getBoundingClientRect();

                const scale = 3;

                const snapshot =
                    await html2canvas(
                        post,
                        {
                            scale: scale,
                            useCORS: true,
                            backgroundColor: "#000000",
                            logging: false
                        }
                    );

                const canvas =
                    document.createElement("canvas");

                canvas.width =
                    snapshot.width;

                canvas.height =
                    snapshot.height;

                const ctx =
                    canvas.getContext("2d");

                ctx.drawImage(
                    snapshot,
                    0,
                    0
                );

                const videoX =
                    (videoRect.left - postRect.left) * scale;

                const videoY =
                    (videoRect.top - postRect.top) * scale;

                const videoWidth =
                    videoRect.width * scale;

                const videoHeight =
                    videoRect.height * scale;

                const stream =
                    canvas.captureStream(30);

                /* إضافة صوت الفيديو */

                if (
                    typeof video.captureStream ===
                    "function"
                ) {

                    const videoStream =
                        video.captureStream();

                    videoStream
                        .getAudioTracks()
                        .forEach(function (track) {

                            stream.addTrack(track);

                        });
                }

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

                const recorder =
                    new MediaRecorder(
                        stream,
                        {
                            mimeType: mimeType,
                            videoBitsPerSecond:
                                12000000
                        }
                    );

                const chunks = [];

                recorder.ondataavailable =
                    function (event) {

                        if (event.data.size > 0) {
                            chunks.push(event.data);
                        }

                    };

                recorder.onstop =
                    function () {

                        const blob =
                            new Blob(
                                chunks,
                                {
                                    type: mimeType
                                }
                            );

                        const url =
                            URL.createObjectURL(
                                blob
                            );

                        const a =
                            document.createElement("a");

                        a.href = url;

                        a.download =
                            "Ali-Kivex-Post.webm";

                        document.body.appendChild(a);

                        a.click();

                        a.remove();

                        setTimeout(
                            function () {
                                URL.revokeObjectURL(url);
                            },
                            2000
                        );

                    };

                video.currentTime = 0;

                video.muted = false;

                recorder.start();

                await video.play();

                function drawVideoFrame() {

                    if (
                        !video.paused &&
                        !video.ended
                    ) {

                        ctx.drawImage(
                            video,
                            videoX,
                            videoY,
                            videoWidth,
                            videoHeight
                        );

                        requestAnimationFrame(
                            drawVideoFrame
                        );

                    }

                }

                drawVideoFrame();

                video.onended =
                    function () {

                        recorder.stop();

                        stream
                            .getTracks()
                            .forEach(function (track) {
                                track.stop();
                            });

                    };

                return;
            }


            /* =========================
               حفظ بوست الصورة
            ========================== */

            const canvas =
                await html2canvas(
                    post,
                    {
                        scale: 3,
                        useCORS: true,
                        backgroundColor: "#000000",
                        logging: false
                    }
                );

            const imageData =
                canvas.toDataURL(
                    "image/png",
                    1.0
                );

            const a =
                document.createElement("a");

            a.href =
                imageData;

            a.download =
                "Ali-Kivex-Post.png";

            document.body.appendChild(a);

            a.click();

            a.remove();

        }
    );
}
      return post;
    }


    /* =========================
       تصفير المحرر
    ========================= */

    function resetEditor() {

      editingPost = null;

        nameInput.value = "";

        usernameInput.value = "";

        usernameCheck.checked =
            false;

        verifiedCheck.checked =
            false;

        verifiedPosition.value =
            "name";

        verifiedColor.value =
            "normal";

        textInput.value = "";

        linkInput.value = "";

        followersInput.value = "";

        likesInput.value = "";

        postsInput.value = "";

        repostsInput.value = "";

        sharesInput.value = "";

        profileInput.value = "";

        profileImageData = "";

      storyRingCheck.checked =
    data.showStoryRing || false;

storyColor1.value =
    data.storyRingColor1 || "#ff00ff";

storyColor2.value =
    data.storyRingColor2 || "#ff9900";

storyWhiteCheck.checked =
    data.storyRingWhite || false;

    }


    /* =========================
       حماية النص
    ========================= */

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    function escapeAttribute(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }

});