// Variables globales
let currentCard = 0;
const totalCards = 6;

// Función para mostrar una card específica
function showCard(cardIndex) {
    // Validar índice
    if (cardIndex < 0 || cardIndex >= totalCards) {
        console.error('Índice de card inválido:', cardIndex);
        return;
    }

    // Ocultar todas las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        if (index === cardIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Actualizar botones de navegación
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach((tab, index) => {
        if (index === cardIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Actualizar variable global
    currentCard = cardIndex;

    // Cerrar todas las secciones expandidas al cambiar de card
    closeAllSections();

    // Agregar efecto de transición suave
    const activeCard = document.getElementById(`card-${cardIndex}`);
    if (activeCard) {
        activeCard.style.opacity = '0';
        activeCard.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            activeCard.style.opacity = '1';
            activeCard.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Función para alternar el estado de una sección
function toggleSection(sectionHeader) {
    const section = sectionHeader.parentElement;
    
    if (!section) {
        console.error('No se pudo encontrar la sección');
        return;
    }

    // Toggle de la clase expanded
    section.classList.toggle('expanded');

    // Agregar efecto sonoro visual (opcional)
    sectionHeader.style.transform = 'scale(0.98)';
    setTimeout(() => {
        sectionHeader.style.transform = 'scale(1)';
    }, 100);
}

// Función para cerrar todas las secciones
function closeAllSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('expanded');
    });
}

// Función para expandir todas las secciones de la card actual
function expandAllSections() {
    const activeCard = document.querySelector('.card.active');
    if (activeCard) {
        const sections = activeCard.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('expanded');
        });
    }
}

// Función para animar las barras del gráfico
function animateChartBars() {
    const bars = document.querySelectorAll('.chart-bar');
    
    bars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        // Resetear la barra
        bar.style.width = '0%';
        
        // Animar con delay
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200 + 500); // 500ms delay inicial + 200ms por barra
    });
}

// Función para navegar con teclado
function handleKeyboardNavigation(event) {
    switch(event.key) {
        case 'ArrowLeft':
            if (currentCard > 0) {
                showCard(currentCard - 1);
            }
            break;
        case 'ArrowRight':
            if (currentCard < totalCards - 1) {
                showCard(currentCard + 1);
            }
            break;
        case 'Home':
            showCard(0);
            break;
        case 'End':
            showCard(totalCards - 1);
            break;
        case 'Enter':
        case ' ':
            if (event.target.classList.contains('section-header')) {
                event.preventDefault();
                toggleSection(event.target);
            }
            break;
        case 'Escape':
            closeAllSections();
            break;
    }
}

// Función para manejar el scroll suave
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Función para detectar cambios de visibilidad
function handleVisibilityChange() {
    if (!document.hidden) {
        // Re-animar las barras cuando la página vuelve a ser visible
        setTimeout(animateChartBars, 500);
    }
}

// Función para agregar efectos de hover mejorados
function addHoverEffects() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Función para manejar el redimensionamiento de la ventana
function handleResize() {
    // Ajustar el layout en dispositivos móviles
    const isMobile = window.innerWidth <= 768;
    const tabs = document.querySelectorAll('.nav-tab span');
    
    tabs.forEach(span => {
        if (isMobile) {
            span.style.display = 'none';
        } else {
            span.style.display = 'inline';
        }
    });
}

// Función para inicializar tooltips (opcional)
function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Función para guardar el progreso en localStorage (opcional)
function saveProgress() {
    const progress = {
        currentCard: currentCard,
        expandedSections: []
    };
    
    const expandedSections = document.querySelectorAll('.section.expanded');
    expandedSections.forEach((section, index) => {
        progress.expandedSections.push({
            cardIndex: currentCard,
            sectionIndex: index
        });
    });
    
    try {
        localStorage.setItem('cartillas-progress', JSON.stringify(progress));
    } catch (e) {
        console.log('No se pudo guardar el progreso:', e);
    }
}

// Función para cargar el progreso guardado
function loadProgress() {
    try {
        const savedProgress = localStorage.getItem('cartillas-progress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            
            // Restaurar la card activa
            if (progress.currentCard !== undefined) {
                showCard(progress.currentCard);
            }
            
            // Restaurar secciones expandidas (opcional)
            // Esta funcionalidad se puede activar si se desea
        }
    } catch (e) {
        console.log('No se pudo cargar el progreso:', e);
    }
}

