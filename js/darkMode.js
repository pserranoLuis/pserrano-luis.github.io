/**
 * darkMode.js - Gerencia a funcionalidade de modo escuro/claro
 */

// Função auto-executável para evitar poluir o escopo global
(function() {
    // Função para alternar o modo escuro
    function toggleDarkMode() {
      const body = document.body;
      
      // Verificar o estado atual
      const isDarkMode = body.classList.contains('dark-mode');
      
      if (isDarkMode) {
        // Mudar para modo claro
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
        applyLightMode();
      } else {
        // Mudar para modo escuro
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        applyDarkMode();
      }
    }
    
    // Função para aplicar estilos do modo escuro
    function applyDarkMode() {
      // Aplicar cores escuras às seções
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        if (index % 2 === 0) {
          section.style.backgroundColor = '#121212';
        } else {
          section.style.backgroundColor = '#1a1a1a';
        }
      });
      
      // Cores específicas para seções especiais
      const introSection = document.getElementById('intro');
      if (introSection) {
        introSection.style.backgroundColor = '#0d1117';
        introSection.style.backgroundImage = 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)';
      }
      
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.style.backgroundColor = '#0d1117';
        contactSection.style.backgroundImage = 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)';
      }
      
      // Corrigir a timeline
      fixTimelineForDarkMode();
    }
    
    // Função para aplicar estilos do modo claro
    function applyLightMode() {
      // Aplicar cores claras às seções
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        if (index % 2 === 0) {
          section.style.backgroundColor = '#f0f8ff';
        } else {
          section.style.backgroundColor = '#ffffff';
        }
      });
      
      // Cores específicas para seções especiais
      const introSection = document.getElementById('intro');
      if (introSection) {
        introSection.style.backgroundColor = '#ebf5fb';
        introSection.style.backgroundImage = 'linear-gradient(135deg, #ebf5fb 0%, #d6eaf8 100%)';
      }
      
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.style.backgroundColor = '#e8f4f8';
        contactSection.style.backgroundImage = 'linear-gradient(135deg, #e8f4f8 0%, #d6eaf8 100%)';
      }
      
      // Corrigir a timeline
      fixTimelineForLightMode();
    }
    
    // Função para corrigir a timeline no modo escuro
    function fixTimelineForDarkMode() {
      // Obter o container da timeline
      const timelineContainer = document.querySelector('.timeline-content-container');
      if (timelineContainer) {
        timelineContainer.style.backgroundColor = '#1e1e1e';
        timelineContainer.style.color = '#ffffff';
        timelineContainer.style.border = '1px solid #333';
        timelineContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
      }
      
      // Obter o conteúdo ativo da timeline
      const activeContent = document.querySelector('.timeline-content.active');
      if (activeContent) {
        // Garantir que o conteúdo está visível
        activeContent.style.display = 'block';
        
        // Aplicar cores a todos os elementos de texto
        const textElements = activeContent.querySelectorAll('h1, h2, h3, h4, p, li, span, a, div');
        textElements.forEach(el => {
          el.style.color = '#ffffff';
        });
      }
    }
    
    // Função para corrigir a timeline no modo claro
    function fixTimelineForLightMode() {
      // Obter o container da timeline
      const timelineContainer = document.querySelector('.timeline-content-container');
      if (timelineContainer) {
        timelineContainer.style.backgroundColor = '#ffffff';
        timelineContainer.style.color = '#333333';
        timelineContainer.style.border = '1px solid #e0e0e0';
        timelineContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      }
      
      // Obter o conteúdo ativo da timeline
      const activeContent = document.querySelector('.timeline-content.active');
      if (activeContent) {
        // Garantir que o conteúdo está visível
        activeContent.style.display = 'block';
        
        // Aplicar cores a todos os elementos de texto
        const textElements = activeContent.querySelectorAll('h1, h2, h3, h4, p, li, span, a, div');
        textElements.forEach(el => {
          el.style.color = '#333333';
        });
      }
    }
    
    // Função para configurar os pontos da timeline
    function setupTimelinePoints() {
      const timelinePoints = document.querySelectorAll('.timeline-point');
      
      timelinePoints.forEach(point => {
        point.addEventListener('click', function() {
          // Pequeno atraso para garantir que o conteúdo foi atualizado
          setTimeout(() => {
            // Verificar se estamos no modo escuro ou claro
            if (document.body.classList.contains('dark-mode')) {
              fixTimelineForDarkMode();
            } else {
              fixTimelineForLightMode();
            }
          }, 50);
        });
      });
    }
    
    // Função para inicializar o modo escuro
    function initDarkMode() {
      // Verificar preferência salva no localStorage
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      
      // Aplicar modo escuro se salvo
      if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        setTimeout(applyDarkMode, 100);
      } else {
        setTimeout(applyLightMode, 100);
      }
      
      // Encontrar o botão de modo escuro
      const darkModeToggle = document.getElementById('dark-mode-toggle');
      const darkModeButton = document.querySelector('.floating-dark-mode');
      
      // Configurar o botão de toggle (checkbox)
      if (darkModeToggle) {
        darkModeToggle.checked = savedDarkMode;
        darkModeToggle.addEventListener('change', toggleDarkMode);
      }
      
      // Configurar o botão flutuante
      if (darkModeButton) {
        darkModeButton.addEventListener('click', toggleDarkMode);
      }
      
      // Adicionar atalho de teclado (Shift + D)
      document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.key === 'D') {
          toggleDarkMode();
        }
      });
      
      // Configurar os pontos da timeline
      setupTimelinePoints();
      
      // Verificar periodicamente a timeline
      setInterval(() => {
        if (document.body.classList.contains('dark-mode')) {
          fixTimelineForDarkMode();
        } else {
          fixTimelineForLightMode();
        }
      }, 2000);
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDarkMode);
    } else {
      initDarkMode();
    }
    
    // Adicionar CSS personalizado
    const style = document.createElement('style');
    style.textContent = `
      /* Estilos para o modo escuro */
      body.dark-mode .timeline-content-container {
        background-color: #1e1e1e !important;
        color: #ffffff !important;
        border: 1px solid #333 !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5) !important;
      }
      
      body.dark-mode .timeline-content {
        background-color: #1e1e1e !important;
      }
      
      body.dark-mode .timeline-content h1,
      body.dark-mode .timeline-content h2,
      body.dark-mode .timeline-content h3,
      body.dark-mode .timeline-content h4,
      body.dark-mode .timeline-content p,
      body.dark-mode .timeline-content span,
      body.dark-mode .timeline-content li,
      body.dark-mode .timeline-content a,
      body.dark-mode .timeline-content div {
        color: #ffffff !important;
      }
      
      /* Estilos para o modo claro */
      body:not(.dark-mode) .timeline-content-container {
        background-color: #ffffff !important;
        color: #333333 !important;
        border: 1px solid #e0e0e0 !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
      }
      
      body:not(.dark-mode) .timeline-content {
        background-color: #ffffff !important;
      }
      
      body:not(.dark-mode) .timeline-content h1,
      body:not(.dark-mode) .timeline-content h2,
      body:not(.dark-mode) .timeline-content h3,
      body:not(.dark-mode) .timeline-content h4,
      body:not(.dark-mode) .timeline-content p,
      body:not(.dark-mode) .timeline-content span,
      body:not(.dark-mode) .timeline-content li,
      body:not(.dark-mode) .timeline-content a,
      body:not(.dark-mode) .timeline-content div {
        color: #333333 !important;
      }
      
      /* Garantir que o conteúdo ativo seja visível */
      .timeline-content.active {
        display: block !important;
      }
    `;
    document.head.appendChild(style);
  })();
  