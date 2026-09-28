import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Trophy, CheckCircle2, Award } from 'lucide-react';

export const Trophy3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Studio Spotlight for Trophy
    const ambient = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambient);

    // Warm golden spotlight from above
    const spotLight = new THREE.SpotLight(0xfef08a, 5.0, 15, Math.PI / 4, 0.4, 1.2);
    spotLight.position.set(0, 5, 2.5);
    scene.add(spotLight);

    // Cool cyan backlight for rim reflection
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const trophyGroup = new THREE.Group();

    // 1. Heavy Obsidian / Titanium Pedestal
    const baseGeo = new THREE.CylinderGeometry(0.8, 0.95, 0.25, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.85
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -0.7;
    trophyGroup.add(base);

    // Pedestal gold nameplate band
    const bandGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.08, 32);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15
    });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = -0.68;
    trophyGroup.add(band);

    // 2. Trophy Stem (Tiered metallic column)
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.22, 0.6, 24);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.95,
      roughness: 0.15
    });
    const stem = new THREE.Mesh(stemGeo, goldMat);
    stem.position.y = -0.3;
    trophyGroup.add(stem);

    // Stem ring accents
    const stemRingGeo = new THREE.TorusGeometry(0.18, 0.025, 16, 32);
    const stemRing = new THREE.Mesh(stemRingGeo, goldMat);
    stemRing.rotation.x = Math.PI / 2;
    stemRing.position.y = -0.15;
    trophyGroup.add(stemRing);

    // 3. Trophy Cup Body
    const cupGeo = new THREE.CylinderGeometry(0.55, 0.2, 0.75, 32, 1, true);
    const cup = new THREE.Mesh(cupGeo, goldMat);
    cup.position.y = 0.35;
    trophyGroup.add(cup);

    // Inside cup glow base
    const cupBaseGeo = new THREE.CircleGeometry(0.2, 32);
    const cupBase = new THREE.Mesh(cupBaseGeo, goldMat);
    cupBase.rotation.x = -Math.PI / 2;
    cupBase.position.y = -0.02;
    trophyGroup.add(cupBase);

    // Handles (Dual Torus Slices)
    [-0.55, 0.55].forEach((hx) => {
      const handleGeo = new THREE.TorusGeometry(0.24, 0.035, 16, 32, Math.PI);
      const handle = new THREE.Mesh(handleGeo, goldMat);
      handle.position.set(hx, 0.38, 0);
      handle.rotation.z = hx > 0 ? -Math.PI / 2 : Math.PI / 2;
      trophyGroup.add(handle);
    });

    // 4. Floating Holographic Achievement Gem above the cup
    const gemGeo = new THREE.IcosahedronGeometry(0.22, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.y = 0.95;
    trophyGroup.add(gem);

    // Floating Holographic laurel ring
    const laurelGeo = new THREE.TorusGeometry(0.42, 0.015, 16, 48);
    const laurelMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const laurelRing = new THREE.Mesh(laurelGeo, laurelMat);
    laurelRing.position.y = 0.95;
    trophyGroup.add(laurelRing);

    scene.add(trophyGroup);

    // Ambient floating golden sparkle particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 3;
      pPos[i + 1] = Math.random() * 3 - 0.5;
      pPos[i + 2] = (Math.random() - 0.5) * 3;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xfef08a, size: 0.025, transparent: true, opacity: 0.6 });
    const sparkles = new THREE.Points(pGeo, pMat);
    scene.add(sparkles);

    // Interactive Drag to Rotate
    let isDragging = false;
    let prevX = 0;
    let targetRotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      targetRotY += deltaX * 0.008;
      prevX = e.clientX;
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

      if (!isDragging) {
        targetRotY += 0.006;
      }

      trophyGroup.rotation.y += (targetRotY - trophyGroup.rotation.y) * 0.08;

      // Gem rotation and hovering
      gem.rotation.y = elapsed * 1.5;
      gem.rotation.x = Math.sin(elapsed) * 0.3;
      gem.position.y = 0.95 + Math.sin(elapsed * 2) * 0.05;

      laurelRing.rotation.x = Math.sin(elapsed * 1.2) * 0.3;
      laurelRing.rotation.z = elapsed * 0.8;
      laurelRing.position.y = gem.position.y;

      // Sparkles slow drift
      sparkles.rotation.y = elapsed * 0.05;

      camera.lookAt(0, 0.4, 0);

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
    <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0e1224] via-[#07090e] to-[#07090e] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Physical Trophy Canvas */}
        <div className="md:col-span-6 relative">
          <div
            ref={mountRef}
            className="w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-800/80 bg-slate-950/80 shadow-inner"
            title="3D Physical Trophy: Drag to rotate the trophy in 3D"
          />
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none text-[11px] font-mono text-slate-400">
            3D Specular Trophy · Drag to rotate
          </div>
        </div>

        {/* Right: Milestone Information */}
        <div className="md:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-xs font-mono text-indigo-300">
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span>Competitive Hackathon Milestone</span>
          </div>

          <h3 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Innovation Unbound
          </h3>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Status: Shortlisted for Round 2
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
            Evaluated and selected among competitive technical teams for an innovative technological solution addressing real-world problem statements.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>Verified Hackathon Participant</span>
            <span aria-hidden="true">·</span>
            <span>Sri Vidhya A</span>
          </div>
        </div>
      </div>
    </div>
  );
};
