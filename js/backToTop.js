/**
 * backToTop.js - Gerencia a funcionalidade do botão Voltar ao Topo
 */

// Função auto-executável para evitar poluir o escopo global
(function() {
    // Função para rolar suavemente para o topo da página
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Função para mostrar/ocultar o botão baseado na posição de rolagem
    function toggleBackToTopButton() {
      const backToTopButton = document.getElementById('back-to-top') || 
                             document.querySelector('.back-to-top');
      
      if (backToTopButton) {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      }
    }
    
    // Função para inicializar o botão Voltar ao Topo
    function initBackToTopButton() {
      // Encontrar o botão existente
      let backToTopButton = document.getElementById('back-to-top') || 
                           document.querySelector('.back-to-top');
      
      // Se o botão não existir, criar um novo
      if (!backToTopButton) {
        backToTopButton = document.createElement('a');
        backToTopButton.id = 'back-to-top';
        backToTopButton.className = 'back-to-top';
        backToTopButton.href = '#';
        backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
        
        // Adicionar ícone
        const icon = document.createElement('i');
        icon.className = 'fas fa-arrow-up';
        backToTopButton.appendChild(icon);
        
        // Estilizar o botão
        backToTopButton.style.position = 'fixed';
        backToTopButton.style.bottom = '30px';
        backToTopButton.style.right = '30px';
        backToTopButton.style.width = '40px';
        backToTopButton.style.height = '40px';
        backToTopButton.style.backgroundColor = '#3498db';
        backToTopButton.style.color = 'white';
        backToTopButton.style.borderRadius = '50%';
        backToTopButton.style.display = 'flex';
        backToTopButton.style.justifyContent = 'center';
        backToTopButton.style.alignItems = 'center';
        backToTopButton.style.textDecoration = 'none';
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.transition = 'all 0.3s ease';
        backToTopButton.style.zIndex = '99';
        backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        
        // Adicionar o botão ao corpo do documento
        document.body.appendChild(backToTopButton);
      }
      
      // Remover eventos antigos
      const newButton = backToTopButton.cloneNode(true);
      backToTopButton.parentNode.replaceChild(newButton, backToTopButton);
      backToTopButton = newButton;
      
      // Adicionar evento de clique
      backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
      });
      
      // Adicionar evento de rolagem para mostrar/ocultar o botão
      window.addEventListener('scroll', toggleBackToTopButton);
      
      // Verificar a posição inicial de rolagem
      toggleBackToTopButton();
    }
    
    // Adicionar CSS para o botão
    function addButtonStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 40px;
          height: 40px;
          background-color: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 99;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
        }
        
        .back-to-top:hover {
          background-color: #2980b9;
          transform: translateY(-3px);
        }
        
        body.dark-mode .back-to-top {
          background-color: #3498db;
        }
        
        body.dark-mode .back-to-top:hover {
          background-color: #2980b9;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        addButtonStyles();
        initBackToTopButton();
      });
    } else {
      addButtonStyles();
      initBackToTopButton();
    }
  })();
  