const images = ['images/Num_kitty.jpg', 'images/Num_1_year_old.jpg', 'images/Num_2_years_old.jpg'];

const stories = {
    a: {
        title: 'Growing Up',
        order: [0, 1, 2],
        stages: ['Beginning · Kitten', 'Middle · 1 year old', 'End · 2 years old'],
        captions: [
            'Tiny Num arrives, held up next to the big tabby who will show Num how everything works.',
            'At one, Num has learned the most important lesson: any table can be a bed.',
            'At two, Num sits tall and looks down at everyone. The kitten is gone; the boss has arrived.'
        ],
        alts: [
            'Kitten Num held up next to an older tabby',
            'Num dozing on a table',
            'Grown-up Num sitting tall, wide-eyed'
        ],
        looks: ['none', 'none', 'none']
    },
    b: {
        title: 'The Dream',
        order: [1, 0, 2],
        stages: ['Beginning · Nap time', 'Middle · The dream', 'End · Wide awake'],
        captions: [
            'Num settles down on the table, closes both eyes, and drifts off.',
            'In the dream Num is tiny again, tucked beside the big tabby, safe in familiar arms.',
            'Wide awake now, all grown up, Num stares straight at you. Was it only a dream?'
        ],
        alts: [
            'Num asleep on a table',
            'Kitten Num beside the big tabby, tinted like a dream',
            'Num sitting tall, staring wide-eyed'
        ],
        looks: ['none', 'sepia(0.7) blur(1.5px)', 'none']
    }
};

const storyImage = document.getElementById('story-image');
const storyTitle = document.getElementById('story-title');
const storyStage = document.getElementById('story-stage');
const storyCaption = document.getElementById('story-caption');
const stepCounter = document.getElementById('step-counter');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const storyABtn = document.getElementById('story-a-btn');
const storyBBtn = document.getElementById('story-b-btn');

let currentStory = 'a';
let currentStep = 0;

function getStory() {
    return stories[currentStory];
}

function showStep(step) {
    let story = getStory();
    let imageIndex = story.order[step];

    storyStage.textContent = story.stages[step];
    storyCaption.textContent = story.captions[step];
    stepCounter.textContent = (step + 1) + ' / ' + story.order.length;

    prevBtn.disabled = step === 0;
    if (step === story.order.length - 1) {
        nextBtn.innerHTML = 'Start over &#8635;';
    } else {
        nextBtn.innerHTML = 'Next &rarr;';
    }

    storyImage.style.opacity = 0;
    setTimeout(function () {
        storyImage.src = images[imageIndex];
        storyImage.alt = story.alts[step];
        storyImage.style.filter = story.looks[step];
        storyImage.style.opacity = 1;
    }, 250);
}

function nextStep() {
    currentStep = (currentStep + 1) % getStory().order.length;
    showStep(currentStep);
}

function prevStep() {
    if (currentStep > 0) {
        currentStep -= 1;
        showStep(currentStep);
    }
}

function switchStory(storyKey) {
    currentStory = storyKey;
    currentStep = 0;
    storyTitle.textContent = getStory().title;
    storyABtn.setAttribute('aria-pressed', storyKey === 'a');
    storyBBtn.setAttribute('aria-pressed', storyKey === 'b');
    showStep(currentStep);
}

storyABtn.addEventListener('click', function () { switchStory('a'); });
storyBBtn.addEventListener('click', function () { switchStory('b'); });
prevBtn.addEventListener('click', prevStep);
nextBtn.addEventListener('click', nextStep);
storyImage.addEventListener('click', nextStep);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') nextStep();
    if (event.key === 'ArrowLeft') prevStep();
});

switchStory('a');
