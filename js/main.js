let toastTimeout;

// Показ всплывающего уведомления
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  toastText.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Добавление в корзину
function addToCart(productName) {
  showToast(`«${productName}» добавлен в корзину`);
}

// Добавление в избранное
function toggleWishlist(btn, productName) {
  btn.classList.toggle('active');
  if (btn.classList.contains('active')) {
    showToast(`«${productName}» сохранен в избранное`);
  } else {
    showToast(`«${productName}» удален из избранного`);
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