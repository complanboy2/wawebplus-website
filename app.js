const WA_PLUS_SITE = {
  extensionId: "oajgkebdeioegjkaohcipgblnkjibple",
  installUrl: "https://chromewebstore.google.com/detail/oajgkebdeioegjkaohcipgblnkjibple",
  version: "5.3.6",
  loginUrl: "https://extensionpay.com",
  supportEmail: "support@wa-plus.app",
  analyticsId: "G-F3SS125HX9"
};

const PRICING_MARKETS = [
  { id: "USD", label: "International", currencyCode: "USD" },
  { id: "IN", label: "India", currencyCode: "INR" }
];

const PRICING_CATALOGS = {
  USD: {
    monthly: { price: "$9.99", suffix: "/month", cta: "Choose monthly" },
    half_yearly: { price: "$50", suffix: "/6 months", save: "Save 17%", cta: "Choose 6 months" },
    yearly: { price: "$80", suffix: "/year", save: "Save 33%", cta: "Choose yearly" }
  },
  IN: {
    monthly: { price: "₹799", suffix: "/month", cta: "Choose monthly" },
    half_yearly: { price: "₹3,979", suffix: "/6 months", save: "Save 17%", cta: "Choose 6 months" },
    yearly: { price: "₹6,424", suffix: "/year", save: "Save 33%", cta: "Choose yearly" }
  }
};

function normalizeMarket(value) {
  return String(value || "").trim().toUpperCase() === "IN" ? "IN" : "USD";
}

function detectMarket() {
  try {
    const locale = String(navigator.language || "").toLowerCase();
    const timezone = String(Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
    if (locale.includes("-in") || locale.endsWith("_in") || timezone === "asia/kolkata") return "IN";
  } catch {
    // ignore browser capability issues
  }
  return "USD";
}

function initAnalytics() {
  if (!WA_PLUS_SITE.analyticsId || navigator.doNotTrack === "1") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(WA_PLUS_SITE.analyticsId)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", WA_PLUS_SITE.analyticsId, {
    send_page_view: true,
    page_title: document.title,
    page_location: window.location.href
  });
}

function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    product: "WA Web Utils",
    page_path: window.location.pathname,
    ...params
  });
}

initAnalytics();

document.querySelectorAll("[data-install-link]").forEach((link) => {
  link.href = WA_PLUS_SITE.installUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.addEventListener("click", () => {
    trackEvent("install_cta_click", {
      link_text: link.textContent.trim(),
      link_url: WA_PLUS_SITE.installUrl,
      plan: link.closest("[data-plan-card]")?.getAttribute("data-plan-card") || "not_plan"
    });
  });
});

document.querySelectorAll("[data-login-link]").forEach((link) => {
  link.href = WA_PLUS_SITE.loginUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.addEventListener("click", () => {
    trackEvent("login_click", {
      link_text: link.textContent.trim(),
      link_url: WA_PLUS_SITE.loginUrl
    });
  });
});

document.querySelectorAll("[data-support-email]").forEach((link) => {
  link.href = `mailto:${WA_PLUS_SITE.supportEmail}`;
  link.textContent = WA_PLUS_SITE.supportEmail;
  link.addEventListener("click", () => {
    trackEvent("support_email_click", {
      link_text: link.textContent.trim()
    });
  });
});

const marketButtonsRoot = document.querySelector("[data-pricing-market-buttons]");
const marketNote = document.querySelector("[data-pricing-market-note]");
const planCards = Array.from(document.querySelectorAll("[data-plan-card]"));
let selectedMarket = normalizeMarket(detectMarket());

function renderPricing() {
  const catalog = PRICING_CATALOGS[selectedMarket] || PRICING_CATALOGS.USD;
  planCards.forEach((card) => {
    const planId = card.getAttribute("data-plan-card");
    const plan = catalog[planId];
    if (!plan) return;
    const priceEl = card.querySelector("[data-plan-price]");
    const saveEl = card.querySelector("[data-plan-save]");
    const ctaEl = card.querySelector("[data-plan-cta]");
    if (priceEl) {
      priceEl.innerHTML = `${plan.price}<span>${plan.suffix}</span>`;
    }
    if (saveEl) {
      saveEl.textContent = plan.save || "";
      saveEl.style.display = plan.save ? "block" : "none";
    }
    if (ctaEl) {
      ctaEl.textContent = plan.cta;
    }
  });

  if (marketButtonsRoot) {
    marketButtonsRoot.querySelectorAll("button").forEach((button) => {
      const isActive = button.getAttribute("data-market") === selectedMarket;
      button.classList.toggle("active", isActive);
    });
  }

  if (marketNote) {
    marketNote.textContent = selectedMarket === "IN"
      ? "Showing INR plans for India. Choose India · INR again in the extension checkout for smoother Stripe payment."
      : "Showing international USD pricing. India-issued cards should switch to India · INR before checkout.";
  }
}

if (marketButtonsRoot) {
  PRICING_MARKETS.forEach((market) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pricing-market-button";
    button.setAttribute("data-market", market.id);
    button.textContent = `${market.label} · ${market.currencyCode}`;
    button.addEventListener("click", () => {
      selectedMarket = normalizeMarket(market.id);
      renderPricing();
      trackEvent("pricing_market_select", {
        market: selectedMarket
      });
    });
    marketButtonsRoot.appendChild(button);
  });
}

renderPricing();
