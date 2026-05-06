/**
 * router.js - Router robusto para SPA (Uridavic)
 * Corrige el error de carga de "index" y optimiza para GitHub Pages.
 */

const Router = {
    appElement: null,
    pagesFolder: 'pages/',
    // Mapeo explícito de rutas especiales
    routes: {
        '/': 'home',
        'index': 'home',
        'index.html': 'home'
    },

    /**
     * Inicializa el router
     */
    init(targetId) {
        this.appElement = document.getElementById(targetId);
        if (!this.appElement) return;

        // Manejar botones atrás/adelante
        window.addEventListener('popstate', (e) => {
            const page = (e.state && e.state.page) ? e.state.page : this.getCurrentPage();
            this.loadPage(page, false);
        });

        // Carga inicial
        const initialPage = this.getCurrentPage();
        this.loadPage(initialPage);
    },

    /**
     * Extrae el nombre de la página de la URL actual de forma robusta
     */
    getCurrentPage() {
        const path = window.location.pathname;
        // Obtener el último segmento de la ruta (eliminando slashes al final)
        const segments = path.split('/').filter(segment => segment.length > 0);
        const lastSegment = segments[segments.length - 1] || '';
        
        // Limpiar extensión .html si existe
        let page = lastSegment.replace('.html', '');

        // Aplicar reglas: si es vacío o "index", devolver "home"
        if (!page || page === 'index') {
            return 'home';
        }

        return page;
    },

    /**
     * Navegación programática
     */
    navigate(page) {
        this.loadPage(page, true);
    },

    /**
     * Carga el contenido dinámicamente
     */
    async loadPage(page, updateHistory = true) {
        // Normalizar: Nunca cargar "index", siempre "home"
        if (page === 'index' || !page) page = 'home';

        this.appElement.innerHTML = '<div class="loader">Accediendo al sector...</div>';

        try {
            const response = await fetch(`${this.pagesFolder}${page}.html`);
            
            if (!response.ok) {
                // Fallback 404 robusto
                this.appElement.innerHTML = `
                    <div class="container" style="border: 2px solid var(--xp-orange); background: #fff;">
                        <h2 style="color: var(--xp-blue-dark);">[ERROR 404]</h2>
                        <p>El recurso <strong>${page}</strong> no está disponible en el servidor.</p>
                        <hr>
                        <button class="nav-btn start-btn" onclick="Router.navigate('home')">REINICIAR SISTEMA</button>
                    </div>`;
                return;
            }

            const html = await response.text();
            this.appElement.innerHTML = html;

            // Gestión de Historial compatible con GitHub Pages (mantiene el subdirectorio si existe)
            if (updateHistory) {
                const currentPath = window.location.pathname;
                // Calculamos el basePath para no perder la carpeta en GitHub Pages
                const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                
                // Si la página es home, volvemos al basePath limpio
                const newPath = page === 'home' ? basePath : `${basePath}${page}`;
                
                history.pushState({ page }, '', newPath);
            }

            // SEO Básico
            document.title = `Uridavic - ${page.charAt(0).toUpperCase() + page.slice(1)}`;

            // Notificar a la app (para actualizar botones, etc)
            window.dispatchEvent(new CustomEvent('routeChanged', { detail: { page } }));

        } catch (error) {
            this.appElement.innerHTML = '<h2>Error de E/S</h2><p>No se pudo establecer conexión con el módulo de datos.</p>';
            console.error('Router Critical Error:', error);
        }
    }
};
