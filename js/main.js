/**
 * Main Application Entry Point
 * 
 * Central logic for stats counters, video hover autoplay, and media modals.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Satyam Dubey Portfolio initialized.");
    
    initStatsCounters();
    initVideoPreviews();
    initMediaModals();
});

/**
 * Animated Counters on Scroll
 */
function initStatsCounters() {
    const stats = document.querySelectorAll(".stat-number[data-target]");
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute("data-target"), 10);
        const duration = 1500; // 1.5 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;
        
        const timer = setInterval(() => {
            current += Math.ceil(target / 100) || 1;
            if (current >= target) {
                element.textContent = target + "+";
                clearInterval(timer);
            } else {
                element.textContent = current + "+";
            }
        }, stepTime);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

/**
 * Autoplay Muted Video Preview on Hover
 */
function initVideoPreviews() {
    const videoCards = document.querySelectorAll(".video-card");

    videoCards.forEach(card => {
        const video = card.querySelector("video");
        if (!video) return;

        card.addEventListener("mouseenter", () => {
            video.play().catch(err => console.log("Autoplay on hover blocked:", err));
        });

        card.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

/**
 * Click-to-Expand Modal Viewer (Images & Videos)
 */
function initMediaModals() {
    const modal = document.getElementById("media-modal");
    const modalImg = document.getElementById("modal-img");
    const modalVideo = document.getElementById("modal-video");
    const closeModal = document.querySelector(".close-modal");

    if (!modal) return;

    // Gallery Cards Click
    const galleryCards = document.querySelectorAll(".gallery-card");
    galleryCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            if (img) {
                modalImg.src = img.src;
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
                modal.classList.add("active");
            }
        });
    });

    // Certificate Cards Click
    const certCards = document.querySelectorAll(".certificate-card");
    certCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector(".cert-image");
            if (img) {
                modalImg.src = img.src;
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
                modal.classList.add("active");
            }
        });
    });

    // Video Cards Click
    const videoCards = document.querySelectorAll(".video-card");
    videoCards.forEach(card => {
        card.addEventListener("click", () => {
            const videoSrc = card.getAttribute("data-video-src");
            if (videoSrc) {
                modalVideo.src = videoSrc;
                modalVideo.style.display = "block";
                modalImg.style.display = "none";
                modal.classList.add("active");
                modalVideo.play().catch(err => console.log("Modal video play blocked:", err));
            }
        });
    });

    // Hero Profile Image Click
    const heroProfileImg = document.querySelector(".hero-profile-img");
    if (heroProfileImg) {
        heroProfileImg.addEventListener("click", () => {
            modalImg.src = heroProfileImg.src;
            modalImg.style.display = "block";
            modalVideo.style.display = "none";
            modal.classList.add("active");
        });
    }

    // Close Modal Events
    const close = () => {
        modal.classList.remove("active");
        modalImg.src = "";
        modalVideo.pause();
        modalVideo.src = "";
    };

    closeModal.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) close();
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) close();
    });
}
