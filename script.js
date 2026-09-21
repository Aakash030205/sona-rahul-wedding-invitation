const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  opening.classList.add("hidden");
  invitation.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });

  // Browsers usually allow audio after a user click.
  try {
    weddingMusic.play().then(() => {
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("aria-label", "Pause music");
    }).catch(() => {});
  } catch (_) {}
});

/* Countdown to wedding ceremony: 26 September 2026, 10:00 AM IST */
const weddingDate = new Date("2026-09-26T10:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  const message = document.getElementById("countdownMessage");

  if (distance <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    message.textContent = "The wedding celebration has begun! ❤️";
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const m = Math.floor((distance / (1000 * 60)) % 60);
  const s = Math.floor((distance / 1000) % 60);

  days.textContent = String(d).padStart(2, "0");
  hours.textContent = String(h).padStart(2, "0");
  minutes.textContent = String(m).padStart(2, "0");
  seconds.textContent = String(s).padStart(2, "0");
  message.textContent = "Until Sona & Rahul say “I do”";
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Music */
const musicBtn = document.getElementById("musicBtn");
const weddingMusic = document.getElementById("weddingMusic");

musicBtn.addEventListener("click", async () => {
  if (weddingMusic.paused) {
    try {
      await weddingMusic.play();
      musicBtn.classList.add("playing");
      musicBtn.textContent = "♫";
      musicBtn.setAttribute("aria-label", "Pause music");
      musicBtn.title = "Pause music";
    } catch (_) {
      alert("Please add assets/aaha-kalyanam.mp3 to the project first.");
    }
  } else {
    weddingMusic.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♪";
    musicBtn.setAttribute("aria-label", "Play music");
    musicBtn.title = "Play music";
  }
});
