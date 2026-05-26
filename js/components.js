/**
 * components.js - Definición de componentes nativos reutilizables (Web Components)
 * Proporciona el Header y Footer para todas las páginas del sitio MPA.
 */

class XPHeader extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        
        // Función para determinar si un link es el activo
        const isActive = (path) => {
            // Manejo de raíz e index.html
            if (path === 'index.html' || path === '/') {
                return currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
            }
            // Para otras páginas
            return currentPath.includes(path);
        };

        this.innerHTML = `
            <header class="particle-header">
                <canvas id="particle-canvas"></canvas>
                <div class="header-content">
                    <h1>URIDAVIC</h1>
                </div>
                <nav class="xp-nav">
                    <a href="index.html" class="nav-btn start-btn ${isActive('index.html') ? 'active' : ''}">
                        <div class="xp-logo">
                            <div class="logo-row">
                                <div class="logo-piece red"></div>
                                <div class="logo-piece green"></div>
                            </div>
                            <div class="logo-row">
                                <div class="logo-piece blue"></div>
                                <div class="logo-piece yellow"></div>
                            </div>
                        </div>
                    </a>
                    <a href="udv.html" class="nav-btn ${isActive('udv.html') ? 'active' : ''}">UDV</a>
                    <a href="fotos.html" class="nav-btn ${isActive('fotos.html') ? 'active' : ''}">Fotos</a>
                    <a href="proyectos.html" class="nav-btn ${isActive('proyectos.html') ? 'active' : ''}">Proyectos</a>
                </nav>
            </header>
        `;
    }
}

class XPFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <p>&copy; 2026 URIDAVIC Corp.</p>
            </footer>
        `;
    }
}

// Registrar los componentes
customElements.define('xp-header', XPHeader);
customElements.define('xp-footer', XPFooter);
