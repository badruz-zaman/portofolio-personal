const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// Ke Halaman Utama
document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector(".sign-in-form");
  const signUpForm = document.querySelector(".sign-up-form");

  // Fungsi untuk registrasi (menyimpan data ke Local Storage)
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Mencegah reload halaman default form

      const username = signUpForm.querySelector("input[type='text']").value;
      const email = signUpForm.querySelector("input[type='email']").value;
      const password = signUpForm.querySelector("input[type='password']").value;

      // Validasi input kosong
      if (!username || !email || !password) {
        alert("Harap isi semua field!");
        return;
      }

      // Simpan data ke Local Storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const isExisting = users.some((user) => user.username === username);

      if (isExisting) {
        alert("Username sudah terdaftar! Silakan gunakan username lain.");
      } else {
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registrasi berhasil! Akun telah dibuat.");
        window.location.href = "../Main/index.html"; // Redirect ke halaman utama setelah registrasi
      }
    });
  }

  // Fungsi untuk login (memeriksa data dari Local Storage)
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Mencegah reload halaman default form

      const username = signInForm.querySelector("input[type='text']").value;
      const password = signInForm.querySelector("input[type='password']").value;

      // Ambil data dari Local Storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const isValidUser = users.some(
        (user) => user.username === username && user.password === password
      );

      if (isValidUser) {
        alert("Login berhasil!");
        window.location.href = "../Main/index.html"; // Redirect ke halaman utama setelah login
      } else {
        alert("Username atau password salah!");
      }
    });
  }
});
