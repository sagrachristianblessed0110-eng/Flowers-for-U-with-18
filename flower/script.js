const scene = document.getElementById("scene");
const numberOfHearts = 20;
const heartTransparency = 0.3;

for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = Math.random() * 6 + 6;

    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.opacity = ((Math.random() * 0.5 + 0.3) * heartTransparency).toFixed(2);

    heart.style.animationDuration = `
        5s,
        ${Math.random() * 10 + 10}s,
        2.5s
    `;

    heart.style.animationDelay = `
        ${Math.random() * 3}s,
        0s,
        0s
    `;

    heart.innerHTML = `
        <style>
            .heart:nth-child(${i+1})::before,
            .heart:nth-child(${i+1})::after {
                width: ${size}px;
                height: ${size}px;
            }
            .heart:nth-child(${i+1})::before {
                top: -${size/2}px;
                left: 0;
            }
            .heart:nth-child(${i+1})::after {
                left: ${size/2}px;
                top: 0;
            }
        </style>
    `;

    scene.appendChild(heart);
}

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const lines = document.querySelectorAll(".line");

let isPlaying = false;
let lyricsStarted = false;

// Play button click handler
playBtn.addEventListener("click", () => {
    if (isPlaying) return; // Prevent multiple clicks
    
    isPlaying = true;
    playBtn.classList.add("active");
    playBtn.textContent = "♥ Playing";
    
    // Start audio
    audio.volume = 0.5;
    audio.play();
    
    // Start lyrics after 4 seconds (3s intro + 1s buffer)
    // ADJUST THIS VALUE IF NEEDED (currently 4000ms = 4 seconds)
    setTimeout(() => {
        lyricsStarted = true;
        playLyricsLoop();
    }, 4000);

    audio.addEventListener('ended', () => {
    isPlaying = false;
    lyricsStarted = false;
    playBtn.textContent = "▶ Play";
    playBtn.classList.remove("active");
    lines.forEach(line => line.classList.remove("active"));
});
});

// ============================================
// LYRIC TIMINGS - ADJUST THESE VALUES AS NEEDED
// All times are in milliseconds (ms) from when singing starts
// ============================================

const lyricTimings = [
    { start: 0,     duration: 3900 },  // Line 1: "So kiss me where I lay down"
    { start: 3900,  duration: 7300 },  // Line 2: "My hands pressed to your cheeks"
    { start: 7300,  duration: 11800 },  // Line 3: "A long way from the playground"
    { start: 11800,  duration: 18000 },  // Line 4: "I have loved you since we were 18"
    { start: 18000, duration: 22000 },  // Line 5: "Long before we both thought the same thing"
    { start: 22000, duration: 24800 },  // Line 6: "To be loved and to be in love"
    { start: 24800, duration: 29500 },  // Line 7: "All I could do is say that these arms"
    { start: 29500, duration: 33500 },  // Line 8: "were made for holding you, oh"
    { start: 33500, duration: 36700 },  // Line 9: "I wanna love like you made me feel"
    { start: 36700, duration: 70000 }   // Line 10: "When we were eighteen"
];

const totalLoopDuration = 70000;

function playLyricsLoop() {
    lyricTimings.forEach((timing, index) => {
        // Activate line
        setTimeout(() => {
            lines.forEach(line => line.classList.remove("active"));
            lines[index].classList.add("active");
        }, timing.start);

        // Deactivate line after duration
        setTimeout(() => {
            lines[index].classList.remove("active");
        }, timing.start + timing.duration);
    });
}