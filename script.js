// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// const near = 2;
//     const far = 5;
//     const color = 'white';
// scene.fog = new THREE.Fog(color, near, far);

// const geometry = new THREE.PlaneGeometry( 10, 10 );
// const material = new THREE.MeshStandardMaterial( {color: 0x33fdfd, side: THREE.DoubleSide, roughness:0.1, metalness: 0.4, refractionRatio:0 } );
// const plane = new THREE.Mesh( geometry, material );
// plane.rotation.set(Math.PI/2,0,0)
// plane.position.set(0,-2,0)
// scene.add( plane );

// GLTF Loader

var loader = new THREE.GLTFLoader();
var obj;
loader.load(
	// resource URL
	'cyliderarray2.glb',
	// called when the resource is loaded
	    function ( gltf ) {
        obj = gltf.scene
		scene.add( obj );
        obj.scale.set(0.065,0.08,0.065)
        obj.rotation.set(0.7,0.1,-0.3)
        //obj.rotation.set(0,0,0)
        obj.position.set(0,0,0)

        obj.castShadow = true; //default is false
        obj.receiveShadow = false; //default
        
        // mixer1 = new THREE.AnimationMixer(obj);
	    // console.log(gltf.animations)
	    // mixer1.clipAction( gltf.animations[0]).play();
        
    }
);

// const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
// const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x000000 } )
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// plane.receiveShadow = true;
// plane.position.set(0,-0.9,0)
// plane.rotation.set(Math.PI/2,0,0)
// scene.add( plane );

// Lights
const amblight = new THREE.AmbientLight( 0xffffff,1); // soft white light
scene.add( amblight );

const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
light.position.set( 0,1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

const pointLight2 = new THREE.PointLight(0xffffff,1)
pointLight2.position.x =50
pointLight2.position.y = 1
pointLight2.position.z = 1
const pointLight = new THREE.PointLight(0xffffff,1)
pointLight.position.x = -1
pointLight.position.y = 1
pointLight.position.z = -20
scene.add(pointLight)
const pointLight3 = new THREE.PointLight(0xffffff,0.5)
pointLight3.position.y = 0
pointLight3.position.z = -20
pointLight3.position.x = -20
scene.add(pointLight3)
const pointLight4 = new THREE.PointLight(0xffffff,0.8)
pointLight4.position.y = 0
pointLight4.position.z = 20
pointLight4.position.x = 20
scene.add(pointLight4)
const pointLight5 = new THREE.PointLight(0xffffff,0.8)
pointLight5.position.y = 0
pointLight5.position.z = 20
pointLight5.position.x = 0
scene.add(pointLight5)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

//Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
/**
 * Animate
 */

//  document.addEventListener('mousemove', onDocumentMouseMove)

//  let mouseX = 0;
//  let mouseY = 0;
 
//  let targetX = 0;
//  let targetY = 0;
 
//  const windowX = window.innerWidth /2;
//  const windowY = window.innerHeight /2;
 
//  function onDocumentMouseMove (event) {
//      mouseX = (event.clientX - windowX)
//      mouseY = (event.clientY - windowY)
//  }
 
//  const updateOnScroll = (event) => {
//      obj.position.z = window.scrollY *.002
//  }
 
//  window.addEventListener('scroll', updateOnScroll)

const clock = new THREE.Clock()

const tick = () =>
{
    window.requestAnimationFrame(tick)
    //const deltaTime = clock.getDelta()
    // if ( mixer1 ) mixer1.update( deltaTime);	
	

   
    // targetX = mouseX * .001
    // targetY = mouseY * .001

    // Update objects
    //obj.rotation.y += .5 * (targetX - obj.rotation.y)
    //obj.rotation.x += .05 * (targetY - obj.rotation.x)
    //obj.rotation.z += -0.05 * (targetY - obj.rotation.x)

    // Update Orbital Controls
    controls.update()
    renderer.render(scene, camera);	

    // Call tick again on the next frame
    

   
}

tick()
