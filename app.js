document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initActiveNav();
  initTestimonials();
  initData();
  renderFrontEndOfferings();
  initContactForm();
  initAdminPanel();
});

// ==========================================
// 1. Theme Management (Light / Dark Mode)
// ==========================================
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (localStorage.getItem('color-theme') === 'light') {
    document.documentElement.classList.remove('dark');
    themeIcon.className = 'fas fa-moon text-lg text-slate-600 dark:text-slate-400';
  } else {
    document.documentElement.classList.add('dark');
    themeIcon.className = 'fas fa-sun text-lg text-amber-400';
  }

  themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      themeIcon.className = 'fas fa-moon text-lg text-slate-600';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      themeIcon.className = 'fas fa-sun text-lg text-amber-400';
    }
  });
}

// ==========================================
// 2. Mobile Menu Navigation
// ==========================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// ==========================================
// 3. Navigation Highlighting (Multi-Page Path Matching)
// ==========================================
function initActiveNav() {
  const path = window.location.pathname;
  const pageName = path.split("/").pop();
  
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function matchLink(link) {
    const href = link.getAttribute('href');
    link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600', 'dark:border-indigo-400');
    link.classList.add('text-slate-600', 'dark:text-slate-300', 'border-transparent');

    if (pageName === 'products.html' && href.includes('products.html')) {
      setActive(link);
    } else if (pageName === 'services.html' && href.includes('services.html')) {
      setActive(link);
    } else if ((pageName === 'index.html' || pageName === '') && (href === 'index.html' || href === '#home' || href.includes('index.html'))) {
      setActive(link);
    }
  }

  function setActive(link) {
    link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600', 'dark:border-indigo-400');
    link.classList.remove('text-slate-600', 'dark:text-slate-300', 'border-transparent');
    
    if (link.classList.contains('mobile-nav-link')) {
      link.classList.add('bg-indigo-50', 'dark:bg-indigo-950/50');
      link.classList.remove('text-slate-600', 'dark:text-slate-300');
    }
  }

  navLinks.forEach(matchLink);
  mobileNavLinks.forEach(matchLink);
}

// ==========================================
// 4. Testimonials Slider
// ==========================================
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('test-prev');
  const nextBtn = document.getElementById('test-next');
  let currentSlide = 0;

  if (slides.length === 0 || !prevBtn || !nextBtn) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.add('hidden');
      if (i === index) {
        slide.classList.remove('hidden');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  });

  setInterval(() => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  }, 6000);
}

