document.addEventListener("DOMContentLoaded", () => {

    const carruseles = document.querySelectorAll(".carousel");

    carruseles.forEach(carousel => {
        const track = carousel.querySelector(".track");
        const slides = carousel.querySelectorAll(".track img");

        if (!track || slides.length === 0) return;

        let index = 0;

        function moverCarrusel() {
            const slideWidth = carousel.offsetWidth;

            slides.forEach(img => {
                img.style.width = slideWidth + "px";
                img.style.minWidth = slideWidth + "px";
            });

            track.style.transform = `translateX(${-index * slideWidth}px)`;
        }

        track.style.transition = "transform 0.6s ease-in-out";
        moverCarrusel();

        setInterval(() => {
            index++;
            moverCarrusel();

            if (index >= slides.length - 1) {
                setTimeout(() => {
                    track.style.transition = "none";
                    index = 0;
                    moverCarrusel();

                    setTimeout(() => {
                        track.style.transition = "transform 0.6s ease-in-out";
                    }, 50);
                }, 600);
            }
        }, 5000);

        window.addEventListener("resize", moverCarrusel);
    });

});