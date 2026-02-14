import { db, ref, push, set, logEvent, analytics } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const landingSection = document.getElementById('landing-section');
    const letterSection = document.getElementById('letter-section');
    const finalSection = document.getElementById('final-section');
    const envelope = document.getElementById('envelope');
    const btnOpen = document.getElementById('btn-open');
    const btnNotOpen = document.getElementById('btn-not-open');
    const btnAgree = document.getElementById('btn-agree');
    const btnThink = document.getElementById('btn-think');
    const modalNotOpen = document.getElementById('modal-not-open');
    const heartBackground = document.getElementById('heart-background');

    // --- Floating Heart Background ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heartBackground.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHeart, 300);

    // --- Interaction Logic ---

    // Open Letter
    function openLetter() {
        // Firebase Log
        logEvent(analytics, 'letter_opened');
        push(ref(db, 'events'), {
            event: 'open_letter',
            timestamp: new Date().toISOString()
        });

        envelope.classList.add('open');
        setTimeout(() => {
            landingSection.classList.remove('active');
            setTimeout(() => {
                landingSection.classList.add('hidden');
                letterSection.classList.remove('hidden');
                setTimeout(() => {
                    letterSection.classList.add('active');
                    showLetterContent();
                }, 50);
            }, 500);
        }, 1000);
    }

    function showLetterContent() {
        const paragraphs = document.querySelectorAll('.letter-content p');
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('show');
            }, index * 800);
        });
    }

    btnOpen.addEventListener('click', openLetter);

    // Evasion Logic for Not Open (Landing Page)
    btnNotOpen.addEventListener('mouseover', moveButtonNotOpen);
    btnNotOpen.addEventListener('click', moveButtonNotOpen);

    function moveButtonNotOpen() {
        // Change text playfully after a few attempts
        if (!btnNotOpen.dataset.attempts) btnNotOpen.dataset.attempts = 0;
        btnNotOpen.dataset.attempts++;

        if (btnNotOpen.dataset.attempts >= 3) {
            btnNotOpen.textContent = "ไม่เปิดจะโกรธละน้า 😤";
        }
        if (btnNotOpen.dataset.attempts >= 5) {
            btnNotOpen.textContent = "ยอมเปิดเถอะะะ 🥺";
        }

        const x = Math.random() * (window.innerWidth - btnNotOpen.offsetWidth);
        const y = Math.random() * (window.innerHeight - btnNotOpen.offsetHeight);

        btnNotOpen.style.position = 'fixed';
        btnNotOpen.style.left = `${x}px`;
        btnNotOpen.style.top = `${y}px`;
        btnNotOpen.style.zIndex = '999';
    }

    // Final Agreement
    function handleFinalAgreement() {
        // Firebase Log
        logEvent(analytics, 'agreed');
        push(ref(db, 'responses'), {
            event: 'agreed',
            timestamp: new Date().toISOString(),
            message: 'รักลิงลิงนะ 🐵❤️'
        });

        letterSection.classList.remove('active');
        setTimeout(() => {
            letterSection.classList.add('hidden');
            finalSection.classList.remove('hidden');
            setTimeout(() => {
                finalSection.classList.add('active');
                burstHearts();
            }, 50);
        }, 500);
    }

    btnAgree.addEventListener('click', handleFinalAgreement);

    function burstHearts() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = '24px';
                heart.style.pointerEvents = 'none';
                heart.style.transition = 'all 1s ease-out';
                document.body.appendChild(heart);

                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 200 + 50;
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist;

                setTimeout(() => {
                    heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                    heart.style.opacity = '0';
                    setTimeout(() => heart.remove(), 1000);
                }, 10);
            }, i * 50);
        }
    }
});