// ==========================================
// 5. Dynamic Content Database Management
// ==========================================
const DEFAULT_OFFERINGS = [
  // PRODUCTS
  {
    id: "prod_1",
    type: "product",
    title: "Mutual Fund",
    icon: "fa-chart-pie",
    iconColor: "indigo",
    badge: "Diversified Growth",
    description: "Systematic wealth building through curated equity, hybrid, and index mutual funds aligned with your parameters."
  },
  {
    id: "prod_2",
    type: "product",
    title: "Equity & ETF",
    icon: "fa-chart-line",
    iconColor: "cyan",
    badge: "Direct Market Shares",
    description: "Strategic holdings exposure in domestic and international equities and exchange-traded index trackers."
  },
  {
    id: "prod_3",
    type: "product",
    title: "Insurance (Life, General & Health)",
    icon: "fa-shield-halved",
    iconColor: "rose",
    badge: "Comprehensive Security",
    description: "Holistic term-life structures, health protection riders, and asset indemnity coverages to secure your family."
  },
  {
    id: "prod_4",
    type: "product",
    title: "Portfolio Management Service",
    icon: "fa-briefcase",
    iconColor: "amber",
    badge: "High Net-Worth Focus",
    description: "Professional active portfolio management targeting market-outperforming returns via specialized strategies."
  },
  {
    id: "prod_5",
    type: "product",
    title: "Bonds",
    icon: "fa-building-columns",
    iconColor: "emerald",
    badge: "Fixed Income Security",
    description: "Stable capital growth through high-rated government securities, corporate papers, and tax-free bonds."
  },
  {
    id: "prod_6",
    type: "product",
    title: "Fixed Deposits",
    icon: "fa-piggy-bank",
    iconColor: "indigo",
    badge: "Guaranteed Return",
    description: "Assured returns with fixed deposit tenures customized to match cashflow and short-term liquidity profiles."
  },
  {
    id: "prod_7",
    type: "product",
    title: "Loan Against Mutual Funds",
    icon: "fa-money-bill-trend-up",
    iconColor: "emerald",
    badge: "Instant Liquidity Access",
    description: "Gain instant liquidity by pledging your holdings as collateral without disrupting compound growth."
  },
  {
    id: "prod_8",
    type: "product",
    title: "All Type of Loans",
    icon: "fa-hand-holding-dollar",
    iconColor: "cyan",
    badge: "Bespoke Financing Options",
    description: "Assistance in securing home financing, auto financing, corporate credit, and personal liquidity structures."
  },

  // SERVICES
  {
    id: "serv_1",
    type: "service",
    title: "Financial Assessment",
    icon: "fa-file-invoice-dollar",
    iconColor: "indigo",
    badge: "Audit & Planning",
    description: "In-depth audit of income metrics, liability margins, and net worth parameters to outline strategic directions."
  },
  {
    id: "serv_2",
    type: "service",
    title: "Retirement Assessment",
    icon: "fa-umbrella-beach",
    iconColor: "amber",
    badge: "Future Independence",
    description: "Ensure your long-term comfort with retirement capital forecasts, annuity profiling, and inflation hedging."
  },
  {
    id: "serv_3",
    type: "service",
    title: "Child Future Assessment",
    icon: "fa-graduation-cap",
    iconColor: "cyan",
    badge: "Education Security",
    description: "Structural capital planning to secure future education milestones, tuition growth metrics, and general expenses."
  },
  {
    id: "serv_4",
    type: "service",
    title: "Risk Assessment",
    icon: "fa-triangle-exclamation",
    iconColor: "rose",
    badge: "Capital Defense Audit",
    description: "Evaluating market volatility factors, portfolio dispersion, and leverage stress boundaries to reduce exposure."
  },
  {
    id: "serv_5",
    type: "service",
    title: "NRI Investments",
    icon: "fa-globe",
    iconColor: "indigo",
    badge: "Cross-Border Wealth",
    description: "Bespoke compliance guidance and investment curation for Non-Resident Indians to grow wealth globally."
  },
  {
    id: "serv_6",
    type: "service",
    title: "Finance",
    icon: "fa-coins",
    iconColor: "emerald",
    badge: "Strategic Allocation",
    description: "Assisting corporates and individuals in sourcing, structuring, and optimizing leverage for operational returns."
  },
  {
    id: "serv_7",
    type: "service",
    title: "Tax Filing",
    icon: "fa-percent",
    iconColor: "rose",
    badge: "Tax Optimization",
    description: "Professional preparation and tax optimization services maximizing deductions while ensuring compliance."
  },
  {
    id: "serv_8",
    type: "service",
    title: "Portfolio Analysis",
    icon: "fa-magnifying-glass-chart",
    iconColor: "amber",
    badge: "Yield Efficiency Check",
    description: "A comprehensive diagnostic sweep of current holdings to discover overlap, high fees, and allocation gaps."
  },
  {
    id: "serv_9",
    type: "service",
    title: "Wealth Check Up",
    icon: "fa-stethoscope",
    iconColor: "cyan",
    badge: "Financial Health Score",
    description: "Periodic physical health metrics audit for your capital to detect inefficiencies and align with targets."
  }
];

