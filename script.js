// إعداد المشهد والكاميرا
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // لون السماء

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// أرضية
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshPhongMaterial({color: 0x228B22});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// كرة
const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.y = 1;
scene.add(ball);

// إضاءة
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10,20,10);
scene.add(light);

// التحكم بالحركة
const speed = 0.3;
const keys = {};
document.addEventListener("keydown", (e)=>keys[e.key]=true);
document.addEventListener("keyup", (e)=>keys[e.key]=false);

// كاميرا تتبع الكرة
camera.position.set(0,5,10);
camera.lookAt(ball.position);

function animate(){
    requestAnimationFrame(animate);

    if(keys["ArrowUp"]) ball.position.z -= speed;
    if(keys["ArrowDown"]) ball.position.z += speed;
    if(keys["ArrowLeft"]) ball.position.x -= speed;
    if(keys["ArrowRight"]) ball.position.x += speed;

    camera.position.x = ball.position.x + 5;
    camera.position.z = ball.position.z + 10;
    camera.lookAt(ball.position);

    renderer.render(scene, camera);
}

animate();
