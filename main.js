document.addEventListener("DOMContentLoaded", () => {
    
    // ---------------------------------------------
    // 1. GESTION DU TITRE (Disparition au scroll)
    // ---------------------------------------------
    const title = document.querySelector("#welcome h1");
    const subtitle = document.querySelector("#welcome p");
  
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            title.classList.add("fade-out");
            if(subtitle) subtitle.classList.add("fade-out");
        } else {
            title.classList.remove("fade-out");
            if(subtitle) subtitle.classList.remove("fade-out");
        }
    });
  
    // ---------------------------------------------
    // 2. GESTION DE LA NAVBAR (Apparition au scroll)
    // ---------------------------------------------
    const navbar = document.querySelector(".navbar");
    const aboutSection = document.querySelector("#about");

    if (aboutSection) {
        window.addEventListener("scroll", () => {
            const aboutPosition = aboutSection.offsetTop;
            if (window.scrollY >= aboutPosition - 150) {
                navbar.classList.add("visible");
            } else {
                navbar.classList.remove("visible");
            }
        });
    }

    // ---------------------------------------------
    // 3. GESTION DES ANIMATIONS D'APPARITION
    // ---------------------------------------------
    const sectionsToAnimate = document.querySelectorAll(".content-wrapper");
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.2 
    });
  
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // ---------------------------------------------
    // 4. NAVIGATION "CINÉMATOGRAPHIQUE" (Custom Scroll)
    // ---------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // 1000ms = 1 seconde de trajet (très fluide)
                smoothScroll(targetSection, 1000); 
            }
        });
    });

    // ---------------------------------------------
    // 5. GESTION DU CHANGEMENT DE LANGUE (C'est ça qu'il manquait !)
    // ---------------------------------------------
    const btnFr = document.getElementById('btn-fr');
    const btnEn = document.getElementById('btn-en');
    const body = document.body;
    const cvLink = document.getElementById('cv-link');

    // Vérification que les boutons existent pour éviter les erreurs
    if (btnFr && btnEn && cvLink) {
        
        // Clic sur FR
        btnFr.addEventListener('click', () => {
            body.classList.add('fr-mode');
            btnFr.classList.add('active');
            btnEn.classList.remove('active');
            
            // Change le lien du CV
            cvLink.href = "cv_fr.pdf";
            cvLink.setAttribute('download', 'CV_Camille_Boutin_FR.pdf');
        });

        // Clic sur EN
        btnEn.addEventListener('click', () => {
            body.classList.remove('fr-mode');
            btnEn.classList.add('active');
            btnFr.classList.remove('active');

            // Change le lien du CV
            cvLink.href = "cv.pdf"; // Remplace par "cv.pdf" si ton CV anglais s'appelle comme ça
            cvLink.setAttribute('download', 'CV_Camille_Boutin_EN.pdf');
        });
    }

});

// --- FONCTIONS UTILITAIRES (HORS du DOMContentLoaded) ---

// La fonction magique pour le scroll lent
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const headerOffset = 100;
    const distance = targetPosition - headerOffset;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}