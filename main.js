document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("typing-text");
    const text = element.getAttribute("data-text");
    let index = 0;

    element.textContent = "\u00A0";

    setTimeout(() => {
        element.textContent = "";
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 80);
            }
        }

        type();
    }, 500);
});

const hamburger = document.getElementById('burger');
const navMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle("active");

});

// Optional: close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Language switcher example
const languageSwitcher = document.getElementById('language-switcher');
languageSwitcher.addEventListener('change', (e) => {
    alert('Switching language to: ' + e.target.value);
});

document.querySelectorAll(".lang").forEach(lang => {
    lang.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelectorAll(".lang").forEach(l => l.classList.remove("active"));
        lang.classList.add("active");

        console.log("Language switched to:", lang.dataset.lang);
    });
});
