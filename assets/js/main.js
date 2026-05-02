const texts = [
  "Software Engineer 💻",
  "Frontend Developer 🎨",
  "React & Firebase Enthusiast 🚀"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
  current = texts[i];

  if (!isDeleting) {
    j++;
    document.getElementById("typing").innerText = current.substring(0, j);
    if (j === current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    j--;
    document.getElementById("typing").innerText = current.substring(0, j);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();
