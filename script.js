const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [];
const speeds = {};

function createPlanet(name, radius, distance, color, speed) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    scene.add(planet);
    planets.push({name, mesh: planet, distance, angle: 0});
    speeds[name] = speed;
}

createPlanet("mercury", 0.3, 5, 0xaaaaaa, 0.02);
createPlanet("venus", 0.6, 7, 0xffaa00, 0.015);
createPlanet("earth", 0.7, 9, 0x0000ff, 0.01);
createPlanet("mars", 0.5, 11, 0xff0000, 0.008);
createPlanet("jupiter", 1.2, 14, 0xff8800, 0.006);
createPlanet("saturn", 1.0, 17, 0xffddaa, 0.004);
createPlanet("uranus", 0.9, 20, 0x00ffff, 0.002);
createPlanet("neptune", 0.8, 23, 0x0000ff, 0.001);

const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(0,0,0);
scene.add(light);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    planets.forEach(p => {
        p.angle += speeds[p.name];
        p.mesh.position.x = p.distance * Math.cos(p.angle);
        p.mesh.position.z = p.distance * Math.sin(p.angle);
    });
    renderer.render(scene, camera);
}
animate();

// Link all speed controls
["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"].forEach(name => {
    document.getElementById(name + "Speed").oninput = (e) => {
        speeds[name] = parseFloat(e.target.value);
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
function addStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

addStars();

