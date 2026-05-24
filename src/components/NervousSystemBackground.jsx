import React, { useEffect, useRef } from 'react';

export default function NervousSystemBackground() {
  const canvasRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const targetScrollProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;

    // Set dimensions based on container and device pixel ratio
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resize);
    resize();

    // Listen to scroll to update target progress and calculate scroll velocity
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        targetScrollProgressRef.current = scrollY / maxScroll;
      } else {
        targetScrollProgressRef.current = 0;
      }

      // Calculate velocity
      const diff = scrollY - lastScrollYRef.current;
      scrollVelocityRef.current = Math.min(Math.abs(diff) * 0.1, 8); // clamp velocity
      lastScrollYRef.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    // Define Anatomy and Nerve Curves
    // The canvas is assumed to be on the right side of the screen.
    // The body split will run vertically down the left edge of the canvas (x = 20).
    // The profile outline curves to the right (x > 20).
    
    // Evaluate Bezier curves to precompute coordinate tables for nerve paths
    const getQuadraticPoint = (p0, p1, p2, t) => {
      const mt = 1 - t;
      return {
        x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
        y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y
      };
    };

    const getCubicPoint = (p0, p1, p2, p3, t) => {
      const mt = 1 - t;
      return {
        x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
        y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y
      };
    };

    // Precompute a set of points along a curve
    const precomputeCurve = (points, type = 'quadratic', steps = 60) => {
      const curvePoints = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        if (type === 'quadratic') {
          curvePoints.push(getQuadraticPoint(points[0], points[1], points[2], t));
        } else if (type === 'cubic') {
          curvePoints.push(getCubicPoint(points[0], points[1], points[2], points[3], t));
        } else {
          // Linear
          curvePoints.push({
            x: points[0].x + (points[1].x - points[0].x) * t,
            y: points[0].y + (points[1].y - points[0].y) * t
          });
        }
      }
      return curvePoints;
    };

    // Particles (electrical impulses) running along the nerves
    let particles = [];

    const spawnParticle = (pathIndex, reverse = false) => {
      particles.push({
        pathIndex,
        t: reverse ? 1 : 0,
        speed: 0.008 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 2,
        reverse,
        color: Math.random() > 0.4 ? '#00f2fe' : '#4facfe'
      });
    };

    // Nerve curves will be dynamically defined relative to width & height in the render loop.
    // This allows the animation to scale beautifully on resize.
    let paths = [];

    const buildNerves = () => {
      const splitX = 30; // split line near left edge of canvas
      const centerY = height * 0.45; // center of chest/torso
      
      const brainCenter = { x: splitX + 5, y: height * 0.12 };
      const spineStart = { x: splitX + 5, y: height * 0.16 };
      const spineEnd = { x: splitX + 5, y: height * 0.85 };

      paths = [];

      // Path 0: Spine (central trunk)
      paths.push({
        name: 'spine',
        points: precomputeCurve([spineStart, spineEnd], 'linear', 100),
        activationThreshold: 0.05 // starts activating early
      });

      // Paths 1-4: Brain gyres (loops at the top)
      paths.push({
        name: 'brain-1',
        points: precomputeCurve([
          brainCenter,
          { x: brainCenter.x + 35, y: brainCenter.y - 40 },
          { x: brainCenter.x + 60, y: brainCenter.y },
          { x: brainCenter.x, y: brainCenter.y + 15 }
        ], 'cubic', 40),
        activationThreshold: 0.0
      });
      paths.push({
        name: 'brain-2',
        points: precomputeCurve([
          brainCenter,
          { x: brainCenter.x + 20, y: brainCenter.y - 60 },
          { x: brainCenter.x + 55, y: brainCenter.y - 20 },
          brainCenter
        ], 'cubic', 40),
        activationThreshold: 0.0
      });
      paths.push({
        name: 'brain-3',
        points: precomputeCurve([
          { x: brainCenter.x, y: brainCenter.y - 15 },
          { x: brainCenter.x + 40, y: brainCenter.y - 10 },
          { x: brainCenter.x + 20, y: brainCenter.y + 20 },
          brainCenter
        ], 'cubic', 40),
        activationThreshold: 0.0
      });

      // Path 5: Cervical Nerve (Neck to upper back)
      const cervicalPoint = { x: splitX + 5, y: height * 0.22 };
      paths.push({
        name: 'neck-nerve',
        points: precomputeCurve([
          cervicalPoint,
          { x: splitX + 45, y: cervicalPoint.y + 10 },
          { x: splitX + 70, y: cervicalPoint.y + 35 }
        ], 'quadratic', 40),
        activationThreshold: 0.12
      });

      // Path 6: Shoulder & Arm Nerve (Cervical to hand)
      const shoulderJoint = { x: splitX + 75, y: height * 0.28 };
      const elbowJoint = { x: splitX + 115, y: height * 0.45 };
      const handLocation = { x: splitX + 140, y: height * 0.65 };
      paths.push({
        name: 'arm-nerve-main',
        points: precomputeCurve([
          cervicalPoint,
          shoulderJoint,
          elbowJoint,
          handLocation
        ], 'cubic', 80),
        activationThreshold: 0.15
      });

      // Path 7: Secondary arm branch
      paths.push({
        name: 'arm-nerve-branch',
        points: precomputeCurve([
          shoulderJoint,
          { x: shoulderJoint.x + 35, y: shoulderJoint.y + 80 },
          { x: elbowJoint.x - 10, y: elbowJoint.y + 70 }
        ], 'quadratic', 50),
        activationThreshold: 0.22
      });

      // Paths 8-11: Thoracic Nerves (Rib cage area)
      const t1 = { x: splitX + 5, y: height * 0.32 };
      paths.push({
        name: 'rib-nerve-1',
        points: precomputeCurve([t1, { x: splitX + 65, y: t1.y + 20 }, { x: splitX + 85, y: t1.y + 50 }], 'quadratic', 40),
        activationThreshold: 0.28
      });

      const t2 = { x: splitX + 5, y: height * 0.42 };
      paths.push({
        name: 'rib-nerve-2',
        points: precomputeCurve([t2, { x: splitX + 75, y: t2.y + 15 }, { x: splitX + 95, y: t2.y + 45 }], 'quadratic', 40),
        activationThreshold: 0.38
      });

      const t3 = { x: splitX + 5, y: height * 0.52 };
      paths.push({
        name: 'rib-nerve-3',
        points: precomputeCurve([t3, { x: splitX + 65, y: t3.y + 10 }, { x: splitX + 80, y: t3.y + 40 }], 'quadratic', 40),
        activationThreshold: 0.48
      });

      // Path 12: Lumbar / Abdominal Nerve
      const l1 = { x: splitX + 5, y: height * 0.62 };
      paths.push({
        name: 'abdominal-nerve',
        points: precomputeCurve([l1, { x: splitX + 50, y: l1.y + 15 }, { x: splitX + 70, y: l1.y + 45 }], 'quadratic', 40),
        activationThreshold: 0.58
      });

      // Paths 13-15: Pelvic & Leg Nerves (Sciatic branches)
      const sciaticStart = { x: splitX + 5, y: height * 0.72 };
      const hipJoint = { x: splitX + 45, y: height * 0.78 };
      const kneeLocation = { x: splitX + 65, y: height * 0.94 };
      paths.push({
        name: 'sciatic-nerve',
        points: precomputeCurve([
          sciaticStart,
          hipJoint,
          { x: hipJoint.x + 10, y: hipJoint.y + 70 },
          kneeLocation
        ], 'cubic', 70),
        activationThreshold: 0.68
      });

      paths.push({
        name: 'femoral-branch',
        points: precomputeCurve([
          sciaticStart,
          { x: splitX + 25, y: sciaticStart.y + 35 },
          { x: splitX + 40, y: height * 0.92 }
        ], 'quadratic', 40),
        activationThreshold: 0.75
      });
    };

    // Draw the body silhouette
    const drawSilhouette = (progress) => {
      const splitX = 30;
      ctx.beginPath();
      
      // Draw vertically split body silhouette on the right side
      // Starting from top center split (x = 30, y = height * 0.05)
      ctx.moveTo(splitX, height * 0.05);
      
      // Head Profile
      ctx.bezierCurveTo(splitX + 60, height * 0.04, splitX + 70, height * 0.16, splitX + 15, height * 0.18);
      // Neck
      ctx.quadraticCurveTo(splitX + 15, height * 0.20, splitX + 35, height * 0.23);
      // Shoulder
      ctx.bezierCurveTo(splitX + 85, height * 0.23, splitX + 105, height * 0.27, splitX + 90, height * 0.32);
      // Arm Outer
      ctx.bezierCurveTo(splitX + 150, height * 0.45, splitX + 175, height * 0.60, splitX + 150, height * 0.68);
      // Hand
      ctx.bezierCurveTo(splitX + 130, height * 0.72, splitX + 115, height * 0.68, splitX + 105, height * 0.60);
      // Torso / Waist Inner
      ctx.quadraticCurveTo(splitX + 65, height * 0.50, splitX + 60, height * 0.65);
      // Hip
      ctx.bezierCurveTo(splitX + 75, height * 0.73, splitX + 80, height * 0.85, splitX + 45, height * 0.96);
      // Leg Bottom Split
      ctx.lineTo(splitX, height * 0.96);
      
      // Close path along the split line
      ctx.lineTo(splitX, height * 0.05);

      // Create glowing gradient for body silhouette
      const grad = ctx.createLinearGradient(splitX, 0, splitX + 120, 0);
      grad.addColorStop(0, `rgba(79, 172, 254, ${0.04 + progress * 0.04})`);
      grad.addColorStop(1, 'rgba(0, 242, 254, 0.01)');
      
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke silhouette outline with a very subtle glow
      ctx.strokeStyle = `rgba(0, 242, 254, ${0.08 + progress * 0.12})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Core Animation Loop
    let lastTime = 0;
    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Lerp Scroll Progress for butter-smooth animation
      // Linear interpolation makes scrolling feel tactile and premium
      const scrollDiff = targetScrollProgressRef.current - scrollProgressRef.current;
      scrollProgressRef.current += scrollDiff * 0.08; // speed of convergence

      const progress = scrollProgressRef.current;

      // Rebuild nerves (handling resizing)
      buildNerves();

      // Draw silhouette
      drawSilhouette(progress);

      // Randomly spawn electrical signals based on scroll velocity and progress
      const velocity = scrollVelocityRef.current;
      const spawnChance = 0.02 + (progress * 0.08) + (velocity * 0.15);
      
      if (Math.random() < spawnChance && paths.length > 0) {
        // Spawn from brain or active spine point
        const activePaths = paths.filter(p => progress >= p.activationThreshold);
        if (activePaths.length > 0) {
          const randomPathIndex = paths.indexOf(activePaths[Math.floor(Math.random() * activePaths.length)]);
          spawnParticle(randomPathIndex);
        }
      }

      // Decelerate velocity
      scrollVelocityRef.current *= 0.95;

      // Draw Nerve Network
      paths.forEach((path) => {
        // Decide how much of the nerve is "charged" based on scroll progress
        // A nerve starts to light up once scroll progress crosses its activation threshold
        let chargePercentage = 0;
        if (progress > path.activationThreshold) {
          // Map the remaining scroll from threshold to 1.0 to the path's activation
          const range = 1.0 - path.activationThreshold;
          chargePercentage = Math.min((progress - path.activationThreshold) / (range * 0.4), 1);
        }

        const visiblePointsCount = Math.floor(path.points.length * chargePercentage);

        // Draw Inactive/Dim Nerve Path
        ctx.beginPath();
        path.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = 'rgba(79, 172, 254, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Activated/Glowing Nerve Path (cyan glow)
        if (visiblePointsCount > 1) {
          ctx.beginPath();
          for (let i = 0; i < visiblePointsCount; i++) {
            const pt = path.points[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          
          // Glowing stroke styling
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 + progress * 0.45})`;
          ctx.lineWidth = 1.2 + progress * 0.8;
          ctx.stroke();
        }
      });

      // Update and Draw Particles (Electrical Signals)
      particles = particles.filter((p) => {
        const path = paths[p.pathIndex];
        if (!path) return false;

        // Move particle
        const speedBoost = 1.0 + scrollVelocityRef.current * 0.8;
        if (p.reverse) {
          p.t -= p.speed * speedBoost;
        } else {
          p.t += p.speed * speedBoost;
        }

        // Check bounds
        if (p.t > 1 || p.t < 0) return false;

        // Only render if the path is charged up to this point
        const chargePercentage = progress > path.activationThreshold 
          ? Math.min((progress - path.activationThreshold) / ((1 - path.activationThreshold) * 0.4), 1) 
          : 0;

        if (p.t > chargePercentage && !p.reverse) return true; // keep particle, but don't draw yet

        // Precompute target coordinates
        const pointIdx = Math.floor(p.t * (path.points.length - 1));
        const pt = path.points[pointIdx];

        if (pt) {
          // Draw Glowing Spark
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * (1 + progress * 0.5), 0, Math.PI * 2);
          
          // Core bright light
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Outer colored glow
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * 3 * (1 + progress * 0.5), 0, Math.PI * 2);
          const glowGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.size * 3 * (1 + progress * 0.5));
          glowGrad.addColorStop(0, p.color);
          glowGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '40vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }} className="nervous-system-container">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Radial overlay to blend canvas into background on smaller devices */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '150px',
        background: 'linear-gradient(to top, var(--bg-primary), transparent)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '50px',
        background: 'linear-gradient(to right, var(--bg-primary), transparent)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
