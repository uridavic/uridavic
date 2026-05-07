/**
 * router.js - Router robusto para SPA (Uridavic)
 * Corrige el error de carga de "index" y optimiza para GitHub Pages.
 */

const Router = {
    appElement: null,
    pagesFolder: 'pages/',
    basePath: '/', // Se calculará dinámicamente en init()

    /**
     * Inicializa el router
     */
    init(targetId) {
        this.appElement = document.getElementById(targetId);
        if (!this.appElement) return;

        // 1. Calcular el basePath (vital para GitHub Pages y subdirectorios)
        this.basePath = this.calculateBasePath();

        // 2. Manejar botones atrás/adelante (Navegación del historial)
        window.addEventListener('popstate', (e) => {
            const page = (e.state && e.state.page) ? e.state.page : this.getCurrentPage();
            this.loadPage(page, false);
        });

        // 3. Carga inicial
        const initialPage = this.getCurrentPage();
        this.loadPage(initialPage);
    },

    /**
     * Calcula la ruta base de la aplicación de forma dinámica.
     * Identifica si estamos en la raíz o en un subdirectorio (como en GitHub Pages).
     */
    calculateBasePath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s.length > 0);
        
        // Si no hay segmentos, estamos en la raíz absoluta (ej: localhost:5500/)
        if (segments.length === 0) return '/';

        // Obtener páginas válidas desde el DOM (cargado previamente en app.js desde header.html)
        const validPages = Array.from(document.querySelectorAll('.nav-btn[data-page]'))
                                .map(btn => btn.getAttribute('data-page'));
        // Añadir variantes de index como válidas para el cálculo
        validPages.push('index', 'index.html');

        const lastSegment = segments[segments.length - 1].replace('.html', '');

        // Si el último segmento es una página conocida, la base es todo lo anterior
        if (validPages.includes(lastSegment)) {
            const lastSegOriginal = segments[segments.length - 1];
            return path.substring(0, path.lastIndexOf(lastSegOriginal));
        } else {
            // Si el último segmento no es una página conocida, asumimos que es el directorio base
            // (Caso típico de GitHub Pages: /nombre-repo/)
            return path.endsWith('/') ? path : path + '/';
        }
    },

    /**
     * Extrae el nombre de la página de la URL actual relativa al basePath
     */
    getCurrentPage() {
        const path = window.location.pathname;
        let relativePath = path;
        
        // Extraer la parte de la URL que sigue al basePath
        if (path.startsWith(this.basePath)) {
            relativePath = path.substring(this.basePath.length);
        }

        // Limpiar extensión y slashes
        let page = relativePath.replace('.html', '').replace(/\//g, '');

        // Si el resultado es vacío o "index", redirigir a "home"
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
     * Carga el contenido dinámicamente en el contenedor principal
     */
    async loadPage(page, updateHistory = true) {
        // Normalización básica
        if (page === 'index' || !page) page = 'home';

        this.appElement.innerHTML = '<div class="loader">Accediendo al sector...</div>';

        try {
            const response = await fetch(`${this.pagesFolder}${page}.html`);
            
            if (!response.ok) {
                // Pantalla de error 404 personalizada (Retro Style)
                this.appElement.innerHTML = `
                    <div class="container" style="border: 2px solid var(--xp-orange); background: #fff; padding: 20px; margin-top: 20px;">
                        <h2 style="color: var(--xp-blue-dark); margin-top: 0;">[ERROR 404]</h2>
                        <p>El recurso <strong>${page}</strong> no está disponible en el servidor o el acceso ha sido denegado.</p>
                        <hr style="border: 1px solid #eee;">
                        <button class="nav-btn start-btn" onclick="Router.navigate('home')" style="margin-top: 10px;">REINICIAR SISTEMA</button>
                    </div>`;
                return;
            }

            const html = await response.text();
            this.appElement.innerHTML = html;

            // Gestión de Historial: Mantenemos el basePath para no romper la navegación en recargas
            if (updateHistory) {
                const newPath = page === 'home' ? this.basePath : `${this.basePath}${page}`;
                history.pushState({ page }, '', newPath);
            }

            // SEO Básico y Título de pestaña
            document.title = `Uridavic - ${page.charAt(0).toUpperCase() + page.slice(1)}`;

            // Notificar a la aplicación para actualizar UI (ej: botones activos)
            window.dispatchEvent(new CustomEvent('routeChanged', { detail: { page } }));

        } catch (error) {
            this.appElement.innerHTML = `
                <div class="container" style="border: 2px solid red; background: #fff; padding: 20px;">
                    <h2>Error de E/S</h2>
                    <p>No se pudo establecer conexión con el módulo de datos.</p>
                </div>`;
            console.error('Router Critical Error:', error);
        }
    }
};
