const namaToko = "BookStore";

let jumlahPercobaan = 0;

let statusLogin = false;

console.log(namaToko);
console.log(jumlahPercobaan);
console.log(statusLogin);

const formLogin = document.getElementById("formLogin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

formLogin.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value;

    if (email === "admin@bookstore.com" && password === "buku123") {
        alert("Login berhasil!");
        window.location.href = "dashboard.html";
    } else {
        alert("email/password yang anda masukkan salah");
    }

});

const modal = document.getElementById("modalPopup");
const judulModal = document.getElementById("judulModal");
const isiModal = document.getElementById("isiModal");

const tombolLupa = document.getElementById("lupaPassword");
const tombolDaftar = document.getElementById("daftar");
const tombolTutup = document.getElementById("tutupModal");

tombolLupa.addEventListener("click", function() {
    modal.style.display = "block";
    judulModal.textContent = "Lupa Password?";
    isiModal.textContent = "Silakan hubungi admin untuk bantuan pemulihan password.";
});

tombolDaftar.addEventListener("click", function() {
    modal.style.display = "block";
    judulModal.textContent = "Daftar Akun";
    isiModal.textContent = "Fitur pendaftaran akun BookStore.";
});

tombolTutup.addEventListener("click", function() {
    modal.style.display = "none";
});