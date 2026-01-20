document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATE PICKER LOGIC ---
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        dateInput.addEventListener('change', (e) => {
            const dateVal = e.target.value;
            const summaryDate = document.getElementById('summary-date');
            if (summaryDate) summaryDate.innerText = dateVal;
        });
    }

    // --- 2. FAQ ACCORDION LOGIC ---
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.closest(".faq-item");
            // Optional: Close others
            // document.querySelectorAll(".faq-item").forEach(other => {
            //     if (other !== item) other.classList.remove("active");
            // });
            item.classList.toggle("active");
        });
    });

    // --- 3. SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // CSS should handle .reveal.active
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 3. NAVBAR SCROLL ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 4. BOOKING INIT ---
    if (window.location.pathname.includes('booking.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        let selectedRoom = urlParams.get('room') || 'room1';
        selectRoom(selectedRoom);
    }
});

// Global functions
window.selectRoom = function (roomId) {
    // 1. Visual Update via Class
    document.querySelectorAll('.room-select-card').forEach(el => {
        el.classList.remove('selected');
    });

    const card = document.querySelector(`.room-select-card[data-room="${roomId}"]`);
    if (card) {
        card.classList.add('selected');

        // 2. Text Update
        const names = {
            'room1': 'LABYRINTHE DE NÉON',
            'room2': 'RITUEL D\'OBSIDIENNE',
            'room3': 'ÉNIGME DU PHARAON',
            'room4': 'PROJET HELIOS'
        };
        const summaryComp = document.getElementById('summary-room');
        if (summaryComp) summaryComp.innerText = names[roomId];
    }

    updatePrice();
};

window.selectTime = function (el, timeStr) {
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');

    const summaryTime = document.getElementById('summary-time');
    if (summaryTime) summaryTime.innerText = timeStr;
};

window.updatePrice = function () {
    const pCountStr = document.getElementById('players-count').value;
    const pCount = parseInt(pCountStr);
    const total = pCount * 30; // 30€ flat price

    const sPlayers = document.getElementById('summary-players');
    const sTotal = document.getElementById('summary-total');

    if (sPlayers) sPlayers.innerText = pCount;
    if (sTotal) sTotal.innerText = total + "€";
};
