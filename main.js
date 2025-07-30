// Scene setup with advanced settings
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 10, 50); // Atmospheric fog

// Camera with better settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 2, 0);

// Ultra high-quality renderer
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

// Enhanced OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enableZoom = true;
controls.enablePan = true;
controls.maxDistance = 25;
controls.minDistance = 3;
controls.target.set(0, 2, 0);
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;

// Advanced lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambientLight);

// Main directional light (Sun)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 15, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.bias = -0.0001;
scene.add(directionalLight);

// Rim lighting
const rimLight = new THREE.DirectionalLight(0x87CEEB, 0.8);
rimLight.position.set(-5, 5, -5);
scene.add(rimLight);

// Point lights for character illumination
const pointLight1 = new THREE.PointLight(0xffffff, 0.6, 20);
pointLight1.position.set(3, 6, 3);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffaa88, 0.4, 15);
pointLight2.position.set(-3, 4, 2);
scene.add(pointLight2);

// Create enhanced cartoon character
const character = new THREE.Group();

// Enhanced Head with subsurface scattering effect
const headGeometry = new THREE.SphereGeometry(1, 64, 64);
const headMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xffdbac,
    roughness: 0.8,
    metalness: 0.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.8,
    transmission: 0.05,
    thickness: 0.5
});
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 4;
head.castShadow = true;
head.receiveShadow = true;
character.add(head);

// Enhanced Eyes with reflections
const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
const eyeMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x000000,
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0
});

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.3, 4.2, 0.8);
leftEye.castShadow = true;
character.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.3, 4.2, 0.8);
rightEye.castShadow = true;
character.add(rightEye);

// Eye highlights
const highlightGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
leftHighlight.position.set(-0.25, 4.25, 0.85);
character.add(leftHighlight);

const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
rightHighlight.position.set(0.35, 4.25, 0.85);
character.add(rightHighlight);

// Enhanced Nose
const noseGeometry = new THREE.ConeGeometry(0.1, 0.3, 16);
const noseMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xffdbac,
    roughness: 0.9,
    metalness: 0.0
});
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 3.8, 0.9);
nose.rotation.x = Math.PI;
nose.castShadow = true;
character.add(nose);

// Enhanced Mouth
const mouthGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32, Math.PI);
const mouthMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xff3333,
    roughness: 0.2,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1
});
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(0, 3.4, 0.8);
mouth.rotation.x = Math.PI;
mouth.castShadow = true;
character.add(mouth);

// Enhanced Body
const bodyGeometry = new THREE.CylinderGeometry(0.8, 1, 2.5, 64);
const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x0066cc,
    roughness: 0.9,
    metalness: 0.0,
    clearcoat: 0.0,
    transmission: 0.0
});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 1.5;
body.castShadow = true;
body.receiveShadow = true;
character.add(body);

// Enhanced Arms
const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
const armMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xffdbac,
    roughness: 0.8,
    metalness: 0.0,
    transmission: 0.02
});

const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-1.2, 2, 0);
leftArm.rotation.z = Math.PI / 6;
leftArm.castShadow = true;
leftArm.receiveShadow = true;
character.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.position.set(1.2, 2, 0);
rightArm.rotation.z = -Math.PI / 6;
rightArm.castShadow = true;
rightArm.receiveShadow = true;
character.add(rightArm);

// Enhanced Legs
const legGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.5, 32);
const legMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x4a4a8a,
    roughness: 0.95,
    metalness: 0.0,
    normalScale: new THREE.Vector2(0.5, 0.5)
});

const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.4, -0.5, 0);
leftLeg.castShadow = true;
leftLeg.receiveShadow = true;
character.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
rightLeg.position.set(0.4, -0.5, 0);
rightLeg.castShadow = true;
rightLeg.receiveShadow = true;
character.add(rightLeg);

// Enhanced Hat
const hatGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 64);
const hatMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0xcc0000,
    roughness: 0.7,
    metalness: 0.0,
    clearcoat: 0.3
});
const hat = new THREE.Mesh(hatGeometry, hatMaterial);
hat.position.y = 5;
hat.castShadow = true;
hat.receiveShadow = true;
character.add(hat);

// Hat rim
const rimGeometry = new THREE.TorusGeometry(1.2, 0.05, 16, 64);
const rimMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x888888,
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 1.0
});
const hatRim = new THREE.Mesh(rimGeometry, rimMaterial);
hatRim.position.y = 4.85;
hatRim.castShadow = true;
character.add(hatRim);

// Add character to scene
scene.add(character);

// Enhanced ground with displacement
const groundGeometry = new THREE.PlaneGeometry(30, 30, 100, 100);
const groundMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x90EE90,
    roughness: 0.9,
    metalness: 0.0,
    transmission: 0.0
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;
ground.receiveShadow = true;

// Add subtle ground displacement
const vertices = ground.geometry.attributes.position.array;
for (let i = 0; i < vertices.length; i += 3) {
    vertices[i + 2] = Math.sin(vertices[i] * 0.1) * Math.cos(vertices[i + 1] * 0.1) * 0.1;
}
ground.geometry.attributes.position.needsUpdate = true;
ground.geometry.computeVertexNormals();
scene.add(ground);

