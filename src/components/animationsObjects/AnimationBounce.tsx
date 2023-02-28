import React, { useRef, useEffect } from 'react';
import db from 'firebase/app';
import 'firebase/firestore';
const BouncingBall = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const card = canvas.parentNode;

    // Set the canvas width and height
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;

    // Define the ball object
    const ball = {
      x: canvas.width / 2, // starting x position
      y: canvas.height / 2, // starting y position
      radius: 20, // ball radius
      speed: 5, // ball speed
      directionX: Math.random() < 0.5 ? -1 : 1, // random x direction
      directionY: Math.random() < 0.5 ? -1 : 1, // random y direction
    };

    // Define the draw function
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();

      // Move the ball
      ball.x += ball.speed * ball.directionX;
      ball.y += ball.speed * ball.directionY;

      // Save the ball position to the database
      db.firestore().collection('user').doc('ball').set({
        x: ball.x,
        y: ball.y,
      });

      // Check if the ball has hit a wall
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.directionX = -ball.directionX;
      }
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.directionY = -ball.directionY;
      }

      // Request the next frame
      requestAnimationFrame(draw);
    }

    // Start the animation
    requestAnimationFrame(draw);

    // Clean up
    return () => cancelAnimationFrame(requestAnimationFrame(draw));
  }, []);

  return (
    <div className="card" style={{ width: 300, height: 200 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default BouncingBall;
