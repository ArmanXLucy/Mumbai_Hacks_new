import { motion } from "framer-motion";
import LiveTicker from "./LiveTicker";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";


function PixelSphere({ position = [0, 0, 0], radius = 2.4 }) {
  const pointsRef = useRef();
  const { camera, mouse } = useThree();

  const raycaster = useMemo(() => {
    const r = new THREE.Raycaster();
    r.params.Points.threshold = 0.2; 
    return r;
  }, []);

  const sphere = useMemo(() => new THREE.SphereGeometry(radius, 160, 160), [radius]);

  const basePositions = useMemo(
    () => new Float32Array(sphere.attributes.position.array),
    [sphere]
  );
  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);
  const velocities = useMemo(() => new Float32Array(positions.length), [positions.length]);


  const colors = useMemo(() => {
    const c = new Float32Array((positions.length / 3) * 3);
    const color = new THREE.Color();
    const gold = new THREE.Color("#FFD700");
    const black = new THREE.Color("#000000");

    for (let i = 0; i < positions.length; i += 3) {
      const mix = Math.random();
      color.copy(black).lerp(gold, mix);
      c[i] = color.r;
      c[i + 1] = color.g;
      c[i + 2] = color.b;
    }
    return c;
  }, [positions]);

  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const tmpNormal = useMemo(() => new THREE.Vector3(), []);
  const tmpOther = useMemo(() => new THREE.Vector3(), []);

  React.useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  }, [positions, colors]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(pointsRef.current);


    if (intersects.length > 0) {
      const impactRadius = 0.6; 
      const impulseStrength = 5.0; 

      for (let k = 0; k < intersects.length; k++) {
        const idx = intersects[k].index;
        if (typeof idx === "number" && idx >= 0) {
          const bi = idx * 3;
          tmpVec.set(basePositions[bi], basePositions[bi + 1], basePositions[bi + 2]);
          tmpNormal.copy(tmpVec).normalize();


          velocities[bi] += tmpNormal.x * impulseStrength;
          velocities[bi + 1] += tmpNormal.y * impulseStrength;
          velocities[bi + 2] += tmpNormal.z * impulseStrength;


          for (let i = 0; i < basePositions.length; i += 3) {
            tmpOther.set(
              basePositions[i],
              basePositions[i + 1],
              basePositions[i + 2]
            );
            const dist = tmpOther.distanceTo(tmpVec);
            if (dist < impactRadius && dist > 0) {
              const falloff = 1.0 - dist / impactRadius;
              const strength = impulseStrength * 0.5 * falloff;
              tmpNormal.copy(tmpOther).normalize();
              velocities[i] += tmpNormal.x * strength;
              velocities[i + 1] += tmpNormal.y * strength;
              velocities[i + 2] += tmpNormal.z * strength;
            }
          }
        }
      }
    }

    const stiffness = 22.0;
    const damping = 0.83;
    const posAttr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < posAttr.length; i += 3) {
      const fx = (basePositions[i] - posAttr[i]) * stiffness;
      const fy = (basePositions[i + 1] - posAttr[i + 1]) * stiffness;
      const fz = (basePositions[i + 2] - posAttr[i + 2]) * stiffness;

      velocities[i] += fx * delta;
      velocities[i + 1] += fy * delta;
      velocities[i + 2] += fz * delta;

      posAttr[i] += velocities[i] * delta;
      posAttr[i + 1] += velocities[i + 1] * delta;
      posAttr[i + 2] += velocities[i + 2] * delta;

      velocities[i] *= damping;
      velocities[i + 1] *= damping;
      velocities[i + 2] *= damping;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group position={position}>

      <mesh>
        <sphereGeometry args={[radius * 0.98, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={1}
          metalness={0.25}
          opacity={0.9}
          transparent
        />
      </mesh>

      <Points ref={pointsRef} positions={basePositions}>
        <PointMaterial
          vertexColors
          size={0.14}
          sizeAttenuation
          depthWrite={false}
          transparent
          opacity={1.0}
          blending={THREE.NormalBlending}
        />
      </Points>
    </group>
  );
}

export default function Home() {
  return (
    <div
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(180deg, #000000 85%, #D4AF37 100%)",
      }}
    >
      <LiveTicker />


      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between pt-24 pb-24 flex-grow px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:w-1/2 text-left"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            Finance, Simplified. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            Confidence, Delivered.
            </span>
          </h1>

          <p className="text-gray-200 text-lg mb-10 max-w-lg leading-relaxed">
          Stop guessing about your money. Finedge provides the clarity, personalized guidance, and sharp-edge tools you need to make every financial decision with precision.
          </p>
          <Link to="/ai">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.5), 0 4px 6px -2px rgba(251, 191, 36, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="
    text-black font-extrabold 
    px-5 py-3 rounded-lg flex items-center 
    transition-all duration-300 ease-in-out
    group shadow-lg
    
    // Initial Gold/Yellow Style
    bg-gradient-to-r from-yellow-400 to-amber-400

    // Hover Gradient Effect
    hover:from-yellow-300 hover:to-amber-600 
    hover:bg-gradient-to-l // Change direction on hover for movement
    
  "
            >

              Explore our services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.7} 
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>

        <div className="absolute inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.3} />
            <PixelSphere position={[3, -0.5, 0]} radius={2.4} />
          </Canvas>
        </div>
      </main>
      <Footer />
    </div>
  );
}