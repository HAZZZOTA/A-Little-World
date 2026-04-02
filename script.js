/* ============================================================
   STATE & CONFIGURATION
   ============================================================ */

// ✏️ EDIT INI: Ganti nama lagu, artis, dan file audio kamu
const playlistData = [
    { title: 'Song Name 1', artist: 'Artist 1', src: 'assets/audio/song-1.mp3' },
    { title: 'Song Name 2', artist: 'Artist 2', src: 'assets/audio/song-2.mp3' },
    { title: 'Song Name 3', artist: 'Artist 3', src: 'assets/audio/song-3.mp3' },
];

// ✏️ EDIT INI: Ganti teks dan foto untuk closet items
const closetData = [
    {
        text: 'Your style is just always MWAH MWAH 10/10…. I am always stunned by it 💅',
        photo: 'assets/images/closet-1.jpg'
    },
    {
        text: 'Every outfit you wear makes my heart skip a beat. How are you always so perfect?? 🌸',
        photo: 'assets/images/closet-2.jpg'
    },
    {
        text: 'Your fashion sense is literally unmatched. Nobody does it like you do ✨',
        photo: 'assets/images/closet-3.jpg'
    },
    {
        text: 'I could stare at your outfit pics all day and not get bored. You\'re that gorgeous 💛',
        photo: 'assets/images/closet-4.jpg'
    }
];

// ✏️ EDIT INI: Halaman-halaman memory book (text + foto opsional)
const memoryPages = [
    {
        text: 'I\'m glad I met you. All the way back to the tenth grade. When we tried to break that ice, when it was time for p5 project. That time when we go back on bus… Belgis kaya anak ilang. 😂',
        photo: 'assets/images/memory-1.jpg'
    },
    {
        text: 'Fast forward to 11th grade. We started falling for each other. We talked a lot on IG, Discord, sometimes just the two of us, we played, we hang out.',
        photo: 'assets/images/memory-2.jpg'
    },
    {
        text: 'We really made a lot of memories together… here are some of the pictures and moments I gathered 💛',
        photo: 'assets/images/memory-3.jpg'
    },
    {
        text: 'Some good memories… some part is the part where I was stupid…. But every single moment with you is a moment I treasure.',
        photo: 'assets/images/memory-4.jpg'
    },
    {
        text: 'Enjoy my love 🌼\n\n— these are our beautiful memories, and there will be so many more to come.',
        photo: 'assets/images/memory-5.jpg'
    }
];

// Seal messages
const insideJokes = ['SUGOY!', 'SUGENG!', 'SUMPAHH!!'];
const loveReasons = [
    'I love you because of your beautiful hair 🌸',
    'I love you because of how pretty you are ✨',
    'I love you because you\'re so stunning, beautiful, and gorgeous 💛',
    'I love you because of your always amazing outfit 👗',
    'I love you because you are my best friend and also my girlfriend of course 💕',
    'I love you because of your unwavering kindness and compassion 🤍',
    'I love you because you are always trying your best to improve 🌱',
    'I love you because you are passionate about the things you care about 🔥',
    'I love you because you are incredibly patient with me 😊',
    'I love you because of your unique… weird… sense of humor that always lights up my day 😂',
    'I love you because you always support and encourage my growth 🌿',
    'I love you because you love me unconditionally and truly understand me 💛',
    'I love you because you always make me feel safe and protected 🛡️',
    'I love you because you never forget to tell me you love you 💬',
    'I love you because we share both laughter and challenges 🤝',
    'I love you because we can talk for hours about everything and also sometimes nothing… 🗣️',
    'I love you because you make me smile, even when I thought I can\'t 😊',
    'I love you because of the beautiful memories we\'ve created together 📸',
    'I love the way you hold my hand 🤝',
    'I love your voice; it is my favorite sound 🎵',
    'I love how you get worried when I get sick 🤒'
];

const birthdayMessage = `Happy birthday Belgis sayangku cintaku my beloved weirdo, selamat bertambah umur yaaa. Semoga niiih dengan bertambahnya umurr niihh, berkatnya juga bertambah aseeehhh.

Pokoknya i wish all the best for you Belgis. Semoga Belgis bisa semangat terus menjalani semuamuanya yah belgiss, termasuk kuliah hiiihh udah mau kuliah aja euy gaya, semoga belgis di kuliah bisa semangat terus, bisa giat, bisa diberi kekuatan, bisa huh hah pokoknya semangat terus ya sayang.

Just know that i really really love you sososososoosooo much and soo many people doo too sayang. Maaf ya i couldnt make it to your birthday, ada acara gereja nii hari ini, maaf ya sayaang.

Just know i really really love you so so so so much belgis. And i wish all the best for you sayang.`;

