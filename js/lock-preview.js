// Блокировка правого клика
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Блокировка выделения текста
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
});

// Блокировка сочетаний клавиш (Ctrl+S, Ctrl+U, Ctrl+C, Ctrl+Shift+I)
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && ['s', 'u', 'c'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});
