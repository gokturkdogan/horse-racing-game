export default {
    methods: {
        roundValue(value, roundingPrecision) {
            if (typeof value !== 'number' || typeof roundingPrecision !== 'number' || roundingPrecision < 0) {
              console.error('Invalid parameters');
              return null; 
            }
            return Number(value.toFixed(roundingPrecision));
          },
          toggleScroll(disable = true) {
            if (disable) {
              document.body.style.overflow = 'hidden';
            } else {
              document.body.style.overflow = '';
            }
          },
          scrollToTop() {
            const start = window.scrollY; // Başlangıç scroll pozisyonu
            const distance = -start; // Hedefe olan mesafe (en üst nokta)
            const duration = 500; // Animasyon süresi (milisaniye cinsinden)
            let startTime = null;
      
            function animateScroll(timestamp) {
              if (!startTime) startTime = timestamp; // İlk timestamp
              const timeElapsed = timestamp - startTime; // Geçen süre
              const progress = Math.min(timeElapsed / duration, 1); // İlerleme oranı
      
              // Hesaplanan yeni scroll pozisyonu
              window.scrollTo(0, start + (distance * progress));
      
              if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll); // Animasyonu devam ettir
              }
            }
            requestAnimationFrame(animateScroll); // Animasyonu başlat
          }
    }
}