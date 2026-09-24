// ==========================================
// SPACE RECEIPT
// ==========================================

const W = 384;
const H = 700;
const MARGIN = 25;

export const receipt = { width: W, height: H, seed: 67 };

// Shorthand colours
const BLACK = 0;
const WHITE = 255;

// ==========================================
// SCENE DATA
// ==========================================

// Small dots: [x, y]  (all drawn 1px wide)
const STARS = [
  // top band
  [18, 70], [40, 85], [80, 65], [110, 90], [145, 68], [175, 85],
  [215, 65], [250, 88], [285, 68], [320, 82], [360, 65],
  // upper middle
  [20, 145], [100, 135], [145, 155], [250, 135], [285, 160], [365, 145],
  // around the black hole
  [18, 300], [48, 325], [350, 310], [365, 340],
  [18, 405], [75, 430], [310, 410], [365, 430],
  // lower middle
  [20, 470], [105, 455], [275, 470], [360, 465],
  // bottom
  [20, 590], [130, 600], [220, 580], [350, 590],
  [25, 635], [125, 650], [210, 640], [260, 650], [355, 640],
];

// Cross-shaped bright stars: [x, y, armLength]
const BRIGHT_STARS = [
  [105, 105, 3], [275, 110, 3], [30, 350, 3],
  [355, 380, 3], [115, 485, 3], [270, 550, 3],
];

// Dust orbiting the black hole: [x, y, diameter]
const PARTICLES = [
  [92, 335, 2], [110, 320, 1.5], [280, 335, 2], [300, 350, 1.5],
  [105, 400, 1.5], [285, 410, 2], [125, 425, 1], [265, 425, 1],
];

// Moon craters: [x, y, diameter] grouped by shade
const CRATERS = [
  {
    shade: 145,
    dots: [[-12, -10, 9], [10, -13, 6], [13, 8, 9], [-9, 12, 6], [-15, 1, 4], [2, 14, 5]],
  },
  {
    shade: 120,
    dots: [[-4, -17, 3], [16, -3, 3], [-17, -8, 3], [8, 13, 2]],
  },
];

// Black hole disk layers, outermost first: [width, height, colour]
const DISK_LAYERS = [
  [370, 100, BLACK],
  [330, 70, WHITE],
  [295, 62, BLACK],
  [250, 48, WHITE],
  [215, 48, BLACK],
];

// Front half of the accretion disk: [colour, strokeWeight, width, height]
const FRONT_ARCS = [
  [BLACK, 12, 225, 52],
  [WHITE, 3, 218, 48],
  [BLACK, 5, 208, 44],
];

// Asteroid outline as offsets from the centre, scaled by size
const ROCK_SHAPE = [[-1, 0], [-0.4, -1], [1, -0.4], [0.5, 1], [-0.7, 0.6]];

// Big Dipper: star positions and the lines joining them (by index)
const CONSTELLATION = {
  stars: [[122, 190], [140, 183], [158, 187], [176, 178], [180, 160], [202, 155], [204, 172]],
  links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
};

// Barcode bar widths (in units) for the footer
const BARCODE = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 1, 3];
const BAR_UNIT = 1.2;
const BAR_GAP = 1.6;

// ==========================================
// HELPERS
// ==========================================

function dots(p, list) {
  for (const [x, y, d = 1] of list) p.circle(x, y, d);
}

function horizontalRule(p, y, weight) {
  p.stroke(BLACK);
  p.strokeWeight(weight);
  p.line(MARGIN, y, W - MARGIN, y);
}

// ==========================================
// MAIN DRAW FUNCTION
// ==========================================

export function drawReceipt(p) {
  p.background(WHITE);

  // Title
  p.noStroke();
  p.fill(BLACK);
  p.textAlign(p.CENTER, p.TOP);
  p.textFont("monospace");
  p.textSize(13);
  p.text("Nivedh Govil", W / 2, 22);

  horizontalRule(p, 48, 0.7);

  drawStars(p);

  // Distant space
  drawPlanet(p, 48, 110, 13);
  drawMoon(p, 55, 210, 42);
  drawComet(p, 325, 100);
  drawConstellation(p);
  drawRingedPlanet(p, 245, 205, 11);
  drawGalaxy(p, 120, 268, 24);

  drawBlackHole(p, 192, 365);

  // Side objects
  drawAsteroids(p, 330, 265);
  drawSatellite(p, 55, 520);
  drawRadioTelescope(p, 325, 515);
  drawSpacecraft(p, 75, 565);
  drawUFO(p, 320, 455);
  drawShootingStar(p, 178, 545);
  drawAstronaut(p, 220, 510);
  drawStripedPlanet(p, 170, 628, 17);
  drawRocket(p, 295, 628);

  drawFooter(p);
  horizontalRule(p, H - 6, 0.6);
}