function initData() {
  if (!localStorage.getItem('nfs_offerings')) {
    localStorage.setItem('nfs_offerings', JSON.stringify(DEFAULT_OFFERINGS));
  }
  if (!localStorage.getItem('nfs_intakes')) {
    localStorage.setItem('nfs_intakes', JSON.stringify([]));
  }
}

function getOfferings() {
  return JSON.parse(localStorage.getItem('nfs_offerings')) || DEFAULT_OFFERINGS;
}

function saveOfferings(offerings) {
  localStorage.setItem('nfs_offerings', JSON.stringify(offerings));
  renderFrontEndOfferings();
}

function getIntakes() {
  return JSON.parse(localStorage.getItem('nfs_intakes')) || [];
}

function saveIntakes(intakes) {
  localStorage.setItem('nfs_intakes', JSON.stringify(intakes));
}

// ==========================================
// 6. Rendering Engine for Front End
// ==========================================
function renderFrontEndOfferings() {
  const offerings = getOfferings();
  const productsContainer = document.getElementById('products-grid');
  const servicesContainer = document.getElementById('services-grid');
  const dropdown = document.getElementById('selected-service');
  
  if (productsContainer) productsContainer.innerHTML = '';
  if (servicesContainer) servicesContainer.innerHTML = '';

  offerings.forEach((offering) => {
    let iconColorClass = "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60";
    
    if (offering.iconColor === "rose") {
      iconColorClass = "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60";
    } else if (offering.iconColor === "cyan") {
      iconColorClass = "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60";
    } else if (offering.iconColor === "amber") {
      iconColorClass = "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60";
    } else if (offering.iconColor === "emerald") {
      iconColorClass = "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60";
    }

    const card = document.createElement('div');
    card.className = "glass-card rounded-2xl p-8 flex flex-col justify-between";
    card.innerHTML = `
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${iconColorClass}">
          <i class="fas ${offering.icon || 'fa-briefcase'}"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-950 dark:text-white">${offering.title}</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${offering.description}</p>
      </div>
      <div class="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6 flex items-center justify-between text-xs font-bold">
        <span class="text-slate-400">${offering.badge || 'Advisory'}</span>
        <a href="#contact" class="text-indigo-600 dark:text-indigo-400 hover:underline">Inquire <i class="fas fa-arrow-right text-[10px]"></i></a>
      </div>
    `;

    if (offering.type === 'product' && productsContainer) {
      productsContainer.appendChild(card);
    } else if (offering.type === 'service' && servicesContainer) {
      servicesContainer.appendChild(card);
    }
  });

  // Re-populate dropdown select with optgroups
  if (dropdown) {
    dropdown.innerHTML = '';
    
    const productGroup = document.createElement('optgroup');
    productGroup.label = "Financial Products";
    
    const serviceGroup = document.createElement('optgroup');
    serviceGroup.label = "Advisory Services";

    offerings.forEach(off => {
      const opt = document.createElement('option');
      opt.value = off.title;
      opt.textContent = off.title;
      if (off.type === 'product') {
        productGroup.appendChild(opt);
      } else {
        serviceGroup.appendChild(opt);
      }
    });

    dropdown.appendChild(productGroup);
    dropdown.appendChild(serviceGroup);
  }
}

