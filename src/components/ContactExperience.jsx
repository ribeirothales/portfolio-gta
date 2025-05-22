import { OrbitControls, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import Computer from "./Computer";

// Componente de fallback simples durante carregamento
const LoadingFallback = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#52044b" />
    </mesh>
  );
};

const ContactExperience = () => {
  // Detecta se é dispositivo móvel
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Canvas 
        shadows
        camera={{ position: [0, 3, 7], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : undefined} // Limita pixel ratio apenas em dispositivos móveis
      >
        {/* Iluminação original para desktop */}
        <ambientLight intensity={0.5} color="#fff4e6" />
        <directionalLight position={[5, 5, 3]} intensity={2.5} color="#52044b" />
        <directionalLight
          position={[5, 9, 1]}
          castShadow
          intensity={2.5}
          color="#ffd9b3"
          shadow-mapSize={isMobile ? [512, 512] : undefined} // Reduz resolução das sombras apenas em mobile
        />

        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={isMobile ? 0.5 : 1} // Ajusta velocidade apenas em mobile
          touchAction="none"
        />

        <group scale={[1, 1, 1]}>
          <mesh
            receiveShadow
            position={[0, -1.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[30, 30]} /> {/* Mantém tamanho original do plano */}
            <meshStandardMaterial color="#52044b" />
          </mesh>
        </group>

        <Suspense fallback={<LoadingFallback />}>
          <group scale={0.03} position={[0, -1.49, -2]} castShadow>
            <Computer isMobile={isMobile} />
          </group>
        </Suspense>
      </Canvas>
      
      {/* Loader apenas para dispositivos móveis */}
      {isMobile && (
        <Loader 
          containerStyles={{ background: 'rgba(82, 4, 75, 0.8)' }} 
          dataInterpolation={(p) => `Carregando ${p.toFixed(0)}%`} 
        />
      )}
    </>
  );
};

export default ContactExperience;
