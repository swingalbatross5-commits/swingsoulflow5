// Year in footer
const yEl = document.getElementById('y');
if (yEl) yEl.textContent = new Date().getFullYear();

// Simple fade slider (auto)
const slides = document.querySelectorAll('.slide');
let idx = 0;
function showNext() {
  if (!slides.length) return;
  slides[idx].classList.remove('active');
  idx = (idx + 1) % slides.length;
  slides[idx].classList.add('active');
}
// ensure first is visible
if (slides.length) {
  slides[0].classList.add('active');
  setInterval(showNext, 4000); // เปลี่ยนทุก 4 วิ
}

// Gallery logic
document.addEventListener('DOMContentLoaded', function () {
  const galleryImages = [
    "pic/slide1.jpg",
    "pic/slide2.jpg",
    "pic/slide3.jpg",
    "pic/slide4.jpg",
    "pic/slide5.jpg",
    "pic/slide6.jpg",
    "pic/slide7.jpg"
  ];
  let galleryIndex = 0;
  const galleryImg = document.getElementById('gallery-img');
  const galleryIndicator = document.getElementById('gallery-indicator');
  const prevBtn = document.querySelector('.gallery-btn.prev');
  const nextBtn = document.querySelector('.gallery-btn.next');
  let autoSlideTimer;

  function updateGallery() {
    if (!galleryImg) return;
    galleryImg.src = galleryImages[galleryIndex];
    galleryImg.alt = `บรรยากาศสนาม ${galleryIndex + 1}`;
    if (galleryIndicator) {
      galleryIndicator.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
    }
  }

  function showNextGallery() {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateGallery();
  }

  function showPrevGallery() {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(showNextGallery, 4000);
  }

  if (prevBtn && nextBtn && galleryImg) {
    prevBtn.onclick = function () {
      showPrevGallery();
      resetAutoSlide();
    };
    nextBtn.onclick = function () {
      showNextGallery();
      resetAutoSlide();
    };
    // Initial
    updateGallery();
    autoSlideTimer = setInterval(showNextGallery, 4000);
  }
});