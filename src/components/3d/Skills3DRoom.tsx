import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TechItem {
  id: string;
  name: string;
  category: 'Language' | 'AI & ML' | 'Data' | 'Web & Backend' | 'DevOps & Tools';
  level: string;
  desc: string;
  color: number;
}

const TECHNOLOGIES: TechItem[] = [
  { id: 'python', name: 'Python', category: 'Language', level: 'Core', desc: 'Primary language for ML modeling, data structures, and AI scripting.', color: 0x38bdf8 },
  { id: 'c', name: 'C', category: 'Language', level: 'Applied', desc: 'Low-level memory management and systems programming fundamentals.', color: 0x94a3b8 },
  { id: 'cpp', name: 'C++', category: 'Language', level: 'Applied', desc: 'High-performance algorithms, competitive programming & OOP.', color: 0x60a5fa },
  { id: 'java', name: 'Java', category: 'Language', level: 'Applied', desc: 'Object-oriented programming, robust backend structures.', color: 0xf59e0b },
  { id: 'ml', name: 'Machine Learning', category: 'AI & ML', level: 'Core', desc: 'Supervised & unsupervised predictive modeling, classification & regression.', color: 0x818cf8 },
  { id: 'genai', name: 'Generative AI', category: 'AI & ML', level: 'Current Learning', desc: 'LLM agents, prompt engineering, context injection, and cognitive loops.', color: 0xc084fc },
  { id: 'xgboost', name: 'XGBoost', category: 'AI & ML', level: 'Applied', desc: 'Extreme gradient boosting for tabular infrastructure delay forecasting.', color: 0x34d399 },
  { id: 'gradboost', name: 'Gradient Boosting', category: 'AI & ML', level: 'Applied', desc: 'Ensemble decision trees optimizing predictive accuracy on complex data.', color: 0x2dd4bf },
  { id: 'shap', name: 'SHAP', category: 'AI & ML', level: 'Applied', desc: 'Shapley Additive exPlanations for transparent, auditable model interpretability.', color: 0xa78bfa },
  { id: 'rag', name: 'RAG', category: 'AI & ML', level: 'Current Learning', desc: 'Retrieval-Augmented Generation grounding responses with verified documents.', color: 0x38bdf8 },
  { id: 'langgraph', name: 'LangGraph', category: 'AI & ML', level: 'Current Learning', desc: 'State-machine orchestration for multi-actor, guardrailed AI agents.', color: 0xec4899 },
  { id: 'pandas', name: 'Pandas', category: 'Data', level: 'Core', desc: 'Dataframe manipulation, data cleaning, and statistical series analysis.', color: 0x06b6d4 },
  { id: 'html', name: 'HTML', category: 'Web & Backend', level: 'Core', desc: 'Semantic web structure, accessible document organization.', color: 0xf97316 },
  { id: 'css', name: 'CSS', category: 'Web & Backend', level: 'Core', desc: 'Responsive styling, animations, modern flex & grid layouts.', color: 0x3b82f6 },
  { id: 'ts', name: 'TypeScript', category: 'Web & Backend', level: 'Applied', desc: 'Type-safe full-stack application development & scalable architecture.', color: 0x2563eb },
  { id: 'django', name: 'Django', category: 'Web & Backend', level: 'Applied', desc: 'Python enterprise backend framework with ORM and secure APIs.', color: 0x10b981 },
  { id: 'redis', name: 'Redis', category: 'Web & Backend', level: 'Current Learning', desc: 'In-memory caching and rapid key-value state persistence.', color: 0xef4444 },
  { id: 'git', name: 'Git', category: 'DevOps & Tools', level: 'Core', desc: 'Distributed version control, branching, rebasing, and atomic commits.', color: 0xf97316 },
  { id: 'github', name: 'GitHub', category: 'DevOps & Tools', level: 'Core', desc: 'Repository management, open-source collaboration, and CI/CD actions.', color: 0xe2e8f0 }
];

