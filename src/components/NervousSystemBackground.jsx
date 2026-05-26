import React, { useEffect, useRef } from 'react';

/**
 * PhysioBackground — background image with animated pain areas
 *  • Background image from uploads/123.jpg positioned center-right
 *  • Image positioned so person is NOT in left corner
 *  • Animated red pain glow overlay on pain areas
 *  • Pulsing red animation for pain zones
 */
export default function NervousSystemBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0;
    let animId;
    let t = 0;
    let backgroundImage = null;
    let imageLoaded = false;

    // Load the background image
    const img = new Image();
    img.src = '/uploads/123.jpg';
    img.onload = () => {
      backgroundImage = img;
      imageLoaded = true;
    };
    img.onerror = () => {
      console.warn('Background image not loaded: /uploads/123.jpg');
    };

    // ── Pain Areas Definition ──────────────────────────────────────────────
    // Define multiple pain points relative to image (normalized coordinates)
    const painAreas = [
      { name: 'neck', x: 0.5, y: 0.2, radius: 0.08, intensity: 1.0, basePhase: 0 },
      { name: 'upper-back', x: 0.5, y: 0.35, radius: 0.1, intensity: 0.85, basePhase: 1.2 },
      { name: 'lower-back', x: 0.5, y: 0.55, radius: 0.12, intensity: 0.7, basePhase: 2.4 },
      { name: 'shoulder-right', x: 0.6, y: 0.28, radius: 0.07, intensity: 0.65, basePhase: 0.8 },
    ];

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ── Draw Background Image ──────────────────────────────────────────────
    const drawBackground = () => {
      if (!imageLoaded || !backgroundImage) {
        // Fallback gradient if image not loaded
        const gr = ctx.createLinearGradient(0, 0, width, height);
        gr.addColorStop(0, '#0a0f1f');
        gr.addColorStop(1, '#1a1f3a');
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, width, height);
        return;
      }

      // Calculate image dimensions to fit the container
      // Position image center-right so person is NOT on left
      const imgAspect = backgroundImage.width / backgroundImage.height;
      const containerAspect = width / height;

      let imgDisplayWidth, imgDisplayHeight, offsetX, offsetY;

      if (imgAspect > containerAspect) {
        // Image is wider: fit to height
        imgDisplayHeight = height;
        imgDisplayWidth = height * imgAspect;
        offsetY = 0;
        // Position image center-right (person won't be on left)
        offsetX = Math.max(0, width - imgDisplayWidth) * 0.3; // Shift right
      } else {
        // Image is taller: fit to width
        imgDisplayWidth = width;
        imgDisplayHeight = width / imgAspect;
        offsetX = 0;
        // Center vertically
        offsetY = (height - imgDisplayHeight) * 0.5;
      }

      // Draw the background image
      ctx.drawImage(
        backgroundImage,
        offsetX,
        offsetY,
        imgDisplayWidth,
        imgDisplayHeight
      );

      // Add a subtle dark overlay to darken the image slightly
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
    };

    // ── Draw Animated Pain Overlays ────────────────────────────────────────
    const drawPainAreas = () => {
      painAreas.forEach(pain => {
        // Calculate absolute position on canvas
        const painX = pain.x * width;
        const painY = pain.y * height;

        // Calculate pulsing animation
        const basePhase = pain.basePhase || 0;
        const pulse1 = 0.4 + 0.6 * Math.sin(t * 0.8 + basePhase);
        const pulse2 = 0.3 + 0.7 * Math.sin(t * 0.55 + basePhase + Math.PI * 0.5);

        const baseRadius = pain.radius * width;

        // ── Outer expanding halo (bright red) ──────────────────────────────
        const outerR = baseRadius * (1.2 + 0.4 * pulse1);
        const pg = ctx.createRadialGradient(painX, painY, 0, painX, painY, outerR);
        pg.addColorStop(0, `rgba(255, 60, 20, ${0.4 * pain.intensity * pulse1})`);
        pg.addColorStop(0.4, `rgba(235, 30, 10, ${0.25 * pain.intensity * pulse1})`);
        pg.addColorStop(0.7, `rgba(180, 0, 0, ${0.1 * pain.intensity * pulse1})`);
        pg.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(painX, painY, outerR, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();

        // ── Inner pulsing core (intense red) ───────────────────────────────
        const innerR = baseRadius * (0.6 + 0.3 * pulse2);
        const ig = ctx.createRadialGradient(painX, painY, 0, painX, painY, innerR);
        ig.addColorStop(0, `rgba(255, 100, 40, ${0.65 * pain.intensity * pulse2})`);
        ig.addColorStop(0.6, `rgba(255, 60, 20, ${0.35 * pain.intensity * pulse2})`);
        ig.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(painX, painY, innerR, 0, Math.PI * 2);
        ctx.fillStyle = ig;
        ctx.fill();

        // ── Ripple effect (expanding wave) ─────────────────────────────────
        const ripplePhase = (t * 1.0 + basePhase) % (Math.PI * 2);
        const rippleExpand = Math.sin(ripplePhase);
        if (rippleExpand > 0.1) {
          const ripR = baseRadius * rippleExpand * 1.5;
          const innerRipR = Math.max(0, ripR - 8);
          const rg = ctx.createRadialGradient(painX, painY, innerRipR, painX, painY, ripR);
          rg.addColorStop(0, `rgba(255, 80, 40, ${0.3 * pain.intensity * (1 - rippleExpand)})`);
          rg.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(painX, painY, ripR, 0, Math.PI * 2);
          ctx.fillStyle = rg;
          ctx.fill();
        }
      });
    };

    // ── Main animation loop ────────────────────────────────────────────────
    const animate = () => {
      t += 0.01;

      // Draw background image
      drawBackground();

      // Draw animated pain overlays
      drawPainAreas();

      // Add subtle vignette effect to focus attention
      const vignetteGr = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
      vignetteGr.addColorStop(0, 'transparent');
      vignetteGr.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = vignetteGr;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="nervous-system-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#040810',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Text readability overlay — left half stays dark */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '55%',
          background: 'linear-gradient(to right, rgba(4,8,16,0.96) 35%, rgba(4,8,16,0.75) 65%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '14vh',
          background: 'linear-gradient(to top, #040810, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Top fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8vh',
          background: 'linear-gradient(to bottom, rgba(4,8,16,0.8), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
