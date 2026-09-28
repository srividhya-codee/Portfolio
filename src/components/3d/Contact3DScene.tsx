import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Mail, Linkedin, Github, Code2, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Contact3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const cyanPoint = new THREE.PointLight(0x38bdf8, 3.5, 8);
    cyanPoint.position.set(2, 3, 2);
    scene.add(cyanPoint);

    const violetPoint = new THREE.PointLight(0x818cf8, 3.0, 8);
    violetPoint.position.set(-2, -1, 1);
    scene.add(violetPoint);

    // Central 3D Holographic Comms Portal Node
    const commsGroup = new THREE.Group();

    // 1. Core Sphere
    const sphereGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.y = 0.4;
    commsGroup.add(sphere);

    // 2. Orbital holographic rings
    const ring1Geo = new THREE.TorusGeometry(0.95, 0.015, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.y = 0.4;
    commsGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.2, 0.012, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.y = 0.4;
    ring2.rotation.x = Math.PI / 3;
    commsGroup.add(ring2);

    // 3. Floating communication satellites (small metallic icosahedrons)
    const satGroup = new THREE.Group();
    satGroup.position.y = 0.4;
    const satCount = 4;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const sGeo = new THREE.IcosahedronGeometry(0.08, 0);
      const sMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 });
      const sat = new THREE.Mesh(sGeo, sMat);
      sat.position.set(Math.cos(angle) * 1.4, Math.sin(angle * 2) * 0.3, Math.sin(angle) * 1.4);
      satGroup.add(sat);
    }
    commsGroup.add(satGroup);

    scene.add(commsGroup);

    // Background floating data particles
    const pCount = 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 6;
      pPos[i + 1] = (Math.random() - 0.5) * 4;
      pPos[i + 2] = (Math.random() - 0.5) * 5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.025, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse Parallax
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = nx * 0.5;
      targetRotX = -ny * 0.3;
    };

    container.addEventListener('mousemove', onMouseMove);

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

      commsGroup.rotation.y += (targetRotY + elapsed * 0.2 - commsGroup.rotation.y) * 0.05;
      commsGroup.rotation.x += (targetRotX - commsGroup.rotation.x) * 0.05;

      ring1.rotation.z = elapsed * 0.8;
      ring1.rotation.x = Math.sin(elapsed * 0.6) * 0.4;

      ring2.rotation.y = elapsed * -0.6;
      ring2.rotation.z = Math.cos(elapsed * 0.7) * 0.5;

      satGroup.rotation.y = elapsed * 0.5;

      particles.rotation.y = elapsed * 0.04;

      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0a0f1d] via-[#07090e] to-[#07090e] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: 3D Comms Portal Scene */}
        <div className="lg:col-span-5 relative">
          <div
            ref={mountRef}
            className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden cursor-crosshair border border-slate-800/80 bg-slate-950/80 shadow-inner"
            title="3D Communications Beacon"
          />
          <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>3D COMMS PORTAL</span>
          </div>
        </div>

        {/* Right: Personal CTA & Elegant 3D Buttons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Workspace Terminal</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Let's Build Something Intelligent.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              I'm open to internship opportunities, AI/ML projects, Generative AI collaborations, and opportunities to learn and contribute.
            </p>
          </div>

          {/* Elegant 3D Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {/* 3D Button: Email */}
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Internship%20%2F%20AI-ML%20Collaboration%20Inquiry%20for%20Sri%20Vidhya%20A`}
              className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/70 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-white transition-all transform hover:-translate-y-1 shadow-[0_6px_20px_rgba(6,182,212,0.15)] flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Email Me</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* 3D Button: LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-gradient-to-b from-blue-950/70 to-slate-900 border border-blue-500/40 hover:border-blue-400 text-white transition-all transform hover:-translate-y-1 shadow-[0_6px_20px_rgba(59,130,246,0.15)] flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Linkedin className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Professional Network</div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    LinkedIn Profile
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* 3D Button: GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 hover:border-slate-500 text-white transition-all transform hover:-translate-y-1 shadow-[0_6px_20px_rgba(0,0,0,0.3)] flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  <Github className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Code &amp; Repositories</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    github.com/srividhya-codee
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* 3D Button: LeetCode */}
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-gradient-to-b from-amber-950/60 to-slate-900 border border-amber-500/40 hover:border-amber-400 text-white transition-all transform hover:-translate-y-1 shadow-[0_6px_20px_rgba(245,158,11,0.15)] flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Code2 className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Problem Solving</div>
                  <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    LeetCode Profile
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Quick copy bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-400">
            <div>
              <span>Phone: </span>
              <span className="text-slate-200 font-semibold">{PERSONAL_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'phone' ? 'Phone Copied' : 'Copy Phone'}</span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'email' ? 'Email Copied' : 'Copy Email'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
