// 앨범아트 이미지 애니메이션
const spinCon = document.querySelector(".audio-section");
let radius = 240;
let autoRotate = true;
let rotateSpeed = -60;
let imgWidth = 120;
let imgHeight = 170;

setTimeout(init, 100);

let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let aImg = ospin.getElementsByTagName("img");
let aVid = ospin.getElementsByTagName("video");
let aEle = [...aImg, ...aVid];

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform =
            "rotateY(" +
            i * (360 / aEle.length) +
            "deg) translateZ(" +
            radius +
            "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
}

function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}

let sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
        rotateSpeed
    )}s infinite linear`;
}

// 이벤트 설정
document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    let sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        let nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
};

spinCon.onmouseover = function (e) {
    e = e || window.event;
    let d = e.wheelDelta || -e.detail;

    radius += d;

    if ((radius = -600)) {
        radius += d * -1;
        init(1);
    }

    init(1);
};
spinCon.onmouseout = function (e) {
    e = e || window.event;
    let d = e.wheelDelta || -e.detail;

    radius = -250;

    init(1);
};

// -------- 오디오 플레이어 시작 --------

// 오디오 플레이어
const audioBox = document.querySelector("#spin-container");
const playList = document.querySelector(".song-list ol");

//버튼
const backwardBtn = document.querySelector(".backward-btn");
const forwardBtn = document.querySelector(".forward-btn");
const ppBtn = document.querySelector(".pp-btn");
const closeBtn = document.querySelector(".close-btn");
const speaker = document.querySelector(".speaker");
let box;

let currentAudio = new Audio();
let songNum = 0;

//// 곡 변경, 추가 시 바꿔야 하는 부분
const audioList = [
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio1.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio2.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio3.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio4.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio5.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio6.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio7.mp3",
    "https://raw.githubusercontent.com/chicken4zo/files/master/audio8.mp3"
]

const artList = [
    "https://raw.githubusercontent.com/chicken4zo/files/master/album1.jpg",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album2.png",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album3.jpg",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album4.jpg",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album5.png",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album6.png",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album7.png",
    "https://raw.githubusercontent.com/chicken4zo/files/master/album8.jpg"
]

const textList = [
    "이무진 | 신호등",
    "아이유 | Celebrity",
    "D-Hack | OHAYO MY NIGHT",
    "Justin Bieber | Peaches",
    "미도와 파라솔 | 슈퍼스타",
    "에스파 | Next Level",
    "방탄소년단 | Butter",
    "AKMU | NAKKA"
]
////

// 로드 시, 플레이리스트에 현재 배열에 있는 곡들 추가
window.onload = () => {
    let playList = document.querySelector('.song-list ol');
    for (let i = 0 ; i < audioList.length ; i++) {
        let liEle = document.createElement('li');
        let imgEle = document.createElement('img');
        let infoEle = document.createElement('span');
        liEle.setAttribute('class',`audio${i+1}`);
        liEle.appendChild(imgEle);
        imgEle.setAttribute('src',`${artList[i]}`);
        imgEle.setAttribute('class',`audio${i+1}`);
        infoEle.setAttribute('class',`audio${i+1}`);
        liEle.appendChild(infoEle);
        infoEle.textContent = textList[i];
        playList.appendChild(liEle);
    }
}

// 중복되는 곡 전환 절차를 별도 함수로 지정
changeSong = (e,songNum) => {
    audioPause();
    const albumArt = document.querySelector("#album-art");
    const songTitle = document.querySelector("#song-title");
    const playIcon = document.querySelector(".play-button");
    albumArt.src = artList[songNum];
    albumArt.classList.add('active');
    songTitle.textContent = textList[songNum];
    const audio = new Audio(`${audioList[songNum]}`);
    currentAudio = audio;
    currentAudio.play();
    playIcon.style.color = '#3a3a3a';
    playIcon.classList.toggle("fa-pause");
}

// 앨범아트 이미지로 곡 전환
audioBox.addEventListener("click", (e) => {
    songNum = e.target.className.charAt(5)-1; //1,2,3
    changeSong(e,songNum);
    box = document.querySelector(".audio-box");
    box.style.visibility="visible";
    box.style.opacity="1";
});

// 플레이리스트에서 곡 전환
playList.addEventListener("click",(e) => {
    songNum = e.target.className.charAt(5)-1; //1,2,3
    changeSong(e,songNum);
});

// 버튼 제어

ppBtn.addEventListener("click",() => {
    const playIcon = document.querySelector(".play-button");
    const albumArt = document.getElementById("album-art");
    if(!currentAudio.paused) {
        playIcon.classList.toggle("fa-play");
        currentAudio.pause();
        playIcon.style.color = 'lightgrey';
    } else {
        playIcon.classList.toggle("fa-pause");
        currentAudio.play();
        playIcon.style.color = '#3a3a3a';
    }
    albumArt.classList.toggle('active');
});

const audioPause = () => {
    currentAudio.pause();
};

forwardBtn.addEventListener("click",(e) => {
    if (songNum===7) {
        songNum=0;
    } else {
        songNum++;
    }
    changeSong(e,songNum);
});

backwardBtn.addEventListener("click",(e) => {
        if (songNum===0) {
            songNum = 7;
        } else {
            songNum--;
        }
        changeSong(e,songNum);
    }
);

speaker.addEventListener('click', () => {
    const speakerIcon = document.querySelector(".speaker-btn");
    if (currentAudio.muted) {
        currentAudio.muted = false;
        speakerIcon.classList.toggle('fa-volume-up');
        speakerIcon.style.color = '#3a3a3a';
    } else {
        currentAudio.muted = true;
        speakerIcon.classList.toggle('fa-volume-mute');
        speakerIcon.style.color = 'grey';
    }

}, true);


closeBtn.addEventListener('click', () => {
        audioPause();
        box.style.visibility = "hidden";
        box.style.opacity = "0";
});



