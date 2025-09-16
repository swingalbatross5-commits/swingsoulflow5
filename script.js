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

// Review system
document.addEventListener('DOMContentLoaded', function () {
  const showReviewFormBtn = document.getElementById('showReviewForm');
  const reviewFormSection = document.getElementById('reviewFormSection');
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('reviewText');
  const charCount = document.getElementById('charCount');
  const reviewsDiv = document.getElementById('reviews');

  let reviews = [];

  // Show/hide form
  showReviewFormBtn.onclick = () => {
    reviewFormSection.style.display = reviewFormSection.style.display === 'none' ? 'block' : 'none';
  };

  // Character count
  reviewText.oninput = function() {
    charCount.textContent = `${this.value.length}/200`;
  };

  // Render reviews
  function renderReviews() {
  reviewsDiv.innerHTML = '';
  if (reviews.length === 0) {
    reviewsDiv.innerHTML = '<div style="color:#888;">ยังไม่มีรีวิว</div>';
    return;
  }
  reviews.forEach((r, i) => {
    const reviewEl = document.createElement('div');
    reviewEl.className = 'review-item';
    reviewEl.style = "border-bottom:1px solid #eee;padding:10px 0;";
    reviewEl.innerHTML = `
      <div><strong>${r.name} ${r.surname}</strong> <span style="color:#888;font-size:12px;">(${maskEmail(r.email)})</span></div>
      <div style="margin:6px 0 4px 0;">${r.text}</div>
      <button class="btn btn-ghost btn-delete" data-index="${i}" style="font-size:12px;padding:4px 10px;">ลบ</button>
      <div class="delete-password" style="display:none;margin-top:4px;">
        <input type="password" placeholder="รหัสผ่านสำหรับลบ" class="delete-pass-input" style="font-size:12px;">
        <button class="btn btn-primary btn-confirm-delete" data-index="${i}" style="font-size:12px;padding:2px 8px;">ยืนยัน</button>
      </div>
    `;
    reviewsDiv.appendChild(reviewEl);
  });

    // Add delete event
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.onclick = function() {
        const parent = this.parentElement;
        parent.querySelector('.delete-password').style.display = 'block';
      };
    });
    document.querySelectorAll('.btn-confirm-delete').forEach(btn => {
      btn.onclick = function() {
        const idx = this.getAttribute('data-index');
        const pass = this.parentElement.querySelector('.delete-pass-input').value;
        if (pass === "20042004") {
          reviews.splice(idx, 1);
          renderReviews();
        } else {
          alert("รหัสผ่านไม่ถูกต้อง");
        }
      };
    });
  }

  // Submit review
  reviewForm.onsubmit = function(e) {
    e.preventDefault();
    if (reviewText.value.length > 200) {
      alert("ข้อความต้องไม่เกิน 200 ตัวอักษร");
      return;
    }
    reviews.push({
      name: document.getElementById('reviewName').value,
      surname: document.getElementById('reviewSurname').value,
      email: document.getElementById('reviewEmail').value,
      text: reviewText.value
    });
    renderReviews();
    reviewForm.reset();
    charCount.textContent = "0/200";
    reviewFormSection.style.display = 'none';
  };

  renderReviews();
});
function maskEmail(email) {
  // ตัวอย่าง: j***@gmail.com หรือ jo***@do.com
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;
  let maskedName = name.length <= 2
    ? name[0] + '***'
    : name.slice(0, 2) + '***';
  let maskedDomain = domain.length > 6
    ? domain.slice(0, 2) + '***' + domain.slice(-4)
    : domain;
  return maskedName + '@' + maskedDomain;
}
