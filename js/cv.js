document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Abrir o arquivo CV em uma nova janela
    const cvWindow = window.open('cv.html', '_blank');
    
    // Quando o CV terminar de carregar, converter para PDF
    cvWindow.addEventListener('load', function() {
      setTimeout(function() {
        const element = cvWindow.document.querySelector('.cv-container');
        const opt = {
          margin: [0, 0, 0, 0],
          filename: 'Luis_Serrano_CV.pdf',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().from(element).set(opt).save().then(function() {
          // Fechar a janela após o download
          setTimeout(function() {
            cvWindow.close();
          }, 1000);
        });
      }, 1000); // Aguardar 1 segundo para garantir que tudo carregou
    });
  });
  