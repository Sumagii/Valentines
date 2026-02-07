// ======================
// ELEMENT REFERENCES
// ======================
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const music = document.getElementById("music");

const envelopeWrap = document.querySelector(".valentines");
const shadow = document.querySelector(".shadow");
const modal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");

let currentMusicStage = -1;

envelopeWrap.style.display = "none";
shadow.style.display = "none"

// ======================
// MUSIC STAGES (changes every 2 NO clicks)
// ======================
const musicStages = [
  "music/sad1.mp4",
  "music/sad2.mp4",
  "music/sad3.mp3"
];

// ======================
// TEXT & IMAGE STAGES
// ======================
const texts = [
  "Are you sure? 😢",
  "Please… 🥺",
  "sakit mo sah 💔",
  "GE WAG NALANG 😭",
  "CHE 😩",
  "k fine 😔"
];

const yesSadTexts = [
  "Yes 😢",
  "Yes 😔",
  "Yes 😭",
  "Yes 💔",
  "Yes 😩",
  "Yes 😭",
  "Yes 😼"
];

const images = [
  "images/sad1.jpg",
  "images/sad2.jpg"
];

const gifURL = "https://media.tenor.com/6eod_gowF2IAAAAC/reee-lul.gif";

// ======================
// HELPER: RESPONSIVE SIZE
// ======================
function getResponsiveWidth() {
  const width = window.innerWidth;
  if (width <= 425) return 180;  // small mobile
  if (width <= 768) return 250;  // tablet
  return 400;                     // desktop
}

function getResponsiveGifWidth() {
  const width = window.innerWidth;
  if (width <= 425) return 200;
  if (width <= 768) return 300;
  return 350;
}

// ======================
// BACKGROUND FLOATING HEARTS
// ======================
for (let i = 0; i < 15; i++) {
  const heart = document.createElement("div");
  heart.className = "bg-heart";
  heart.textContent = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 10 + Math.random() * 10 + "s";
  document.body.appendChild(heart);
}

// ======================
// STATE
// ======================
let noCount = 0;
let imageIndex = 0;
let rainIntensity = 0;

// ======================
// HELPER: CREATE RAIN
// ======================
function createRain(amount) {
  for (let i = 0; i < amount; i++) {
    const drop = document.createElement("div");
    drop.className = "rain";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 2000);
  }
}

// ======================
// NO BUTTON CLICK HANDLER
// ======================
noBtn.addEventListener("click", () => {
  noCount++;

  noBtn.style.position = "absolute";
  noBtn.style.zIndex = "10";
  noBtn.textContent = texts[Math.min(noCount - 1, texts.length - 1)];

  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 300);

  rainIntensity += 5;
  createRain(rainIntensity);

  const r = Math.max(255 - noCount * 20, 0);
  const g = Math.max(154 - noCount * 15, 0);
  const b = Math.max(158 - noCount * 15, 0);
  document.body.style.background = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), #2b2b2b)`;

  yesBtn.textContent = yesSadTexts[Math.min(noCount - 1, yesSadTexts.length - 1)];
  yesBtn.style.background = `linear-gradient(135deg, #ff4d6d, #a8324d)`;
  yesBtn.style.border = "2px solid white";
  yesBtn.style.color = "#fff";
  yesBtn.style.textShadow = "1px 1px 2px #000";

  // ===== Add images responsively =====
  if (noCount === 2 && imageIndex === 0) {
    const img1 = document.createElement("img");
    img1.src = images[0];
    img1.style.position = "absolute";
    img1.style.width = getResponsiveWidth() + "px";
    img1.style.top = "50px";
    img1.style.left = "50px";
    img1.style.zIndex = "1";
    document.body.appendChild(img1);
    imageIndex++;
  }

  if (noCount === 4 && imageIndex === 1) {
    const img2 = document.createElement("img");
    img2.src = images[1];
    img2.style.position = "absolute";
    img2.style.width = getResponsiveWidth() + "px";
    img2.style.top = "50px";
    img2.style.right = "50px";
    img2.style.zIndex = "1";
    document.body.appendChild(img2);
    imageIndex++;
  }

  if (noCount === 6 && imageIndex === 2) {
    const appRect = document.querySelector(".app").getBoundingClientRect();
    const img3 = document.createElement("img");
    img3.src = gifURL;
    img3.style.position = "absolute";
    img3.style.width = getResponsiveGifWidth() + "px";
    img3.style.top = appRect.bottom + 20 + "px";
    img3.style.left = "50%";
    img3.style.transform = "translateX(-50%)";
    img3.style.zIndex = "1";
    document.body.appendChild(img3);
    imageIndex++;
  }

  // ===== Music stages =====
  const musicIndex = Math.floor((noCount - 1) / 2);
  if (musicIndex !== currentMusicStage && musicIndex < musicStages.length) {
    music.src = musicStages[musicIndex];
    music.play();
    currentMusicStage = musicIndex;
  }

  // ===== Final Stage =====
  if (noCount >= 7) {
    noBtn.style.display = "none";
    yesBtn.classList.add("final-devil");
    yesBtn.style.marginTop = "30px";

    message.style.marginTop = "80px";
    message.style.fontSize = "1.5rem";
    message.textContent = "You have no escape now😈";
    message.style.animation = "heartbeat 3s infinite";
    message.style.color = "#e62d4fff";

    document.querySelectorAll("img").forEach(i => {
      if (!i.closest(".app")) i.remove();
    });

    document.querySelectorAll(".rain").forEach(r => r.remove());
    document.body.style.background = "linear-gradient(135deg, #ff4d6d, #ffc6d9)";

    music.src = "music/muhehehe.mp3";
    music.play();

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }
});

