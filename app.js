// ============================================
// DSA QUEST - Main Application Logic
// ============================================

// Global State
let currentDeck = [];
let currentIndex = 0;
let sessionScore = 0;
let sessionMastered = 0;
let sessionNeedReview = 0;
let isCardFlipped = false;
let touchStartX = 0;
let touchEndX = 0;

// DOM Elements
const screens = {
    start: document.getElementById('startScreen'),
    pattern: document.getElementById('patternScreen'),
    game: document.getElementById('gameScreen'),
    completion: document.getElementById('completionScreen')
};

const card = document.getElementById('flashcard');
const toast = document.getElementById('toast');

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================
function loadProgress() {
    const saved = localStorage.getItem('dsaQuestProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    // Initialize progress for all problems
    const progress = {};
    dsaProblems.forEach(problem => {
        progress[problem.id] = {
            mastered: false,
            reviewCount: 0,
            lastReviewed: null
        };
    });
    saveProgress(progress);
    return progress;
}

function saveProgress(progress) {
    localStorage.setItem('dsaQuestProgress', JSON.stringify(progress));
}

function getProgress() {
    return loadProgress();
}

function updateProblemProgress(problemId, mastered) {
    const progress = getProgress();
    progress[problemId] = {
        mastered: mastered,
        reviewCount: (progress[problemId]?.reviewCount || 0) + 1,
        lastReviewed: new Date().toISOString()
    };
    saveProgress(progress);
}

function resetProgress() {
    if (confirm('🔄 Are you sure you want to reset all progress? This cannot be undone!')) {
        localStorage.removeItem('dsaQuestProgress');
        loadProgress();
        updateStartScreenStats();
        showToast('Progress reset! 🔄', 'info');
    }
}

// ============================================
// SCREEN NAVIGATION
// ============================================
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function showStartScreen() {
    updateStartScreenStats();
    showScreen('start');
}

function showPatternSelect() {
    renderPatternGrid();
    showScreen('pattern');
}

function showGameScreen() {
    showScreen('game');
}

function showCompletionScreen() {
    document.getElementById('finalMastered').textContent = sessionMastered;
    document.getElementById('finalReview').textContent = sessionNeedReview;
    document.getElementById('finalScore').textContent = sessionScore;
    showScreen('completion');
}

// ============================================
// START SCREEN
// ============================================
function updateStartScreenStats() {
    const progress = getProgress();
    const mastered = Object.values(progress).filter(p => p.mastered).length;
    
    document.getElementById('totalProblems').textContent = dsaProblems.length;
    document.getElementById('totalPatterns').textContent = dsaPatterns.length;
    document.getElementById('masteredCount').textContent = mastered;
}

// ============================================
// PATTERN SELECTION
// ============================================
function renderPatternGrid() {
    const grid = document.getElementById('patternGrid');
    const progress = getProgress();
    
    grid.innerHTML = dsaPatterns.map((pattern, index) => {
        const patternProblems = dsaProblems.filter(p => p.patternId === pattern.id);
        const masteredCount = patternProblems.filter(p => progress[p.id]?.mastered).length;
        const progressPercent = (masteredCount / patternProblems.length) * 100;
        
        return `
            <div class="pattern-card" onclick="startGame('pattern', ${pattern.id})">
                <div class="pattern-number">${index + 1}</div>
                <div class="pattern-name">${pattern.name}</div>
                <div class="pattern-count">${patternProblems.length} problems • ${masteredCount} mastered</div>
                <div class="pattern-progress">
                    <div class="pattern-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// GAME LOGIC
// ============================================
function startGame(mode, patternId = null) {
    const progress = getProgress();
    
    // Build deck based on mode
    switch(mode) {
        case 'all':
            currentDeck = [...dsaProblems];
            break;
        case 'review':
            currentDeck = dsaProblems.filter(p => !progress[p.id]?.mastered);
            if (currentDeck.length === 0) {
                showToast('🎉 All problems mastered! Try "All Problems" mode.', 'success');
                return;
            }
            break;
        case 'pattern':
            currentDeck = dsaProblems.filter(p => p.patternId === patternId);
            break;
    }
    
    // Shuffle deck
    currentDeck = shuffleArray(currentDeck);
    
    // Reset session stats
    currentIndex = 0;
    sessionScore = 0;
    sessionMastered = 0;
    sessionNeedReview = 0;
    isCardFlipped = false;
    
    // Update UI
    document.getElementById('totalCards').textContent = currentDeck.length;
    updateGameUI();
    showGameScreen();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function updateGameUI() {
    if (currentIndex >= currentDeck.length) {
        showCompletionScreen();
        return;
    }
    
    const problem = currentDeck[currentIndex];
    const pattern = dsaPatterns.find(p => p.id === problem.patternId);
    
    // Update card content
    document.getElementById('problemTitle').textContent = problem.title;
    document.getElementById('problemHint').textContent = problem.hint;
    document.getElementById('approach').textContent = problem.approach;
    document.getElementById('complexity').textContent = problem.complexity;
    document.getElementById('keyInsight').textContent = problem.keyInsight;
    document.getElementById('pseudocode').textContent = problem.pseudocode;
    document.getElementById('leetcodeLink').href = problem.link;
    
    // Update difficulty badge
    const diffBadge = document.getElementById('difficultyBadge');
    diffBadge.textContent = problem.difficulty;
    diffBadge.className = 'difficulty-badge ' + problem.difficulty.toLowerCase();
    
    // Update pattern badge
    document.getElementById('patternBadge').textContent = pattern.name;
    
    // Update progress
    document.getElementById('currentIndex').textContent = currentIndex + 1;
    document.getElementById('sessionScore').textContent = sessionScore;
    
    // Update progress bar
    const progressPercent = ((currentIndex) / currentDeck.length) * 100;
    document.getElementById('progressBar').style.width = progressPercent + '%';
    
    // Reset card state
    card.classList.remove('flipped', 'swipe-left', 'swipe-right');
    isCardFlipped = false;
}

function flipCard() {
    card.classList.toggle('flipped');
    isCardFlipped = !isCardFlipped;
}

function swipeLeft() {
    if (currentIndex >= currentDeck.length) return;
    
    const problem = currentDeck[currentIndex];
    updateProblemProgress(problem.id, false);
    sessionNeedReview++;
    
    // Animate and move to next
    card.classList.add('swipe-left');
    showToast('📚 Added to review list', 'info');
    
    setTimeout(() => {
        currentIndex++;
        updateGameUI();
    }, 400);
}

function swipeRight() {
    if (currentIndex >= currentDeck.length) return;
    
    const problem = currentDeck[currentIndex];
    updateProblemProgress(problem.id, true);
    sessionMastered++;
    sessionScore += 10;
    
    // Animate and move to next
    card.classList.add('swipe-right');
    showToast('🎉 Great job! +10 points', 'success');
    
    setTimeout(() => {
        currentIndex++;
        updateGameUI();
    }, 400);
}

// ============================================
// TOUCH/SWIPE HANDLING
// ============================================
function initTouchHandlers() {
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: true });
    card.addEventListener('touchend', handleTouchEnd, { passive: true });
    card.addEventListener('click', handleCardClick);
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    // Add visual feedback during swipe
    if (Math.abs(diff) > 20) {
        card.style.transform = `translateX(${diff * 0.3}px) rotate(${diff * 0.02}deg)`;
        card.style.transition = 'none';
    }
}

function handleTouchEnd(e) {
    const diff = touchEndX - touchStartX;
    card.style.transform = '';
    card.style.transition = '';
    
    if (Math.abs(diff) > 80) {
        if (diff > 0) {
            swipeRight();
        } else {
            swipeLeft();
        }
    } else if (Math.abs(diff) < 10) {
        // It's a tap, not a swipe
        // Don't flip here - let click handler do it
    }
    
    touchStartX = 0;
    touchEndX = 0;
}

function handleCardClick(e) {
    // Only flip if not swiping
    if (Math.abs(touchEndX - touchStartX) < 10) {
        flipCard();
    }
}

// ============================================
// KEYBOARD HANDLING
// ============================================
function initKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
        if (!screens.game.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                swipeLeft();
                break;
            case 'ArrowRight':
                e.preventDefault();
                swipeRight();
                break;
            case ' ':
                e.preventDefault();
                flipCard();
                break;
        }
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const icons = {
        success: '✨',
        info: '💡',
        warning: '⚠️'
    };
    
    toast.querySelector('.toast-icon').textContent = icons[type] || '💡';
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    loadProgress();
    updateStartScreenStats();
    initTouchHandlers();
    initKeyboardHandlers();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
