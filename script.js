// ...existing code...
// Client-side script: gallery, reviews, form, preview, i18n, utils

// Year in footer
(function setYear() {
  const yEl = document.getElementById('y');
  if (yEl) yEl.textContent = new Date().getFullYear();
})();

// --- Translations (i18n) ---
const I18N = {
  th: {
    siteTitle: "Swing Soul Flow 5",
    heroTitle: "สนามไดร์ฟกอล์ฟที่สงบ สามารถฝึกสมาธิและโฟกัสสวิงได้เต็มที่",
    heroLead: "บรรยากาศร่มรื่น เหมาะสำหรับผู้เริ่มต้นจนถึงมือโปร",
    callmap: "ดูแผนที่",
    welcomeTitle: "ยินดีต้อนรับ! <span style='color:#2b6fa6'>Swing Soul Flow 5</span>",
    welcomeP1: "Swing Soul Flow 5 ตั้งอยู่บนพื้นที่อันเงียบสงบของปราณบุรี มอบประสบการณ์สนามไดร์ฟกอล์ฟระดับพรีเมียมที่ออกแบบมาสำหรับทั้งนักกอล์ฟมือใหม่และนักกอล์ฟที่มีประสบการณ์",
    welcomeP2: "พื้นที่กว้างขวาง สิ่งอำนวยความสะดวกคุณภาพ และบรรยากาศธรรมชาติที่ช่วยให้คุณโฟกัสการฝึกซ้อมได้เต็มที่",
    galleryTitle: "บรรยากาศสนาม",
    reviewTitle: "รีวิวจากลูกค้า",
    showReviewBtn: "แสดงความคิดเห็น / รีวิว",
    footerText: "Swing Soul Flow 5 — Pranburi Driving Range",
    chooseFile: "เลือกรูปภาพ (ถ้ามี)",
    submitReview: "ส่งความคิดเห็น",
    resetForm: "ล้างข้อมูล",
    noReviews: "ยังไม่มีรีวิว",
    // about / hours / contact
    aboutTitle: "เกี่ยวกับเรา",
    aboutLead: "Swing Soul Flow 5 — สนามไดร์ฟกอล์ฟในอำเภอปราณบุรี จังหวัดประจวบคีรีขันธ์ บรรยากาศสงบ เหมาะสำหรับฝึกซ้อมทุกระดับ",
    hoursTitle: "เวลา เปิด-ปิด",
    days: {
      monday: "จันทร์",
      tuesday: "อังคาร",
      wednesday: "พุธ",
      thursday: "พฤหัสบดี",
      friday: "ศุกร์",
      saturday: "เสาร์",
      sunday: "อาทิตย์"
    },
    contactTitle: "ติดต่อเรา",
    contactTitle2: "ติดต่อเรา",
    addressLabel: "ที่อยู่:",
    addressText: "214/1 ถ.เพชรเกษม ต.เขาน้อย อ.ปราณบุรี จ.                           ประจวบคีรีขันธ์ 77120",
    tel: "+66 83 308 4455",
    email: "swingsoulflow5@gmail.com"
  },
  en: {
    siteTitle: "Swing Soul Flow 5",
    heroTitle: "Calm driving range to practice focus and your swing",
    heroLead: "A peaceful atmosphere suitable for beginners to professionals",
    callmap: "Map",
    welcomeTitle: "Welcome! <span style='color:#2b6fa6'>Swing Soul Flow 5</span>",
    welcomeP1: "Swing Soul Flow 5 For that area of ​​Pranburi, it offers an outstanding golf practice experience for both beginners and experienced golfers.",
    welcomeP2: "Spacious space, quality facilities and a natural atmosphere that allows you to focus on your training.",
    galleryTitle: "Gallery",
    reviewTitle: "Customer Reviews",
    showReviewBtn: "review",
    footerText: "Swing Soul Flow 5 — Pranburi Driving Range",
    chooseFile: "Choose image (optional)",
    submitReview: "Submit",
    resetForm: "Reset",
    noReviews: "No reviews yet",
    // about / hours / contact
    aboutTitle: "About Us",
    aboutLead: "Swing Soul Flow 5 — driving range in Pranburi, a peaceful place suitable for all levels",
    hoursTitle: "Opening hours",
    days: {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun"
    },
    contactTitle: "Contact",
    contactTitle2: "Contact",
    addressLabel: "Address:",
    addressText: "214/1 Phetkasem Road, Khao Noi, Pranburi, Prachuap Khiri Khan 77120",
    tel: "+66 83 308 4455",
    email: "swingsoulflow5@gmail.com"
  }
};