export const Skills3DRoom: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<TechItem>(TECHNOLOGIES[0]);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.03);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.5);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x818cf8, 3.5, 12);
    rimLight.position.set(0, 0, 0);
    scene.add(rimLight);

    // Central Futuristic Workspace Pedestal
    const pedestalGroup = new THREE.Group();

    // Central circular glass platform
    const platformGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 48);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8,
      reflectivity: 0.9
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = -0.8;
    pedestalGroup.add(platformMesh);

    // Glowing rim ring
    const ringGeo = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.72;
    pedestalGroup.add(ringMesh);

    // Central holographic data core (rotating dodecahedron)
    const coreGeo = new THREE.DodecahedronGeometry(0.45, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.3,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.2;
    pedestalGroup.add(coreMesh);

    scene.add(pedestalGroup);

    // --- Floating 3D Technology Nodes in Orbital Layout ---
    const techMeshes: {
      mesh: THREE.Group;
      item: TechItem;
      basePos: THREE.Vector3;
      targetPos: THREE.Vector3;
      cubeMesh: THREE.Mesh;
    }[] = [];

    const totalTechs = TECHNOLOGIES.length;
    const radius = 2.8;

    TECHNOLOGIES.forEach((tech, index) => {
      const angle = (index / totalTechs) * Math.PI * 2;
      // Stagger vertical height for dynamic 3D depth
      const yPos = -0.3 + Math.sin(index * 1.5) * 0.9;
      const xPos = Math.cos(angle) * radius;
      const zPos = Math.sin(angle) * radius;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(xPos, yPos, zPos);
      nodeGroup.userData = { techId: tech.id, techData: tech };

      // 1. Crystal Faceted Block
      const blockGeo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
      const blockMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        metalness: 0.6,
        roughness: 0.2
      });
      const blockMesh = new THREE.Mesh(blockGeo, blockMat);
      nodeGroup.add(blockMesh);

      // 2. Glowing wireframe border
      const wireGeo = new THREE.BoxGeometry(0.40, 0.40, 0.40);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      nodeGroup.add(wireMesh);

      // 3. Name Label Canvas texture in 3D
      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 256;
      labelCanvas.height = 80;
      const lCtx = labelCanvas.getContext('2d')!;
      lCtx.fillStyle = 'rgba(7, 12, 22, 0.9)';
      lCtx.fillRect(0, 0, 256, 80);
      lCtx.strokeStyle = '#38bdf8';
      lCtx.lineWidth = 4;
      lCtx.strokeRect(2, 2, 252, 76);
      lCtx.fillStyle = '#ffffff';
      lCtx.font = 'bold 26px "JetBrains Mono", monospace';
      lCtx.textAlign = 'center';
      lCtx.textBaseline = 'middle';
      lCtx.fillText(tech.name, 128, 40);

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      const labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, side: THREE.DoubleSide });
      const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.22), labelMat);
      labelMesh.position.set(0, -0.32, 0);
      nodeGroup.add(labelMesh);

      scene.add(nodeGroup);

      techMeshes.push({
        mesh: nodeGroup,
        item: tech,
        basePos: new THREE.Vector3(xPos, yPos, zPos),
        targetPos: new THREE.Vector3(xPos, yPos, zPos),
        cubeMesh: blockMesh
      });
    });

    // Particle Cloud around room
    const pCount = 150;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 9;
      pPositions[i + 1] = (Math.random() - 0.5) * 5;
      pPositions[i + 2] = (Math.random() - 0.5) * 9;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.025, transparent: true, opacity: 0.4 });
    const pCloud = new THREE.Points(pGeo, pMat);
    scene.add(pCloud);

    // --- Interactive Rotation & Raycasting ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    let isDragging = false;
    let prevMouseX = 0;
    let roomRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        roomRotationY += deltaX * 0.006;
        prevMouseX = e.clientX;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const allObjects = techMeshes.map(t => t.cubeMesh);
      const intersects = raycaster.intersectObjects(allObjects, false);

      if (intersects.length > 0) {
        const hitGroup = intersects[0].object.parent;
        if (hitGroup && hitGroup.userData.techData) {
          setActiveTech(hitGroup.userData.techData);
        }
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);

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

      // Gentle continuous ambient orbit if not dragging
      if (!isDragging) {
        roomRotationY += 0.0015;
      }

      // Rotate central core
      coreMesh.rotation.y = elapsed * 0.5;
      coreMesh.rotation.x = Math.sin(elapsed * 0.8) * 0.2;

      // Raycast hover test
      raycaster.setFromCamera(mouse, camera);
      const allCubes = techMeshes.map(t => t.cubeMesh);
      const intersects = raycaster.intersectObjects(allCubes, false);
      let hitId: string | null = null;

      if (intersects.length > 0) {
        const parent = intersects[0].object.parent;
        if (parent && parent.userData.techId) {
          hitId = parent.userData.techId;
          setHoveredTechId(hitId);
        }
      } else {
        setHoveredTechId(null);
      }

      // Update positions & rotations of tech nodes
      techMeshes.forEach((item, idx) => {
        const isHovered = hitId === item.item.id;
        const isSelected = activeTech.id === item.item.id;

        // Current orbital angle with room rotation
        const initialAngle = (idx / totalTechs) * Math.PI * 2;
        const currentAngle = initialAngle + roomRotationY;

        const curRadius = isHovered || isSelected ? radius - 0.4 : radius;
        const targetX = Math.cos(currentAngle) * curRadius;
        const targetZ = Math.sin(currentAngle) * curRadius;
        const targetY = item.basePos.y + Math.sin(elapsed * 2 + idx) * 0.05 + (isHovered ? 0.2 : 0);

        item.mesh.position.x += (targetX - item.mesh.position.x) * 0.1;
        item.mesh.position.y += (targetY - item.mesh.position.y) * 0.1;
        item.mesh.position.z += (targetZ - item.mesh.position.z) * 0.1;

        // Rotate individual block
        const rotSpeed = isHovered ? 0.04 : isSelected ? 0.025 : 0.01;
        item.cubeMesh.rotation.y += rotSpeed;
        item.cubeMesh.rotation.x += rotSpeed * 0.7;

        // Make label always face the camera
        const label = item.mesh.children[2];
        if (label) {
          label.quaternion.copy(camera.quaternion);
        }
      });

      // Camera soft look at center
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeTech.id]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-[#0a0f1d] via-[#07090e] to-[#07090e] shadow-2xl">
      {/* Top HUD Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>3D ORBITAL SKILL ROOM</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Drag to spin room · Click or hover node to inspect
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[500px] sm:h-[560px] lg:h-[620px] cursor-grab active:cursor-grabbing"
      />

      {/* Interactive Technology Detail Card HUD (Overlaid at bottom) */}
      <div className="p-6 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xl shrink-0">
              {activeTech.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xl font-bold text-white font-display">
                  {activeTech.name}
                </h4>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {activeTech.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  {activeTech.level}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTech.desc}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-wrap gap-1.5 justify-start md:justify-end">
            {TECHNOLOGIES.slice(0, 10).map((tech) => (
              <button
                key={tech.id}
                onClick={() => setActiveTech(tech)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  activeTech.id === tech.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tech.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
