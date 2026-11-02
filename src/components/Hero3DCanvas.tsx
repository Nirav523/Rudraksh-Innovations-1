import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface Hero3DCanvasProps {
  onLoaded?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software-WebGL / Headless environment
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2') ||
                   document.createElement('canvas').getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as WebGLRenderingContext).RENDERER;
        const gpu = String((gl as WebGLRenderingContext).getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Scene, Camera, Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    // 3. Environment Reflection (Procedural Studio Room)
    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    } catch (e) {
      console.warn('PMREM environment fallback', e);
    }

    // 4. Lighting Rig (Warm champagne key + subtle lavender fill + rim)
    const keyLight = new THREE.DirectionalLight(0xfff3db, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb6a1d9, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xf8f5ef, 0.7);
    scene.add(ambientLight);

    // 5. Procedural 3D Sculpture: Intertwined Champagne Gold Ribbon & Porcelain Form
    const sculptureGroup = new THREE.Group();

    // Part A: Champagne Gold Ribbon (Smooth 3D Torus Knot)
    const ribbonGeo = new THREE.TorusKnotGeometry(0.85, 0.14, 128, 24, 2, 3);
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc6a66b,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.4,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });
    const goldRibbon = new THREE.Mesh(ribbonGeo, goldMaterial);
    sculptureGroup.add(goldRibbon);

    // Part B: Translucent Porcelain Ring Intertwined
    const porcelainGeo = new THREE.TorusGeometry(1.05, 0.08, 32, 100);
    const porcelainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfffcf7,
      metalness: 0.05,
      roughness: 0.12,
      transmission: isSoftwareGl ? 0 : 0.65,
      transparent: true,
      opacity: 0.85,
      ior: 1.52,
      thickness: 1.2,
      clearcoat: 0.9,
    });
    const porcelainRing = new THREE.Mesh(porcelainGeo, porcelainMaterial);
    porcelainRing.rotation.x = Math.PI / 3;
    porcelainRing.rotation.y = Math.PI / 6;
    sculptureGroup.add(porcelainRing);

    // Part C: Inner Precision Beveled Ring
    const innerGeo = new THREE.TorusGeometry(0.5, 0.035, 16, 64);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4d3ae,
      metalness: 0.95,
      roughness: 0.18,
    });
    const innerRing = new THREE.Mesh(innerGeo, innerMaterial);
    innerRing.rotation.x = -Math.PI / 4;
    sculptureGroup.add(innerRing);

    // Part D: Floating Particles (Subtle champagne & lavender dust)
    const particleCount = isSoftwareGl ? 60 : 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cGold = new THREE.Color(0xc6a66b);
    const cLavender = new THREE.Color(0xb6a1d9);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? cGold : cLavender;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isSoftwareGl ? 0.03 : 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    sculptureGroup.add(particles);

    // Part E: Soft Ground Contact Shadow (Soft radial gradient)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const radGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      radGrad.addColorStop(0, 'rgba(75, 42, 104, 0.18)');
      radGrad.addColorStop(0.5, 'rgba(198, 166, 107, 0.06)');
      radGrad.addColorStop(1, 'rgba(248, 245, 239, 0)');
      sCtx.fillStyle = radGrad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.65,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.35;
    sculptureGroup.add(shadowPlane);

    scene.add(sculptureGroup);

    // 6. Interactive Pointer & Scroll Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let targetCamY = 0.4;

    const onPointerMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = xNorm * 0.45;
      targetRotX = yNorm * 0.35;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      targetCamY = 0.4 - (scrollY / window.innerHeight) * 0.6;
      sculptureGroup.position.y = (scrollY / window.innerHeight) * 0.3;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    onLoaded?.();

    // 7. Animation Loop with Software-WebGL Pacing
    let animationFrameId: number;
    let isMounted = true;
    const clock = new THREE.Clock();

    function renderLoop() {
      if (!isMounted) return;
      const delta = clock.getDelta();

      // Smooth idle rotation
      sculptureGroup.rotation.y += delta * 0.28;
      sculptureGroup.rotation.x += delta * 0.12;

      // Smooth pointer parallax easing
      sculptureGroup.rotation.x = THREE.MathUtils.damp(sculptureGroup.rotation.x, targetRotX, 3.5, delta);
      sculptureGroup.rotation.y = THREE.MathUtils.damp(sculptureGroup.rotation.y, sculptureGroup.rotation.y + targetRotY * 0.05, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3.5, delta);

      // Subtle particle swirl
      particles.rotation.y -= delta * 0.08;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Software WebGL pacing
        animationFrameId = window.setTimeout(() => {
          if (isMounted) requestAnimationFrame(renderLoop);
        }, 60);
      } else {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    }

    renderLoop();

    // 8. Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
      try {
        renderer.dispose();
        ribbonGeo.dispose();
        porcelainGeo.dispose();
        innerGeo.dispose();
        particleGeo.dispose();
        goldMaterial.dispose();
        porcelainMaterial.dispose();
        innerMaterial.dispose();
        particleMat.dispose();
        shadowTex.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      } catch (e) {
        console.warn('Three.js cleanup notice', e);
      }
    };
  }, [onLoaded]);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-64 h-64 rounded-full border border-[#C6A66B]/30 bg-gradient-to-br from-[#FFFCF7] via-[#F8F5EF] to-[#E4D3AE]/40 shadow-2xl flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#C6A66B]/40 flex items-center justify-center text-center p-4">
            <span className="font-serif italic text-2xl text-[#4B2A68]">Precision & Imagination</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[460px] md:min-h-[580px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive Sculpture: Champagne Ribbon & Porcelain Sculpture"
    />
  );
};
