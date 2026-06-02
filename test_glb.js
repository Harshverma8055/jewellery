const fs = require('fs');
const { NodeIO } = require('@gltf-transform/core');

async function test() {
  const io = new NodeIO();
  const document = await io.read('/home/gabbar/jewellery/public/assets/models/ring-m1.glb');
  const root = document.getRoot();
  const meshes = root.listMeshes();
  console.log("Meshes:");
  meshes.forEach(m => console.log(m.getName()));
  
  const materials = root.listMaterials();
  console.log("\nMaterials:");
  materials.forEach(m => console.log(m.getName(), m.getBaseColorFactor()));
}

test().catch(console.error);