// ==========================================
// STARS
// ==========================================

function drawStars(p) {
  p.noStroke();
  p.fill(BLACK);
  dots(p, STARS);

  p.stroke(BLACK);
  p.strokeWeight(0.8);
  for (const [x, y, s] of BRIGHT_STARS) {
    p.line(x - s, y, x + s, y);
    p.line(x, y - s, x, y + s);
  }
  p.noStroke();
}

// ==========================================
// BLACK HOLE
// ==========================================

function drawBlackHole(p, cx, cy) {
  p.push();
  p.translate(cx, cy);
  p.rotate(-0.2);

  // Layered accretion disk (alternating black / white rings)
  p.noStroke();
  for (const [w, h, colour] of DISK_LAYERS) {
    p.fill(colour);
    p.ellipse(0, 0, w, h);
  }

  // Event horizon
  p.fill(BLACK);
  p.circle(0, 0, 145);

  // Photon rings
  p.noFill();
  p.stroke(WHITE);
  p.strokeWeight(4);
  p.circle(0, 0, 156);

  p.stroke(BLACK);
  p.strokeWeight(2);
  p.circle(0, 0, 165);

  // Front of the disk passing in front of the horizon
  for (const [colour, weight, w, h] of FRONT_ARCS) {
    p.stroke(colour);
    p.strokeWeight(weight);
    p.arc(0, 0, w, h, 0, p.PI);
  }

  p.pop();

  // Orbiting particles (drawn in unrotated space)
  p.noStroke();
  p.fill(BLACK);
  dots(p, PARTICLES);
}

// ==========================================
// MOON
// ==========================================

function drawMoon(p, x, y, size) {
  p.push();
  p.translate(x, y);

  p.noStroke();
  p.fill(185);
  p.circle(0, 0, size);

  for (const { shade, dots: craters } of CRATERS) {
    p.fill(shade);
    dots(p, craters);
  }

  // Outline
  p.noFill();
  p.stroke(BLACK);
  p.strokeWeight(1);
  p.circle(0, 0, size);

  p.pop();
}

// ==========================================
// PLANET
// ==========================================

function drawPlanet(p, x, y, size) {
  p.push();
  p.translate(x, y);

  // Outline
  p.noFill();
  p.stroke(BLACK);
  p.strokeWeight(1);
  p.circle(0, 0, size * 2);

  // Surface
  p.noStroke();
  p.fill(BLACK);
  p.circle(3, -2, size * 1.2);

  // Surface marks
  p.fill(WHITE);
  p.circle(-5, 4, 3);
  p.circle(-2, -5, 2);

  p.pop();
}

// ==========================================
// COMET
// ==========================================

function drawComet(p, x, y) {
  p.push();
  p.translate(x, y);
  p.rotate(0.35);

  p.noFill();
  p.stroke(BLACK);
  p.strokeWeight(0.7);

  const tails = [
    [[-4, 0], [-18, -3], [-32, -7], [-48, -13]], // upper
    [[-4, 2], [-20, 5], [-37, 9], [-53, 15]],    // lower
  ];

  for (const tail of tails) {
    p.beginShape();
    for (const [vx, vy] of tail) p.vertex(vx, vy);
    p.endShape();
  }

  // Head
  p.noStroke();
  p.fill(BLACK);
  p.circle(0, 0, 8);

  p.pop();
}

// ==========================================
// ASTEROIDS
// ==========================================

function drawAsteroids(p, x, y) {
  drawRock(p, x, y, 5);
  drawRock(p, x + 12, y - 7, 3);
  drawRock(p, x + 20, y + 6, 2);
  drawRock(p, x - 10, y + 9, 2);
}

function drawRock(p, x, y, size) {
  p.noStroke();
  p.fill(BLACK);

  p.beginShape();
  for (const [dx, dy] of ROCK_SHAPE) p.vertex(x + dx * size, y + dy * size);
  p.endShape(p.CLOSE);
}

// ==========================================
// SATELLITE
// ==========================================

