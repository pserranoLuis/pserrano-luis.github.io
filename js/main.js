/**
 * Arquivo main.js - Controla o carregamento e inicialização do site
 */

// Função para carregar componentes HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Erro ao carregar o componente ${componentPath}:`, error);
    }
}

// Função para navegação suave
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajuste para o cabeçalho fixo
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu móvel se estiver aberto
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
}

// Função para inicializar o modo escuro (Dark Mode) - Corrigida
function setupDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Verificar preferência salva
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Aplicar modo escuro se estiver salvo
    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
        
        // Aplicar correções para o modo escuro
        if (window.ComponentsFunctions && window.ComponentsFunctions.fixDarkModeTimeline) {
            setTimeout(() => {
                window.ComponentsFunctions.fixDarkModeTimeline();
            }, 100);
        }
    }
    
    // Configurar o alternador de modo escuro
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                // Ativar modo escuro
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
                
                // Aplicar correções para o modo escuro
                if (window.ComponentsFunctions && window.ComponentsFunctions.fixDarkModeTimeline) {
                    setTimeout(() => {
                        window.ComponentsFunctions.fixDarkModeTimeline();
                    }, 100);
                }
            } else {
                // Desativar modo escuro
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
                
                // Restaurar modo claro
                if (window.ComponentsFunctions && window.ComponentsFunctions.resetLightMode) {
                    setTimeout(() => {
                        window.ComponentsFunctions.resetLightMode();
                    }, 100);
                }
            }
        });
    }
    
    // Adicionar atalho de teclado para alternar o modo escuro (Shift + D)
    document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.key === 'D') {
            if (darkModeToggle) {
                darkModeToggle.checked = !darkModeToggle.checked;
                const event = new Event('change');
                darkModeToggle.dispatchEvent(event);
            }
        }
    });
}

// Esconder preloader quando a página estiver totalmente carregada
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
    
    // Verificar modo escuro ao carregar
    if (document.body.classList.contains('dark-mode') && 
        window.ComponentsFunctions && 
        window.ComponentsFunctions.fixDarkModeTimeline) {
        window.ComponentsFunctions.fixDarkModeTimeline();
    }
});

// Carregar componentes e inicializar funcionalidades quando a página estiver pronta
document.addEventListener('DOMContentLoaded', () => {
    // Carregar componentes
    loadComponent('header', 'sections/header.html').then(() => {
        // Inicializar componentes após o carregamento do cabeçalho
        if (window.ComponentsFunctions) {
            window.ComponentsFunctions.setupMobileMenu();
            window.ComponentsFunctions.setupScrollSpy();
        }
        smoothScroll();
        setupDarkMode();
    });
    
    loadComponent('footer', 'sections/footer.html');
    
    // Inicializar componentes
    if (window.ComponentsFunctions) {
        window.ComponentsFunctions.setupScrollAnimation();
        window.ComponentsFunctions.setupBackToTop();
        window.ComponentsFunctions.setupContactForm();
        window.ComponentsFunctions.setupProjectCards();
        window.ComponentsFunctions.setupCounters();
        window.ComponentsFunctions.setupInteractiveTimeline();
    }
    
    // Verificar se há hash na URL para navegação direta
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }, 500);
    }
    
    // Adicionar script de correção direta
    const script = document.createElement('script');
    script.textContent = `
        // Solução direta para corrigir problemas de visibilidade no modo escuro/claro
        (function() {
            // Verificar o modo atual
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Função para corrigir o modo escuro
            function fixDarkMode() {
                if (document.body.classList.contains('dark-mode')) {
                    // Garantir que todas as seções tenham fundo escuro
                    const sections = document.querySelectorAll('section');
                    sections.forEach(section => {
                        section.style.backgroundColor = '#121212';
                    });
                    
                    // Garantir que todos os textos sejam brancos
                    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, a:not(.btn)');
                    textElements.forEach(el => {
                        el.style.color = '#ffffff';
                    });
                }
            }
            
            // Função para corrigir o modo claro
            function fixLightMode() {
                if (!document.body.classList.contains('dark-mode')) {
                    // Garantir que todas as seções tenham fundo claro
                    const sections = document.querySelectorAll('section');
                    sections.forEach(section => {
                        section.style.backgroundColor = '';
                    });
                    
                    // Restaurar cores originais para textos
                    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, a:not(.btn)');
                    textElements.forEach(el => {
                        el.style.color = '';
                    });
                }
            }
            
            // Aplicar a correção apropriada
            if (isDarkMode) {
                fixDarkMode();
            } else {
                fixLightMode();
            }
            
            // Adicionar listener para mudanças no modo
            const darkModeToggle = document.getElementById('dark-mode-toggle');
            if (darkModeToggle) {
                darkModeToggle.addEventListener('change', function() {
                    setTimeout(() => {
                        if (this.checked) {
                            fixDarkMode();
                        } else {
                            fixLightMode();
                        }
                    }, 100);
                });
            }
        })();
    `;
    
    document.body.appendChild(script);
});