// ==========================================
// 7. Contact / Intake Submission Form
// ==========================================
function initContactForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const service = document.getElementById('selected-service').value;
    const msg = document.getElementById('client-msg').value;

    const intakes = getIntakes();
    const newIntake = {
      id: "intake_" + Date.now(),
      name: name,
      email: email,
      service: service,
      message: msg,
      status: "new",
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    intakes.push(newIntake);
    saveIntakes(intakes);
    
    showToast(`Thank you, ${name}! Your request has been recorded. Nilam will connect with you soon.`);
    form.reset();

    renderAdminIntakes();
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 right-5 z-50 px-5 py-3.5 rounded-2xl bg-indigo-600 text-white shadow-xl flex items-center gap-2 border border-indigo-500 max-w-sm animate-bounce';
  toast.innerHTML = `<i class="fas fa-check-circle text-lg"></i> <span class="font-medium text-sm leading-snug">${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// ==========================================
// 8. ADMIN DASHBOARD OPERATIONS
// ==========================================
function initAdminPanel() {
  const adminOpenBtn = document.getElementById('admin-open-btn');
  const adminCloseBtn = document.getElementById('admin-close-btn');
  const adminPanelSection = document.getElementById('admin-panel-section');
  const gateOverlay = document.getElementById('gate-overlay');
  const gateCloseBtn = document.getElementById('gate-close-btn');
  const gateForm = document.getElementById('gate-form');
  const gatePasscode = document.getElementById('gate-passcode');
  const offeringForm = document.getElementById('service-edit-form');
  const serviceModal = document.getElementById('service-modal');
  const closeServiceModal = document.getElementById('close-service-modal');
  const addServiceBtn = document.getElementById('add-service-btn');

  if (!adminOpenBtn || !adminPanelSection) return;

  adminOpenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gateOverlay.classList.remove('hidden');
    gateOverlay.classList.add('flex');
    gatePasscode.focus();
  });

  gateCloseBtn.addEventListener('click', () => {
    gateOverlay.classList.add('hidden');
    gateOverlay.classList.remove('flex');
  });

  gateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (gatePasscode.value === 'admin') {
      gateOverlay.classList.add('hidden');
      gateOverlay.classList.remove('flex');
      
      adminPanelSection.classList.remove('hidden');
      adminPanelSection.scrollIntoView({ behavior: 'smooth' });

      renderAdminIntakes();
      renderAdminOfferings();
      gatePasscode.value = '';
    } else {
      alert('Invalid passcode. Access denied.');
      gatePasscode.value = '';
    }
  });

  adminCloseBtn.addEventListener('click', () => {
    adminPanelSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  addServiceBtn.addEventListener('click', () => {
    document.getElementById('service-modal-title').textContent = "Add Product or Service Content";
    offeringForm.reset();
    document.getElementById('edit-service-id').value = '';
    serviceModal.classList.remove('hidden');
    serviceModal.classList.add('flex');
  });

  closeServiceModal.addEventListener('click', () => {
    serviceModal.classList.add('hidden');
    serviceModal.classList.remove('flex');
  });

  offeringForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const offeringId = document.getElementById('edit-service-id').value;
    const title = document.getElementById('service-title').value;
    const type = document.getElementById('offering-type').value;
    const badge = document.getElementById('service-badge').value;
    const icon = document.getElementById('service-icon').value;
    const color = document.getElementById('service-color').value;
    const desc = document.getElementById('service-desc').value;

    let offerings = getOfferings();

    if (offeringId) {
      offerings = offerings.map(o => o.id === offeringId ? {
        id: offeringId, type, title, badge, icon, iconColor: color, description: desc
      } : o);
      showToast("Content updated successfully!");
    } else {
      const newOff = {
        id: (type === 'product' ? 'prod_' : 'serv_') + Date.now(),
        type, title, badge, icon, iconColor: color, description: desc
      };
      offerings.push(newOff);
      showToast("New category added successfully!");
    }

    saveOfferings(offerings);
    renderAdminOfferings();
    serviceModal.classList.add('hidden');
    serviceModal.classList.remove('flex');
  });
}

function renderAdminIntakes() {
  const intakes = getIntakes();
  const listContainer = document.getElementById('admin-intake-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  if (intakes.length === 0) {
    listContainer.innerHTML = `
      <tr>
        <td colspan="5" class="px-6 py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
          <i class="far fa-folder-open text-3xl block mb-2"></i> No submissions received yet.
        </td>
      </tr>
    `;
    return;
  }

  intakes.slice().reverse().forEach((item) => {
    const tr = document.createElement('tr');
    tr.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition text-xs";
    tr.innerHTML = `
      <td class="px-6 py-4">
        <p class="font-bold text-slate-900 dark:text-white">${item.name}</p>
        <p class="text-[10px] text-slate-400 mt-0.5">${item.email}</p>
      </td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-md">${item.service}</span>
      </td>
      <td class="px-6 py-4 max-w-xs truncate" title="${item.message}">
        ${item.message}
      </td>
      <td class="px-6 py-4 text-slate-400">
        ${item.timestamp || 'N/A'}
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-2">
          <button data-id="${item.id}" class="toggle-status-btn px-2.5 py-1 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            ${item.status === 'new' ? 'Mark Contacted' : 'Mark New'}
          </button>
          <button data-id="${item.id}" class="delete-intake-btn w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900 transition">
            <i class="far fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;
    listContainer.appendChild(tr);
  });

  document.querySelectorAll('.toggle-status-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      let intakes = getIntakes();
      intakes = intakes.map(item => {
        if (item.id === id) {
          item.status = item.status === 'new' ? 'contacted' : 'new';
        }
        return item;
      });
      saveIntakes(intakes);
      renderAdminIntakes();
    });
  });

  document.querySelectorAll('.delete-intake-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!confirm("Are you sure you want to delete this submission entry?")) return;
      const id = btn.getAttribute('data-id');
      let intakes = getIntakes();
      intakes = intakes.filter(item => item.id !== id);
      saveIntakes(intakes);
      renderAdminIntakes();
      showToast("Submission deleted.");
    });
  });
}

