document.addEventListener("DOMContentLoaded", () => {

    // ========================= POPUP PRIVACIDAD =========================

    let rechazos = 0;

    window.aceptarPrivacidad = function() {
        document.getElementById("overlay-privacidad").style.display = "none";
    };

    window.rechazarPrivacidad = function() {
        rechazos++;
        if (rechazos >= 2) {
            window.location.href = "https://www.google.com";
        } else {
            document.getElementById("mensaje-rechazo").style.display = "block";
        }
    };

    // ========================= ANIMACIÓN SECCIONES =========================

    const secciones = document.querySelectorAll(".pantalla2, .pantalla3, .pantalla4, .pantalla5, .pantalla6, .pantalla7");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1
    });

    secciones.forEach(sec => observer.observe(sec));


    // ========================= CARRUSEL FOTO DRA =========================

    let index = 0;
    const tren = document.querySelector(".tren");
    const slides = document.querySelectorAll(".tren img");

    if (tren && slides.length > 0) {

        function moverCarrusel() {
            const slideWidth = tren.parentElement.offsetWidth;
            slides.forEach(img => {
                img.style.width = slideWidth + "px";
                img.style.minWidth = slideWidth + "px";
            });
            tren.style.transform = `translateX(${-index * slideWidth}px)`;
        }

        tren.style.transition = "transform 0.6s ease-in-out";
        moverCarrusel();

        setInterval(() => {
            index++;
            moverCarrusel();

            if (index >= slides.length - 1) {
                setTimeout(() => {
                    tren.style.transition = "none";
                    index = 0;
                    moverCarrusel();
                    setTimeout(() => {
                        tren.style.transition = "transform 0.6s ease-in-out";
                    }, 50);
                }, 600);
            }
        }, 5000);

        window.addEventListener("resize", moverCarrusel);
    }


    // ========================= FAQ ACORDEÓN =========================

    document.querySelectorAll(".faq-item").forEach(item => {
        const btn = item.querySelector(".faq-question");
        const icon = item.querySelector(".icon");

        btn.addEventListener("click", () => {
            item.classList.toggle("active");
            icon.textContent = item.classList.contains("active") ? "-" : "+";
        });
    });


    // ========================= LEER MÁS =========================

    window.leerMas = function(btn) {
        const targeta = btn.closest(".targeta");
        const p = targeta.querySelector("p.recortar, p.expandido");

        if (!p) return;

        const estaExpandido = p.classList.contains("expandido");

        if (estaExpandido) {
            p.classList.remove("expandido");
            p.classList.add("recortar");
            targeta.style.height = "";
            targeta.style.overflow = "hidden";
            btn.textContent = "Leer más";
        } else {
            p.classList.remove("recortar");
            p.classList.add("expandido");
            targeta.style.height = "auto";
            targeta.style.overflow = "visible";
            btn.textContent = "Leer menos";
        }
    };


    // ========================= CARRUSEL RESEÑAS =========================

    (function() {
        const wrapper   = document.querySelector(".resenas-wrapper");
        const contenedor= document.querySelector(".resenas");
        if (!wrapper || !contenedor) return;

        const todasTargetas = Array.from(contenedor.querySelectorAll(".targeta"));
        const total = todasTargetas.length;

        function buildTrack() {
            const isMobile = window.innerWidth <= 480;
            const cols = isMobile ? 1 : 3;
            const gap = isMobile ? 0 : 20;
            const cardW = (wrapper.offsetWidth - gap * (cols - 1)) / cols;
            const pageW = cols * cardW + gap * (cols - 1);

            contenedor.innerHTML = "";
            contenedor.style.display = "flex";
            contenedor.style.transition = "none";
            contenedor.style.gap = gap + "px";
            contenedor.style.width = "auto";

            const pagesCount = Math.ceil(total / cols);
            const lastPageCards = todasTargetas.slice(-cols);
            const firstPageCards = todasTargetas.slice(0, cols);

            lastPageCards.forEach(c => {
                const cl = c.cloneNode(true);
                cl.style.minWidth = cardW + "px";
                cl.style.width = cardW + "px";
                contenedor.appendChild(cl);
            });

            todasTargetas.forEach(c => {
                c.style.minWidth = cardW + "px";
                c.style.width = cardW + "px";
                contenedor.appendChild(c);
            });

            firstPageCards.forEach(c => {
                const cl = c.cloneNode(true);
                cl.style.minWidth = cardW + "px";
                cl.style.width = cardW + "px";
                contenedor.appendChild(cl);
            });

            contenedor.querySelectorAll(".btn-leer-mas").forEach(btn => {
                btn.onclick = function() { window.leerMas(this); };
            });

            return { cols, cardW, pagesCount, gap, pageW };
        }

        let state = buildTrack();
        let currentPage = 0;
        let isTransitioning = false;

        function goTo(page, animate) {
            const { pageW, gap } = state;
            const offset = (page + 1) * (pageW + gap);
            if (animate) {
                contenedor.style.transition = "transform 0.45s ease-in-out";
            } else {
                contenedor.style.transition = "none";
            }
            contenedor.style.transform = `translateX(-${offset}px)`;
        }

        goTo(0, false);

        document.querySelectorAll(".btn-resenas").forEach(b => b.style.visibility = "visible");

        window.moverResenas = function(dir) {
            if (isTransitioning) return;
            isTransitioning = true;

            currentPage += dir;
            goTo(currentPage, true);

            contenedor.addEventListener("transitionend", function handler() {
                contenedor.removeEventListener("transitionend", handler);
                isTransitioning = false;

                if (currentPage < 0) {
                    currentPage = state.pagesCount - 1;
                    goTo(currentPage, false);
                } else if (currentPage >= state.pagesCount) {
                    currentPage = 0;
                    goTo(currentPage, false);
                }
            });
        };

        window.addEventListener("resize", () => {
            state = buildTrack();
            goTo(currentPage, false);
        });
    })();


    // ========================= EMAILJS =========================

    emailjs.init("BICeYe1b6XgMLDFEP");

    const formContacto = document.getElementById("form-contacto");

    if (formContacto) {
        formContacto.addEventListener("submit", function(e) {
            e.preventDefault();

            const btn = this.querySelector("button[type='submit']");
            btn.textContent = "Enviando...";
            btn.disabled = true;

            emailjs.send("service_sr5noup", "template_amtn30w", {
                name:     this.nombre.value,
                email:    this.correo.value,
                telefono: this.telefono.value,
                message:  this.mensaje.value
            })
            .then(() => {
                btn.textContent = "¡Mensaje enviado!";
                btn.style.background = "#25a244";
                this.reset();
                setTimeout(() => {
                    btn.textContent = "Enviar mensaje";
                    btn.style.background = "";
                    btn.disabled = false;
                }, 3000);
            })
            .catch(() => {
                btn.textContent = "Error, intenta de nuevo";
                btn.style.background = "#e74c3c";
                btn.disabled = false;
                setTimeout(() => {
                    btn.textContent = "Enviar mensaje";
                    btn.style.background = "";
                }, 3000);
            });
        });
    }

});