// Función para resetear el progreso
function resetProgress() {
    try {
        localStorage.removeItem('cartillas-progress');
        showCard(0);
        closeAllSections();
    } catch (e) {
        console.log('No se pudo resetear el progreso:', e);
    }
}

// Función para buscar contenido
function searchContent(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) {
        // Mostrar todos los elementos si no hay término de búsqueda
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.style.display = 'block';
        });
        return;
    }

    const cards = document.querySelectorAll('.card');
    let foundResults = false;

    cards.forEach((card, cardIndex) => {
        const sections = card.querySelectorAll('.section');
        let cardHasResults = false;

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const found = text.includes(searchTerm.toLowerCase());

            if (found) {
                section.style.display = 'block';
                cardHasResults = true;
                foundResults = true;
                
                // Opcional: expandir automáticamente las secciones encontradas
                section.classList.add('expanded');
            } else {
                section.style.display = 'none';
            }
        });

        // Si la card tiene resultados, mostrarla
        if (cardHasResults && !card.classList.contains('active')) {
            // Opcional: cambiar a la primera card con resultados
            // showCard(cardIndex);
        }
    });

    if (!foundResults) {
        console.log('No se encontraron resultados para:', searchTerm);
    }
}

// Función para crear un índice de contenido
function createContentIndex() {
    const index = [];
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, cardIndex) => {
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardInfo = {
            index: cardIndex,
            title: cardTitle,
            sections: []
        };

        const sections = card.querySelectorAll('.section');
        sections.forEach((section, sectionIndex) => {
            const sectionTitle = section.querySelector('h3').textContent;
            const sectionDescription = section.querySelector('p').textContent;
            
            cardInfo.sections.push({
                index: sectionIndex,
                title: sectionTitle,
                description: sectionDescription
            });
        });

        index.push(cardInfo);
    });

    return index;
}

// Función para imprimir la página
function printStudyCards() {
    // Expandir todas las secciones antes de imprimir
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.add('expanded');
    });

    // Mostrar todas las cards para imprimir
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.style.display = 'block';
        card.style.pageBreakAfter = 'always';
    });

    window.print();

    // Restaurar el estado original después de imprimir
    setTimeout(() => {
        allCards.forEach((card, index) => {
            if (index !== currentCard) {
                card.style.display = 'none';
            }
            card.style.pageBreakAfter = 'auto';
        });
        
        // Opcional: cerrar las secciones expandidas
        closeAllSections();
    }, 1000);
}

// Función para exportar datos (opcional)
function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        currentCard: currentCard,
        contentIndex: createContentIndex(),
        version: '1.0'
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'cartillas-estudio-export.json';
    link.click();
}

// Función de inicialización
function initializeApp() {
    console.log('Inicializando aplicación de cartillas de estudio...');

    // Cargar progreso guardado
    loadProgress();

    // Animar barras del gráfico
    setTimeout(animateChartBars, 1000);

    // Agregar efectos de hover
    addHoverEffects();

    // Manejar redimensionamiento inicial
    handleResize();

    // Agregar event listeners
    document.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    // Opcional: Inicializar tooltips
    // initializeTooltips();

    // Agregar event listeners para guardar progreso automáticamente
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setTimeout(saveProgress, 100);
        });
    });

    // Event listener para secciones
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            setTimeout(saveProgress, 100);
        });
    });

    // Mejorar la accesibilidad
    const focusableElements = document.querySelectorAll('.nav-tab, .section-header');
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });

    console.log('Aplicación inicializada correctamente');
}

// Event listener para cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);

// Event listener para cuando la página esté completamente cargada
window.addEventListener('load', function() {
    // Re-animar las barras después de que todo esté cargado
    setTimeout(animateChartBars, 500);
});

// Función para agregar atajos de teclado adicionales
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + número para navegar directamente a una card
    if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '6') {
        event.preventDefault();
        const cardIndex = parseInt(event.key) - 1;
        showCard(cardIndex);
    }
    
    // Ctrl/Cmd + E para expandir todas las secciones
    if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault();
        expandAllSections();
    }
    
    // Ctrl/Cmd + R para resetear
    if ((event.ctrlKey || event.metaKey) && event.key === 'r' && event.shiftKey) {
        event.preventDefault();
        resetProgress();
    }
});

// Exponer funciones globales para uso desde HTML
window.showCard = showCard;
window.toggleSection = toggleSection;
window.closeAllSections = closeAllSections;
window.expandAllSections = expandAllSections;
window.searchContent = searchContent;
window.printStudyCards = printStudyCards;
window.exportData = exportData;
window.resetProgress = resetProgress;