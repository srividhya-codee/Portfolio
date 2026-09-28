import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Github, ArrowUpRight, ShieldCheck, Database, Brain, Sparkles } from 'lucide-react';

export const BharatCommand3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('ML Risk Engine');

  const techLabels = ['EVM', 'XGBoost', 'SHAP', 'RAG', 'LangGraph', 'ML Risk Engine'];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.8, 6.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.6);
    keyLight.position.set(5, 9, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x818cf8, 3.2, 10);
    rimLight.position.set(-3, 3, -2);
    scene.add(rimLight);

    const commandGroup = new THREE.Group();

    // 1. Base Terrain / Command Platform
    const baseGeo = new THREE.CylinderGeometry(2.6, 2.8, 0.18, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -0.09;
    commandGroup.add(base);

    // Platform holographic ring
    const ringGeo = new THREE.TorusGeometry(2.65, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    commandGroup.add(ring);

    // 2. Miniature Infrastructure Buildings (Skyscrapers / Civic Hubs)
    const buildingColors = [0x1e293b, 0x334155, 0x0f172a, 0x1e1b4b];
    const buildings: THREE.Mesh[] = [];

    const bPositions = [
      { x: -1.2, z: -0.8, w: 0.5, h: 1.4, d: 0.5 },
      { x: -0.6, z: -1.1, w: 0.4, h: 2.1, d: 0.4 },
      { x: 0.1, z: -1.3, w: 0.6, h: 1.8, d: 0.5 },
      { x: 0.9, z: -0.9, w: 0.5, h: 1.2, d: 0.5 },
      { x: -1.5, z: 0.2, w: 0.4, h: 0.9, d: 0.4 },
    ];

    bPositions.forEach((b, i) => {
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const bMat = new THREE.MeshStandardMaterial({
        color: buildingColors[i % buildingColors.length],
        roughness: 0.2,
        metalness: 0.7
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(b.x, b.h / 2, b.z);
      commandGroup.add(bMesh);
      buildings.push(bMesh);

      // Add roof accent light/beacon
      const roofGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const roofMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const roofBeacon = new THREE.Mesh(roofGeo, roofMat);
      roofBeacon.position.set(b.x, b.h + 0.05, b.z);
      commandGroup.add(roofBeacon);
    });

    // 3. Miniature Elevated Road / Highway Viaduct
    const highwayGroup = new THREE.Group();
    const roadGeo = new THREE.BoxGeometry(3.6, 0.04, 0.35);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const highway = new THREE.Mesh(roadGeo, roadMat);
    highway.position.set(0, 0.6, 0.4);
    highwayGroup.add(highway);

    // Highway pillars
    for (let px = -1.4; px <= 1.4; px += 0.7) {
      const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12);
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6 });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 0.3, 0.4);
      highwayGroup.add(pillar);
    }
    commandGroup.add(highwayGroup);

    // 4. Miniature High-Speed Railway Viaduct & Train Elements
    const railGroup = new THREE.Group();
    const railGeo = new THREE.BoxGeometry(3.2, 0.03, 0.22);
    const railMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const railway = new THREE.Mesh(railGeo, railMat);
    railway.position.set(0, 0.9, -0.2);
    railGroup.add(railway);

    // Miniature Train Model
    const trainGeo = new THREE.BoxGeometry(0.8, 0.08, 0.14);
    const trainMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
    const train = new THREE.Mesh(trainGeo, trainMat);
    train.position.set(-0.6, 0.96, -0.2);
    railGroup.add(train);

    // Rail pillars
    for (let rx = -1.2; rx <= 1.2; rx += 0.8) {
      const rPillarGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.9, 12);
      const rPillarMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5 });
      const rPillar = new THREE.Mesh(rPillarGeo, rPillarMat);
      rPillar.position.set(rx, 0.45, -0.2);
      railGroup.add(rPillar);
    }
    commandGroup.add(railGroup);

    // 5. Miniature Infrastructure Construction Crane
    const craneGroup = new THREE.Group();
    craneGroup.position.set(1.4, 0, 0.1);

    const mastGeo = new THREE.BoxGeometry(0.06, 1.8, 0.06);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = 0.9;
    craneGroup.add(mast);

    const jibGeo = new THREE.BoxGeometry(0.9, 0.05, 0.05);
    const jib = new THREE.Mesh(jibGeo, mastMat);
    jib.position.set(-0.25, 1.75, 0);
    craneGroup.add(jib);

    commandGroup.add(craneGroup);

    // 6. Floating Project Beacon Markers (Pulsing 3D Pins)
    const markerGroup = new THREE.Group();
    const markerPositions = [
      { x: -0.6, y: 2.3, z: -1.1 },
      { x: 0.9, y: 1.4, z: -0.9 },
      { x: -0.6, y: 1.2, z: 0.4 },
      { x: 1.4, y: 2.0, z: 0.1 }
    ];

    const markers: THREE.Mesh[] = [];
    markerPositions.forEach((pos) => {
      const mGeo = new THREE.OctahedronGeometry(0.08, 0);
      const mMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const mMesh = new THREE.Mesh(mGeo, mMat);
      mMesh.position.set(pos.x, pos.y, pos.z);
      markerGroup.add(mMesh);
      markers.push(mMesh);
    });
    commandGroup.add(markerGroup);

    // 7. Small Floating 3D Technology Labels
    // EVM, XGBoost, SHAP, RAG, LangGraph, ML Risk Engine
    const labelMeshGroups: THREE.Group[] = [];

    techLabels.forEach((label, i) => {
      const lGroup = new THREE.Group();
      const angle = (i / techLabels.length) * Math.PI * 2;
      const lx = Math.cos(angle) * 2.2;
      const lz = Math.sin(angle) * 2.2;
      const ly = 1.6 + Math.sin(i * 1.5) * 0.4;
      lGroup.position.set(lx, ly, lz);

      const lCanvas = document.createElement('canvas');
      lCanvas.width = 256;
      lCanvas.height = 70;
      const lCtx = lCanvas.getContext('2d')!;
      lCtx.fillStyle = 'rgba(10, 16, 30, 0.92)';
      lCtx.fillRect(0, 0, 256, 70);
      lCtx.strokeStyle = '#38bdf8';
      lCtx.lineWidth = 4;
      lCtx.strokeRect(2, 2, 252, 66);
      lCtx.fillStyle = '#ffffff';
      lCtx.font = 'bold 26px "JetBrains Mono", monospace';
      lCtx.textAlign = 'center';
      lCtx.textBaseline = 'middle';
      lCtx.fillText(label, 128, 35);

      const lTex = new THREE.CanvasTexture(lCanvas);
      const lMat = new THREE.MeshBasicMaterial({ map: lTex, transparent: true, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.2), lMat);
      lGroup.add(plane);

      commandGroup.add(lGroup);
      labelMeshGroups.push(lGroup);
    });

    scene.add(commandGroup);

    // --- Interactive Orbit Controls ---
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotationY = 0.5;
    let targetRotationX = 0.2;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(0.05, Math.min(Math.PI / 3, targetRotationX));

      prevX = e.clientX;
      prevY = e.clientY;
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

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Soft ambient auto-rotation
      if (!isDragging) {
        targetRotationY += 0.0018;
      }

      commandGroup.rotation.y += (targetRotationY - commandGroup.rotation.y) * 0.08;
      commandGroup.rotation.x += (targetRotationX - commandGroup.rotation.x) * 0.08;

      // Animate pulsing project markers
      markers.forEach((m, idx) => {
        m.rotation.y = elapsed * 2.5 + idx;
        m.position.y += Math.sin(elapsed * 3 + idx) * 0.002;
      });

      // Animate miniature train moving along rail
      train.position.x = ((elapsed * 0.4) % 2.4) - 1.2;

      // Rotate crane jib slowly
      jib.rotation.y = Math.sin(elapsed * 0.5) * 0.4;

      // Keep floating labels facing camera
      labelMeshGroups.forEach((lg) => {
        lg.quaternion.copy(camera.quaternion);
      });

      camera.lookAt(0, 0.8, 0);

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
    <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#0e1222] via-[#07090e] to-[#07090e] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              3D Infrastructure Command-Center Environment
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Bharat Project Intelligence (भारत परियोजना प्रज्ञा)
          </h3>
          <p className="text-sm text-cyan-300 font-medium mt-1">
            "AI-Powered Integrated Government Project Monitoring &amp; Decision Support Platform"
          </p>
        </div>

        <a
          href="https://github.com/srividhya-codee/Project-Monitoring-system"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-white transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap self-start lg:self-center"
        >
          <Github className="w-4 h-4 text-slate-950" />
          <span>View on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Command-Center Miniature Scene */}
        <div className="lg:col-span-8 relative">
          <div
            ref={mountRef}
            className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-800/90 bg-slate-950/80"
            title="3D Command Center: Drag to orbit around the miniature infrastructure project"
          />

          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span>Drag to rotate 3D miniature infrastructure command-center</span>
          </div>

          {/* Floating labels selector pills */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 pointer-events-auto">
            {techLabels.map((tl) => (
              <button
                key={tl}
                onClick={() => setSelectedLabel(tl)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  selectedLabel === tl
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white backdrop-blur-md'
                }`}
              >
                {tl}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Project Architectural Pillars */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
            <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              Smart India Hackathon Prototype:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Designed for government infrastructure project management, unifying Earned Value Management, machine learning risk forecasting, and citation-backed generative AI agents.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="font-semibold text-cyan-300 block mb-0.5">1. Authoritative EVM Analytics</span>
              <span className="text-slate-400">SPI, CPI, EAC, and physical-financial lead gap indicators.</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="font-semibold text-indigo-300 block mb-0.5">2. ML Risk Engine</span>
              <span className="text-slate-400">Predicts delay duration &amp; cost overrun % via Gradient Boosting &amp; XGBoost with SHAP interpretability.</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="font-semibold text-purple-300 block mb-0.5">3. Retrieval-Augmented Generation (RAG)</span>
              <span className="text-slate-400">Semantic retrieval over project reports, inspection logs, and statutory circulars.</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <span className="font-semibold text-emerald-300 block mb-0.5">4. LangGraph Agent</span>
              <span className="text-slate-400">Deterministic state-graph agent with RBAC and numerical accuracy verification.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