function applyLanguage(lang) {
  console.log('applyLanguage ->', lang);
  const t = I18N[lang] || I18N.th;

  const setHTML = (id, html) => {
    const el = document.getElementById(id);
    if (!el) { console.warn('missing element', id); return; }
    el.innerHTML = html;
    console.log('setHTML', id);
  };
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (!el) { console.warn('missing element', id); return; }
    el.textContent = text;
    console.log('setText', id);
  };

  // core
  setText('site-title', t.siteTitle);
  setHTML('hero-title', t.heroTitle);
  setText('hero-lead', t.heroLead);
  setHTML('welcome-title', t.welcomeTitle);
  setText('welcome-p1', t.welcomeP1);
  setText('callmap', t.callmap);
  setText('welcome-p2', t.welcomeP2);
  setText('gallery-title', t.galleryTitle);
  setText('review-title', t.reviewTitle);
  setText('showReviewForm', t.showReviewBtn);
  setText('contactUs2', t.contactTitle2);
  setText('footer-text', t.footerText);

  // form / buttons
  const fileLabelSpan = document.querySelector('.file-label span');
  if (fileLabelSpan) { fileLabelSpan.textContent = t.chooseFile; console.log('setText file-label'); }
  const submitBtn = document.querySelector('#reviewForm button[type="submit"]');
  if (submitBtn) { submitBtn.textContent = t.submitReview; console.log('setText submitBtn'); }
  const resetBtn = document.querySelector('#reviewForm button[type="reset"]');
  if (resetBtn) { resetBtn.textContent = t.resetForm; console.log('setText resetBtn'); }

  // about / hours
  setText('aboutUs', t.aboutTitle);
  setText('aboutUsText', t.aboutLead);
  setText('Opening', t.hoursTitle);
  if (t.days) {
    Object.entries(t.days).forEach(([key, label]) => {
      const el = document.getElementById(key);
      if (el) { el.textContent = label; console.log('setText day', key); }
      else console.warn('missing day element', key);
    });
  }

  // contact
  setText('contactUs', t.contactTitle);
  const addrEl = document.getElementById('address');
  if (addrEl) { addrEl.innerHTML = `<strong>${t.addressLabel}</strong>`; console.log('setHTML address'); }
  setText('addressText', t.addressText);

  // telephone / email anchors (by href)
  const telEl = document.querySelector('.contact-info a[href^="tel:"]');
  if (telEl) { telEl.textContent = t.tel; telEl.setAttribute('href', 'tel:' + t.tel.replace(/\s+/g,'')); console.log('setText tel'); }
  const emailEl = document.querySelector('.contact-info a[href^="mailto:"]');
  if (emailEl) { emailEl.textContent = t.email; emailEl.setAttribute('href', 'mailto:' + t.email); console.log('setText email'); }

  // lang button active
  const btnTh = document.getElementById('lang-th');
  const btnEn = document.getElementById('lang-en');
  if (btnTh) btnTh.classList.toggle('active-lang', lang === 'th');
  if (btnEn) btnEn.classList.toggle('active-lang', lang === 'en');

  try { localStorage.setItem('site_lang', lang); } catch (e) { /* ignore */ }

  console.log('applyLanguage finished');
}

// --- Utilities ---
function maskEmail(email) {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (!domain) return email;
  const a = name.slice(0, 2) + '***';
  return a + '@' + domain;
}

function safeFetchJSON(url, opts) {
  return fetch(url, opts).then(r => {
    if (!r.ok) throw new Error('Network response not ok: ' + r.status);
    return r.json();
  });
}

