import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export function Computer({ performanceLevel = "high", isMobile = false, isUltraLowPerformance = false }) {
  const { nodes, materials } = useGLTF(
    "./computer-optimized-transformed.glb"
  );

  // Otimiza materiais para dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      // Simplifica materiais em dispositivos móveis
      Object.values(materials).forEach(material => {
        // Guarda valores originais
        if (!material._originalValues) {
          material._originalValues = {
            roughness: material.roughness,
            metalness: material.metalness,
            envMapIntensity: material.envMapIntensity,
            aoMapIntensity: material.aoMapIntensity,
            normalScale: material.normalScale ? material.normalScale.clone() : undefined,
            flatShading: material.flatShading
          };
        }
        
        // Aplica valores otimizados baseados no nível de performance
        if (isUltraLowPerformance) {
          // Configurações ultra simplificadas para dispositivos muito antigos
          material.roughness = 1.0;
          material.metalness = 0.0;
          material.envMapIntensity = 0.0;
          material.aoMapIntensity = 0.0;
          material.normalScale = new THREE.Vector2(0, 0);
          material.flatShading = true;
          
          // Desativa mapas complexos
          material.normalMap = null;
          material.roughnessMap = null;
          material.metalnessMap = null;
          material.aoMap = null;
          
          // Reduz resolução de texturas
          if (material.map) {
            material.map.minFilter = THREE.NearestFilter;
            material.map.magFilter = THREE.NearestFilter;
            material.map.anisotropy = 1;
          }
        } else if (performanceLevel === "low") {
          // Configurações simplificadas para dispositivos de baixo desempenho
          material.roughness = 0.9;
          material.metalness = 0.1;
          material.envMapIntensity = 0.2;
          material.aoMapIntensity = 0.3;
          material.normalScale = new THREE.Vector2(0.3, 0.3);
          
          // Reduz qualidade de texturas
          if (material.map) {
            material.map.minFilter = THREE.LinearFilter;
            material.map.magFilter = THREE.LinearFilter;
            material.map.anisotropy = 1;
          }
        } else if (performanceLevel === "medium") {
          // Configurações moderadas para dispositivos médios
          material.roughness = 0.7;
          material.metalness = 0.3;
          material.envMapIntensity = 0.5;
          
          // Reduz levemente a qualidade de texturas
          if (material.map) {
            material.map.anisotropy = 2;
          }
        }
      });
    } else {
      // Restaura valores originais para desktop
      Object.values(materials).forEach(material => {
        if (material._originalValues) {
          material.roughness = material._originalValues.roughness;
          material.metalness = material._originalValues.metalness;
          material.envMapIntensity = material._originalValues.envMapIntensity;
          material.aoMapIntensity = material._originalValues.aoMapIntensity;
          if (material._originalValues.normalScale) {
            material.normalScale.copy(material._originalValues.normalScale);
          }
          material.flatShading = material._originalValues.flatShading;
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
          material.aoMapIntensity = material._originalValues.aoMapIntensity;
          if (material._originalValues.normalScale) {
            material.normalScale.copy(material._originalValues.normalScale);
          }
          material.flatShading = material._originalValues.flatShading;
          material.needsUpdate = true;
        }
      });
    };
  }, [isMobile, materials, performanceLevel, isUltraLowPerformance]);

  // Para dispositivos ultra baixos, usa geometria simplificada
  const simplifiedGeometry = useMemo(() => {
    if (!isUltraLowPerformance) return null;
    
    // Cria versões simplificadas das geometrias
    const desk = nodes.Cube000_ComputerDesk_0001_1.geometry.clone();
    const floppy = nodes.Cube000_ComputerDesk_0001_2.geometry.clone();
    
    // Reduz o número de vértices (simplificação extrema)
    // Nota: Em um caso real, seria melhor ter modelos LOD pré-preparados
    return {
      desk: desk,
      floppy: floppy
    };
  }, [isUltraLowPerformance, nodes]);

  return (
    <group dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow={!isMobile}
          receiveShadow={!isMobile}
          geometry={simplifiedGeometry ? simplifiedGeometry.desk : nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow={!isMobile}
          receiveShadow={!isMobile}
          geometry={simplifiedGeometry ? simplifiedGeometry.floppy : nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

// Carrega o modelo antecipadamente apenas em desktop
if (window.innerWidth >= 768) {
  useGLTF.preload("./computer-optimized-transformed.glb");
}

export default Computer;
