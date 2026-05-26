/**
 * app.js - Lógica global de la aplicación
 * En esta versión MPA, se utiliza para inicializaciones que no dependen del Router.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('URIDAVIC OS cargado correctamente.');

    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        const numParticles = 80;
        const connectionDistance = 120;

        function resizeCanvas() {
            const ratio = window.devicePixelRatio || 1;
            const width = canvas.parentElement.offsetWidth;
            const height = canvas.parentElement.offsetHeight;

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.parentElement.offsetWidth,
                y: Math.random() * canvas.parentElement.offsetHeight,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2.5 + 0.4
            };
        }

        resizeCanvas();

        for (let i = 0; i < numParticles; i++) {
            particles.push(createParticle());
        }

        window.addEventListener('resize', resizeCanvas);

        function animate() {
            requestAnimationFrame(animate);

            const width = canvas.parentElement.offsetWidth;
            const height = canvas.parentElement.offsetHeight;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(220, 220, 255, 0.7)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(100, 100, 255, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        animate();
    }
    
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
