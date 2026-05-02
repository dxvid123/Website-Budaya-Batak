/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
/**
 * Function: Menambahkan class 'scrolled' ke navbar
 * saat user scroll lebih dari 50px
 * Method: window.addEventListener('scroll', callback)
 */
const navbar = document.getElementById("navbar"); // Method: Select element by ID

window.addEventListener("scroll", function () {
  // Method: Event listener untuk scroll
  if (window.scrollY > 50) {
    // Property: scrollY = jarak scroll vertikal
    navbar.classList.add("scrolled"); // Method: Tambah class CSS
  } else {
    navbar.classList.remove("scrolled"); // Method: Hapus class CSS
  }
});

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */
/**
 * Function: Toggle menu mobile saat hamburger diklik
 * Method: classList.toggle() untuk add/remove class
 */
const navbarToggle = document.getElementById("navbarToggle"); // Method: Select button
const navbarNav = document.getElementById("navbarNav"); // Method: Select menu

navbarToggle.addEventListener("click", function () {
  // Method: Event click
  navbarNav.classList.toggle("active"); // Method: Toggle class 'active'
});

/**
 * Function: Tutup menu mobile saat link navigasi diklik
 * Method: forEach untuk loop NodeList
 */
document.querySelectorAll(".nav-link").forEach((link) => {
  // Method: Select multiple elements
  link.addEventListener("click", () => {
    // Method: Arrow function untuk event
    navbarNav.classList.remove("active"); // Method: Hapus class active
  });
});

/* ========================================
   SMOOTH SCROLL NAVIGATION
   ======================================== */
/**
 * Function: Smooth scroll ke section saat link anchor diklik
 * Method: scrollIntoView() dengan behavior smooth
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  // Selector: link yang mulai dengan #
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Method: Mencegah default jump anchor

    const target = document.querySelector(this.getAttribute("href")); // Method: Get target element

    if (target) {
      // Condition: Pastikan target ada
      target.scrollIntoView({
        // Method: Scroll ke elemen
        behavior: "smooth", // Option: Animasi smooth
        block: "start", // Option: Scroll ke atas elemen
      });
    }
  });
});

/* ========================================
   SCROLL INDICATOR CLICK
   ======================================== */
/**
 * Function: Scroll ke section About saat panah diklik
 * Method: addEventListener + querySelector
 */
document
  .getElementById("scrollIndicator")
  .addEventListener("click", function () {
    document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
  });

/* ========================================
   ANIMATION ON SCROLL (Intersection Observer)
   ======================================== */
/**
 * Function: Animasi elemen saat muncul di viewport
 * Method: Intersection Observer API (modern & performant)
 *
 * ObserverOptions:
 * - threshold: 0.1 = trigger saat 10% elemen terlihat
 * - rootMargin: margin virtual untuk trigger lebih awal
 */
const observerOptions = {
  threshold: 0.1, // Property: Persentase elemen yang harus terlihat
  rootMargin: "0px 0px -100px 0px", // Property: Offset trigger dari bawah
};

/**
 * Constructor: IntersectionObserver
 * Parameter: callback function + options object
 */
const observer = new IntersectionObserver(function (entries) {
  // Method: Buat observer instance
  entries.forEach((entry) => {
    // Method: Loop setiap entry yang di-observe
    if (entry.isIntersecting) {
      // Property: true jika elemen di viewport
      entry.target.style.opacity = "1"; // Method: Ubah style inline
      entry.target.style.transform = "translateY(0)"; // Method: Reset transform
    }
  });
}, observerOptions);

/**
 * Function: Inisialisasi animasi untuk card elements
 * Method: querySelectorAll + forEach + observe()
 */
document
  .querySelectorAll(".culture-card, .culinary-card, .gallery-item")
  .forEach((el) => {
    // Set initial state untuk animasi
    el.style.opacity = "0"; // Method: Mulai transparan
    el.style.transform = "translateY(30px)"; // Method: Mulai 30px di bawah
    el.style.transition = "all 0.6s ease"; // Method: Tambah transition CSS

    // Register element ke observer
    observer.observe(el); // Method: Mulai observe elemen ini
  });
