let modal = document.getElementById("rulesModal");
let openBtn = document.getElementById("openRules");
let closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";