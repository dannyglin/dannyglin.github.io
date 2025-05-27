import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Basketball(props) {
  const meshRef = useRef()
  
  // Create rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008
      meshRef.current.rotation.y += 0.008
    }
  })

  // Note on torusGeometry: args are [radius, tubeRadius, radialSegments, tubularSegments]
  // Your current radialSegments is 4, which will make the seam's cross-section square-ish.
  // For a rounder seam, you might want to increase it (e.g., to 8 or 16).
  const seamGeometryArgs = [1.205, 0.015, 4, 64]; // Original: [1.205, 0.015, 4, 64]
  // For rounder seams, consider: const seamGeometryArgs = [1.205, 0.015, 16, 64];

  return (
    <group {...props} position={[0, 0, 0]}>
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial 
            color="#A7C7E7" // Dark blue basketball
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        {/* Basketball seams */}
        <group>
          {/* First curved line - often horizontal or along one primary axis */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={seamGeometryArgs} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          
          {/* Second curved line - perpendicular to the first */}
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={seamGeometryArgs} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* ADDED: Third curved line - for more basketball-like appearance */}
          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
            <torusGeometry args={seamGeometryArgs} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* ADDED: Fourth curved line - for more basketball-like appearance */}
          <mesh position={[0, 0, 0]} rotation={[0, -Math.PI / 4, -Math.PI / 4]}>
            <torusGeometry args={seamGeometryArgs} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>
      </group>
    </group>
  )
}