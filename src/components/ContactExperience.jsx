import { OrbitControls, useGLTF, Loader, AdaptiveDpr, AdaptiveEvents, BakeShadows } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import Computer from "./Computer";

// Componente para detectar dispositivo móvel
const MobileOptimizer = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    // Otimiza configurações de renderização para dispositivos móveis
    gl.shadowMap.autoUpdate = false;
    gl.shadowMap.needsUpdate = true;
    
    // Reduz a precisão para melhorar performance
    gl.outputEncoding = 3000; // sRGBEncoding
    
    return () => {
      gl.shadowMap.autoUpdate = true;
    };
  }, [gl]);
  
  return null;
};

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
        shadows={{ enabled: true, type: 'PCFSoftShadowMap', autoUpdate: false }} 
        camera={{ position: [0, 3, 7], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Limita pixel ratio em dispositivos móveis
        performance={{ min: 0.5 }} // Permite degradação controlada
      >
        {/* Otimizadores de performance */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <BakeShadows />
        {isMobile && <MobileOptimizer />}
        
        {/* Iluminação simplificada para mobile */}
        <ambientLight intensity={0.5} color="#fff4e6" />
        
        {/* Reduz para uma luz direcional em mobile */}
        {!isMobile && (
          <directionalLight position={[5, 5, 3]} intensity={2.5} color="#52044b" />
        )}
        
        <directionalLight
          position={[5, 9, 1]}
          castShadow={!isMobile} // Desativa sombras em mobile
          intensity={isMobile ? 3 : 2.5} // Compensa a remoção da outra luz
          color="#ffd9b3"
          shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]} // Reduz resolução das sombras em mobile
        />

        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={isMobile ? 0.5 : 1} // Reduz velocidade de rotação em mobile
          touchAction="none"
        />

        <group scale={[1, 1, 1]}>
          <mesh
            receiveShadow={!isMobile} // Desativa recepção de sombras em mobile
            position={[0, -1.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[20, 20]} /> {/* Reduz tamanho do plano */}
            <meshStandardMaterial color="#52044b" />
          </mesh>
        </group>

        <Suspense fallback={<LoadingFallback />}>
          <group scale={0.03} position={[0, -1.49, -2]} castShadow={!isMobile}>
            <Computer isMobile={isMobile} />
          </group>
        </Suspense>
      </Canvas>
      
      {/* Loader externo para feedback visual durante carregamento */}
      <Loader 
        containerStyles={{ background: 'rgba(82, 4, 75, 0.8)' }} 
        dataInterpolation={(p) => `Carregando ${p.toFixed(0)}%`} 
      />
    </>
  );
};

export default ContactExperience;
