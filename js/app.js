/**
 * app.js - Lógica principal de la aplicación
 * Inicializa componentes y delega la navegación al Router.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // 1. Cargar el componente Header dinámicamente
    await loadComponent('header-container', 'components/header.html');
    
    // 2. Inicializar el Router apuntando al contenedor <main id="app">
    Router.init('app');

    // 3. Configurar listeners de navegación
    setupNavigationListeners();

    // 4. Escuchar cambios de ruta para actualizar la interfaz (ej: botones activos)
    window.addEventListener('routeChanged', (e) => {
        updateActiveButton(e.detail.page);
    });
}

/**
 * Carga un componente HTML en un contenedor
 */
async function loadComponent(containerId, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: ${url}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error('Error al cargar componente:', error);
    }
}

/**
 * Delegación de eventos para los botones de navegación
 */
function setupNavigationListeners() {
    document.addEventListener('click', (e) => {
        // Buscar el botón más cercano con la clase .nav-btn
        const btn = e.target.closest('.nav-btn');
        if (btn) {
            const page = btn.getAttribute('data-page');
            if (page) Router.navigate(page);
        }
    });
}

/**
 * Marca visualmente el botón de la página actual
 */
function updateActiveButton(page) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-page') === page) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
