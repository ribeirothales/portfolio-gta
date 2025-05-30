import { OrbitControls, Loader, useDetectGPU } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

import Computer from "./Computer";

// componente para otimizações extremas em dispositivos móveis
const MobileOptimizer = () => {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    
    gl.setPixelRatio(window.devicePixelRatio * 0.75);
    
    
    gl.shadowMap.enabled = false;
    
    
    gl.outputEncoding = THREE.LinearEncoding;
    
    
    gl.toneMapping = THREE.NoToneMapping;
    
    
    scene.background = null;
    
    return () => {
      
      gl.shadowMap.enabled = true;
      gl.outputEncoding = THREE.sRGBEncoding;
      gl.toneMapping = THREE.ACESFilmicToneMapping;
    };
  }, [gl, scene]);
  
  
  useFrame((_, delta) => {
    if (delta > 0.1) {
      return true;
    }
    return null;
  });
  
  return null;
};


const LoadingFallback = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#52044b" />
    </mesh>
  );
};

// componente para detectar dispositivos muito antigos
const DevicePerformanceDetector = ({ children }) => {
  const [performanceLevel, setPerformanceLevel] = useState("high");
  const gpuTier = useDetectGPU();
  
  useEffect(() => {
    // detecta dispositivos de baixo desempenho
    const checkPerformance = () => {
      
      const isMobile = window.innerWidth < 768 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (!isMobile) {
        setPerformanceLevel("high"); 
        return;
      }
      
      
      if (gpuTier && gpuTier.tier < 2) {
        setPerformanceLevel("ultra-low");
        return;
      }
      
      
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        setPerformanceLevel("low");
        return;
      }
      
      
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setPerformanceLevel("low");
        return;
      }
      
      setPerformanceLevel("medium");
    };
    
    checkPerformance();
  }, [gpuTier]);
  
  return children(performanceLevel);
};

const ContactExperience = () => {
  return (
    <DevicePerformanceDetector>
      {(performanceLevel) => {
        
        const isMobile = performanceLevel !== "high";
        const isUltraLowPerformance = performanceLevel === "ultra-low";
        
        
        const dprSetting = isUltraLowPerformance ? [0.5, 0.75] : isMobile ? [0.75, 1] : undefined;
        const shadowMapSize = isUltraLowPerformance ? [256, 256] : isMobile ? [512, 512] : [1024, 1024];
        
        return (
          <>
            <Canvas 
              shadows={!isMobile}
              camera={{ position: [0, 3, 7], fov: 45 }}
              dpr={dprSetting}
              frameloop={isUltraLowPerformance ? "demand" : "always"}
              gl={{
                antialias: !isMobile,
                powerPreference: "low-power",
                precision: isMobile ? "lowp" : "highp",
              }}
              performance={{ min: isUltraLowPerformance ? 0.1 : 0.5 }}
            >
              {isMobile && <MobileOptimizer />}
              
              
              <ambientLight intensity={isMobile ? 0.8 : 0.5} color="#fff4e6" />
              
              
              {!isUltraLowPerformance && (
                <directionalLight 
                  position={[5, 5, 3]} 
                  intensity={2.5} 
                  color="#52044b"
                  castShadow={!isMobile}
                />
              )}
              
              
              <directionalLight
                position={[5, 9, 1]}
                castShadow={!isMobile}
                intensity={isMobile ? 3 : 2.5}
                color="#ffd9b3"
                shadow-mapSize={shadowMapSize}
              />

              <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
                enableDamping={!isUltraLowPerformance}
                dampingFactor={0.05}
                rotateSpeed={isMobile ? 0.5 : 1}
                touchAction="none"
              />

              
              <group scale={[1, 1, 1]}>
                <mesh
                  receiveShadow={!isMobile}
                  position={[0, -1.5, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <planeGeometry args={isUltraLowPerformance ? [15, 15] : [30, 30]} />
                  <meshBasicMaterial color="#52044b" />
                </mesh>
              </group>

              <Suspense fallback={<LoadingFallback />}>
                <group 
                  scale={0.03} 
                  position={[0, -1.49, -2]} 
                  castShadow={!isMobile}
                >
                  <Computer 
                    performanceLevel={performanceLevel} 
                    isMobile={isMobile} 
                    isUltraLowPerformance={isUltraLowPerformance} 
                  />
                </group>
              </Suspense>
            </Canvas>
            
            
            {isMobile && (
              <Loader 
                containerStyles={{ background: 'rgba(82, 4, 75, 0.8)' }} 
                dataInterpolation={(p) => `Carregando ${p.toFixed(0)}%`} 
              />
            )}
          </>
        );
      }}
    </DevicePerformanceDetector>
  );
};

export default ContactExperience;
