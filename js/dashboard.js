const sapaan = document.getElementById("sapaan");

const waktu = new Date().getHours();

if (waktu >= 5 && waktu < 11) {
    sapaan.textContent = "Selamat Pagi!";

} else if (waktu >= 11 && waktu < 15) {
    sapaan.textContent = "Selamat Siang!";

} else if (waktu >= 15 && waktu < 18) {
    sapaan.textContent = "Selamat Sore!";

} else {
    sapaan.textContent = "Selamat Malam!";
}