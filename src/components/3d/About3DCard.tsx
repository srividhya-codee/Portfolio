import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const About3DCard: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 8);
    cyanLight.position.set(2.5, 2.5, 2.5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x818cf8, 3.0, 8);
    violetLight.position.set(-2.5, -2, 2.5);
    scene.add(violetLight);

    // Card Group
    const cardGroup = new THREE.Group();

    // 1. Draw High-Res Holographic Texture on 2D Canvas
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 1024;
    cardCanvas.height = 1360;
    const ctx = cardCanvas.getContext('2d')!;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1360);
    bgGrad.addColorStop(0, 'rgba(10, 16, 30, 0.96)');
    bgGrad.addColorStop(0.5, 'rgba(13, 22, 42, 0.94)');
    bgGrad.addColorStop(1, 'rgba(7, 11, 22, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1360);

    // Subtle holographic grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1360);
      ctx.stroke();
    }
    for (let y = 0; y < 1360; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Outer Glowing Border
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 964, 1300);

    ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 934, 1270);

    // Header Badge
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText('VERIFIED ACADEMIC & RESEARCH IDENTITY', 70, 105);

    // Glowing Divider
    const divGrad = ctx.createLinearGradient(70, 130, 954, 130);
    divGrad.addColorStop(0, '#38bdf8');
    divGrad.addColorStop(0.5, '#818cf8');
    divGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(70, 130);
    ctx.lineTo(954, 130);
    ctx.stroke();

    // Name & Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 74px "Syne", sans-serif';
    ctx.fillText('Sri Vidhya A', 70, 240);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AI & Data Science Student', 70, 300);

    // Academic Details Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.fillRect(70, 350, 884, 480);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(70, 350, 884, 480);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px "JetBrains Mono", monospace';
    ctx.fillText('DEGREE PROGRAM', 110, 410);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('B.Tech Artificial Intelligence and Data Science', 110, 460);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px "JetBrains Mono", monospace';
    ctx.fillText('COLLEGE INSTITUTION', 110, 550);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Easwari Engineering College', 110, 600);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px "JetBrains Mono", monospace';
    ctx.fillText('DEPARTMENT STATUS', 110, 690);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('2nd Year – 3rd Semester · Chennai, India', 110, 740);

    // Metrics Row
    // Metric 1: CGPA
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.fillRect(70, 870, 420, 200);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.strokeRect(70, 870, 420, 200);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('CUMULATIVE CGPA', 100, 920);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 64px "Syne", sans-serif';
    ctx.fillText('8.77 / 10', 100, 1000);

    ctx.fillStyle = '#34d399';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Top Decile Academic Standing', 100, 1040);

    // Metric 2: Graduation
    ctx.fillStyle = 'rgba(129, 140, 248, 0.12)';
    ctx.fillRect(534, 870, 420, 200);
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
    ctx.strokeRect(534, 870, 420, 200);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('EXPECTED GRADUATION', 564, 920);

    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 64px "Syne", sans-serif';
    ctx.fillText('2029', 564, 1000);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('12th Grade: 93.7%', 564, 1040);

    // Security & Verification Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '20px "JetBrains Mono", monospace';
    ctx.fillText('SHA-256: 8e4b7c29... AUTHENTICATED STUDENT RECORD', 70, 1140);
    ctx.fillText('GOAL: GENERATIVE AI ENGINEER / AI-ML RESEARCHER', 70, 1180);

    const cardTex = new THREE.CanvasTexture(cardCanvas);
    cardTex.anisotropy = 8;

    // Physical Glass Card Geometry (Rounded bevel box)
    const cardGeo = new THREE.BoxGeometry(2.1, 2.8, 0.08);
    const cardMat = new THREE.MeshPhysicalMaterial({
      map: cardTex,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.4,
      transparent: true,
      opacity: 0.95,
      ior: 1.5,
      reflectivity: 0.8
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardGroup.add(cardMesh);

    // Holographic Edge Rim (Glowing thin box frame)
    const edgeGeo = new THREE.BoxGeometry(2.14, 2.84, 0.09);
    const edgeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    cardGroup.add(edgeMesh);

    scene.add(cardGroup);

    // Floating Halo Particles around the Card
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.6 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.2;

      particlePos[i] = Math.cos(theta) * radius;
      particlePos[i + 1] = y;
      particlePos[i + 2] = Math.sin(theta) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactive Drag / Tilt Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Soft hover tilt
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = normX * 0.45;
        targetRotX = -normY * 0.3;
        return;
      }
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation toward target rotation
      cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y) * 0.08;
      cardGroup.rotation.x += (targetRotX - cardGroup.rotation.x) * 0.08;

      // Gentle floating sine motion
      cardGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;

      // Rotate particle halo
      particles.rotation.y = elapsed * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-800/80 bg-gradient-to-b from-[#0d1424]/90 via-[#07090e] to-[#07090e] shadow-2xl"
      title="3D Holographic Card: Click and drag to rotate in 3D space"
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D HOLOGRAPHIC CREDENTIAL</span>
      </div>
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-[11px] font-mono text-slate-400">
        Drag to rotate in 3D
      </div>
    </div>
  );
};
