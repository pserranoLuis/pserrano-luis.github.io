/**
 * Arquivo cv.js - Gerencia a funcionalidade de download do CV
 */

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar feedback ao usuário
            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'cv-loading-message';
            loadingMessage.innerHTML = '<div class="cv-loading-spinner"></div><p>Generating PDF, please wait...</p>';
            document.body.appendChild(loadingMessage);
            
            // Pequeno atraso para garantir que a mensagem seja exibida
            setTimeout(() => {
                // Primeiro, carregar a imagem
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = '/img/luis.jpg'; // Caminho para sua foto
                
                img.onload = function() {
                    generatePDF(img);
                };
                
                img.onerror = function() {
                    console.error('Erro ao carregar a imagem');
                    generatePDF(null);
                };
            }, 100);
        });
    }
    
    function generatePDF(profileImage) {
        try {
            // Criar novo documento PDF
            const doc = new jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Definir fontes e cores
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(51, 51, 51);
            
            // Adicionar cabeçalho com foto
            if (profileImage) {
                try {
                    // Converter a imagem para formato utilizável pelo jsPDF
                    const canvas = document.createElement('canvas');
                    canvas.width = profileImage.width;
                    canvas.height = profileImage.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(profileImage, 0, 0, profileImage.width, profileImage.height);
                    const imgData = canvas.toDataURL('image/jpeg');
                    
                    // Adicionar a imagem ao PDF (circular não é possível diretamente, mas podemos adicionar uma imagem quadrada)
                    doc.addImage(imgData, 'JPEG', 20, 15, 30, 30);
                } catch (err) {
                    console.error('Erro ao adicionar imagem:', err);
                }
            }
            
            // Adicionar nome e título
            doc.setFontSize(24);
            doc.setTextColor(52, 152, 219); // Azul
            doc.text('Luis Serrano', 105, 25, { align: 'center' });
            
            doc.setFontSize(16);
            doc.text('OSS Engineer', 105, 35, { align: 'center' });
            
            // Adicionar informações de contato
            doc.setFontSize(11);
            doc.setTextColor(51, 51, 51);
            doc.text('Email: pserrano.luis@gmail.com', 105, 45, { align: 'center' });
            doc.text('Phone: +351 934 355 455', 105, 50, { align: 'center' });
            doc.text('Location: Porto Alto, Portugal', 105, 55, { align: 'center' });
            doc.text('LinkedIn: linkedin.com/in/serrano-luis', 105, 60, { align: 'center' });
            
            // Adicionar linha separadora
            doc.setDrawColor(52, 152, 219);
            doc.line(20, 65, 190, 65);
            
            // Perfil profissional
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text('Professional Profile', 20, 75);
            
            doc.setFontSize(11);
            doc.setTextColor(51, 51, 51);
            const profileText = 'Implementation and maintenance of operational support systems, development of technical solutions for telecommunications, and resolution of complex problems in network environments.';
            const splitProfile = doc.splitTextToSize(profileText, 170);
            doc.text(splitProfile, 20, 85);
            
            // Experiência profissional
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text('Professional Experience', 20, 100);
            
            // Nokia OSS Engineer
            doc.setFontSize(12);
            doc.setTextColor(51, 51, 51);
            doc.text('OSS Engineer - Nokia', 20, 110);
            doc.setFontSize(10);
            doc.text('September 2022 - Present', 170, 110, { align: 'right' });
            
            doc.setFontSize(11);
            doc.text('OSS Engineer for BT and 3Ireland Project', 20, 117);
            
            // Responsabilidades
            doc.setFontSize(10);
            const duties1 = [
                '• Developing comprehensive process documentation and user guides for internal team adoption',
                '• Executing software updates via virtual machine environments for the Vodafone Project',
                '• Maintaining detailed documentation of internal and client meetings through OneNote',
                '• Managing system access reclamation and account updates for departed personnel',
                '• Administering compliance audits to facilitate EE\'s regulatory vetting requirements',
                '• Providing technical support for network access challenges and account provisioning',
                '• Creating standardized troubleshooting documentation to streamline common issue resolution'
            ];
            
            let yPos = 125;
            duties1.forEach(duty => {
                doc.text(duty, 25, yPos);
                yPos += 6;
            });
            
            // Nokia Rollout Manager
            doc.setFontSize(12);
            doc.setTextColor(51, 51, 51);
            doc.text('Rollout Manager - Nokia', 20, yPos + 5);
            doc.setFontSize(10);
            doc.text('May 2022 - September 2022', 170, yPos + 5, { align: 'right' });
            
            doc.setFontSize(11);
            doc.text('Rollout Manager for Mwingz Project', 20, yPos + 12);
            
            // Responsabilidades do Rollout Manager
            doc.setFontSize(10);
            const duties2 = [
                '• Orchestrating comprehensive end-to-end site management throughout the entire SWAP lifecycle',
                '• Ensuring successful cluster migration within established project timelines and quality parameters',
                '• Serving as the primary interface between operational teams and project stakeholders',
                '• Conducting thorough pre-deployment verification of critical components',
                '• Implementing proactive risk management strategies to mitigate potential deployment challenges',
                '• Coordinating with subcontractors to establish precise schedules',
                '• Maintaining accurate documentation through regular GDC Portal updates',
                '• Leading daily coordination meetings to validate site readiness'
            ];
            
            yPos += 20;
            duties2.forEach(duty => {
                doc.text(duty, 25, yPos);
                yPos += 6;
            });
            
            // Adicionar nova página
            doc.addPage();
            
            // GDC Permit Manager
            doc.setFontSize(12);
            doc.setTextColor(51, 51, 51);
            doc.text('GDC Permit Manager - Nokia', 20, 20);
            doc.setFontSize(10);
            doc.text('May 2021 - May 2022', 170, 20, { align: 'right' });
            
            doc.setFontSize(11);
            doc.text('Nokia UK BT Project', 20, 27);
            
            // Responsabilidades
            doc.setFontSize(10);
            const duties3 = [
                '• Overseeing the comprehensive permit acquisition process from initiation to final approval',
                '• Facilitating critical field operations by ensuring timely permit authorization',
                '• Managing high-volume stakeholder communications through professional correspondence',
                '• Coordinating with Field Engineers to ensure regulatory compliance for on-site operations',
                '• Implementing efficient documentation workflows to streamline the approval process',
                '• Serving as the key liaison between regulatory authorities and operational teams'
            ];
            
            yPos = 35;
            duties3.forEach(duty => {
                doc.text(duty, 25, yPos);
                yPos += 6;
            });
            
            // Network Engineer
            doc.setFontSize(12);
            doc.setTextColor(51, 51, 51);
            doc.text('Network Engineer - Vodafone', 20, yPos + 5);
            doc.setFontSize(10);
            doc.text('March 2020 - May 2021', 170, yPos + 5, { align: 'right' });
            
            doc.setFontSize(11);
            doc.text('Vodafone UK Project ‐ 1st Line Atlantic Network Operation Center (ANOC) UK TX', 20, yPos + 12);
            
            // Responsabilidades
            doc.setFontSize(10);
            const duties4 = [
                '• Proactive network monitoring and advanced troubleshooting of transmission infrastructure',
                '• Comprehensive alarm analysis and resolution through remote diagnostics',
                '• Cross-functional collaboration with field engineering teams to ensure network integrity',
                '• Expert management of the transmission path between cell sites and controllers (BSC, RNC)',
                '• Implementation of systematic fault detection and resolution protocols'
            ];
            
            yPos += 20;
            duties4.forEach(duty => {
                doc.text(duty, 25, yPos);
                yPos += 6;
            });
            
            // Skills - Melhorado
            doc.setFontSize(14);
            doc.setTextColor(52, 152, 219);
            doc.text('Skills', 20, yPos + 10);
            
            // Linha horizontal para separar
            doc.setDrawColor(200, 200, 200);
            doc.line(20, yPos + 15, 190, yPos + 15);
            
            // Configurar layout melhorado para skills
            const skillStartY = yPos + 25;
            
            // Personal Skills - Coluna da esquerda
            doc.setFontSize(12);
            doc.setTextColor(52, 152, 219);
            doc.text('Personal Skills', 20, skillStartY);
            
            // Desenhar barras de progresso para skills pessoais
            const personalSkills = [
                {name: 'Proactive', level: 80},
                {name: 'Autonomous', level: 80},
                {name: 'Assiduous', level: 100},
                {name: 'Punctual', level: 100},
                {name: 'Strong willing to learn', level: 100}
            ];
            
            let skillY = skillStartY + 10;
            personalSkills.forEach(skill => {
                // Nome da skill
                doc.setFontSize(10);
                doc.setTextColor(51, 51, 51);
                doc.text(skill.name, 25, skillY);
                
                // Porcentagem
                doc.text(`${skill.level}%`, 75, skillY, {align: 'right'});
                
                // Barra de progresso - fundo
                doc.setFillColor(230, 230, 230);
                doc.rect(25, skillY + 2, 50, 3, 'F');
                
                // Barra de progresso - preenchimento
                doc.setFillColor(52, 152, 219);
                doc.rect(25, skillY + 2, skill.level / 2, 3, 'F');
                
                skillY += 12;
            });
            
            // Professional Skills - Coluna da direita
            doc.setFontSize(12);
            doc.setTextColor(52, 152, 219);
            doc.text('Professional Skills', 105, skillStartY);
            
            // Desenhar barras de progresso para skills profissionais
            const professionalSkills = [
                {name: 'HTML', level: 100},
                {name: 'CSS', level: 80},
                {name: 'Bootstrap', level: 80},
                {name: 'SQL', level: 60},
                {name: 'Logo Design', level: 75},
                {name: 'Video Edit', level: 70}
            ];
            
            skillY = skillStartY + 10;
            professionalSkills.forEach(skill => {
                // Nome da skill
                doc.setFontSize(10);
                doc.setTextColor(51, 51, 51);
                doc.text(skill.name, 110, skillY);
                
                // Porcentagem
                doc.text(`${skill.level}%`, 160, skillY, {align: 'right'});
                
                // Barra de progresso - fundo
                doc.setFillColor(230, 230, 230);
                doc.rect(110, skillY + 2, 50, 3, 'F');
                
                // Barra de progresso - preenchimento
                doc.setFillColor(52, 152, 219);
                doc.rect(110, skillY + 2, skill.level / 2, 3, 'F');
                
                skillY += 12;
            });
            
            // Salvar o PDF
            doc.save('Luis_Serrano_CV.pdf');
            
            // Remover mensagem de carregamento
            const loadingMessage = document.querySelector('.cv-loading-message');
            if (loadingMessage) {
                document.body.removeChild(loadingMessage);
            }
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            
            // Remover mensagem de carregamento em caso de erro
            const loadingMessage = document.querySelector('.cv-loading-message');
            if (loadingMessage) {
                document.body.removeChild(loadingMessage);
            }
            
            alert('An error occurred while generating the PDF. Please try again.');
        }
    }
});
