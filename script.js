// Year in footer
const yEl = document.getElementById('y');
if (yEl) yEl.textContent = new Date().getFullYear();

// Simple fade slider (auto)
const slides = document.querySelectorAll('.slide');
let idx = 0;
function showNext(){
  if (!slides.length) return;
  slides[idx].classList.remove('active');
  idx = (idx + 1) % slides.length;
  slides[idx].classList.add('active');
}
// ensure first is visible
if (slides.length){
  slides[0].classList.add('active');
  setInterval(showNext, 4000); // เปลี่ยนทุก 4 วิ
}