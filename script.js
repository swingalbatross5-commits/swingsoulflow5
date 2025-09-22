// Year in footer
const yEl = document.getElementById('y');
if (yEl) yEl.textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  // --- Hero Slide (ภาพบนสุดเปลี่ยนอัตโนมัติ) ---
  const slides = document.querySelectorAll('.slide');
  let idx = 0;
  if (slides.length > 0) {
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 4000); // เปลี่ยนทุก 4 วินาที
  }

  // --- Gallery Section (ปุ่มเปลี่ยนภาพ + อัตโนมัติ) ---
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
    updateGallery();
    autoSlideTimer = setInterval(showNextGallery, 4000);
  }

  // --- Review system ---
  const showReviewFormBtn = document.getElementById('showReviewForm');
  const reviewFormSection = document.getElementById('reviewFormSection');
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('reviewText');
  const charCount = document.getElementById('charCount');
  const reviewsDiv = document.getElementById('reviews');
  const imageInput = document.getElementById('reviewImage');

  // Show/hide form
  if (showReviewFormBtn && reviewFormSection) {
    showReviewFormBtn.onclick = function() {
      reviewFormSection.style.display = reviewFormSection.style.display === 'none' ? 'block' : 'none';
    };
  }

  // Character count
  if (reviewText && charCount) {
    reviewText.oninput = function() {
      charCount.textContent = `${this.value.length}/200`;
    };
  }

  // Mask email
  function maskEmail(email) {
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

  // Render reviews
  function renderReviews(reviews) {
    reviewsDiv.innerHTML = '';
    if (!reviews || reviews.length === 0) {
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
        <button class="btn btn-ghost btn-delete" data-index="${i}" style="font-size:12px;padding:4px 10px;">ลบรีวิว</button>
        <div class="delete-password" style="display:none;margin-top:4px;">
          <input type="password" placeholder="รหัสผ่านสำหรับลบ" class="delete-pass-input" style="font-size:12px;">
          <button class="btn btn-primary btn-confirm-delete" data-index="${i}" style="font-size:12px;padding:2px 8px;">ยืนยัน</button>
        </div>
      `;
      if (r.image) {
        reviewEl.innerHTML += `<div><img src="/uploads/${r.image}" alt="รูปรีวิว" style="width:400px;height:400px;object-fit:cover;border-radius:8px;margin-top:8px;"></div>`;
      }
      reviewsDiv.appendChild(reviewEl);
    });
    // ... (ปุ่มลบรีวิว)
  }

  // โหลดรีวิว
  function loadReviews() {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(renderReviews);
  }

  // Submit review
  if (reviewForm) {
    reviewForm.onsubmit = function(e) {
      e.preventDefault();
      if (reviewText.value.length > 200) {
        alert("ข้อความต้องไม่เกิน 200 ตัวอักษร");
        return;
      }
      if (imageInput && imageInput.files[0] && imageInput.files[0].size > 4 * 1024 * 1024) {
        alert("ขนาดไฟล์รูปต้องไม่เกิน 4MB");
        return;
      }
      const formData = new FormData();
      formData.append('name', document.getElementById('reviewName').value);
      formData.append('surname', document.getElementById('reviewSurname').value);
      formData.append('email', document.getElementById('reviewEmail').value);
      formData.append('text', reviewText.value);
      if (imageInput && imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
      }

      fetch('/api/reviews', {
        method: 'POST',
        body: formData
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            loadReviews();
            reviewForm.reset();
            if (charCount) charCount.textContent = "0/200";
            if (reviewFormSection) reviewFormSection.style.display = 'none';
          } else {
            alert("เกิดข้อผิดพลาด");
          }
        });
    };
  }

  loadReviews();
});