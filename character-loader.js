// Add this to your HTML first:
// <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>

// Scene setup (same as before)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
// ... (same setup as before)

// GLTF Loader for 3D models
const loader = new THREE.GLTFLoader();

// Load character model
loader.load(
    'models/character.glb', // Your model file path
    function (gltf) {
        const character = gltf.scene;
        
        // Scale and position the character
        character.scale.set(2, 2, 2);
        character.position.set(0, 0, 0);
        
        // Enable shadows
        character.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(character);
        
        // Animation mixer for character animations
        const mixer = new THREE.AnimationMixer(character);
        
        // Play animations if available
        if (gltf.animations.length > 0) {
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
        }
        
        // Update animation in render loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Update animations
            mixer.update(0.016); // 60fps
            
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
        
        console.log('3D Character loaded successfully!');
    },
    function (progress) {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    function (error) {
        console.error('Error loading model:', error);
    }
);