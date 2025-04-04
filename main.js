// Navegación
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Scroll event para la navegación
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Offset para la navegación fija
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Formulario de contacto - Conexión con ContactEmailAPI Magic Loop
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Se recogen los datos del formulario
    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('message').value;

    // Validación básica
    if (!nombre || !email || !mensaje) {
        alert('Por favor complete todos los campos requeridos.');
        return;
    }

    // Construir el payload de la API
    const payload = {
        nombre,
        email,
        mensaje
    };

    try {
        // Llamada a la Magic Loop para enviar el email
        const response = await fetch('https://magicloops.dev/api/loop/8e473394-d19c-4a1d-96d1-9e9aad009614/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        // Puedes mostrar la respuesta de la API o notificar al usuario
        if (result.status === 'success') {
            alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Te contactaremos pronto en ${email}.`);
            contactForm.reset();
        } else {
            alert('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo más tarde.');
        }
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
    }
});

// Animación de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.about-item, .project-card, .section-title').forEach(item => {
    observer.observe(item);
});