document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.members-slider');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const sliderCounter = document.getElementById('slider-counter');
    let currentSlide = 0;

    function getCardsPerSlide() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) return 3; // Десктоп
        if (screenWidth >= 768) return 2;  // Планшет
        return 1;                          // Мобильные устройства
    }

    function initializeSlides() {
        const cardsPerSlide = getCardsPerSlide();
        const cards = Array.from(document.querySelectorAll('.slide-card'));

        slidesContainer.innerHTML = '';

        const totalSlides = Math.ceil(cards.length / cardsPerSlide);
        for (let i = 0; i < totalSlides; i++) {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slidesContainer.appendChild(slide);

            cards.slice(i * cardsPerSlide, (i + 1) * cardsPerSlide).forEach(card => {
                slide.appendChild(card);
            });
        }

        updateSlider();
    }

    function updateSlider() {
        const cardsPerSlide = getCardsPerSlide();
        const totalCards = document.querySelectorAll('.slide-card').length;
        const totalSlides = Math.ceil(totalCards / cardsPerSlide);
        const offset = -currentSlide * 100;

        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.transform = `translateX(${offset}%)`;
        });

        sliderCounter.textContent = `${currentSlide * cardsPerSlide + Math.min(cardsPerSlide, totalCards)} / ${totalCards}`;

        prevButton.classList.toggle('disabled', currentSlide === 0);
        nextButton.classList.toggle('disabled', currentSlide >= totalSlides - 1);
    }

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    nextButton.addEventListener('click', () => {
        const maxSlides = Math.ceil(document.querySelectorAll('.slide-card').length / getCardsPerSlide());
        if (currentSlide < maxSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        initializeSlides();
        updateSlider();
    });

    initializeSlides();
});

document.addEventListener('DOMContentLoaded', () => {
    const moveTextElementId = 'move-text';
    const aboutTopClass = 'about-top';
    const moveTextContainerClass = 'move-text-container';
    const mobileBreakpoint = 767;

    function manageTextPosition() {
        const moveTextElement = document.getElementById(moveTextElementId);
        const imageElement = document.querySelector(`.${aboutTopClass} .about-top-image`);

        if (!moveTextElement || !imageElement) return;

        const isMobile = window.innerWidth <= mobileBreakpoint;
        
        if (isMobile) {
            let moveTextContainer = document.querySelector(`.${moveTextContainerClass}`);
            if (!moveTextContainer) {
                moveTextContainer = document.createElement('div');
                moveTextContainer.classList.add(moveTextContainerClass);
                moveTextContainer.appendChild(moveTextElement.cloneNode(true));
                imageElement.parentElement.appendChild(moveTextContainer);
                moveTextElement.remove();
            }
        } else {
            const container = document.querySelector(`.${aboutTopClass} h1`);
            if (container) {
                const movedTextElement = document.querySelector(`.${moveTextContainerClass} #${moveTextElementId}`);
                if (movedTextElement) {
                    container.appendChild(movedTextElement);
                    const moveTextContainer = document.querySelector(`.${moveTextContainerClass}`);
                    if (moveTextContainer) moveTextContainer.remove();
                }
            }
        }
    }

    manageTextPosition();
    window.addEventListener('resize', manageTextPosition);
});



document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
        const cardsContainer = document.querySelector('.cards');
        if (cardsContainer) {
            const cards = cardsContainer.querySelectorAll('.card');
            if (cards.length > 0) {
                const slider = document.createElement('div');
                slider.classList.add('slider');

                const slides = document.createElement('div');
                slides.classList.add('slides');


                const combinedSlides = [
                    [cards[0], cards[1]],
                    [cards[2]],
                    [cards[3], cards[4]],
                    [cards[5]],
                    [cards[6]]
                ];

                combinedSlides.forEach((cardGroup) => {
                    const slide = document.createElement('div');
                    slide.classList.add('card-slide');
                    cardGroup.forEach(card => {
                        card.classList.remove('card');
                        card.classList.add('card-slide-item');
                        slide.appendChild(card);
                    });
                    slides.appendChild(slide);
                });

                slider.appendChild(slides);
                cardsContainer.parentNode.insertBefore(slider, cardsContainer);
                cardsContainer.style.display = 'none';

                const controlsContainer = document.querySelector('.controls-container');
                const prevButton = controlsContainer.querySelector('.prev');
                const nextButton = controlsContainer.querySelector('.next');
                const progressBar = controlsContainer.querySelector('.progress-bar');

                const slideCount = slides.children.length;
                for (let i = 0; i < slideCount; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('progress-dot');
                    if (i === 0) {
                        dot.classList.add('active');
                    }
                    progressBar.appendChild(dot);
                }

                let currentIndex = 0;

                function updateSlider() {
                    const offset = -currentIndex * 100;
                    slides.style.transform = `translateX(${offset}%)`;

                    const dots = progressBar.querySelectorAll('.progress-dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }

                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.children.length - 1;
                    updateSlider();
                });

                nextButton.addEventListener('click', () => {
                    currentIndex = (currentIndex < slides.children.length - 1) ? currentIndex + 1 : 0;
                    updateSlider();
                });

                updateSlider();
            }
        }
    }
});

window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 767;
    const controlsContainer = document.querySelector('.controls-container');
    if (isMobile) {
        controlsContainer.style.display = 'flex';
    } else {
        controlsContainer.style.display = 'none';
    }
});

function centerElements() {
    const hero = document.querySelector('.hero');
    const runningLine = document.querySelector('.running-line');
    if (!hero || !runningLine) return;

    const elements = hero.querySelectorAll('.design-elements .city, .design-elements .peshka, .design-elements .horse');
    if (!elements.length) return;

    const runningLineHeight = runningLine.offsetHeight;

    const runningLineTop = runningLine.getBoundingClientRect().top + window.scrollY;

    elements.forEach(element => {
        const elementHeight = element.offsetHeight;
        const isMobile = window.innerWidth <= 375;
        let top;

        if (isMobile) {
            top = runningLineTop - elementHeight - 30;
        } else {
            top = runningLineTop - elementHeight;
        }

        element.style.position = 'absolute';
        element.style.top = `${top}px`;
    });
}

function handleResize() {
    centerElements();
}

document.addEventListener('DOMContentLoaded', () => {
    centerElements();
    window.addEventListener('resize', handleResize);
});

window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);
