/**
 * darkMode.js - Sistema de modo escuro simplificado
 */

// Executar imediatamente quando o script é carregado
(function() {
  // Função para inicializar o modo escuro
  function initDarkMode() {
      console.log('Inicializando modo escuro...');
      
      // Elementos
      const darkModeToggle = document.getElementById('floating-dark-mode');
      const body = document.body;
      
      // Verificar se o botão existe
      if (!darkModeToggle) {
          console.error('Botão de modo escuro não encontrado!');
          return;
      }
      
      console.log('Botão de modo escuro encontrado:', darkModeToggle);
      
      // Verificar preferência salva
      const savedDarkMode = localStorage.getItem('darkMode');
      console.log('Preferência salva:', savedDarkMode);
      
      // Aplicar modo escuro se estiver salvo
      if (savedDarkMode === 'true') {
          console.log('Aplicando modo escuro...');
          body.classList.add('dark-mode');
          updateIcon(true);
      }
      
      // Função para alternar modo escuro
      function toggleDarkMode() {
          console.log('Alternando modo escuro...');
          if (body.classList.contains('dark-mode')) {
              body.classList.remove('dark-mode');
              localStorage.setItem('darkMode', 'false');
              updateIcon(false);
              console.log('Modo escuro desativado');
          } else {
              body.classList.add('dark-mode');
              localStorage.setItem('darkMode', 'true');
              updateIcon(true);
              console.log('Modo escuro ativado');
          }
      }
      
      // Função para atualizar o ícone
      function updateIcon(isDark) {
          const icon = darkModeToggle.querySelector('i');
          if (!icon) {
              console.error('Ícone não encontrado no botão de modo escuro');
              return;
          }
          
          if (isDark) {
              icon.classList.remove('fa-moon');
              icon.classList.add('fa-sun');
          } else {
              icon.classList.remove('fa-sun');
              icon.classList.add('fa-moon');
          }
      }
      
      // Adicionar evento de clique ao botão
      darkModeToggle.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Botão de modo escuro clicado');
          toggleDarkMode();
      });
      
      // Adicionar atalho de teclado
      document.addEventListener('keydown', function(e) {
          if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
              console.log('Atalho de teclado para modo escuro detectado');
              toggleDarkMode();
          }
      });
      
      console.log('Inicialização do modo escuro concluída');
  }
  
  // Verificar se o DOM já está carregado
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
      initDarkMode();
  }
  
  // Adicionar também ao evento load para garantir
  window.addEventListener('load', function() {
      console.log('Evento load acionado, verificando modo escuro...');
      const darkModeToggle = document.getElementById('floating-dark-mode');
      if (darkModeToggle && localStorage.getItem('darkMode') === 'true') {
          const icon = darkModeToggle.querySelector('i');
          if (icon) {
              icon.classList.remove('fa-moon');
              icon.classList.add('fa-sun');
          }
      }
  });
})();
