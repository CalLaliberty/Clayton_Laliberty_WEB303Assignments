document.addEventListener('DOMContentLoaded', function () {
  function checkFormValidity() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const acceptTerms = document.getElementById('acceptTerms').checked;
      const country = document.getElementById('country').value;

      const submitButton = document.getElementById('submitButton');
      submitButton.disabled = !(username && password.length >= 12 && password === confirmPassword && acceptTerms && country);
  }

  document.getElementById('registrationForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const country = document.getElementById('country').value;

      const welcomeMessage = document.getElementById('welcomeMessage');
      welcomeMessage.innerText = `Welcome ${username}! The country code you selected is ${country}`;
      welcomeMessage.style.display = 'block';
  });

  document.getElementById('username').addEventListener('input', checkFormValidity);
  document.getElementById('password').addEventListener('input', checkFormValidity);
  document.getElementById('confirmPassword').addEventListener('input', checkFormValidity);
  document.getElementById('acceptTerms').addEventListener('change', checkFormValidity);
  document.getElementById('country').addEventListener('change', checkFormValidity);
});
