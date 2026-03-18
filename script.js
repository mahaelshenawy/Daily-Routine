// ==================== SLIDE NAVIGATION ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize indicators
function initializeIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
    document.getElementById('totalSlides').textContent = totalSlides;
}

// Show slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[n].classList.add('active');
    indicators[n].classList.add('active');
    document.getElementById('currentSlide').textContent = n + 1;
}

// Go to specific slide
function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Event listeners for slide buttons
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// ==================== SECTION NAVIGATION ====================
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionId = btn.dataset.section;

        // Update active button
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active section
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
    });
});

// ==================== ACTIVITY 1: MATCHING ====================
let draggedItem = null;

function setupDragAndDrop() {
    const matchItems = document.querySelectorAll('.match-item');
    const matchTargets = document.querySelectorAll('.match-target');

    matchItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    matchTargets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            target.style.background = '#e0e7ff';
        });

        target.addEventListener('dragleave', () => {
            target.style.background = 'white';
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem) {
                target.textContent = draggedItem.textContent;
                target.dataset.selected = draggedItem.dataset.id;
                target.style.background = 'white';
                draggedItem.style.opacity = '0.5';
            }
        });
    });
}

function checkMatching() {
    const matchTargets = document.querySelectorAll('.match-target');
    let correct = 0;
    let feedback = '';

    matchTargets.forEach((target, index) => {
        const correctAnswer = target.dataset.answer;
        const selectedAnswer = target.dataset.selected;

        if (selectedAnswer === correctAnswer) {
            correct++;
            target.classList.add('filled');
            feedback += `<div class="feedback-item correct">✓ Question ${index + 1}: Correct!</div>`;
        } else {
            feedback += `<div class="feedback-item incorrect">✗ Question ${index + 1}: Try again!</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-1');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === matchTargets.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Perfect! All answers correct!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${matchTargets.length} correct. Keep trying!</div>`;
    }
}

// ==================== ACTIVITY 2: FILL IN BLANKS ====================
function checkBlanks() {
    const blanks = document.querySelectorAll('.blank');
    let correct = 0;
    let feedback = '';

    blanks.forEach((blank, index) => {
        const userAnswer = blank.value.toLowerCase().trim();
        const correctAnswer = blank.dataset.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            correct++;
            blank.style.borderBottomColor = '#10b981';
            feedback += `<div class="feedback-item correct">✓ Question ${index + 1}: Correct!</div>`;
        } else {
            blank.style.borderBottomColor = '#ef4444';
            feedback += `<div class="feedback-item incorrect">✗ Question ${index + 1}: The answer is "${blank.dataset.answer}"</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-2');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === blanks.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Excellent! All answers correct!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${blanks.length} correct. Review and try again!</div>`;
    }
}

// ==================== ACTIVITY 3: MULTIPLE CHOICE ====================
function checkMultipleChoice() {
    const questions = document.querySelectorAll('.mc-question');
    let correct = 0;
    let feedback = '';

    questions.forEach((question, index) => {
        const selected = question.querySelector('input[type="radio"]:checked');

        if (selected) {
            if (selected.value === 'correct') {
                correct++;
                feedback += `<div class="feedback-item correct">✓ Question ${index + 1}: Correct!</div>`;
            } else {
                feedback += `<div class="feedback-item incorrect">✗ Question ${index + 1}: Incorrect. Try again!</div>`;
            }
        } else {
            feedback += `<div class="feedback-item incorrect">✗ Question ${index + 1}: Please select an answer.</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-3');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === questions.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Perfect score!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${questions.length} correct. Keep practicing!</div>`;
    }
}

// ==================== ACTIVITY 4: ADVERBS ====================
function selectAdverb(button, adverb) {
    const parent = button.parentElement;
    parent.querySelectorAll('.adverb-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');

    // Store the selected value
    const blank = parent.previousElementSibling;
    blank.dataset.selected = adverb;
}

function checkAdverbs() {
    const adverbBlanks = document.querySelectorAll('.adverb-blank');
    let correct = 0;
    let feedback = '';

    adverbBlanks.forEach((blank, index) => {
        const correctAnswer = blank.dataset.answer;
        const selectedAnswer = blank.dataset.selected;

        if (selectedAnswer === correctAnswer) {
            correct++;
            blank.style.background = '#d1fae5';
            feedback += `<div class="feedback-item correct">✓ Question ${index + 1}: Correct!</div>`;
        } else {
            blank.style.background = '#fee2e2';
            feedback += `<div class="feedback-item incorrect">✗ Question ${index + 1}: The answer is "${correctAnswer}"</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-4');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === adverbBlanks.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Great job! You understand adverbs of frequency!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${adverbBlanks.length} correct. Review the lesson on adverbs!</div>`;
    }
}

// ==================== ACTIVITY 5: SEQUENCING ====================
let sequenceOrder = [];

function setupSequenceDragDrop() {
    const sequenceItems = document.querySelectorAll('.sequence-item');

    sequenceItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    const container = document.getElementById('sequenceContainer');
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        // This is handled by the native reordering
    });
}

function checkSequence() {
    const sequenceItems = document.querySelectorAll('.sequence-item');
    let correct = 0;
    let feedback = '';

    sequenceItems.forEach((item, index) => {
        const correctOrder = parseInt(item.dataset.order);

        if (correctOrder === index) {
            correct++;
            item.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            feedback += `<div class="feedback-item correct">✓ "${item.textContent}" is in the correct position!</div>`;
        } else {
            item.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            feedback += `<div class="feedback-item incorrect">✗ "${item.textContent}" should be in position ${correctOrder + 1}</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-5');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === sequenceItems.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Perfect sequence! You understand the morning routine!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${sequenceItems.length} correct. Try rearranging the items!</div>`;
    }
}

// ==================== ACTIVITY 6: DESCRIPTION ====================
function checkDescription() {
    const userText = document.getElementById('userDescription').value.trim();

    if (!userText) {
        const feedbackDiv = document.getElementById('feedback-6');
        feedbackDiv.innerHTML = '<div class="feedback-item incorrect">Please write your description first!</div>';
        feedbackDiv.classList.add('show', 'error');
        return;
    }

    // Check for key elements
    let feedback = '<strong>Your Description Analysis:</strong><br>';
    let score = 0;

    // Check for adverbs of frequency
    const frequencyAdverbs = ['always', 'usually', 'often', 'sometimes', 'rarely', 'never'];
    const hasFrequency = frequencyAdverbs.some(adv => userText.toLowerCase().includes(adv));
    if (hasFrequency) {
        feedback += '<div class="feedback-item correct">✓ You used adverbs of frequency!</div>';
        score++;
    } else {
        feedback += '<div class="feedback-item incorrect">✗ Try adding adverbs like "always", "usually", "sometimes"</div>';
    }

    // Check for sequencing words
    const sequencingWords = ['first', 'then', 'next', 'after', 'finally'];
    const hasSequencing = sequencingWords.some(word => userText.toLowerCase().includes(word));
    if (hasSequencing) {
        feedback += '<div class="feedback-item correct">✓ You used sequencing words!</div>';
        score++;
    } else {
        feedback += '<div class="feedback-item incorrect">✗ Try using "First", "Then", "Finally" to organize your ideas</div>';
    }

    // Check for present simple verbs
    const presentVerbs = ['wake', 'have', 'go', 'brush', 'get', 'study', 'work', 'relax', 'read'];
    const hasVerbs = presentVerbs.some(verb => userText.toLowerCase().includes(verb));
    if (hasVerbs) {
        feedback += '<div class="feedback-item correct">✓ You used present simple verbs!</div>';
        score++;
    } else {
        feedback += '<div class="feedback-item incorrect">✗ Use present simple verbs to describe your routine</div>';
    }

    // Check length
    const wordCount = userText.split(/\s+/).length;
    if (wordCount >= 30) {
        feedback += `<div class="feedback-item correct">✓ Good length! (${wordCount} words)</div>`;
        score++;
    } else {
        feedback += `<div class="feedback-item incorrect">✗ Try writing more (currently ${wordCount} words, aim for 30+)</div>`;
    }

    const feedbackDiv = document.getElementById('feedback-6');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (score === 4) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Excellent description! You're a master of daily routines!</div>`;
    } else if (score >= 2) {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">Good effort! Score: ${score}/4. Review the suggestions above!</div>`;
    } else {
        feedbackDiv.classList.add('error');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">Keep working on it! Score: ${score}/4. Use the feedback to improve!</div>`;
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeIndicators();
    setupDragAndDrop();
    setupSequenceDragDrop();
    showSlide(0);
});

// ==================== UTILITY FUNCTIONS ====================
// Allow Enter key to submit in textarea
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        const activeElement = document.activeElement;
        if (activeElement.id === 'userDescription') {
            checkDescription();
        }
    }
});

// Smooth scroll to activities section
function scrollToActivities() {
    document.getElementById('activities').scrollIntoView({ behavior: 'smooth' });
}

// Reset all activities
function resetAllActivities() {
    // Reset fill blanks
    document.querySelectorAll('.blank').forEach(blank => {
        blank.value = '';
        blank.style.borderBottomColor = '#6366f1';
    });

    // Reset multiple choice
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Reset adverbs
    document.querySelectorAll('.adverb-blank').forEach(blank => {
        blank.style.background = '#fff3cd';
        blank.dataset.selected = '';
    });

    document.querySelectorAll('.adverb-option').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Reset sequence
    document.querySelectorAll('.sequence-item').forEach(item => {
        item.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    });

    // Reset textarea
    document.getElementById('userDescription').value = '';

    // Clear all feedbacks
    document.querySelectorAll('.feedback').forEach(feedback => {
        feedback.classList.remove('show', 'success', 'error', 'info');
        feedback.innerHTML = '';
    });
}

// ==================== COMMUTING ACTIVITIES ====================
function checkCommutingBlanks() {
    const blanks = document.querySelectorAll('.commute-blank');
    let correct = 0;
    let feedback = '';

    blanks.forEach((blank, index) => {
        const userAnswer = blank.value.toLowerCase().trim();
        const correctAnswer = blank.dataset.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            correct++;
            blank.style.borderBottomColor = '#10b981';
            feedback += `<div class="feedback-item correct">✓ Question ${index + 1}: Correct!</div>`;
        } else {
            blank.style.borderBottomColor = '#ef4444';
            feedback += `<div class="feedback-item incorrect">✗ Question ${index + 1}: The answer is "${blank.dataset.answer}"</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-7');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === blanks.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Perfect! You understand commuting vocabulary!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${blanks.length} correct. Review and try again!</div>`;
    }
}

function checkCommutingMultipleChoice() {
    const questions = document.querySelectorAll('.multiple-choice');
    let correct = 0;
    let feedback = '';
    let questionIndex = 0;

    // Check commuting-specific questions (q-c1 through q-c5)
    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(`input[name="q-c${i}"]:checked`);
        questionIndex = i;

        if (selected) {
            if (selected.value === 'correct') {
                correct++;
                feedback += `<div class="feedback-item correct">✓ Question ${i}: Correct!</div>`;
            } else {
                feedback += `<div class="feedback-item incorrect">✗ Question ${i}: Incorrect. Try again!</div>`;
            }
        } else {
            feedback += `<div class="feedback-item incorrect">✗ Question ${i}: Please select an answer.</div>`;
        }
    }

    const feedbackDiv = document.getElementById('feedback-8');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === 5) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Perfect score! You're a commuting expert!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/5 correct. Keep practicing!</div>`;
    }
}

function checkCommutingMatching() {
    const matchTargets = document.querySelectorAll('.match-targets .match-target');
    let correct = 0;
    let feedback = '';

    matchTargets.forEach((target, index) => {
        const correctAnswer = target.dataset.answer;
        const selectedAnswer = target.dataset.selected;

        if (selectedAnswer === correctAnswer) {
            correct++;
            target.classList.add('filled');
            feedback += `<div class="feedback-item correct">✓ Match ${index + 1}: Correct!</div>`;
        } else {
            feedback += `<div class="feedback-item incorrect">✗ Match ${index + 1}: Try again!</div>`;
        }
    });

    const feedbackDiv = document.getElementById('feedback-9');
    feedbackDiv.innerHTML = feedback;
    feedbackDiv.classList.add('show');

    if (correct === matchTargets.length) {
        feedbackDiv.classList.add('success');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">🎉 Perfect! You matched all correctly!</div>`;
    } else {
        feedbackDiv.classList.add('info');
        feedbackDiv.innerHTML += `<div style="margin-top: 10px;">You got ${correct}/${matchTargets.length} correct. Try again!</div>`;
    }
}

// ==================== MULTI-SECTION SLIDE NAVIGATION ====================
let currentSlideLevelUp = 0;
let currentSlideCommuting = 0;

function initializeSectionSlides() {
    // Initialize Level Up slides
    const levelUpSlides = document.querySelectorAll('#levelup .slide');
    if (levelUpSlides.length > 0) {
        const levelUpIndicatorsContainer = document.getElementById('indicatorsLevelUp');
        for (let i = 0; i < levelUpSlides.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (i === 0 ? ' active' : '');
            indicator.onclick = () => goToSlideLevelUp(i);
            levelUpIndicatorsContainer.appendChild(indicator);
        }
        document.getElementById('totalSlidesLevelUp').textContent = levelUpSlides.length;
    }

    // Initialize Commuting slides
    const commutingSlides = document.querySelectorAll('#commuting .slide');
    if (commutingSlides.length > 0) {
        const commutingIndicatorsContainer = document.getElementById('indicatorsCommuting');
        for (let i = 0; i < commutingSlides.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (i === 0 ? ' active' : '');
            indicator.onclick = () => goToSlideCommuting(i);
            commutingIndicatorsContainer.appendChild(indicator);
        }
        document.getElementById('totalSlidesCommuting').textContent = commutingSlides.length;
    }
}

function showSlideLevelUp(n) {
    const slides = document.querySelectorAll('#levelup .slide');
    slides.forEach(slide => slide.classList.remove('active'));
    const indicators = document.querySelectorAll('#indicatorsLevelUp .indicator');
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[n].classList.add('active');
    indicators[n].classList.add('active');
    document.getElementById('currentSlideLevelUp').textContent = n + 1;
}

function goToSlideLevelUp(n) {
    currentSlideLevelUp = n;
    showSlideLevelUp(currentSlideLevelUp);
}

function nextSlideLevelUp() {
    const slides = document.querySelectorAll('#levelup .slide');
    currentSlideLevelUp = (currentSlideLevelUp + 1) % slides.length;
    showSlideLevelUp(currentSlideLevelUp);
}

function prevSlideLevelUp() {
    const slides = document.querySelectorAll('#levelup .slide');
    currentSlideLevelUp = (currentSlideLevelUp - 1 + slides.length) % slides.length;
    showSlideLevelUp(currentSlideLevelUp);
}

function showSlideCommuting(n) {
    const slides = document.querySelectorAll('#commuting .slide');
    slides.forEach(slide => slide.classList.remove('active'));
    const indicators = document.querySelectorAll('#indicatorsCommuting .indicator');
    indicators.forEach(ind => ind.classList.remove('active'));

    slides[n].classList.add('active');
    indicators[n].classList.add('active');
    document.getElementById('currentSlideCommuting').textContent = n + 1;
}

function goToSlideCommuting(n) {
    currentSlideCommuting = n;
    showSlideCommuting(currentSlideCommuting);
}

function nextSlideCommuting() {
    const slides = document.querySelectorAll('#commuting .slide');
    currentSlideCommuting = (currentSlideCommuting + 1) % slides.length;
    showSlideCommuting(currentSlideCommuting);
}

function prevSlideCommuting() {
    const slides = document.querySelectorAll('#commuting .slide');
    currentSlideCommuting = (currentSlideCommuting - 1 + slides.length) % slides.length;
    showSlideCommuting(currentSlideCommuting);
}

// Event listeners for Level Up buttons
document.addEventListener('DOMContentLoaded', () => {
    const nextBtnLevelUp = document.getElementById('nextBtnLevelUp');
    const prevBtnLevelUp = document.getElementById('prevBtnLevelUp');
    const nextBtnCommuting = document.getElementById('nextBtnCommuting');
    const prevBtnCommuting = document.getElementById('prevBtnCommuting');

    if (nextBtnLevelUp) nextBtnLevelUp.addEventListener('click', nextSlideLevelUp);
    if (prevBtnLevelUp) prevBtnLevelUp.addEventListener('click', prevSlideLevelUp);
    if (nextBtnCommuting) nextBtnCommuting.addEventListener('click', nextSlideCommuting);
    if (prevBtnCommuting) prevBtnCommuting.addEventListener('click', prevSlideCommuting);
});

// Export for potential future use
window.dailyRoutineApp = {
    nextSlide,
    prevSlide,
    goToSlide,
    checkMatching,
    checkBlanks,
    checkMultipleChoice,
    checkAdverbs,
    checkSequence,
    checkDescription,
    resetAllActivities,
    checkCommutingBlanks,
    checkCommutingMultipleChoice,
    checkCommutingMatching,
    nextSlideLevelUp,
    prevSlideLevelUp,
    goToSlideLevelUp,
    nextSlideCommuting,
    prevSlideCommuting,
    goToSlideCommuting
};
