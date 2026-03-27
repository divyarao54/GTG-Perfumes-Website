document.querySelectorAll('.fragrance-option').forEach(option => {
    option.addEventListener('click', () => {
        option.querySelector('input').checked = true;
    });
});

const cartLinks = {
  "single|original": "https://store.example.com/checkout?plan=single&scent=original",
  "single|lily":     "https://store.example.com/checkout?plan=single&scent=lily",
  "single|rose":     "https://store.example.com/checkout?plan=single&scent=rose",
  "double|original": "https://store.example.com/checkout?plan=double&scent=original",
  "double|lily":     "https://store.example.com/checkout?plan=double&scent=lily",
  "double|rose":     "https://store.example.com/checkout?plan=double&scent=rose",
};

function getSelectedPlan() {
  const checked = document.querySelector('input[name="plan"]:checked');
  if (!checked) return null;
  // The label wrapping the checked plan input contains the option-header text
  const label = checked.closest('.subscription-option');
  const headerText = label.querySelector('.option-header span:first-child').textContent.toLowerCase();
  return headerText.includes('double') ? 'double' : 'single';
}

function getSelectedFragrance(plan) {
  // Single plan uses name="fragrance", double uses name="fragrance-1" as the primary
  const fragName = plan === 'double' ? 'fragrance-1' : 'fragrance';
  const checked = document.querySelector(`input[name="${fragName}"]:checked`);
  if (!checked) return null;
  const desc = checked.closest('.fragrance-option').querySelector('.fragrance-desc').textContent.trim().toLowerCase();
  return desc; // "original", "lily", or "rose"
}

function updateCartButton() {
  const plan = getSelectedPlan();
  const fragrance = getSelectedFragrance(plan);
  const key = `${plan}|${fragrance}`;
  const link = cartLinks[key] || '#';

  const btn = document.querySelector('.add-to-cart-button');
  btn.onclick = () => window.location.href = link;
  btn.dataset.link = link; // optional: for debugging
}

// Listen to all relevant radio changes
document.querySelectorAll('input[name="plan"], input[name="fragrance"], input[name="fragrance-1"]')
  .forEach(radio => radio.addEventListener('change', updateCartButton));

// Set initial state on load
updateCartButton();