function drawSatellite(p, x, y) {
  p.push();
  p.translate(x, y);

  // Antenna
  p.stroke(BLACK);
  p.strokeWeight(0.8);
  p.line(0, -5, 0, -18);
  p.line(0, -18, 6, -21);

  // Body and solar panels
  p.noStroke();
  p.fill(BLACK);
  p.rect(-5, -5, 10, 10);
  p.rect(-20, -4, 11, 8);
  p.rect(9, -4, 11, 8);

  // Panel divisions
  p.stroke(WHITE);
  p.strokeWeight(0.5);
  p.line(-15, -4, -15, 4);
  p.line(15, -4, 15, 4);

  p.pop();
}

// ==========================================
// RADIO TELESCOPE
// ==========================================

function drawRadioTelescope(p, x, y) {
  p.push();
  p.translate(x, y);

  p.noFill();
  p.stroke(BLACK);
  p.strokeWeight(1);

  // Dish
  p.arc(0, 0, 38, 30, p.PI, p.TWO_PI);

  // Supports
  p.line(-14, 5, 0, 22);
  p.line(14, 5, 0, 22);

  // Receiver
  p.line(0, -14, 0, -3);
  p.circle(0, -16, 3);

  // Base
  p.line(-8, 22, 8, 22);

  p.pop();
}

// ==========================================
// SPACECRAFT
// ==========================================

function drawSpacecraft(p, x, y) {
  p.push();
  p.translate(x, y);
  p.rotate(-0.15);

  p.stroke(BLACK);
  p.strokeWeight(0.8);

  // Body
  p.fill(WHITE);
  p.beginShape();
  p.vertex(-16, 0);
  p.vertex(-8, -6);
  p.vertex(8, -6);
  p.vertex(18, 0);
  p.vertex(8, 6);
  p.vertex(-8, 6);
  p.endShape(p.CLOSE);

  // Nose, window, solar wings, engine
  p.fill(BLACK);
  p.triangle(8, -6, 19, 0, 8, 6);
  p.circle(2, 0, 6);
  p.rect(-13, -13, 10, 5);
  p.rect(-13, 8, 10, 5);
  p.rect(-20, -2, 7, 4);

  // Engine trail
  p.line(-22, 0, -34, 0);

  p.pop();
}

// ==========================================
// CONSTELLATION
// ==========================================

function drawConstellation(p) {
  const { stars, links } = CONSTELLATION;

  p.stroke(BLACK);
  p.strokeWeight(0.4);
  for (const [a, b] of links) {
    p.line(...stars[a], ...stars[b]);
  }

  p.noStroke();
  p.fill(BLACK);
  for (const [x, y] of stars) p.circle(x, y, 2.5);
}

// ==========================================
// RINGED PLANET
// ==========================================

function drawRingedPlanet(p, x, y, r) {
  p.push();
  p.translate(x, y);
  p.rotate(-0.35);

  p.noFill();
  p.stroke(BLACK);
  p.strokeWeight(1);

  // Back half of the ring (hidden behind the planet)
  p.arc(0, 0, r * 4.2, r * 1.1, p.PI, p.TWO_PI);

  // Planet body
  p.fill(WHITE);
  p.circle(0, 0, r * 2);

  // Cloud bands
  p.strokeWeight(0.6);
  for (const k of [-0.4, 0, 0.4]) {
    const half = Math.sqrt(r * r - (k * r) ** 2);
    p.line(-half, k * r, half, k * r);
  }

  // Front half of the ring (two rings)
  p.noFill();
  p.strokeWeight(1);
  p.arc(0, 0, r * 4.2, r * 1.1, 0, p.PI);
  p.arc(0, 0, r * 3.5, r * 0.85, 0, p.PI);

  p.pop();
}

// ==========================================
// STRIPED GAS GIANT
// ==========================================

function drawStripedPlanet(p, x, y, r) {
  p.push();
  p.translate(x, y);

  p.fill(WHITE);
  p.stroke(BLACK);
  p.strokeWeight(1);
  p.circle(0, 0, r * 2);

  // Bands
  p.strokeWeight(0.7);
  for (const k of [-0.55, -0.25, 0.05, 0.35, 0.65]) {
    const half = Math.sqrt(r * r - (k * r) ** 2) * 0.98;
    p.line(-half, k * r, half, k * r);
  }

  // Great storm spot
  p.noStroke();
  p.fill(BLACK);
  p.ellipse(r * 0.35, r * 0.2, r * 0.45, r * 0.3);

  p.pop();
}

