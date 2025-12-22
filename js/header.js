// Prevent browser scroll restoration on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // Typing animation
    // -----------------------------
    const typingElement = document.getElementById("typing-text");
    const typingText = typingElement?.getAttribute("data-text") || "";
    let index = 0;
    let typingTimeout;

    function startTyping() {
        if (!typingElement || !typingText) return;

        clearTimeout(typingTimeout);
        typingElement.textContent = "\u00A0";
        index = 0;

        function type() {
            if (index === 0) typingElement.textContent = "";
            if (index < typingText.length) {
                typingElement.textContent += typingText.charAt(index);
                index++;
                typingTimeout = setTimeout(type, 80);
            }
        }

        typingTimeout = setTimeout(type, 500);
    }

    startTyping();

    // -----------------------------
    // Smooth scroll & active nav
    // -----------------------------
    const navbarHeight = 60;
    const navLinks = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("#header-container, #about, #experience, #certifications, #education, #contact");

    function setActiveLink(link) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    }

    // Click handler
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });

            setActiveLink(link);

            if (targetId === "header-container") startTyping();
        });
    });

    // Update active nav
    function updateActiveNav() {
        let current = sections[0].id;
        const threshold = 0.8;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const visiblePart = window.innerHeight - rect.top;

            if (visiblePart >= sectionHeight * threshold) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    // -----------------------------
    // Page load adjustments
    // -----------------------------
    window.onload = () => {
        window.scrollTo(0, 0);
        updateActiveNav();
    };
});
