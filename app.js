const WA_PLUS_SITE = {
  installUrl: "https://chromewebstore.google.com/",
  loginUrl: "https://extensionpay.com",
  supportEmail: "support@wa-plus.app"
};

document.querySelectorAll("[data-install-link]").forEach((link) => {
  link.href = WA_PLUS_SITE.installUrl;
});

document.querySelectorAll("[data-login-link]").forEach((link) => {
  link.href = WA_PLUS_SITE.loginUrl;
});

document.querySelectorAll("[data-support-email]").forEach((link) => {
  link.href = `mailto:${WA_PLUS_SITE.supportEmail}`;
  link.textContent = WA_PLUS_SITE.supportEmail;
});