// Floating particles
const particleCount = 100;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 20;
    particlePositions[i + 1] = Math.random() * 10 + 2;
    particlePositions[i + 2] = (Math.random() - 0.5) * 20;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particleMaterial = new THREE.PointsMaterial({ 
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.6
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// ===== DRAG AND DROP FUNCTIONALITY =====
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isDragging = false;
let dragPlane = new THREE.Plane();
let dragOffset = new THREE.Vector3();
let dragIntersection = new THREE.Vector3();

// Create invisible drag plane
const dragPlaneGeometry = new THREE.PlaneGeometry(1000, 1000);
const dragPlaneMaterial = new THREE.MeshBasicMaterial({ visible: false });
const dragPlaneHelper = new THREE.Mesh(dragPlaneGeometry, dragPlaneMaterial);
dragPlaneHelper.rotation.x = -Math.PI / 2;
scene.add(dragPlaneHelper);

// Mouse event handlers
function onMouseDown(event) {
    event.preventDefault();
    
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with character
    const intersects = raycaster.intersectObject(character, true);
    
    if (intersects.length > 0) {
        isDragging = true;
        controls.enabled = false; // Disable orbit controls while dragging
        
        // Set up drag plane at character's Y position
        dragPlane.setFromNormalAndCoplanarPoint(
            camera.getWorldDirection(dragPlane.normal),
            character.position
        );
        
        // Calculate offset from character center to click point
        if (raycaster.ray.intersectPlane(dragPlane, dragIntersection)) {
            dragOffset.subVectors(character.position, dragIntersection);
        }
        
        // Change cursor to indicate dragging
        document.body.style.cursor = 'grabbing';
        
        // Add visual feedback - make character slightly bigger
        character.scale.setScalar(1.1);
    }
}

function onMouseMove(event) {
    if (!isDragging) return;
    
    event.preventDefault();
    
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Find intersection with drag plane
    if (raycaster.ray.intersectPlane(dragPlane, dragIntersection)) {
        // Move character to new position with offset
        character.position.addVectors(dragIntersection, dragOffset);
        
        // Keep character above ground
        character.position.y = Math.max(character.position.y, 2);
        
        // Update camera target to follow character smoothly
        controls.target.lerp(character.position, 0.1);
    }
}

function onMouseUp(event) {
    if (isDragging) {
        isDragging = false;
        controls.enabled = true; // Re-enable orbit controls
        
        // Reset cursor
        document.body.style.cursor = 'default';
        
        // Reset character scale
        character.scale.setScalar(1.0);
        
        console.log(`Character moved to position: x=${character.position.x.toFixed(2)}, y=${character.position.y.toFixed(2)}, z=${character.position.z.toFixed(2)}`);
    }
}

// Add event listeners
renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);

// Handle mouse leave to stop dragging
renderer.domElement.addEventListener('mouseleave', onMouseUp, false);

// Enhanced animation with more realistic movements
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    
    time += 0.008;
    
    // Character breathing with chest movement (only if not dragging)
    if (!isDragging) {
        character.scale.y = 1 + Math.sin(time * 2) * 0.015;
        body.scale.x = 1 + Math.sin(time * 2) * 0.01;
    }
    
    // Head natural movement
    head.rotation.y = Math.sin(time * 0.8) * 0.08;
    head.rotation.x = Math.sin(time * 0.6) * 0.03;
    
    // Eye blinking animation
    const blinkTime = Math.sin(time * 0.3);
    if (blinkTime > 0.95) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
    } else {
        leftEye.scale.y = 1;
        rightEye.scale.y = 1;
    }
    
    // Arms natural swaying
    leftArm.rotation.z = Math.PI / 6 + Math.sin(time * 1.2) * 0.15;
    rightArm.rotation.z = -Math.PI / 6 - Math.sin(time * 1.2) * 0.15;
    leftArm.rotation.x = Math.sin(time * 0.9) * 0.1;
    rightArm.rotation.x = Math.sin(time * 0.9) * 0.1;
    
    // Hat subtle movement
    hat.position.y = 5 + Math.sin(time * 2.5) * 0.03;
    hat.rotation.z = Math.sin(time * 0.7) * 0.02;
    
    // Particle movement
    const positions = particles.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += 0.001;
    
    // Dynamic lighting
    directionalLight.intensity = 1.5 + Math.sin(time * 0.5) * 0.2;
    pointLight1.intensity = 0.6 + Math.sin(time * 0.8) * 0.1;
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

// Success message
console.log('🎨 Ultra High-Quality Graphics Loaded!');
console.log('🌟 Features: PBR Materials, Advanced Lighting, Particles, Animations');
console.log('🎮 Mouse Controls:');
console.log('   • Click and drag character to move it anywhere');
console.log('   • Right-click and drag to rotate camera');
console.log('   • Mouse wheel to zoom in/out');
console.log('   • Middle-click and drag to pan camera');
