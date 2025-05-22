import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Computer({ isMobile = false }) {
  const { nodes, materials } = useGLTF(
    "./computer-optimized-transformed.glb"
  );

  // Otimiza materiais para dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      // Simplifica materiais em dispositivos móveis
      Object.values(materials).forEach(material => {
        material.roughness = 0.7; // Aumenta roughness para simplificar cálculos
        material.metalness = 0.3; // Reduz metalness para simplificar reflexos
        material.envMapIntensity = 0.5; // Reduz intensidade de mapas de ambiente
      });
    }
    
    return () => {
      // Restaura configurações originais ao desmontar
      if (isMobile) {
        Object.values(materials).forEach(material => {
          material.needsUpdate = true;
        });
      }
    };
  }, [isMobile, materials]);

  return (
    <group dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow={!isMobile}
          receiveShadow={!isMobile}
          geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow={!isMobile}
          receiveShadow={!isMobile}
          geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

// Carrega o modelo antecipadamente, mas com baixa prioridade
useGLTF.preload("./computer-optimized-transformed.glb", { priority: -1 });

export default Computer;
