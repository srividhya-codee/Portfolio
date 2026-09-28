import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroWorkstationScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    // Key Light (Cool white/cyan from top-front-right)
    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    // Rim Light (Soft violet from behind-left)
    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.8);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Screen Glow Point Light (Soft cyan emissive onto desk)
    const screenGlow = new THREE.PointLight(0x38bdf8, 3.5, 3.5, 1.2);
    screenGlow.position.set(0, 1.6, 0.4);
    scene.add(screenGlow);

    // Laptop Screen Point Light (Soft blue)
    const laptopGlow = new THREE.PointLight(0x60a5fa, 1.8, 2.0);
    laptopGlow.position.set(1.1, 0.7, 1.1);
    scene.add(laptopGlow);

    // --- Materials ---
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.35,
      metalness: 0.85
    });

    const brushedAlumMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.25,
      metalness: 0.9
    });

    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.45,
      metalness: 0.6
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5
    });

    // --- Workstation Desk ---
    const deskGroup = new THREE.Group();

    // Desk top surface
    const deskGeo = new THREE.BoxGeometry(4.2, 0.08, 1.8);
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.set(0, 0.3, 0.4);
    deskGroup.add(deskMesh);

    // Desk frame trim (beveled edge)
    const deskTrimGeo = new THREE.BoxGeometry(4.24, 0.02, 1.84);
    const deskTrimMesh = new THREE.Mesh(deskTrimGeo, brushedAlumMat);
    deskTrimMesh.position.set(0, 0.26, 0.4);
    deskGroup.add(deskTrimMesh);

    // Desk legs (minimalist angular pillars)
    const legGeo = new THREE.BoxGeometry(0.08, 1.8, 1.5);
    const leftLeg = new THREE.Mesh(legGeo, darkMetalMat);
    leftLeg.position.set(-1.8, -0.6, 0.4);
    deskGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, darkMetalMat);
    rightLeg.position.set(1.8, -0.6, 0.4);
    deskGroup.add(rightLeg);

    // --- Ultra-Wide Curved Monitor ---
    const monitorGroup = new THREE.Group();

    // Stand base
    const standBaseGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.03, 32);
    const standBase = new THREE.Mesh(standBaseGeo, brushedAlumMat);
    standBase.position.set(0, 0.35, -0.05);
    monitorGroup.add(standBase);

    // Stand column
    const standColGeo = new THREE.BoxGeometry(0.08, 1.0, 0.12);
    const standCol = new THREE.Mesh(standColGeo, brushedAlumMat);
    standCol.position.set(0, 0.85, -0.15);
    standCol.rotation.x = -0.1;
    monitorGroup.add(standCol);

    // Curved Screen Mesh (Curved Cylinder Slice)
    const screenWidth = 2.4;
    const screenHeight = 0.95;
    const curveRadius = 3.6;
    const arcLength = screenWidth / curveRadius;
    const screenGeo = new THREE.CylinderGeometry(
      curveRadius,
      curveRadius,
      screenHeight,
      48,
      1,
      true,
      -arcLength / 2 + Math.PI,
      arcLength
    );

    // Generate Code Screen Texture via HTML Canvas
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 512;
    const ctx = codeCanvas.getContext('2d')!;

    // Draw Dark IDE UI
    ctx.fillStyle = '#080c14';
    ctx.fillRect(0, 0, 1024, 512);

    // Top editor tab bar
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 40);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(20, 0, 180, 36);
    ctx.fillStyle = '#080c14';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillText('• BharatIntelligence.py', 32, 24);

    ctx.fillStyle = '#64748b';
    ctx.fillText('SmartParkEngine.ts', 220, 24);
    ctx.fillText('RAG_StateGraph.py', 410, 24);

    // Code lines
    ctx.font = '16px "JetBrains Mono", monospace';
    const lines = [
      { text: 'import torch', color: '#c084fc' },
      { text: 'from langgraph.graph import StateGraph, END', color: '#c084fc' },
      { text: 'from sklearn.ensemble import GradientBoostingRegressor', color: '#c084fc' },
      { text: 'import shap', color: '#c084fc' },
      { text: '', color: '#ffffff' },
      { text: '# --- Sri Vidhya A: AI & Data Science Engineering Pipeline ---', color: '#64748b' },
      { text: 'class InfrastructureRiskEngine:', color: '#38bdf8' },
      { text: '    def __init__(self, evm_indices, spatial_filings):', color: '#f1f5f9' },
      { text: '        self.spi = evm_indices["SPI"] # EV / PV', color: '#94a3b8' },
      { text: '        self.cpi = evm_indices["CPI"] # EV / AC', color: '#94a3b8' },
      { text: '        self.risk_model = GradientBoostingRegressor(n_estimators=300)', color: '#34d399' },
      { text: '        self.explainer = shap.TreeExplainer(self.risk_model)', color: '#34d399' },
      { text: '', color: '#ffffff' },
      { text: '    def forecast_project_overrun(self, project_vector):', color: '#38bdf8' },
      { text: '        delay_days = self.risk_model.predict(project_vector)', color: '#f1f5f9' },
      { text: '        attributions = self.explainer.shap_values(project_vector)', color: '#f1f5f9' },
      { text: '        return {"delay_days": delay_days, "shap_weights": attributions}', color: '#38bdf8' },
      { text: '', color: '#ffffff' },
      { text: '// STATUS: Model Invariants Verified · 0 Hallucinations · Accuracy 99.4%', color: '#34d399' },
    ];

    lines.forEach((l, i) => {
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, 36, 75 + i * 22);
    });

    // Right side miniature loss plot & vector visualization on the screen
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(780, 320);
    ctx.bezierCurveTo(820, 280, 880, 160, 980, 120);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Training Loss: 0.0018', 780, 95);
    ctx.fillStyle = '#34d399';
    ctx.fillText('RAG Index: Active', 780, 360);
    ctx.fillText('LangGraph: Ready', 780, 390);

    const screenTexture = new THREE.CanvasTexture(codeCanvas);
    screenTexture.anisotropy = 8;

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.FrontSide
    });

    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.45, -curveRadius);
    monitorGroup.add(screenMesh);

    // Monitor bezel casing (outer curve)
    const bezelGeo = new THREE.CylinderGeometry(
      curveRadius + 0.02,
      curveRadius + 0.02,
      screenHeight + 0.06,
      48,
      1,
      true,
      -arcLength / 2 + Math.PI,
      arcLength
    );
    const bezelMesh = new THREE.Mesh(bezelGeo, darkMetalMat);
    bezelMesh.position.set(0, 1.45, -curveRadius);
    monitorGroup.add(bezelMesh);

    deskGroup.add(monitorGroup);

    // --- 3D Laptop on Desk ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(1.15, 0.35, 0.45);
    laptopGroup.rotation.y = -0.35;

    // Laptop base
    const lapBaseGeo = new THREE.BoxGeometry(0.55, 0.02, 0.4);
    const lapBase = new THREE.Mesh(lapBaseGeo, brushedAlumMat);
    laptopGroup.add(lapBase);

    // Trackpad
    const trackGeo = new THREE.BoxGeometry(0.18, 0.005, 0.12);
    const trackMesh = new THREE.Mesh(trackGeo, darkMetalMat);
    trackMesh.position.set(0, 0.012, 0.1);
    laptopGroup.add(trackMesh);

    // Keyboard glow panel
    const keybGeo = new THREE.BoxGeometry(0.48, 0.005, 0.2);
    const keybMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const keybMesh = new THREE.Mesh(keybGeo, keybMat);
    keybMesh.position.set(0, 0.012, -0.06);
    laptopGroup.add(keybMesh);

    // Laptop screen lid
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.01, -0.19);
    lidGroup.rotation.x = -1.95; // angled open

    const lidCasingGeo = new THREE.BoxGeometry(0.55, 0.38, 0.015);
    const lidCasing = new THREE.Mesh(lidCasingGeo, brushedAlumMat);
    lidCasing.position.set(0, 0.19, 0);
    lidGroup.add(lidCasing);

    // Laptop display texture
    const lapScreenCanvas = document.createElement('canvas');
    lapScreenCanvas.width = 512;
    lapScreenCanvas.height = 360;
    const lCtx = lapScreenCanvas.getContext('2d')!;
    lCtx.fillStyle = '#05070a';
    lCtx.fillRect(0, 0, 512, 360);
    lCtx.fillStyle = '#38bdf8';
    lCtx.font = '22px monospace';
    lCtx.fillText('$ python -m train_genai_agent', 25, 45);
    lCtx.fillStyle = '#34d399';
    lCtx.fillText('✔ Dataset: Infrastructure GovLogs', 25, 85);
    lCtx.fillText('✔ GradientBoosting: 500 estimators', 25, 125);
    lCtx.fillText('✔ SHAP Explanations Computed', 25, 165);
    lCtx.fillText('✔ SmartPark Gateway: Online (Port 3000)', 25, 205);
    lCtx.fillStyle = '#c084fc';
    lCtx.fillText('Sri Vidhya A · AI & Data Science', 25, 300);

    const lapScreenTex = new THREE.CanvasTexture(lapScreenCanvas);
    const lapScreenMat = new THREE.MeshBasicMaterial({ map: lapScreenTex });
    const lapScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.51, 0.34), lapScreenMat);
    lapScreenMesh.position.set(0, 0.19, 0.009);
    lidGroup.add(lapScreenMesh);

    laptopGroup.add(lidGroup);
    deskGroup.add(laptopGroup);

    // --- Floating Holographic Panels ---
    const holoGroup = new THREE.Group();

    // Floating Holographic Screen 1 (Left - EVM & Architecture)
    const holoCanvas1 = document.createElement('canvas');
    holoCanvas1.width = 512;
    holoCanvas1.height = 512;
    const hCtx1 = holoCanvas1.getContext('2d')!;
    hCtx1.fillStyle = 'rgba(7, 12, 22, 0.85)';
    hCtx1.fillRect(0, 0, 512, 512);
    hCtx1.strokeStyle = '#38bdf8';
    hCtx1.lineWidth = 8;
    hCtx1.strokeRect(4, 4, 504, 504);
    hCtx1.fillStyle = '#38bdf8';
    hCtx1.font = 'bold 28px "JetBrains Mono", monospace';
    hCtx1.fillText('SYSTEM ARCHITECTURE', 30, 60);
    hCtx1.fillStyle = '#94a3b8';
    hCtx1.font = '20px "JetBrains Mono", monospace';
    hCtx1.fillText('EVM Physical-Financial Lead', 30, 110);
    hCtx1.fillText('SPI: 0.94 | CPI: 1.02', 30, 145);
    hCtx1.fillText('RAG Semantic Search: Active', 30, 180);
    hCtx1.fillText('LangGraph State Flow: Secure', 30, 215);

    // Decorative grid pattern
    hCtx1.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    hCtx1.lineWidth = 1;
    for (let i = 0; i < 512; i += 32) {
      hCtx1.beginPath();
      hCtx1.moveTo(i, 250);
      hCtx1.lineTo(i, 490);
      hCtx1.stroke();
    }

    const holoTex1 = new THREE.CanvasTexture(holoCanvas1);
    const holoMat1 = new THREE.MeshBasicMaterial({
      map: holoTex1,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const holoMesh1 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), holoMat1);
    holoMesh1.position.set(-1.8, 1.7, 0.2);
    holoMesh1.rotation.y = 0.55;
    holoMesh1.rotation.x = -0.05;
    holoGroup.add(holoMesh1);

    // Floating Holographic Screen 2 (Right - Smart Parking Real-time Sensor Grid)
    const holoCanvas2 = document.createElement('canvas');
    holoCanvas2.width = 512;
    holoCanvas2.height = 380;
    const hCtx2 = holoCanvas2.getContext('2d')!;
    hCtx2.fillStyle = 'rgba(7, 12, 22, 0.85)';
    hCtx2.fillRect(0, 0, 512, 380);
    hCtx2.strokeStyle = '#818cf8';
    hCtx2.lineWidth = 6;
    hCtx2.strokeRect(3, 3, 506, 374);
    hCtx2.fillStyle = '#818cf8';
    hCtx2.font = 'bold 24px "JetBrains Mono", monospace';
    hCtx2.fillText('SMART_PARK TELEMETRY', 30, 50);
    hCtx2.fillStyle = '#34d399';
    hCtx2.font = '20px "JetBrains Mono", monospace';
    hCtx2.fillText('Sector 4 Multi-Deck Node', 30, 95);
    hCtx2.fillText('Available Slots: 5 / 12', 30, 130);
    hCtx2.fillText('Occupancy Rate: 58%', 30, 165);
    hCtx2.fillText('Location: Chennai, India', 30, 200);

    const holoTex2 = new THREE.CanvasTexture(holoCanvas2);
    const holoMat2 = new THREE.MeshBasicMaterial({
      map: holoTex2,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const holoMesh2 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.9), holoMat2);
    holoMesh2.position.set(1.9, 1.8, -0.1);
    holoMesh2.rotation.y = -0.6;
    holoGroup.add(holoMesh2);

    scene.add(holoGroup);

    // --- Floating 3D Geometric / AI & Programming Objects ---
    const floatingObjects: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number }; initialY: number; floatSpeed: number }[] = [];

    // Metallic Icosahedron (Representing Complex Machine Learning Geometry)
    const icoGeo = new THREE.IcosahedronGeometry(0.18, 0);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-1.3, 2.3, 0.6);
    scene.add(icoMesh);
    floatingObjects.push({ mesh: icoMesh, rotSpeed: { x: 0.01, y: 0.015, z: 0.005 }, initialY: 2.3, floatSpeed: 1.5 });

    // Glass Crystal Torus (Mathematical Topology / Tensor operations)
    const torusGeo = new THREE.TorusGeometry(0.16, 0.05, 16, 32);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0xc084fc,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.8
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(1.4, 2.4, 0.3);
    scene.add(torusMesh);
    floatingObjects.push({ mesh: torusMesh, rotSpeed: { x: 0.008, y: 0.012, z: 0.01 }, initialY: 2.4, floatSpeed: 1.2 });

    // Floating Octahedron (Gradient Boosting decision nodes)
    const octGeo = new THREE.OctahedronGeometry(0.14, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.8,
      roughness: 0.2
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(-0.7, 2.6, -0.5);
    scene.add(octMesh);
    floatingObjects.push({ mesh: octMesh, rotSpeed: { x: 0.015, y: 0.01, z: 0.008 }, initialY: 2.6, floatSpeed: 1.8 });

    // Floating Code Block Cube (Representing Software Systems)
    const cubeGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      metalness: 0.6,
      roughness: 0.3
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(0.8, 2.6, -0.6);
    scene.add(cubeMesh);
    floatingObjects.push({ mesh: cubeMesh, rotSpeed: { x: 0.01, y: 0.014, z: 0.012 }, initialY: 2.6, floatSpeed: 1.4 });

    // --- Floating Ambient Dust / Data Particles ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = Math.random() * 4;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.025,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    scene.add(deskGroup);

    // --- Interactive Mouse Parallax & Smooth Rotation ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.25;
    };

    const handleMouseEnter = () => setIsInteracting(true);
    const handleMouseLeave = () => {
      setIsInteracting(false);
      targetX = 0;
      targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation with mouse coordinates
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = 1.8 + mouseY * 0.5;
      camera.lookAt(0, 1.25, 0);

      // Gentle floating animation for 3D objects
      floatingObjects.forEach((obj, idx) => {
        obj.mesh.rotation.x += obj.rotSpeed.x;
        obj.mesh.rotation.y += obj.rotSpeed.y;
        obj.mesh.rotation.z += obj.rotSpeed.z;
        obj.mesh.position.y = obj.initialY + Math.sin(elapsedTime * obj.floatSpeed + idx) * 0.08;
      });

      // Subtle breathing motion for holographic panels
      holoMesh1.position.y = 1.7 + Math.sin(elapsedTime * 1.1) * 0.04;
      holoMesh2.position.y = 1.8 + Math.cos(elapsedTime * 1.3) * 0.04;

      // Slow particle drift
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[540px] sm:h-[600px] lg:h-[660px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-800/80 bg-gradient-to-b from-[#0a0f1d]/90 via-[#07090e] to-[#07090e] shadow-[0_0_50px_rgba(56,189,248,0.06)]"
      title="Interactive 3D Workstation: Move your cursor to explore perspective and depth"
    >
      {/* 3D Viewport HUD indicator */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D WORKSPACE VIEWPORT</span>
      </div>

      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <span>Cursor Parallax Active · Three.js Depth Camera</span>
      </div>
    </div>
  );
};
