// FAQ accordion
// Grab every question button, then attach a click listener to each one.
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close any other open FAQ item first (accordion behavior:
    // only one answer visible at a time).
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // If the clicked item wasn't already open, open it now.
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

// Password show/hide toggle (signup + login pages)
// Only runs if a .password-toggle button exists on the page.
document.querySelectorAll('.password-toggle').forEach((toggleBtn) => {
    toggleBtn.addEventListener('click', () => {
      const input = toggleBtn.previousElementSibling;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggleBtn.textContent = isHidden ? '\u{1F648}' : '\u{1F441}\uFE0F';
    });
  });
  
  // Signup / Login forms: on submit, send the user to the OTP checkpoint.
  // (No real accounts are created here — this is a front-end demo flow.)
  document.querySelectorAll('.auth-form:not(#otp-form)').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = 'otp.html';
    });
  });
  
  // OTP page: auto-advance to the next box as each digit is typed,
  // and move to the dashboard once the code is submitted.
  const otpDigits = document.querySelectorAll('.otp-digit');
  otpDigits.forEach((digit, index) => {
    digit.addEventListener('input', () => {
      // Keep only the first character in case someone pastes multiple digits.
      digit.value = digit.value.replace(/[^0-9]/g, '').slice(0, 1);
      if (digit.value && index < otpDigits.length - 1) {
        otpDigits[index + 1].focus();
      }
    });
  
    digit.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !digit.value && index > 0) {
        otpDigits[index - 1].focus();
      }
    });
  });
  
  const otpForm = document.getElementById('otp-form');
  if (otpForm) {
    otpForm.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = 'dashboard.html';
    });
  }
  
  const resendLink = document.getElementById('resend-code');
  if (resendLink) {
    resendLink.addEventListener('click', (event) => {
      event.preventDefault();
      resendLink.textContent = 'Code sent!';
      setTimeout(() => { resendLink.textContent = 'Resend Code'; }, 2000);
    });
  }

  // Quick Transfer form (dashboard page)
const transferForm = document.getElementById('transfer-form');
if (transferForm) {
  const confirmMsg = document.getElementById('transfer-confirm');
  transferForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = document.getElementById('amount').value;

    if (!amount || Number(amount) <= 0) {
      confirmMsg.style.color = '#C13B3B';
      confirmMsg.textContent = 'Enter an amount greater than $0.';
      return;
    }

    confirmMsg.style.color = '#1F7A5C';
    confirmMsg.textContent = `Transfer of $${Number(amount).toFixed(2)} submitted.`;
    transferForm.reset();

    // Clear the confirmation after a few seconds.
    setTimeout(() => { confirmMsg.textContent = ''; }, 4000);
  });
}