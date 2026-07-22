let toastTimeout;

// SVG Иконки
const icons = {
  cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
};

// Показ плашки с нужной иконкой
function showToast(message, type = 'cart') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');

  toastText.textContent = message;
  toastIcon.innerHTML = icons[type] || icons.cart;

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Добавление в корзину (иконка корзины)
function addToCart(productName) {
  showToast(`${productName} добавлен в корзину`, 'cart');
}

// Добавление в избранное (иконка сердечка)
function toggleWishlist(btn, productName) {
  btn.classList.toggle('active');
  if (btn.classList.contains('active')) {
    showToast(`${productName} добавлен в избранное`, 'heart');
  } else {
    showToast(`${productName} удален из избранного`, 'heart');
  }
}

// Логика фильтрации по категориям
document.addEventListener('DOMContentLoaded', () => {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  const countLabel = document.getElementById('items-count');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.getAttribute('data-category');
      let visibleCount = 0;

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      countLabel.textContent = `Показано ${visibleCount} из 18`;
    });
  });
});

// Логика пользовательского компонента выбора
const customSelect = document.getElementById('custom-sort');
const trigger = customSelect.querySelector('.custom-select__trigger');
const valueSpan = customSelect.querySelector('.custom-select__value');
const options = customSelect.querySelectorAll('.custom-select__option');

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = customSelect.classList.toggle('open');
  trigger.setAttribute('aria-expanded', isOpen);
});

options.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    valueSpan.textContent = option.textContent;
    customSelect.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');

    showToast(`Сортировка: ${option.textContent}`);
  });
});

// Закрывать селект при клике вне его или нажатии Escape
document.addEventListener('click', () => {
  customSelect.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    customSelect.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});
