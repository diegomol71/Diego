document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const INQUIRY_ENDPOINT = 'https://formsubmit.co/ajax/dmolina@ytdigital.com';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  note.textContent = 'Sending...';

  try {
    const response = await fetch(INQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });
    if (!response.ok) throw new Error('Request failed');
    note.textContent = "Thanks! We've received your request and will reach out within one business day.";
    form.reset();
  } catch (err) {
    note.textContent = 'Something went wrong sending your request. Please try again shortly.';
  } finally {
    submitBtn.disabled = false;
  }
});
