import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Computer({ isMobile = false }) {
  const { nodes, materials } = useGLTF(
    "./computer-optimized-transformed.glb"
  );

  // Otimiza materiais apenas para dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      // Simplifica materiais em dispositivos móveis
      Object.values(materials).forEach(material => {
        // Guarda valores originais
        if (!material._originalValues) {
          material._originalValues = {
            roughness: material.roughness,
            metalness: material.metalness,
            envMapIntensity: material.envMapIntensity
          };
        }
        
        // Aplica valores otimizados
        material.roughness = 0.7; // Aumenta roughness para simplificar cálculos
        material.metalness = 0.3; // Reduz metalness para simplificar reflexos
        material.envMapIntensity = 0.5; // Reduz intensidade de mapas de ambiente
      });
    } else {
      // Restaura valores originais para desktop
      Object.values(materials).forEach(material => {
        if (material._originalValues) {
          material.roughness = material._originalValues.roughness;
          material.metalness = material._originalValues.metalness;
          material.envMapIntensity = material._originalValues.envMapIntensity;
        }
      });
    }
    
    return () => {
      // Restaura configurações originais ao desmontar
      Object.values(materials).forEach(material => {
        if (material._originalValues) {
          material.roughness = material._originalValues.roughness;
          material.metalness = material._originalValues.metalness;
          material.envMapIntensity = material._originalValues.envMapIntensity;
          material.needsUpdate = true;
        }
      });
    };
  }, [isMobile, materials]);

  return (
    <group dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

// Carrega o modelo antecipadamente, mas com baixa prioridade apenas em mobile
useGLTF.preload("./computer-optimized-transformed.glb");

export default Computer;
