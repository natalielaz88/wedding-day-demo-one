document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('.rsvp-form');
      const statusEl = form.querySelector('.rsvp-status');

      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        statusEl.textContent = 'Отправляем...';

        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
          });

          if (response.ok) {
            form.reset();
            statusEl.textContent = 'Спасибо! Мы получили ваш ответ.';
          } else {
            const data = await response.json().catch(() => ({}));
            statusEl.textContent = data.errors?.[0]?.message || 'Упс! Не удалось отправить форму.';
          }
        } catch (err) {
          statusEl.textContent = 'Сеть недоступна. Попробуйте ещё раз позже.';
        }
      });
    });