
function isColliding(obj1, obj2) {
  const { x, y, width, height } = obj1.getBounds();
  const { x: obj2X, y: obj2Y, width: obj2Width, height: obj2Height } = obj2.getLocalBounds();

  return (
      x + width >= obj2X &&
      x <= obj2X + obj2Width &&
      y + height >= obj2Y &&
      y <= obj2Y + obj2Height
  );
}

function resolveCollision(obj1, obj2) {
  const obj1Bounds = obj1.getBounds();
  const obj2Bounds = obj2.getLocalBounds();

  const dx = (obj1Bounds.x + obj1Bounds.x + obj1Bounds.width) / 2 - (obj2Bounds.x + obj2Bounds.x + obj2Bounds.width) / 2;
  const dy = (obj1Bounds.y + obj1Bounds.y + obj1Bounds.height) / 2 - (obj2Bounds.y + obj2Bounds.y + obj2Bounds.height) / 2;

  const combinedHalfWidths = (obj1Bounds.width + obj2Bounds.width) / 2;
  const combinedHalfHeights = (obj1Bounds.height + obj2Bounds.height) / 2;

  if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
    const overlapX = combinedHalfWidths - Math.abs(dx);
    const overlapY = combinedHalfHeights - Math.abs(dy);

    if (overlapX >= overlapY) {
      if (dy > 0) {
        obj1.y += overlapY;
        obj1.ySpeed += gravity;
    } else {
        if (obj1.ySpeed > 0) {
          obj1.ySpeed = 0;
        }
        isOnGround = true;
        obj1.y -= overlapY;
      }
      return true;
    } else {
      if (dx > 0) {
        obj1.x += overlapX;
        isOnGround = true;
      } else {
        obj1.x -= overlapX;
        isOnGround = true;
      }
      return true;
    }
  }
}