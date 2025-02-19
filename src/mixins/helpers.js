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
          }
    }
}