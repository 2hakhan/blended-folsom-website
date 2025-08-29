class VideoCarousel {
    constructor() {
        this.videos = [
            'images/before and after clips/Bef&Aft_TOX3.MOV',
            'images/before and after clips/Bef&Aft_TOX4 copy.mp4',
            'images/before and after clips/Bef&Aft_TOX4.mp4',
            'images/before and after clips/Bef&Aft_TOX5.mp4',
            'images/before and after clips/Bef&Aft_TOX6.mp4',
            'images/before and after clips/Bef&Aft_TOX7.mp4',
            'images/before and after clips/Bef&Aft_TOX8.mp4',
            'images/before and after clips/Bef&Aft_TOX9.mp4',
            'images/before and after clips/Bef&Aft_TOX10.mp4'
        ];

        this.currentIndex = 0;
        this.carousel = document.getElementById('videoCarousel');
        this.indicators = document.getElementById('indicators');
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.createVideoSlides();
        this.createIndicators();
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
    }

    createVideoSlides() {
        this.carousel.innerHTML = '';

        this.videos.forEach((videoSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'video-slide';
            slide.innerHTML = `
                        <video muted loop>
                            <source src="${videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;

            slide.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.goToSlide(index);
                }
            });

            this.carousel.appendChild(slide);
        });
    }

    createIndicators() {
        this.indicators.innerHTML = '';

        this.videos.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });
    }

    bindEvents() {
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.prevSlide();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextSlide();
        });

        // Pause auto-play on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    updateCarousel() {
        const slides = this.carousel.querySelectorAll('.video-slide');
        const indicatorElements = this.indicators.querySelectorAll('.indicator');

        slides.forEach((slide, index) => {
            slide.className = 'video-slide';
            const video = slide.querySelector('video');
            video.pause();

            if (index === this.currentIndex) {
                slide.classList.add('active');
                video.play();
            } else if (index === this.getPrevIndex()) {
                slide.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                slide.classList.add('next');
            }
        });

        // Update indicators
        indicatorElements.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    getPrevIndex() {
        return this.currentIndex === 0 ? this.videos.length - 1 : this.currentIndex - 1;
    }

    getNextIndex() {
        return this.currentIndex === this.videos.length - 1 ? 0 : this.currentIndex + 1;
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.restartAutoPlay();
    }

    nextSlide() {
        this.currentIndex = this.getNextIndex();
        this.updateCarousel();
        this.restartAutoPlay();
    }

    prevSlide() {
        this.currentIndex = this.getPrevIndex();
        this.updateCarousel();
        this.restartAutoPlay();
    }

    startAutoPlay() {
        if (this.isAutoPlaying) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 4000); // Change slide every 4 seconds
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoCarousel();
});