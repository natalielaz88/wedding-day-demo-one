document.addEventListener('DOMContentLoaded', () => {
      const EVENT_DATE = new Date('2025-09-10T15:00:00+04:00'); // <— поставь свою дату/время

      const els = {
        d: document.getElementById('cd-days'),
        h: document.getElementById('cd-hours'),
        m: document.getElementById('cd-mins'),
        s: document.getElementById('cd-secs'),
        ld: document.getElementById('lb-days'),
        lh: document.getElementById('lb-hours'),
        lm: document.getElementById('lb-mins'),
        ls: document.getElementById('lb-secs'),
        note: document.getElementById('cd-note'),
      };

      const plural = (n, forms) => {
        const a = Math.abs(n) % 100, b = a % 10;
        if (a > 10 && a < 20) return forms[2];
        if (b === 1) return forms[0];
        if (b >= 2 && b <= 4) return forms[1];
        return forms[2];
      };
      const pad = n => String(n).padStart(2, '0');

      function tick() {
        const now = new Date();
        let diff = EVENT_DATE - now;

        if (diff <= 0) {
          // событие сегодня/прошло
          els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = '00';
          els.ld.textContent = 'дней'; els.lh.textContent = 'часов';
          els.lm.textContent = 'минут'; els.ls.textContent = 'секунд';

          const pastDays = Math.floor((now - EVENT_DATE) / 86400000);
          els.note.textContent = pastDays < 1 ? 'Сегодня!' :
            `Прошло ${pastDays} ${plural(pastDays, ['день', 'дня', 'дней'])}`;
          clearInterval(timer);
          return;
        }

        const day = 86400000, hour = 3600000, min = 60000, sec = 1000;
        const days = Math.floor(diff / day); diff %= day;
        const hours = Math.floor(diff / hour); diff %= hour;
        const mins = Math.floor(diff / min); diff %= min;
        const secs = Math.floor(diff / sec);

        els.d.textContent = pad(days);
        els.h.textContent = pad(hours);
        els.m.textContent = pad(mins);
        els.s.textContent = pad(secs);

        els.ld.textContent = plural(days, ['день', 'дня', 'дней']);
        els.lh.textContent = plural(hours, ['час', 'часа', 'часов']);
        els.lm.textContent = plural(mins, ['минута', 'минуты', 'минут']);
        els.ls.textContent = plural(secs, ['секунда', 'секунды', 'секунд']);

        els.note.textContent = ''; // убираем подпись, пока идёт отсчёт
      }

      tick();
      const timer = setInterval(tick, 1000);
    });