/**
 * Arquivo components.js - Contém funções relacionadas aos componentes da UI
 */

// Função para configurar o menu móvel
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Função para destacar item de menu ativo durante rolagem
function setupScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Função para animar elementos ao scroll
function setupScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Função para configurar o botão Voltar ao Topo
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
}

// Função para configurar o formulário de contacto
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Aqui você normalmente enviaria os dados para um servidor
            // Como este é um exemplo, apenas mostraremos um alerta
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
            
            // Limpar formulário
            contactForm.reset();
        });
    }
}

// Função para adicionar efeitos de hover nos cartões de projetos
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Função para adicionar contador aos números de estatísticas
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = Math.ceil(target / (duration / 20)); // Atualiza a cada 20ms
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const timer = setInterval(() => {
                    current += step;
                    counter.textContent = current;
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 20);
                
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Exportar funções para serem usadas no main.js
window.ComponentsFunctions = {
    setupMobileMenu,
    setupScrollSpy,
    setupScrollAnimation,
    setupBackToTop,
    setupContactForm,
    setupProjectCards,
    setupCounters,
    setupInteractiveTimeline
};
// Função para configurar a linha temporal interativa
function setupInteractiveTimeline() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    // Função para ativar um ponto específico
    function activatePoint(point) {
        // Remover classe ativa de todos os pontos
        timelinePoints.forEach(p => p.classList.remove('active'));
        
        // Adicionar classe ativa ao ponto clicado
        point.classList.add('active');
        
        // Obter o ano do ponto
        const year = point.getAttribute('data-year');
        
        // Esconder todos os conteúdos
        timelineContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostrar o conteúdo correspondente
        const activeContent = document.getElementById(`content-${year}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }
    
    // Adicionar evento de clique a cada ponto
    timelinePoints.forEach(point => {
        point.addEventListener('click', function() {
            activatePoint(this);
        });
    });
    
    // Ativar o primeiro ponto por padrão (se existir)
    if (timelinePoints.length > 0) {
        activatePoint(timelinePoints[0]);
    }
}