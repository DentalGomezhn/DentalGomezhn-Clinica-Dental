document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CARRUSEL 1 (PRINCIPAL)
    ========================= */

    let index1 = 0;

    const tren = document.querySelector(".fotoInicioDra");
    const slides1 = document.querySelectorAll(".fotoInicioDra img, .fotoInicioDra video");

    if (tren && slides1.length > 0) {

        function moverCarrusel1() {
            const slideWidth = slides1[0].clientWidth;
            tren.style.transform = `translateX(${-index1 * slideWidth}px)`;
        }

        tren.style.transition = "transform 0.6s ease-in-out";

        setInterval(() => {
            index1++;
            moverCarrusel1();

            if (index1 >= slides1.length - 1) {
                setTimeout(() => {
                    tren.style.transition = "none";
                    index1 = 0;
                    moverCarrusel1();

                    setTimeout(() => {
                        tren.style.transition = "transform 0.6s ease-in-out";
                    }, 50);

                }, 600);
            }

        }, 6000);

        window.addEventListener("resize", moverCarrusel1);
    }


    /* =========================
       CARRUSEL 2 (SERVICIOS)
    ========================= */

    document.querySelectorAll(".carrusel-servicio").forEach((carrusel) => {

        const slides = carrusel.querySelector(".slides");
        const images = Array.from(slides.querySelectorAll("img"));

        if (images.length === 0) return;

        let index = 0;

        const firstClone = images[0].cloneNode(true);
        const lastClone = images[images.length - 1].cloneNode(true);

        slides.appendChild(firstClone);
        slides.insertBefore(lastClone, images[0]);

        const allSlides = slides.querySelectorAll("img");

        let currentIndex = 1;

        function update() {
            const width = allSlides[0].getBoundingClientRect().width;
            slides.style.transition = "transform 0.6s ease-in-out";
            slides.style.transform = `translateX(${-currentIndex * width}px)`;
        }

        setTimeout(update, 50);

        setInterval(() => {

            currentIndex++;
            update();

            slides.addEventListener("transitionend", () => {

                const width = allSlides[0].getBoundingClientRect().width;

                if (currentIndex >= allSlides.length - 1) {
                    slides.style.transition = "none";
                    currentIndex = 1;
                    slides.style.transform = `translateX(${-currentIndex * width}px)`;
                }

            }, { once: true });

        }, 4000);

        window.addEventListener("resize", update);
    });
});