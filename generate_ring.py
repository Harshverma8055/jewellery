import trimesh
import numpy as np

# Create a torus (ring shape)
mesh = trimesh.creation.torus(major_radius=10, minor_radius=1.5, major_sections=64, minor_sections=32)

# Give it a shiny gold color
mesh.visual.vertex_colors = trimesh.visual.color.hex_to_rgba('#FFD700')

# Export to GLB
mesh.export('/home/gabbar/jewellery/public/assets/ring.glb')
print("Successfully generated ring.glb")
