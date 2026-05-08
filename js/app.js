/**
 * app.js - Lógica global de la aplicación
 * En esta versión MPA, se utiliza para inicializaciones que no dependen del Router.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('URIDAVIC OS cargado correctamente.');
    
    // Card Flip Logic for Gallery
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        gallery.addEventListener('click', (e) => {
            const card = e.target.closest('.photo-card');
            if (card) {
                card.classList.toggle('flipped');
            }
        });
    }
});
