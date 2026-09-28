import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Github, ArrowUpRight, RotateCcw } from 'lucide-react';

export const SmartPark3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSpot, setSelectedSpot] = useState<string>('Slot 03');
  const [spotStatus, setSpotStatus] = useState<'Available' | 'Occupied'>('Available');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting ---
    const ambient = new THREE.AmbientLight(0x1e293b, 1.8);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xe0f2fe, 2.5);
    sun.position.set(5, 8, 4);
    scene.add(sun);

    const blueFill = new THREE.PointLight(0x38bdf8, 2.5, 10);
    blueFill.position.set(-3, 3, 2);
    scene.add(blueFill);

    // Miniature City / Parking Lot World Group
    const worldGroup = new THREE.Group();

    // 1. Asphalt Ground Platform
    const groundGeo = new THREE.BoxGeometry(4.8, 0.2, 4.0);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.1;
    worldGroup.add(ground);

    // 2. Road Section with Lane Dashings
    const roadGeo = new THREE.PlaneGeometry(4.8, 1.2);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.005, 1.2);
    worldGroup.add(road);

    // Road dashed line
    for (let x = -2.1; x <= 2.1; x += 0.7) {
      const dashGeo = new THREE.PlaneGeometry(0.35, 0.04);
      const dashMat = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(x, 0.008, 1.2);
      worldGroup.add(dash);
    }

    // 3. Parking Bays & Dividers
    // 2 Rows of 4 spots:
    // Row 1 (z = -0.3), Row 2 (z = -1.4)
    const spotsData = [
      { id: 'Slot 01', x: -1.5, z: -0.3, occupied: true, carColor: 0x38bdf8 },
      { id: 'Slot 02', x: -0.5, z: -0.3, occupied: true, carColor: 0x94a3b8 },
      { id: 'Slot 03', x: 0.5, z: -0.3, occupied: false, carColor: 0x000000 },
      { id: 'Slot 04', x: 1.5, z: -0.3, occupied: true, carColor: 0x818cf8 },
      { id: 'Slot 05', x: -1.5, z: -1.3, occupied: false, carColor: 0x000000 },
      { id: 'Slot 06', x: -0.5, z: -1.3, occupied: true, carColor: 0x34d399 },
      { id: 'Slot 07', x: 0.5, z: -1.3, occupied: true, carColor: 0xe2e8f0 },
      { id: 'Slot 08', x: 1.5, z: -1.3, occupied: false, carColor: 0x000000 }
    ];

    const indicatorMeshes: THREE.Mesh[] = [];

    // Helper: Build a miniature stylized car
    const createMiniCar = (color: number) => {
      const carGroup = new THREE.Group();

      // Lower body
      const bodyGeo = new THREE.BoxGeometry(0.55, 0.18, 0.85);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.25,
        metalness: 0.7
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.14;
      carGroup.add(body);

      // Cabin / Roof
      const cabinGeo = new THREE.BoxGeometry(0.46, 0.14, 0.48);
      const cabinMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        roughness: 0.1,
        metalness: 0.8,
        reflectivity: 0.9
      });
      const cabin = new THREE.Mesh(cabinGeo, cabinMat);
      cabin.position.set(0, 0.27, -0.04);
      carGroup.add(cabin);

      // Headlights
      const lightGeo = new THREE.BoxGeometry(0.12, 0.04, 0.02);
      const lightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const leftLight = new THREE.Mesh(lightGeo, lightMat);
      leftLight.position.set(-0.18, 0.16, 0.43);
      carGroup.add(leftLight);
      const rightLight = new THREE.Mesh(lightGeo, lightMat);
      rightLight.position.set(0.18, 0.16, 0.43);
      carGroup.add(rightLight);

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
      [-0.28, 0.28].forEach((wx) => {
        [-0.26, 0.26].forEach((wz) => {
          const wheel = new THREE.Mesh(wheelGeo, wheelMat);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(wx, 0.08, wz);
          carGroup.add(wheel);
        });
      });

      return carGroup;
    };

    // Draw Parking lines & place cars
    spotsData.forEach((spot) => {
      // White stall lines
      const lineGeo = new THREE.PlaneGeometry(0.03, 1.0);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x64748b });
      const leftLine = new THREE.Mesh(lineGeo, lineMat);
      leftLine.rotation.x = -Math.PI / 2;
      leftLine.position.set(spot.x - 0.38, 0.007, spot.z);
      worldGroup.add(leftLine);

      const rightLine = new THREE.Mesh(lineGeo, lineMat);
      rightLine.rotation.x = -Math.PI / 2;
      rightLine.position.set(spot.x + 0.38, 0.007, spot.z);
      worldGroup.add(rightLine);

      // If occupied, add car
      if (spot.occupied) {
        const car = createMiniCar(spot.carColor);
        car.position.set(spot.x, 0, spot.z);
        worldGroup.add(car);
      }

      // Floating 3D Parking Indicator (Diamond pin)
      const indGeo = new THREE.OctahedronGeometry(0.09, 0);
      const indMat = new THREE.MeshBasicMaterial({
        color: spot.occupied ? 0xf43f5e : 0x10b981
      });
      const indicator = new THREE.Mesh(indGeo, indMat);
      indicator.position.set(spot.x, 0.65, spot.z);
      worldGroup.add(indicator);
      indicatorMeshes.push(indicator);
    });

    // 4. Floating 3D Location Marker Pin
    const pinGroup = new THREE.Group();
    pinGroup.position.set(0, 1.2, -1.8);

    const pinConeGeo = new THREE.ConeGeometry(0.14, 0.3, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.2
    });
    const pinCone = new THREE.Mesh(pinConeGeo, pinMat);
    pinCone.rotation.x = Math.PI;
    pinCone.position.y = 0.15;
    pinGroup.add(pinCone);

    const pinSphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const pinSphere = new THREE.Mesh(pinSphereGeo, pinMat);
    pinSphere.position.y = 0.32;
    pinGroup.add(pinSphere);

    worldGroup.add(pinGroup);

    // Sidewalk curb
    const curbGeo = new THREE.BoxGeometry(4.8, 0.08, 0.2);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(0, 0.04, 0.5);
    worldGroup.add(curb);

    scene.add(worldGroup);

    // --- Interactive Orbit Dragging ---
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotationY = 0.4;
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

      // Soft auto-orbit if idle
      if (!isDragging) {
        targetRotationY += 0.0015;
      }

      worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.08;
      worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.08;

      // Animate floating indicators (spin and bobbing)
      indicatorMeshes.forEach((ind, i) => {
        ind.rotation.y = elapsed * 2 + i;
        ind.position.y = 0.65 + Math.sin(elapsed * 3 + i) * 0.04;
      });

      // Animate location pin
      pinGroup.position.y = 1.1 + Math.sin(elapsed * 2.5) * 0.08;
      pinGroup.rotation.y = elapsed * 1.5;

      camera.lookAt(0, 0.3, 0);

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
    <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0a0f1d] via-[#07090e] to-[#07090e] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              3D Miniature Parking Environment
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Smart_Park – Smart Parking Management System
          </h3>
        </div>

        <a
          href="https://github.com/srividhya-codee/Smart_Park"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all shadow-md self-start sm:self-center"
        >
          <Github className="w-4 h-4 text-cyan-400" />
          <span>View on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive 3D Miniature Environment */}
        <div className="lg:col-span-8 relative">
          <div
            ref={mountRef}
            className="w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-800/90 bg-slate-950/80"
            title="Interactive 3D Miniature Parking Lot: Click and drag to orbit in 360°"
          />

          {/* Floating Miniature Overlay Indicators */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
            <span>Drag to rotate 3D miniature lot</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> 3 Available
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> 5 Occupied
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hidden sm:block backdrop-blur-md">
              TypeScript Full-Stack Architecture
            </div>
          </div>
        </div>

        {/* Right: Project Highlights & Core Features */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">
              Project Overview:
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "A smart parking management application designed to help users discover and manage available parking spaces."
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Core Capabilities:
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Parking Availability:</strong> Real-time vacant/occupied state tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Parking Search &amp; Location:</strong> Geolocation facility discovery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Authentication &amp; Reservation:</strong> User booking with instant confirmation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Admin Management:</strong> Facility operator controls and occupancy monitors</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 inline-block">
              Technology: TypeScript
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
