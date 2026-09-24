

export const receipt = {
  width: 384,
  height: 700,
  seed: 67
};


// ==========================================
// MAIN DRAW FUNCTION
// ==========================================

export function drawReceipt(p) {

  const W = 384;
  const H = 700;

  p.background(255);

  // ========================================
  // TITLE
  // ========================================

  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.TOP);
  p.textFont("monospace");
  p.textSize(13);

  p.text(
    "Nivedh Govil",
    W / 2,
    22
  );

  // ========================================
  // TOP LINE
  // ========================================

  p.stroke(0);
  p.strokeWeight(0.7);
  p.line(25, 48, 359, 48);

  // ========================================
  // STARS
  // ========================================

  drawStars(p);

  // ========================================
  // DISTANT SPACE
  // ========================================

  drawPlanet(p, 48, 110, 13);
  drawMoon(p, 55, 210, 42);
  drawComet(p, 325, 100);

  // ========================================
  // BLACK HOLE
  // DRAWN BEFORE SIDE OBJECTS
  // BUT NOTHING TOUCHES IT
  // ========================================

  drawBlackHole(p);

  // ========================================
  // SIDE OBJECTS
  // ========================================

  drawAsteroids(p, 330, 265);

  drawSatellite(p, 55, 520);

  drawRadioTelescope(p, 325, 515);

  drawSpacecraft(p, 75, 565);

 

  // ========================================
  // BOTTOM
  // ========================================

  p.noStroke();
  p.fill(0);

  p.textAlign(p.CENTER);
  p.textFont("monospace");
  p.textSize(7);

  

  p.textSize(6);

  

  p.stroke(0);
  p.strokeWeight(0.6);

  p.line(25, 694, 359, 694);
}


// ==========================================
// STARS
// ==========================================

function drawStars(p) {

  const stars = [
    [18, 70, 1],
    [40, 85, 1],
    [80, 65, 1],
    [110, 90, 1],
    [145, 68, 1],
    [175, 85, 1],
    [215, 65, 1],
    [250, 88, 1],
    [285, 68, 1],
    [320, 82, 1],
    [360, 65, 1],

    [20, 145, 1],
    [100, 135, 1],
    [145, 155, 1],
    [250, 135, 1],
    [285, 160, 1],
    [365, 145, 1],

    [18, 300, 1],
    [48, 325, 1],
    [350, 310, 1],
    [365, 340, 1],

    [18, 405, 1],
    [75, 430, 1],
    [310, 410, 1],
    [365, 430, 1],

    [20, 470, 1],
    [105, 455, 1],
    [275, 470, 1],
    [360, 465, 1],

    [20, 590, 1],
    [130, 600, 1],
    [220, 580, 1],
    [350, 590, 1],

    [25, 635, 1],
    [125, 650, 1],
    [210, 640, 1],
    [260, 650, 1],
    [355, 640, 1]
  ];

  p.noStroke();
  p.fill(0);

  for (let i = 0; i < stars.length; i++) {

    p.circle(
      stars[i][0],
      stars[i][1],
      stars[i][2]
    );
  }

  // Bright stars

  const bright = [
    [105, 105, 3],
    [275, 110, 3],
    [30, 350, 3],
    [355, 380, 3],
    [115, 485, 3],
    [270, 550, 3]
  ];

  p.stroke(0);
  p.strokeWeight(0.8);

  for (let i = 0; i < bright.length; i++) {

    const x = bright[i][0];
    const y = bright[i][1];
    const s = bright[i][2];

    p.line(x - s, y, x + s, y);
    p.line(x, y - s, x, y + s);
  }

  p.noStroke();
}


// ==========================================
// BLACK HOLE
// ==========================================

function drawBlackHole(p) {

  const cx = 192;
  const cy = 365;

  p.push();

  p.translate(cx, cy);
  p.rotate(-0.20);

  // ========================================
  // LONG OUTER ACCRETION DISK
  // ========================================

  p.noStroke();
  p.fill(0);

  p.ellipse(
    0,
    0,
    370,
    100
  );

  // ========================================
  // WHITE INNER GAP
  // ========================================

  p.fill(255);

  p.ellipse(
    0,
    0,
    330,
    70
  );

  // ========================================
  // SECOND BLACK LAYER
  // ========================================

  p.fill(0);

  p.ellipse(
    0,
    0,
    295,
    62
  );

  // ========================================
  // SECOND WHITE GAP
  // ========================================

  p.fill(255);

  p.ellipse(
    0,
    0,
    250,
    48
  );

  // ========================================
  // INNER DISK
  // ========================================

  p.fill(0);

  p.ellipse(
    0,
    0,
    215,
    48
  );

  // ========================================
  // EVENT HORIZON
  // ========================================

  p.fill(0);

  p.circle(
    0,
    0,
    145
  );

  // ========================================
  // PHOTON RING
  // ========================================

  p.noFill();
  p.stroke(255);
  p.strokeWeight(4);

  p.circle(
    0,
    0,
    156
  );

  // ========================================
  // OUTER PHOTON RING
  // ========================================

  p.stroke(0);
  p.strokeWeight(2);

  p.circle(
    0,
    0,
    165
  );

  // ========================================
  // FRONT ACCRETION DISK
  // ========================================

  p.stroke(0);
  p.strokeWeight(12);

  p.arc(
    0,
    0,
    225,
    52,
    0,
    p.PI
  );

  // White separation
  p.stroke(255);
  p.strokeWeight(3);

  p.arc(
    0,
    0,
    218,
    48,
    0,
    p.PI
  );

  // Dark front edge
  p.stroke(0);
  p.strokeWeight(5);

  p.arc(
    0,
    0,
    208,
    44,
    0,
    p.PI
  );

  p.pop();

  // ========================================
  // LABEL
  // ========================================

  p.noStroke();
  p.fill(0);

  p.textAlign(p.CENTER);
  p.textFont("monospace");
  p.textSize(8);


  p.textSize(5.5);



  // ========================================
  // ORBITING PARTICLES
  // ========================================

  const particles = [
    [92, 335, 2],
    [110, 320, 1.5],
    [280, 335, 2],
    [300, 350, 1.5],
    [105, 400, 1.5],
    [285, 410, 2],
    [125, 425, 1],
    [265, 425, 1]
  ];

  p.noStroke();
  p.fill(0);

  for (let i = 0; i < particles.length; i++) {

    p.circle(
      particles[i][0],
      particles[i][1],
      particles[i][2]
    );
  }
}