// ======================
// CENTER ENVELOPE CHILDREN
// ======================
function centerEnvelopeChildren() {
  shadow.style.left = "50%";
  shadow.style.transform = "translateX(-50%)";

  const hearts = envelopeWrap.querySelector(".hearts");
  const hearts1 = envelopeWrap.querySelector(".hearts1");

  if (hearts) {
    hearts.style.left = "50%";
    hearts.style.transform = "translateX(-50%)";
  }
  if (hearts1) {
    hearts1.style.left = "50%";
    hearts1.style.transform = "translateX(-50%)";
  }
}

// ======================
// YES BUTTON CLICK HANDLER
// ======================
function typeText(element, text, speed = 50, callback) {
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

yesBtn.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  document.querySelectorAll("img").forEach(i => {
    if (!i.closest(".app")) i.remove();
  });
  const mainTitle = document.getElementById("title");
  if (mainTitle) mainTitle.style.display = "none";

  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(45deg, #ff4d6d, #ffb3c1, #fffc9e, #6df2ff, #ff6fff)",
    opacity: "1",
    zIndex: "100",
    pointerEvents: "none"
  });
  document.body.appendChild(flash);
  flash.animate(
    [
      { opacity: 1, filter: "blur(0px) brightness(2)" },
      { opacity: 0, filter: "blur(20px) brightness(1)" }
    ],
    { duration: 10000, easing: "ease-out" }
  ).onfinish = () => flash.remove();

  message.style.marginTop = "500px";
  message.style.fontSize = "3rem";
  message.textContent = "YAYYY 💕 Surprise!!!";
  message.style.fontFamily = "lucy";
  message.style.fontSize = "5rem";
  message.style.fontWeight = "lighter";

  music.src = "music/Songgg.m4a";
  music.play().catch(err => console.log("Music play error:", err));

  envelopeWrap.style.display = "flex";
  centerEnvelopeChildren();
  envelopeWrap.style.position = "fixed";
  envelopeWrap.style.top = "50%";
  envelopeWrap.style.left = "50%";
  envelopeWrap.style.transform = "translate(-50%, -50%)";
  envelopeWrap.style.zIndex = "5";
  envelopeWrap.style.cursor = "pointer";
  envelopeWrap.style.animation = "up 2s ease-in-out infinite";

  shadow.style.display = "block";
  shadow.style.position = "fixed";
  shadow.style.left = "50%";
  shadow.style.top = "calc(50% + 135px)";
  shadow.style.transform = "translateX(-50%) scale(1)";
  shadow.style.zIndex = "1";
  shadow.style.borderRadius = "50%";
  shadow.style.backgroundColor = "rgba(0,0,0,0.3)";
  shadow.style.animation = "shadowScale 2s ease-in-out infinite";

  envelopeWrap.onclick = () => {
    modal.style.display = "flex";
    envelopeWrap.style.display = "none";
    shadow.style.display = "none";

    const existingImg = modal.querySelector(".letter img");
    if (!existingImg) {
      const img = document.createElement("img");
      img.src = "images/cute.jpg";
      img.alt = "Cute Image";
      img.style.width = "80%";
      img.style.maxWidth = "200px";
      img.style.margin = "15px auto";
      img.style.display = "block";
      img.style.borderRadius = "12px";
      img.style.opacity = "0";
      modal.querySelector(".letter").insertBefore(img, modal.querySelector(".letter .typing-text"));

      img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1500, easing: "ease-out", fill: "forwards" });
    }
    const paragraphs = modal.querySelectorAll(".typing-text");

    paragraphs.forEach((p, index) => {
      const fullText = p.textContent;
      p.textContent = "";
      setTimeout(() => {
        typeText(p, fullText, 40);
      }, index * 800);
    });
  };

  const colors = ["💙","🖤","💘","🥔","✨","🌟"];
  const continuousEffect = setInterval(() => {
    const elem = document.createElement("div");
    elem.textContent = colors[Math.floor(Math.random() * colors.length)];
    Object.assign(elem.style, {
      position: "absolute",
      left: Math.random() * 90 + "vw",
      top: Math.random() * 80 + "vh",
      fontSize: 20 + Math.random() * 30 + "px",
      zIndex: "15",
      pointerEvents: "none"
    });
    document.body.appendChild(elem);
    elem.animate(
      [
        { transform: "translateY(0px) scale(1)", opacity: 1 },
        { transform: "translateY(-250px) scale(1.5)", opacity: 0 }
      ],
      { duration: 3000 + Math.random() * 2000, easing: "ease-out" }
    ).onfinish = () => elem.remove();
  }, 150);
  setTimeout(() => clearInterval(continuousEffect), 30000);

  document.body.animate(
    [
      { backgroundColor: "#ff9a9e" },
      { backgroundColor: "#ffd1dc" },
      { backgroundColor: "#ff9a9e" }
    ],
    { duration: 2000, iterations: 2 }
  );
});

// ======================
// MODAL CLOSE
// ======================
closeLetter.addEventListener("click", () => {
  modal.style.display = "none";
  envelopeWrap.style.display = "flex";
  shadow.style.display = "block";
  centerEnvelopeChildren();
});