// ==========================================
// SPIRAL GALAXY
// ==========================================

function drawGalaxy(p, x, y, r) {
  p.push();
  p.translate(x, y);
  p.rotate(0.5);

  p.noFill();
  p.stroke(BLACK);
  p.strokeWeight(0.7);

  // Two spiral arms, flattened into an ellipse
  for (const offset of [0, p.PI]) {
    p.beginShape();
    for (let t = 0; t <= 3.2; t += 0.2) {
      const d = 2 + (t * r) / 3.4;
      p.vertex(p.cos(t + offset) * d, p.sin(t + offset) * d * 0.55);
    }
    p.endShape();
  }

  // Core
  p.noStroke();
  p.fill(BLACK);
  p.circle(0, 0, 4);

  p.pop();
}

// ==========================================
// SHOOTING STAR
// ==========================================

function drawShootingStar(p, x, y) {
  p.push();
  p.translate(x, y);
  p.rotate(0.45);

  p.stroke(BLACK);
  p.strokeWeight(0.7);
  p.line(-3, 0, -32, 0);
  p.strokeWeight(0.5);
  p.line(-3, -2, -22, -2);
  p.line(-3, 2, -18, 2);

  p.noStroke();
  p.fill(BLACK);
  p.circle(0, 0, 3);

  p.pop();
}

// ==========================================
// ASTRONAUT
// ==========================================

function drawAstronaut(p, x, y) {
  p.push();
  p.translate(x, y);
  p.rotate(0.4);

  p.stroke(BLACK);
  p.strokeWeight(0.8);

  // Oxygen pack
  p.fill(BLACK);
  p.rect(-8, -2, 4, 10, 1);

  // Torso
  p.fill(WHITE);
  p.rect(-5, -2, 10, 12, 2);

  // Arms and legs
  p.line(-5, 0, -11, -5);
  p.line(5, 0, 11, 5);
  p.line(-3, 10, -6, 18);
  p.line(3, 10, 5, 18);

  // Helmet and visor
  p.circle(0, -8, 11);
  p.fill(BLACK);
  p.ellipse(1, -8, 6, 5);

  // Tether
  p.noFill();
  p.strokeWeight(0.5);
  p.bezier(-7, 4, -22, 10, -8, 22, -24, 28);

  p.pop();
}

// ==========================================
// UFO
// ==========================================

function drawUFO(p, x, y) {
  p.push();
  p.translate(x, y);

  p.stroke(BLACK);
  p.strokeWeight(0.8);

  // Dome
  p.fill(WHITE);
  p.arc(0, -2, 16, 14, p.PI, p.TWO_PI);

  // Saucer
  p.fill(BLACK);
  p.ellipse(0, 0, 38, 9);

  // Lights
  p.noStroke();
  p.fill(WHITE);
  for (const dx of [-12, -4, 4, 12]) p.circle(dx, 0, 2);

  // Tractor beam
  p.stroke(BLACK);
  p.strokeWeight(0.5);
  p.line(-8, 6, -14, 20);
  p.line(8, 6, 14, 20);

  p.pop();
}

// ==========================================
// ROCKET
// ==========================================

function drawRocket(p, x, y) {
  p.push();
  p.translate(x, y);
  p.rotate(0.6);

  p.stroke(BLACK);
  p.strokeWeight(0.8);

  // Fins
  p.fill(BLACK);
  p.triangle(-7, 4, -14, 16, -7, 12);
  p.triangle(7, 4, 14, 16, 7, 12);

  // Fuselage
  p.fill(WHITE);
  p.beginShape();
  p.vertex(0, -24);
  p.vertex(7, -8);
  p.vertex(7, 12);
  p.vertex(-7, 12);
  p.vertex(-7, -8);
  p.endShape(p.CLOSE);

  // Porthole
  p.circle(0, -4, 6);

  // Flame
  p.fill(BLACK);
  p.triangle(-4, 12, 4, 12, 0, 26);

  p.pop();
}

// ==========================================
// FOOTER (tagline + barcode)
// ==========================================

function drawFooter(p) {
 

  const total = BARCODE.reduce((sum, w) => sum + w * BAR_UNIT + BAR_GAP, 0) - BAR_GAP;
  let x = (W - total) / 2;

  for (const w of BARCODE) {
    p.rect(x, 668, w * BAR_UNIT, 20);
    x += w * BAR_UNIT + BAR_GAP;
  }
}