// ==========================================
// MOON
// ==========================================

function drawMoon(p, x, y, size) {

  p.push();

  p.translate(x, y);

  // Main moon
  p.fill(185);
  p.noStroke();

  p.circle(
    0,
    0,
    size
  );

  // Craters
  p.fill(145);

  p.circle(-12, -10, 9);
  p.circle(10, -13, 6);
  p.circle(13, 8, 9);
  p.circle(-9, 12, 6);
  p.circle(-15, 1, 4);
  p.circle(2, 14, 5);

  p.fill(120);

  p.circle(-4, -17, 3);
  p.circle(16, -3, 3);
  p.circle(-17, -8, 3);
  p.circle(8, 13, 2);

  // Outline
  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);

  p.circle(
    0,
    0,
    size
  );

  p.pop();
}


// ==========================================
// PLANET
// ==========================================

function drawPlanet(p, x, y, size) {

  p.push();

  p.translate(x, y);

  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);

  p.circle(
    0,
    0,
    size * 2
  );

  // Surface
  p.fill(0);
  p.noStroke();

  p.circle(
    3,
    -2,
    size * 1.2
  );

  // Surface marks
  p.fill(255);

  p.circle(
    -5,
    4,
    3
  );

  p.circle(
    -2,
    -5,
    2
  );

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
  p.stroke(0);
  p.strokeWeight(0.7);

  // Upper tail
  p.beginShape();

  p.vertex(-4, 0);
  p.vertex(-18, -3);
  p.vertex(-32, -7);
  p.vertex(-48, -13);
  p.endShape();

  // Lower tail
  p.beginShape();

  p.vertex(-4, 2);
  p.vertex(-20, 5);
  p.vertex(-37, 9);
  p.vertex(-53, 15);
  p.endShape();

  // Head
  p.fill(0);
  p.noStroke();

  p.circle(
    0,
    0,
    8
  );

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
  p.fill(0);

  p.beginShape();

  p.vertex(
    x - size,
    y
  );

  p.vertex(
    x - size * 0.4,
    y - size
  );

  p.vertex(
    x + size,
    y - size * 0.4
  );

  p.vertex(
    x + size * 0.5,
    y + size
  );

  p.vertex(
    x - size * 0.7,
    y + size * 0.6
  );

  p.endShape(p.CLOSE);
}


// ==========================================
// SATELLITE
// ==========================================

function drawSatellite(p, x, y) {

  p.push();

  p.translate(x, y);

  p.stroke(0);
  p.strokeWeight(0.8);

  // Antenna
  p.line(
    0,
    -5,
    0,
    -18
  );

  p.line(
    0,
    -18,
    6,
    -21
  );

  // Body
  p.noStroke();
  p.fill(0);

  p.rect(
    -5,
    -5,
    10,
    10
  );

  // Solar panels
  p.rect(
    -20,
    -4,
    11,
    8
  );

  p.rect(
    9,
    -4,
    11,
    8
  );

  // Panel divisions
  p.stroke(255);
  p.strokeWeight(0.5);

  p.line(
    -15,
    -4,
    -15,
    4
  );

  p.line(
    15,
    -4,
    15,
    4
  );

  p.pop();
}


// ==========================================
// RADIO TELESCOPE
// ==========================================

function drawRadioTelescope(p, x, y) {

  p.push();

  p.translate(x, y);

  p.stroke(0);
  p.strokeWeight(1);
  p.noFill();

  // Dish
  p.arc(
    0,
    0,
    38,
    30,
    p.PI,
    p.TWO_PI
  );

  // Supports
  p.line(
    -14,
    5,
    0,
    22
  );

  p.line(
    14,
    5,
    0,
    22
  );

  // Receiver
  p.line(
    0,
    -14,
    0,
    -3
  );

  p.circle(
    0,
    -16,
    3
  );

  // Base
  p.line(
    -8,
    22,
    8,
    22
  );

  p.pop();
}


// ==========================================
// SPACECRAFT
// ==========================================

function drawSpacecraft(p, x, y) {

  p.push();

  p.translate(x, y);
  p.rotate(-0.15);

  p.stroke(0);
  p.strokeWeight(0.8);

  // Body
  p.fill(255);

  p.beginShape();

  p.vertex(-16, 0);
  p.vertex(-8, -6);
  p.vertex(8, -6);
  p.vertex(18, 0);
  p.vertex(8, 6);
  p.vertex(-8, 6);

  p.endShape(p.CLOSE);

  // Nose
  p.fill(0);

  p.triangle(
    8,
    -6,
    19,
    0,
    8,
    6
  );

  // Window
  p.circle(
    2,
    0,
    6
  );

  // Solar wings
  p.rect(
    -13,
    -13,
    10,
    5
  );

  p.rect(
    -13,
    8,
    10,
    5
  );

  // Engine
  p.rect(
    -20,
    -2,
    7,
    4
  );

  // Engine trail
  p.line(
    -22,
    0,
    -34,
    0
  );

  p.pop();
}