// Track progress
const visited = { seal: false, music: false, closet: false, memory: false };
let currentSong = 0;
let howl = null;
let isPlaying = false;
let currentPage = 0;
let sealBubbleTimeout = null;

/* ============================================================
   LOADING SCREEN
   ============================================================ */
window.addEventListener('load', () => {
    setTimeout(() => {
        gsap.to('#loading-screen', {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('garden-map').classList.add('active');
                initGarden();
            }
        });
    }, 1800);
});

/* ============================================================
   GARDEN MAP INITIALIZATION
   ============================================================ */
function initGarden() {
    // Float animation for map items
    document.querySelectorAll('.map-item:not(.locked)').forEach((item, i) => {
        gsap.to(item, {
            y: -8,
            duration: 2 + Math.random(),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.3
        });
    });

    // Click handlers for map items
    document.querySelectorAll('.map-item').forEach(item => {
        item.addEventListener('click', () => {
            const room = item.dataset.room;
            if (room === 'birthday') {
                if (!item.classList.contains('unlocked')) {
                    showToast('Jelajahi semua area dulu untuk membuka hadiah ini! ✨');
                    return;
                }
            }
            openRoom(room);
        });
    });

    // Entrance animations
    gsap.from('.garden-title', { y: -30, opacity: 0, duration: 0.8, ease: 'back.out' });
    gsap.from('.map-item', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out', delay: 0.3 });
    gsap.from('.deco-flower', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out', delay: 0.6 });
    gsap.from('.progress-bar', { y: 20, opacity: 0, duration: 0.6, delay: 0.8 });
}

/* ============================================================
   ROOM NAVIGATION
   ============================================================ */
function openRoom(roomId) {
    const roomMap = {
        seal: 'seal-pond',
        music: 'music-room',
        closet: 'thrift-closet',
        memory: 'memory-book',
        birthday: 'birthday-ending'
    };

    const roomEl = document.getElementById(roomMap[roomId]);
    if (!roomEl) return;

    // Mark visited
    if (visited.hasOwnProperty(roomId)) {
        visited[roomId] = true;
        const dot = document.querySelector(`.pdot[data-area="${roomId}"]`);
        if (dot) dot.classList.add('visited');
        checkUnlock();
    }

    // Transition
    gsap.to('#garden-map', { opacity: 0, duration: 0.4, onComplete: () => {
        document.getElementById('garden-map').classList.remove('active');
        roomEl.classList.add('active');
        gsap.fromTo(roomEl, { opacity: 0 }, { opacity: 1, duration: 0.5 });

        // Room-specific init
        if (roomId === 'seal') initSealPond();
        if (roomId === 'music') initMusicRoom();
        if (roomId === 'closet') initCloset();
        if (roomId === 'memory') initMemoryBook();
        if (roomId === 'birthday') initBirthday();
    }});
}

function closeRoom(roomId) {
    const roomMap = {
        seal: 'seal-pond',
        music: 'music-room',
        closet: 'thrift-closet',
        memory: 'memory-book',
        birthday: 'birthday-ending'
    };

    const roomEl = document.getElementById(roomMap[roomId]);

    // Stop music if leaving music room
    if (roomId === 'music' && howl) {
        howl.pause();
        isPlaying = false;
        updatePlayButton();
    }

    // Clear seal bubble
    if (roomId === 'seal') {
        clearTimeout(sealBubbleTimeout);
        document.getElementById('seal-bubble').classList.add('hidden');
    }

    gsap.to(roomEl, { opacity: 0, duration: 0.4, onComplete: () => {
        roomEl.classList.remove('active');
        roomEl.scrollTop = 0;
        document.getElementById('garden-map').classList.add('active');
        gsap.to('#garden-map', { opacity: 1, duration: 0.5 });
    }});
}

/* ============================================================
   PROGRESS & UNLOCK
   ============================================================ */
function checkUnlock() {
    const allVisited = Object.values(visited).every(v => v);
    if (allVisited) {
        const gift = document.getElementById('map-birthday');
        gift.classList.add('unlocked');
        document.getElementById('gift-label').textContent = 'For You 💛';

        // Float animation for gift
        gsap.to(gift, {
            y: -10,
            duration: 1.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });

        showToast('✨ Sesuatu yang spesial telah terbuka!', 'special');
    }
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = '') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ` ${type}` : '');
    toast.textContent = message;
    container.appendChild(toast);

    gsap.from(toast, { x: 50, opacity: 0, duration: 0.4, ease: 'back.out' });
    setTimeout(() => {
        gsap.to(toast, {
            x: 50, opacity: 0, duration: 0.3,
            onComplete: () => toast.remove()
        });
    }, 3500);
}