// --- Gallery behavior ---
function initGallery() {
  const main = document.getElementById('gallery-img');
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumbs .thumb'));
  if (!main || thumbs.length === 0) return;

  const setActiveThumb = (el) => {
    thumbs.forEach(t => t.classList.toggle('active', t === el));
  };

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      const src = t.getAttribute('src') || t.dataset.src;
      if (src) main.src = src;
      setActiveThumb(t);
    });
  });

  // keyboard left/right to cycle thumbs
  document.addEventListener('keydown', (e) => {
    if (!main) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const activeIndex = thumbs.findIndex(t => t.classList.contains('active'));
      let next = activeIndex;
      if (activeIndex === -1) next = 0;
      else if (e.key === 'ArrowLeft') next = (activeIndex - 1 + thumbs.length) % thumbs.length;
      else next = (activeIndex + 1) % thumbs.length;
      const t = thumbs[next];
      if (t) { t.click(); t.scrollIntoView({behavior:'smooth', inline:'center'}); }
    }
  });

  // set first active
  if (!thumbs.some(t => t.classList.contains('active'))) setTimeout(()=>thumbs[0].classList.add('active'), 0);
}

// --- Reviews: fetch & render ---
async function loadReviews() {
  const reviewsDiv = document.getElementById('reviews');
  if (!reviewsDiv) return;
  reviewsDiv.innerHTML = '<div style="color:var(--muted);padding:8px;">Loading...</div>';
  try {
    const reviews = await (await fetch('/api/reviews')).json();
    renderReviews(Array.isArray(reviews) ? reviews : []);
  } catch (err) {
    console.error('loadReviews error', err);
    reviewsDiv.innerHTML = '<div style="color:#b00;padding:8px;">ไม่สามารถโหลดรีวิวได้</div>';
  }
}

function renderReviews(reviews) {
  const reviewsDiv = document.getElementById('reviews');
  if (!reviewsDiv) return;
  if (!reviews || reviews.length === 0) {
    const noText = (localStorage.getItem('site_lang') === 'en') ? I18N.en.noReviews : I18N.th.noReviews;
    reviewsDiv.innerHTML = `<div style="color:var(--muted);padding:12px;">${noText}</div>`;
    return;
  }

  // newest first
  const list = reviews.slice().reverse();
  reviewsDiv.innerHTML = '';
  list.forEach((r, idx) => {
    const imgSrc = r.image ? `/uploads/${r.image}` : 'Swing.png';
    const item = document.createElement('article');
    item.className = 'review-item';
    item.innerHTML = `
      <img class="review-img" src="${imgSrc}" alt="review image">
      <div class="review-meta">
        <div class="name">${escapeHtml(r.name || '')} ${escapeHtml(r.surname || '')} <span style="color:var(--muted);font-weight:600;font-size:0.85rem">(${maskEmail(r.email||'')})</span></div>
        <div class="text">${escapeHtml(r.text || '')}</div>
      </div>
    `;
    reviewsDiv.appendChild(item);
  });
}

