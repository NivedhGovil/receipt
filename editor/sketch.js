// BLACK HOLE
// Made by Nivedh Govil

export const receipt = {
  height: 1080,
  seed: 67,
};

export function drawReceipt(p) {

  // Get the width and height.
  const w = p.width;
  const h = p.height;

  // Find the center of the black hole.
  const cx = w / 2;
  const cy = 540;

  // Make the background black.
  p.background(0);

  // =========================================================
  // NAME
  // =========================================================

  // Remove the outline.
  p.noStroke();

  // Make the text white.
  p.fill(255);

  // Use a simple monospace font.
  p.textFont("monospace");

  // Center the text.
  p.textAlign(p.CENTER, p.TOP);

  // Make the text bold.
  p.textStyle(p.BOLD);

  // Set the text size.
  p.textSize(24);

  // Write your name at the top.
  p.text("NIVEDH GOVIL", cx, 30);

  // Draw a line underneath the name.
  p.stroke(255);
  p.strokeWeight(1);
  p.line(30, 70, w - 30, 70);

  // =========================================================
  // STARS
  // =========================================================

  // Remove the outline.
  p.noStroke();

  // Draw many stars.
  for (let i = 0; i < 300; i += 1) {

    // Choose a random position.
    const x = p.random(10, w - 10);
    const y = p.random(90, h - 10);

    // Find the distance from the black hole.
    const distance = p.dist(x, y, cx, cy);

    // Make distant stars slightly brighter.
    const brightness = p.map(
      distance,
      100,
      600,
      80,
      255,
      true
    );

    // Set the star brightness.
    p.fill(brightness);

    // Give each star a small random size.
    const size = p.random(0.7, 2.5);

    // Draw the star.
    p.circle(x, y, size);
  }

  // =========================================================
  // BLACK HOLE SHADOW
  // =========================================================

  // Make the area around the black hole very dark.
  p.fill(8);

  // Draw the large gravitational region.
  p.circle(cx, cy, 430);

  // Make the inner region even darker.
  p.fill(3);

  // Draw another circle.
  p.circle(cx, cy, 340);

  // =========================================================
  // ACCRETION DISK
  // =========================================================

  // Remove the outline.
  p.noStroke();

  // Make the outer disk gray.
  p.fill(100);

  // Draw the large disk.
  p.ellipse(cx, cy, 560, 125);

  // Make another layer brighter.
  p.fill(180);

  // Draw the inner disk.
  p.ellipse(cx, cy, 470, 90);

  // Make the hottest part almost white.
  p.fill(245);

  // Draw the hot inner region.
  p.ellipse(cx, cy, 370, 55);

  // =========================================================
  // DISK TEXTURE
  // =========================================================

  // Draw many small pieces of light.
  for (let i = 0; i < 160; i += 1) {

    // Choose a random horizontal position.
    const x = p.random(cx - 280, cx + 280);

    // Calculate the distance from the center.
    const distance = Math.abs(x - cx);

    // Calculate the height of the disk.
    const diskHeight = 60 - distance * 0.12;

    // Choose a random position inside the disk.
    const y = cy + p.random(-diskHeight, diskHeight);

    // Make the particles bright.
    p.fill(p.random(120, 255));

    // Draw a tiny piece of the disk.
    p.ellipse(
      x,
      y,
      p.random(2, 8),
      p.random(1, 3)
    );
  }

  // =========================================================
  // GRAVITATIONAL LENSING
  // =========================================================

  // Remove filling.
  p.noFill();

  // Make the lensing rings gray.
  p.stroke(180);

  // Make them thin.
  p.strokeWeight(2);

  // Draw a large warped ring.
  p.ellipse(cx, cy, 310, 70);

  // Draw another ring.
  p.ellipse(cx, cy, 340, 80);

  // Draw another ring.
  p.ellipse(cx, cy, 370, 90);

  // =========================================================
  // BLACK HOLE EVENT HORIZON
  // =========================================================

  // Remove the outline.
  p.noStroke();

  // Make the event horizon completely black.
  p.fill(0);

  // Draw the black hole.
  p.circle(cx, cy, 225);

  // =========================================================
  // BRIGHT RING AROUND BLACK HOLE
  // =========================================================

  // Remove filling.
  p.noFill();

  // Make the ring white.
  p.stroke(255);

  // Make the ring thin.
  p.strokeWeight(5);

  // Draw the photon ring.
  p.ellipse(cx, cy, 245, 55);

  // =========================================================
  // BRIGHTER PART OF THE DISK
  // =========================================================

  // Make the line thicker.
  p.strokeWeight(8);

  // Draw the bright upper part of the disk.
  p.arc(
    cx,
    cy,
    500,
    105,
    Math.PI,
    Math.PI * 2
  );

  // Draw the bright lower part.
  p.arc(
    cx,
    cy,
    500,
    105,
    0,
    Math.PI
  );

  // =========================================================
  // COVER THE CENTER AGAIN
  // =========================================================

  // Remove the outline.
  p.noStroke();

  // Make the center black.
  p.fill(0);

  // Draw the event horizon again.
  p.circle(cx, cy, 220);

  // =========================================================
  // DISTORTED LIGHT
  // =========================================================

  // Remove filling.
  p.noFill();

  // Make the light gray.
  p.stroke(220);

  // Make it thin.
  p.strokeWeight(2);

  // Draw a curved light arc above the black hole.
  p.arc(
    cx,
    cy,
    410,
    100,
    Math.PI + 0.1,
    Math.PI * 2 - 0.1
  );

  // Draw another curved light arc.
  p.arc(
    cx,
    cy,
    440,
    115,
    Math.PI + 0.2,
    Math.PI * 2 - 0.2
  );

  // =========================================================
  // FINAL EVENT HORIZON
  // =========================================================

  // Remove the outline.
  p.noStroke();

  // Make the center completely black.
  p.fill(0);

  // Draw the final black hole.
  p.circle(cx, cy, 215);

  // =========================================================
  // A FEW BRIGHT STARS
  // =========================================================

  // Make the stars white.
  p.fill(255);

  // Draw larger stars.
  p.circle(50, 150, 3);
  p.circle(w - 50, 180, 4);
  p.circle(70, 350, 3);
  p.circle(w - 70, 400, 3);
  p.circle(45, 850, 4);
  p.circle(w - 50, 900, 3);

  // =========================================================
  // FINISH
  // =========================================================

  // Remove any remaining outline.
  p.noStroke();
}