function renderAdminOfferings() {
  const offerings = getOfferings();
  const tableContainer = document.getElementById('admin-services-list');
  if (!tableContainer) return;

  tableContainer.innerHTML = '';

  offerings.forEach((off) => {
    const tr = document.createElement('tr');
    tr.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition text-xs";
    tr.innerHTML = `
      <td class="px-6 py-4 flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 font-bold">
          <i class="fas ${off.icon || 'fa-briefcase'}"></i>
        </div>
        <div>
          <p class="font-bold text-slate-900 dark:text-white">${off.title}</p>
          <span class="text-[9px] uppercase tracking-wider font-semibold text-indigo-500">${off.type}</span>
        </div>
      </td>
      <td class="px-6 py-4 font-semibold text-slate-500">${off.badge || 'Advisory'}</td>
      <td class="px-6 py-4 max-w-sm truncate text-slate-400">${off.description}</td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-2">
          <button data-id="${off.id}" class="edit-service-btn w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900 transition">
            <i class="far fa-edit"></i>
          </button>
          <button data-id="${off.id}" class="delete-service-btn w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900 transition">
            <i class="far fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;
    tableContainer.appendChild(tr);
  });

  document.querySelectorAll('.edit-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const offerings = getOfferings();
      const o = offerings.find(item => item.id === id);
      if (!o) return;

      document.getElementById('service-modal-title').textContent = "Modify Product/Service Content";
      document.getElementById('edit-service-id').value = o.id;
      document.getElementById('service-title').value = o.title;
      document.getElementById('offering-type').value = o.type;
      document.getElementById('service-badge').value = o.badge || '';
      document.getElementById('service-icon').value = o.icon || 'fa-briefcase';
      document.getElementById('service-color').value = o.iconColor || 'indigo';
      document.getElementById('service-desc').value = o.description || '';

      const serviceModal = document.getElementById('service-modal');
      serviceModal.classList.remove('hidden');
      serviceModal.classList.add('flex');
    });
  });

  document.querySelectorAll('.delete-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm("Are you sure you want to delete this item? It will disappear from the homepage immediately.")) return;
      const id = btn.getAttribute('data-id');
      let offerings = getOfferings();
      offerings = offerings.filter(item => item.id !== id);
      saveOfferings(offerings);
      renderAdminOfferings();
      showToast("Item deleted.");
    });
  });
}
