document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const cards = document.querySelectorAll('.recommendation-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-recommendation');
    const nextBtn = document.getElementById('next-recommendation');
    
    // Verificar se os elementos existem
    if (!cards.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Função para mostrar uma carta específica
    function showCard(index) {
        // Limitar o índice
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;
        
        currentIndex = index;
        
        // Esconder todas as cartas
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Mostrar a carta atual
        cards[currentIndex].classList.add('active');
        
        // Atualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', () => {
        showCard(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showCard(currentIndex + 1);
    });
    
    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showCard(index);
        });
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showCard(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showCard(currentIndex + 1);
        }
    });
    
    // Inicializar
    showCard(0);
});
