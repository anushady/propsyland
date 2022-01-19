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
        obj.scale.set(0.15,0.19,0.15)
        //obj.scale.set(0.2,0.2,0.2)
        //obj.rotation.set(-0.4,0.1,-0.2)
        obj.rotation.set(0,1,0)
        obj.position.set(0,-0.8,0)

        //obj.castShadow = true; //default is false
        
        // mixer1 = new THREE.AnimationMixer(obj);
	    // console.log(gltf.animations)
	    // mixer1.clipAction( gltf.animations[0]).play();
        
    }
);

const ageometry = new THREE.CylinderGeometry( 0.9, 0.9, 2.2, 32 );
const amaterial = new THREE.MeshPhongMaterial( {color: 0xffffff} );
const cylinder = new THREE.Mesh( ageometry, amaterial );
//cylinder.rotation.set(-0.4,0.1,-0.2)
cylinder.rotation.set(0,0,0)
cylinder.position.set(0,-0.8,0)
scene.add( cylinder );
cylinder.castShadow = true

const planeGeometry = new THREE.PlaneBufferGeometry( 100,100 );
const planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2} )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.DoubleSide = true;
plane.position.set(0,-2.2,0)
plane.rotation.set(-Math.PI/2,0,0)
scene.add( plane );

// Lights
const amblight = new THREE.AmbientLight( 0xffffff,0.2); // soft white light
scene.add( amblight );

const light = new THREE.DirectionalLight( 0xffffff,0.7 );
light.position.set( -1.5, 2.5,-1.3 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
const light2 = new THREE.DirectionalLight( 0xffffff,0.4);
light2.position.set( -2, 0, 0); //default; light shining from top
light2.castShadow = false; // default false
scene.add( light2 );
const light3 = new THREE.DirectionalLight( 0xffffff,0.3 );
light3.position.set( 2,0,1 ); //default; light shining from top
light3.castShadow = false; // default false
scene.add( light3 );
const light4 = new THREE.DirectionalLight( 0xffffff,0.4 );
light4.position.set( 2,-2,-2 ); //default; light shining from top
light4.castShadow = true; // default false
scene.add( light4 );

//Set up shadow properties for the light
light.shadow.mapSize.width = 100; // default
light.shadow.mapSize.height = 100; // default
light.shadow.camera.near = 1; // default
light.shadow.camera.far = 10; // default
light.shadow.camera.left = -1; // default
light.shadow.camera.right = 2; // default
light.shadow.camera.top = 5; // default
light.shadow.camera.bottom = -5; // default
// //Set up shadow properties for the light
// light2.shadow.mapSize.width = 1024; // default
// light2.shadow.mapSize.height = 1024; // default
// light2.shadow.camera.near = 1; // default
// light2.shadow.camera.far = 100; // default
// light2.shadow.camera.left = -5; // default
// light2.shadow.camera.right = 5; // default
// light2.shadow.camera.top = 5; // default
// light2.shadow.camera.bottom = -5; // default
// //Set up shadow properties for the light
// light3.shadow.mapSize.width = 1024; // default
// light3.shadow.mapSize.height = 1024; // default
// light3.shadow.camera.near = 1; // default
// light3.shadow.camera.far = 100; // default
// light3.shadow.camera.left = -5; // default
// light3.shadow.camera.right = 5; // default
// light3.shadow.camera.top = 5; // default
// light3.shadow.camera.bottom = -5; // default
// //Set up shadow properties for the light
// light4.shadow.mapSize.width = 1024; // default
// light4.shadow.mapSize.height = 1024; // default
// light4.shadow.camera.near = 1; // default
// light4.shadow.camera.far = 100; // default
// light4.shadow.camera.left = -5; // default
// light4.shadow.camera.right = 5; // default
// light4.shadow.camera.top = 5; // default
// light4.shadow.camera.bottom = -5; // default


const pointlight = new THREE.PointLight( 0xffffff, 0.5, 100 );
pointlight.position.set( 5, 5, 5 );
scene.add( pointlight );
const pointlight2 = new THREE.PointLight( 0xffffff, 0.5, 100 );
pointlight2.position.set(-5, 5, 5 );
scene.add( pointlight2 );
const pointlight3 = new THREE.PointLight( 0xffffff, 0.5, 1 );
pointlight3.position.set(-5, 0, -5 );
scene.add( pointlight3 );


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
camera.position.x = -5
camera.position.y = 4
camera.position.z = 3
scene.add(camera)

//Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.maxPolarAngle = Math.PI/2 
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
