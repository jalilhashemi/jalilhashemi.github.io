(function() {

    document.getElementById('year').textContent = new Date().getFullYear();

    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav-links");
    const overlay = document.getElementById("overlay");
    const body = document.body;

    // Open menu
    burger.addEventListener("click", () => {
        nav.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("nav-open");
        body.style.overflow = "hidden";
    });

    // Close menu ONLY when clicking overlay
    overlay.addEventListener("click", () => {
        nav.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("nav-open");
        body.style.overflow = "";
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            overlay.classList.remove("active");
            body.classList.remove("nav-open");
            body.style.overflow = "";
        });
    });



    // block scrolling when menu open
    const navbar = document.querySelector(".navbar");
    const hero = document.getElementById("header-container");

    const heroHeight = hero.offsetHeight;

    window.addEventListener("scroll", () => {
        if (window.scrollY > heroHeight - 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    // Language switcher
    //const languageSwitcher = document.getElementById('language-switcher');
    //if (languageSwitcher) {
     //   languageSwitcher.addEventListener("click", function () {
     //       languageSwitcher.addEventListener('change', (e) => {
     //           alert('Switching language to: ' + e.target.value);
     //       });    });
    //}


    //document.querySelectorAll(".lang").forEach(lang => {
     //   lang.addEventListener("click", (e) => {
      //      e.preventDefault();

      //      document.querySelectorAll(".lang").forEach(l => l.classList.remove("active"));
       //     lang.classList.add("active");

       //     console.log("Language switched to:", lang.dataset.lang);
      //  });
    //});

    emailjs.init("dEJTQHjphxVX2xMsB");

    const contactForm = document.getElementById("contact-form");
    const hint = document.getElementById("form-hint");
    const emailError = document.getElementById("email-error");
    const captchaError = document.getElementById("captcha-error");
    const submitBtn = document.getElementById("submit-btn");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (submitBtn.disabled) return;

        let isValid = true;
        let firstEmpty = null;

        // Reset UI
        emailError.textContent = "";
        captchaError.textContent = "";
        hint.style.display = "none";

        this.querySelectorAll("[required]").forEach(input => {
            input.style.borderColor = "#ccc";

            // Required check
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = "red";
                if (!firstEmpty) firstEmpty = input;
                return;
            }

            // Email format check
            if (input.type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.style.borderColor = "red";
                    emailError.textContent = "Please enter a valid email address";
                    if (!firstEmpty) firstEmpty = input;
                }
            }
        });

        // Stop if form invalid
        if (!isValid) {
            hint.style.display = "block";
            firstEmpty?.focus();
            return;
        }

        // CAPTCHA validation
        if (typeof grecaptcha !== "undefined") {
            const captchaResponse = grecaptcha.getResponse();

            if (!captchaResponse) {
                captchaError.textContent = "Please verify that you are not a robot.";
                return;
            }
        }

        // Lock button
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";

        emailjs.sendForm("service_3q75bg9", "template_qviaa2a", this)
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();

                // ✅ Reset CAPTCHA AFTER success
                if (typeof grecaptcha !== "undefined") {
                    grecaptcha.reset();
                }
            })
            .catch(err => {
                alert("Failed to send message.");
                console.error(err);

                // Optional: reset CAPTCHA on failure too
                if (typeof grecaptcha !== "undefined") {
                    grecaptcha.reset();
                }
            })
            .finally(() => {
                // Always restore button
                submitBtn.disabled = false;
                submitBtn.textContent = "Send";
            });
    });

})();



