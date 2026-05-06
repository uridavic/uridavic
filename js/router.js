/**
 * router.js - Router minimalista para SPA (Uridavic)
 * Gestiona la navegación, el historial y la carga de contenido.
 */

const Router = {
    appElement: null,
    pagesFolder: 'pages/',

    /**
     * Configura el router y carga la página inicial
     * @param {string} targetId - ID del contenedor principal
     */
    init(targetId) {
        this.appElement = document.getElementById(targetId);
        if (!this.appElement) {
            console.error(`No se encontró el elemento con ID: ${targetId}`);
            return;
        }

        // 1. Escuchar cambios en el historial (botones atrás/adelante)
        window.addEventListener('popstate', (event) => {
            const page = (event.state && event.state.page) ? event.state.page : 'home';
            this.loadPage(page, false);
        });

        // 2. Determinar la página inicial desde la URL
        const path = window.location.pathname;
        const initialPage = path.split('/').pop().replace('.html', '') || 'home';
        
        // 3. Carga inicial
        this.loadPage(initialPage);
    },

    /**
     * Navega a una página específica
     * @param {string} page - Nombre de la página a cargar
     */
    navigate(page) {
        this.loadPage(page, true);
    },

    /**
     * Carga el archivo HTML y actualiza el DOM
     */
    async loadPage(page, updateHistory = true) {
        this.appElement.innerHTML = '<div class="loader">Cargando sistema...</div>';

        try {
            const response = await fetch(`${this.pagesFolder}${page}.html`);
            
            if (!response.ok) {
                this.appElement.innerHTML = `
                    <div style="padding: 20px; border: 2px solid red; background: #fee;">
                        <h2>ERROR 404</h2>
                        <p>El módulo <strong>${page}</strong> no pudo ser localizado.</p>
                        <button onclick="Router.navigate('home')">Volver al Inicio</button>
                    </div>`;
                return;
            }

            const html = await response.text();
            this.appElement.innerHTML = html;

            // Actualizar el historial del navegador
            if (updateHistory) {
                const currentPath = window.location.pathname;
                const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                const newUrl = page === 'home' ? basePath : `${basePath}${page}`;
                history.pushState({ page }, '', newUrl);
            }

            // Actualizar título de la ventana
            document.title = `Uridavic - ${page.charAt(0).toUpperCase() + page.slice(1)}`;

            // Emitir evento global para notificar el cambio de página (útil para el header)
            window.dispatchEvent(new CustomEvent('routeChanged', { detail: { page } }));

        } catch (error) {
            this.appElement.innerHTML = '<h2>Error crítico</h2><p>Fallo en la carga del componente.</p>';
            console.error('Router Error:', error);
        }
    }
};
