let txt;
let coords;
let i = 0;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  gertrude = [
    "If I told him would he like it. Would he like it if I told him.",
    "Would he like it would Napoleon would Napoleon would would he like it.",
    "If Napoleon if I told him if I told him if Napoleon. Would he like it if I told him if I told him if Napoleon. Would he like it if Napoleon if Napoleon if I told him. If I told him if Napoleon if Napoleon if I told him. If I told him would he like it would he like it if I told him.",
    "Now.",
    "Not now.",
    "And now.",
    "Now.",
    "Exactly as as kings.",
    "Feeling full for it.",
    "Exactitude as kings.",
    "So to beseech you as full as for it.",
    "Exactly or as kings.",
    "Shutters shut and open so do queens. Shutters shut and shutters and so shutters shut and shutters and so and so shutters and so shutters shut and so shutters shut and shutters and so. And so shutters shut and so and also. And also and so and so and also.",
    "Exact resemblance. To exact resemblance the exact resemblance as exact as a resemblance, exactly as resembling, exactly resembling, exactly in resemblance exactly a resemblance, exactly and resemblance. For this is so. Because.",
    "Now actively repeat at all, now actively repeat at all, now actively repeat at all.",
    "Have hold and hear, actively repeat at all.",
    "I judge judge.",
    "As a resemblance to him.",
    "Who comes first. Napoleon the first.",
    "Who comes too coming coming too, who goes there, as they go they share, who shares all, all is as all as as yet or as yet.",
    "Now to date now to date. Now and now and date and the date.",
    "Who came first. Napoleon at first. Who came first Napoleon the first. Who came first, Napoleon first.",
    "Presently.",
    "Exactly do they do.",
    "First exactly.",
    "Exactly do they do too.",
    "First exactly.",
    "And first exactly.",
    "Exactly do they do.",
    "And first exactly and exactly.",
    "And do they do.",
    "At first exactly and first exactly and do they do.",
    "The first exactly.",
    "And do they do.",
    "The first exactly.",
    "At first exactly.",
    "First as exactly.",
    "As first as exactly.",
    "Presently",
    "As presently.",
    "As as presently.",
    "He he he he and he and he and and he and he and he and and as and as he and as he and he. He is and as he is, and as he is and he is, he is and as he and he and as he is and he and he and and he and he.",
    "Can curls rob can curls quote, quotable.",
    "As presently.",
    "As exactitude.",
    "As trains",
    "Has trains.",
    "Has trains.",
    "As trains.",
    "As trains.",
    "Presently.",
    "Proportions.",
    "Presently.",
    "As proportions as presently.",
    "Father and farther.",
    "Was the king or room.",
    "Farther and whether.",
    "Was there was there was there what was there was there what was there was there there was there.",
    "Whether and in there.",
    "As even say so.",
    "One.",
    "I land.",
    "Two.",
    "I land.",
    "Three.",
    "The land.",
    "Three",
    "The land.",
    "Three",
    "The land.",
    "Two",
    "I land.",
    "Two",
    "I land.",
    "One",
    "I land.",
    "Two",
    "I land.",
    "As a so.",
    "They cannot.",
    "A note.",
    "They cannot.",
    "A float.",
    "They cannot.",
    "They dote.",
    "They cannot.",
    "They as denote.",
    "Miracles play.",
    "Play fairly.",
    "Play fairly well.",
    "A well.",
    "As well.",
    "As or as presently.",
    "Let me recite what history teaches. History teaches.",
  ];
  frameRate(random(0.23, 0.52));
}

function draw() {
  background(255, 255, 255, 90);
  if (i < gertrude.length) {
    // calculations for spiral placement
    let coords = spiralCoordinates(
      i / gertrude.length,
      800,
      random(1, width / 2) * PI
    );
    console.log(coords);
    text(gertrude[i], coords.x + width / 3, coords.y + height / 2);
    i++;
  }
}

function spiralCoordinates(fraction, maxRadius, maxTheta) {
  let radius = maxRadius * fraction;

  let theta = maxTheta * fraction;

  let x = cos(theta) * radius;
  let y = sin(theta) * radius;
  console.log(x, y);

  return { x, y };
}