// simple HTML escape
function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// --- Review form: preview, charcount, submit ---
function initReviewForm() {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  const imageInput = document.getElementById('reviewImage');
  const previewImg = document.getElementById('reviewPreview');
  const charCount = document.getElementById('charCount');
  const textArea = document.getElementById('reviewText');

  // preview
  if (imageInput && previewImg) {
    imageInput.addEventListener('change', function() {
      const f = this.files && this.files[0];
      if (!f) { previewImg.style.display = 'none'; previewImg.src=''; return; }
      const reader = new FileReader();
      reader.onload = e => {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
      };
      reader.readAsDataURL(f);
    });
  }

  // char count
  if (textArea && charCount) {
    const update = () => charCount.textContent = `${textArea.value.length}/200`;
    textArea.addEventListener('input', update);
    update();
  }

  // submit
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    try {
      const fd = new FormData(form);
      // ensure fields exist
      if (!fd.get('name') && document.getElementById('reviewName')) fd.set('name', document.getElementById('reviewName').value);
      if (!fd.get('surname') && document.getElementById('reviewSurname')) fd.set('surname', document.getElementById('reviewSurname').value);
      // server expects fields as used in backend; adapt if necessary
      const res = await fetch('/api/reviews', { method: 'POST', body: fd });
      const json = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(json && json.error ? json.error : 'Post error');
      // success: reset form, reload reviews, hide form
      form.reset();
      if (previewImg) { previewImg.style.display='none'; previewImg.src=''; }
      await loadReviews();
      const formSection = document.getElementById('reviewFormSection');
      if (formSection) formSection.style.display = 'none';
    } catch (err) {
      console.error('submit review error', err);
      alert('ไม่สามารถส่งรีวิวได้: ' + (err.message || err));
    } finally {
      if (btn) {
        try {
          btn.disabled = false;
          const lang = localStorage.getItem('site_lang') || 'th';
          btn.textContent = I18N[lang].submitReview || 'Submit';
        } catch (e) { btn.textContent = 'Submit'; }
      }
    }
  });

  // reset behaviour: hide preview and reset char count
  form.addEventListener('reset', () => {
    setTimeout(() => {
      if (previewImg) { previewImg.style.display='none'; previewImg.src=''; }
      if (textArea && charCount) charCount.textContent = `${textArea.value.length}/200`;
    }, 10);
  });
}

// toggle review form
function initFormToggle() {
  const toggle = document.getElementById('showReviewForm');
  const section = document.getElementById('reviewFormSection');
  if (!toggle || !section) return;
  toggle.addEventListener('click', () => {
    section.style.display = (section.style.display === 'none' || !section.style.display) ? 'block' : 'none';
    // scroll into view when opening
    if (section.style.display === 'block') section.scrollIntoView({behavior:'smooth', block:'center'});
  });
}

// --- Initialize on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
  // language buttons
  const btnTh = document.getElementById('lang-th');
  const btnEn = document.getElementById('lang-en');
  if (btnTh) btnTh.addEventListener('click', () => applyLanguage('th'));
  if (btnEn) btnEn.addEventListener('click', () => applyLanguage('en'));
  const savedLang = (() => { try { return localStorage.getItem('site_lang'); } catch(e){ return null } })() || 'th';
  applyLanguage(savedLang);

  // init components
  initGallery();
  initReviewForm();
  initFormToggle();
  loadReviews().catch(()=>{});

  // accessibility: focus outline visible on keyboard navigation
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
  }, { once: true });
});

// --- Hero carousel: autoplay, pause on hover, manual via thumbnails ---
function initHeroCarousel(options = {}) {
  const interval = options.interval || 5000;
  const slides = Array.from(document.querySelectorAll('.hero-media .slide'));
  if (!slides.length) return;

  let idx = slides.findIndex(s => s.classList.contains('active'));
  if (idx === -1) idx = 0;
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));

  let timer = null;
  const goTo = (next) => {
    slides[idx].classList.remove('active');
    idx = (next + slides.length) % slides.length;
    slides[idx].classList.add('active');
  };
  const next = () => goTo(idx + 1);

  // autoplay
  const start = () => {
    stop();
    timer = setInterval(next, interval);
  };
  const stop = () => {
    if (timer) { clearInterval(timer); timer = null; }
  };

  // pause on hover/focus
  const media = document.querySelector('.hero-media');
  if (media) {
    media.addEventListener('mouseenter', stop);
    media.addEventListener('focusin', stop);
    media.addEventListener('mouseleave', start);
    media.addEventListener('focusout', start);
  }

  // allow thumbnails to control if present
  document.querySelectorAll('.gallery-thumbs .thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      // if hero slides count matches thumbs, map the image
      if (i < slides.length) {
        goTo(i);
      }
    });
  });

  start();
}

// ensure init call
document.addEventListener('DOMContentLoaded', () => {
  try { initHeroCarousel({ interval: 4500 }); } catch (e) {}
  // ...existing initialization code already present...
});