/* ============================================================
   SEAL POND
   ============================================================ */
function initSealPond() {
    const seals = document.querySelectorAll('.seal');
    seals.forEach(seal => {
        seal.onclick = () => handleSealClick(seal);
    });
}

function handleSealClick(sealEl) {
    // Bounce animation
    sealEl.classList.remove('bouncing');
    void sealEl.offsetWidth; // force reflow
    sealEl.classList.add('bouncing');

    // Pick random message
    let msg;
    const rand = Math.random();
    if (rand < 0.15) {
        msg = insideJokes[Math.floor(Math.random() * insideJokes.length)];
    } else {
        msg = loveReasons[Math.floor(Math.random() * loveReasons.length)];
    }

    // Show bubble
    clearTimeout(sealBubbleTimeout);
    const bubble = document.getElementById('seal-bubble');
    const bubbleText = document.getElementById('seal-bubble-text');
    bubbleText.textContent = msg;
    bubble.classList.remove('hidden');

    gsap.fromTo(bubble, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out' });

    sealBubbleTimeout = setTimeout(() => {
        gsap.to(bubble, {
            y: 20, opacity: 0, duration: 0.3,
            onComplete: () => bubble.classList.add('hidden')
        });
    }, 4000);

    // 30% chance seal bounces away
    if (Math.random() < 0.3) {
        setTimeout(() => {
            const scene = document.querySelector('.pond-scene');
            const maxX = scene.offsetWidth - 100;
            const maxY = scene.offsetHeight - 80;
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;

            gsap.to(sealEl, {
                left: newX + 'px',
                top: newY + 'px',
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        }, 600);
    }
}

/* ============================================================
   MUSIC ROOM
   ============================================================ */
function initMusicRoom() {
    renderPlaylist();
    updateSongDisplay();
    updatePlayButton();
}

function renderPlaylist() {
    const container = document.getElementById('playlist');
    container.innerHTML = '';
    playlistData.forEach((song, i) => {
        const item = document.createElement('div');
        item.className = 'playlist-item' + (i === currentSong ? ' active' : '');
        item.innerHTML = `
            <div class="playlist-num">${i + 1}</div>
            <div class="playlist-info">
                <div class="pl-title">${song.title}</div>
                <div class="pl-artist">${song.artist}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            currentSong = i;
            loadAndPlay();
            renderPlaylist();
        });
        container.appendChild(item);
    });
}

function loadAndPlay() {
    if (howl) howl.unload();

    const song = playlistData[currentSong];
    howl = new Howl({
        src: [song.src],
        html5: true,
        onplay: () => {
            isPlaying = true;
            updatePlayButton();
            document.getElementById('vinyl-disc').classList.add('spinning');
            document.getElementById('tonearm').classList.add('playing');
            requestAnimationFrame(updateProgress);
        },
        onpause: () => {
            isPlaying = false;
            updatePlayButton();
            document.getElementById('vinyl-disc').classList.remove('spinning');
            document.getElementById('tonearm').classList.remove('playing');
        },
        onstop: () => {
            isPlaying = false;
            updatePlayButton();
            document.getElementById('vinyl-disc').classList.remove('spinning');
            document.getElementById('tonearm').classList.remove('playing');
        },
        onend: () => {
            nextSong();
        },
        onloaderror: () => {
            showToast('⚠️ File lagu tidak ditemukan. Pastikan file MP3 ada di folder assets/audio/');
        }
    });

    howl.play();
    updateSongDisplay();
}

function togglePlay() {
    if (!howl) {
        loadAndPlay();
        return;
    }
    if (isPlaying) {
        howl.pause();
    } else {
        howl.play();
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % playlistData.length;
    loadAndPlay();
    renderPlaylist();
}

function prevSong() {
    currentSong = (currentSong - 1 + playlistData.length) % playlistData.length;
    loadAndPlay();
    renderPlaylist();
}

function updatePlayButton() {
    const btn = document.getElementById('btn-play');
    btn.textContent = isPlaying ? '⏸' : '▶';
}

function updateSongDisplay() {
    const song = playlistData[currentSong];
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
}

function updateProgress() {
    if (!howl || !isPlaying) return;

    const seek = howl.seek();
    const duration = howl.duration();
    const pct = (seek / duration) * 100;

    document.getElementById('song-progress').style.width = pct + '%';
    document.getElementById('time-current').textContent = formatTime(seek);
    document.getElementById('time-total').textContent = formatTime(duration);

    requestAnimationFrame(updateProgress);
}

function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

/* ============================================================
   THRIFT CLOSET
   ============================================================ */
function initCloset() {
    document.querySelectorAll('.clothing-item').forEach(item => {
        item.onclick = () => {
            const index = parseInt(item.dataset.index);
            openClosetModal(index);
        };
    });

    // Entrance animation
    gsap.from('.clothing-item', {
        y: 40, opacity: 0,
        duration: 0.5, stagger: 0.1,
        ease: 'back.out'
    });
}

function openClosetModal(index) {
    const data = closetData[index];
    const modal = document.getElementById('closet-modal');
    const img = document.getElementById('closet-img');
    const placeholder = document.getElementById('closet-placeholder');
    const text = document.getElementById('closet-modal-text');

    img.src = data.photo;
    text.textContent = data.text;

    // Handle image load/error
    img.onload = () => {
        img.style.display = 'block';
        placeholder.style.display = 'none';
    };
    img.onerror = () => {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
    };

    modal.classList.remove('hidden');
}

function closeClosetModal() {
    document.getElementById('closet-modal').classList.add('hidden');
}

// Close modal on backdrop click
document.getElementById('closet-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeClosetModal();
});

/* ============================================================
   MEMORY BOOK
   ============================================================ */
function initMemoryBook() {
    currentPage = 0;
    renderBookPages();
    updatePageNav();
}

function renderBookPages() {
    const container = document.getElementById('book-pages');
    container.innerHTML = '';

    memoryPages.forEach((page, i) => {
        const div = document.createElement('div');
        div.className = 'page-content' + (i === currentPage ? ' active' : '');

        let photoHTML = '';
        if (page.photo) {
            photoHTML = `
                <div class="page-photo">
                    <img src="${page.photo}" alt="Memory ${i + 1}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="photo-placeholder">
                        <span>📷 Letakkan foto kenangan di sini</span>
                        <small>${page.photo}</small>
                    </div>
                </div>
            `;
        }

        div.innerHTML = `
            <div class="page-text">${page.text.replace(/\n/g, '<br>')}</div>
            ${photoHTML}
        `;

        container.appendChild(div);
    });
}

function changePage(dir) {
    const newPage = currentPage + dir;
    if (newPage < 0 || newPage >= memoryPages.length) return;

    const pages = document.querySelectorAll('.page-content');
    gsap.to(pages[currentPage], {
        x: dir * -50, opacity: 0, duration: 0.3,
        onComplete: () => {
            pages[currentPage].classList.remove('active');
            currentPage = newPage;
            pages[currentPage].classList.add('active');
            gsap.fromTo(pages[currentPage],
                { x: dir * 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3 }
            );
            updatePageNav();
        }
    });
}

function updatePageNav() {
    document.getElementById('page-indicator').textContent = `${currentPage + 1} / ${memoryPages.length}`;
    document.getElementById('page-prev').disabled = currentPage === 0;
    document.getElementById('page-next').disabled = currentPage === memoryPages.length - 1;
}

/* ============================================================
   BIRTHDAY ENDING
   ============================================================ */
function initBirthday() {
    createConfetti();

    // Typewriter effect for message
    const msgEl = document.getElementById('birthday-message');
    msgEl.innerHTML = '';
    msgEl.style.opacity = '1';

    // Animate title
    gsap.to('#birthday-title', { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.5 });
    gsap.to('.birthday-divider', { opacity: 1, duration: 0.8, delay: 1.2 });

    // Typewriter
    const fullText = birthdayMessage;
    let charIndex = 0;
    setTimeout(() => {
        const typeInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                if (fullText[charIndex] === '\n') {
                    msgEl.innerHTML += '<br>';
                } else {
                    msgEl.innerHTML += fullText[charIndex];
                }
                charIndex++;
                // Auto-scroll
                document.getElementById('birthday-ending').scrollTop = document.getElementById('birthday-ending').scrollHeight;
            } else {
                clearInterval(typeInterval);
                gsap.to('.birthday-footer', { opacity: 1, duration: 0.8 });
            }
        }, 35);
    }, 1800);

    // Launch confetti pieces with GSAP
    setTimeout(() => {
        document.querySelectorAll('.confetti-piece').forEach((piece, i) => {
            gsap.to(piece, {
                y: '110vh',
                x: `+=${(Math.random() - 0.5) * 200}`,
                rotation: Math.random() * 720 - 360,
                opacity: 1,
                duration: 3 + Math.random() * 3,
                delay: Math.random() * 2,
                ease: 'power1.in'
            });
        });
    }, 500);
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#FFEAA7', '#FFB7B2', '#A8D5BA', '#89CFF0', '#DDA0DD', '#FF9AA2', '#F9E784'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const size = Math.random() * 8 + 4;
        piece.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size * (Math.random() * 0.5 + 0.5)}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            opacity: 0;
        `;
        container.appendChild(piece);
    }
}
