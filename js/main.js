/**
 * Nilam Financial Services - Interactive JS Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSipCalculator();
  initProductFilters();
  initModals();
  initContactForm();
  initActiveNav();
});

/* -------------------------------------------------------------------------- */
/* 1. Mobile Menu Drawer                                                      */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const closeBtn = document.getElementById('drawerClose');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* -------------------------------------------------------------------------- */
/* 2. SIP Calculator                                                          */
/* -------------------------------------------------------------------------- */
function initSipCalculator() {
  const monthlyRange = document.getElementById('monthlyInvestment');
  const returnRange = document.getElementById('expectedReturn');
  const yearsRange = document.getElementById('tenureYears');

  const monthlyVal = document.getElementById('monthlyVal');
  const returnVal = document.getElementById('returnVal');
  const yearsVal = document.getElementById('yearsVal');

  const resultMaturity = document.getElementById('resultMaturity');
  const resultInvested = document.getElementById('resultInvested');
  const resultGains = document.getElementById('resultGains');

  if (!monthlyRange || !returnRange || !yearsRange) return;

  function calculateSip() {
    const P = parseFloat(monthlyRange.value);
    const r = parseFloat(returnRange.value) / 12 / 100;
    const n = parseFloat(yearsRange.value) * 12;

    // Monthly values updates
    monthlyVal.textContent = '₹' + P.toLocaleString('en-IN');
    returnVal.textContent = returnRange.value + '%';
    yearsVal.textContent = yearsRange.value + ' Years';

    // SIP Compound Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = P * n;
    const gains = maturity - invested;

    resultMaturity.textContent = '₹' + Math.round(maturity).toLocaleString('en-IN');
    if (resultInvested) resultInvested.textContent = '₹' + Math.round(invested).toLocaleString('en-IN');
    if (resultGains) resultGains.textContent = '₹' + Math.round(gains).toLocaleString('en-IN');
  }

  monthlyRange.addEventListener('input', calculateSip);
  returnRange.addEventListener('input', calculateSip);
  yearsRange.addEventListener('input', calculateSip);

  // Initial Run
  calculateSip();
}

/* -------------------------------------------------------------------------- */
/* 3. Product Filter Tabs                                                     */
/* -------------------------------------------------------------------------- */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Assessment & Service Modals                                             */
/* -------------------------------------------------------------------------- */
function initModals() {
  const modalBackdrop = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');
  const serviceForm = document.getElementById('modalForm');

  if (!modalBackdrop) return;

  window.openServiceModal = function(serviceName) {
    if (modalTitle) modalTitle.textContent = serviceName + ' - Free Consultation';
    const modalServiceInput = document.getElementById('modalServiceName');
    if (modalServiceInput) modalServiceInput.value = serviceName;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('modalServiceName').value || 'Financial Assessment';
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      const notes = document.getElementById('modalNotes').value;

      const whatsappMsg = `Hello Nilam Financial Services,\n\nI would like to request a *${service}*.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Details:* ${notes || 'N/A'}`;
      const encodedMsg = encodeURIComponent(whatsappMsg);
      const whatsappUrl = `https://wa.me/917041943490?text=${encodedMsg}`;

      closeModal();
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 5. Contact Form Handler (Direct WhatsApp Inquiry)                          */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('mainContactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value;

    const whatsappText = `Hello Nilam Financial Services,\n\n*New Inquiry from Website*\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Interested In:* ${service}\n*Message:* ${message}`;
    
    const whatsappUrl = `https://wa.me/917041943490?text=${encodeURIComponent(whatsappText)}`;
    
    window.open(whatsappUrl, '_blank');
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Active Navigation Page Handler (Persistent Active State on Scroll)      */
/* -------------------------------------------------------------------------- */
function initActiveNav() {
  let path = window.location.pathname.split('/').pop();
  if (!path || path === '') path = 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else if (href && !href.startsWith('#')) {
      link.classList.remove('active');
    }
  });
}
