const WA_PLUS_SITE = {
  installUrl: "https://chrome.google.com/webstore/detail/wa-bulk-message-sender/oajgkebdeioegjkaohcipgblnkjibple",
  loginUrl: "https://extensionpay.com",
  supportEmail: "support@wawebplus.com"
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
