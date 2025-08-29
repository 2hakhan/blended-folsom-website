const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

document.querySelectorAll('.animate-fade-slide').forEach(el => {
    observer.observe(el);
});


document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.animate-fade-slide-left');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.animate-fade-slide-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("promo-popup");
    const closeBtn = document.querySelector(".close-popup");

    setTimeout(() => {
        popup.style.display = "flex";
    }, 10000);

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        const video = popup.querySelector("video");
        video.pause();
        video.currentTime = 0;
    });
});
