<template>
  <div class="example-controls">
    <div class="example-group">
      <h3>基础几何体</h3>
      <button @click="switchExample('cube')">立方体</button>
      <button @click="switchExample('sphere')">球体</button>
      <button @click="switchExample('torus')">圆环</button>
      <button @click="switchExample('textured')">纹理贴图</button>
    </div>
    <div class="example-group">
      <h3>高级示例</h3>
      <button @click="switchExample('particles')">粒子系统</button>
      <button @click="switchExample('text3d')">3D文字</button>
      <button @click="switchExample('animation')">动画混合</button>
      <button @click="switchExample('model')">3D模型</button>
      <button @click="switchExample('physics')">物理模拟</button>
      <button @click="switchExample('advancedParticles')">高级粒子</button>
    </div>
  </div>
  
  <div v-if="currentExample === 'text3d'" class="text-input-container">
    <input 
      v-model="customText" 
      type="text" 
      placeholder="输入自定义文字"
      @input="update3DText"
    >
  </div>
  
  <div ref="container" class="three-container"></div>
</template>
<style scoped>
.text-input-container {
  margin: 15px 0;
  padding: 0 10px;
}
.text-input-container input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}
</style>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const container = ref<HTMLDivElement | null>(null)
const currentExample = ref('cube')

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number
let currentObject: THREE.Object3D | null = null
let textureLoader: THREE.TextureLoader
let font: THREE.Font
let mixer: THREE.AnimationMixer
let clock: THREE.Clock

// 初始化场景
const initScene = () => {
  if (!container.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  textureLoader = new THREE.TextureLoader()
  clock = new THREE.Clock()

  // 加载字体
  const fontLoader = new FontLoader()
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
    font = loadedFont
  })

  // 光照
  const ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)
}

// 基础示例
const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    roughness: 0.1,
    metalness: 0.5
  })
  currentObject = new THREE.Mesh(geometry, material)
  scene.add(currentObject)
}

const createSphere = () => {
  const geometry = new THREE.SphereGeometry(1, 32, 32)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xff0000,
    roughness: 0.2,
    metalness: 0.7
  })
  currentObject = new THREE.Mesh(geometry, material)
  scene.add(currentObject)
}

const createTorus = () => {
  const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x0000ff,
    roughness: 0.5,
    metalness: 0.5
  })
  currentObject = new THREE.Mesh(geometry, material)
  scene.add(currentObject)
}

const createTextured = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ 
    map: textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg'),
    normalMap: textureLoader.load('https://threejs.org/examples/textures/brick_normal.jpg'),
    roughness: 0.8,
    metalness: 0.2
  })
  currentObject = new THREE.Mesh(geometry, material)
  scene.add(currentObject)
}

// 高级示例
const createParticles = () => {
  const particles = 1000
  const positions = new Float32Array(particles * 3)
  
  for (let i = 0; i < particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.8
  })
  
  currentObject = new THREE.Points(geometry, material)
  scene.add(currentObject)
}

const customText = ref('Three.js')

const fontLoaded = ref(false)

const create3DText = () => {
  if (!font) {
    // 尝试重新加载字体
    const fontLoader = new FontLoader()
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
      font = loadedFont
      fontLoaded.value = true
      create3DText()
    }, undefined, (error) => {
      console.error('字体加载失败:', error)
    })
    return
  }

  // 清除现有文字
  if (currentObject) {
    scene.remove(currentObject)
  }

  try {
    const textGeometry = new TextGeometry(customText.value || '请输入文字', {
      font: font,
      size: 0.8,  // 增大文字尺寸
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    })
    
    // 计算文字几何体中心
    textGeometry.computeBoundingBox()
    const center = textGeometry.boundingBox.getCenter(new THREE.Vector3())
    textGeometry.translate(-center.x, -center.y, -center.z)
    
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xff9900,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0xff9900,
      emissiveIntensity: 0.2
    })
    
    currentObject = new THREE.Mesh(textGeometry, material)
    scene.add(currentObject)
    
    // 调整相机位置
    camera.position.z = center.length() + 4
    camera.lookAt(0, 0, 0)
    
  } catch (error) {
    console.error('创建3D文字失败:', error)
    // 创建回退立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    currentObject = new THREE.Mesh(geometry, material)
    scene.add(currentObject)
  }
}

const update3DText = () => {
  if (currentExample.value === 'text3d' && currentObject) {
    scene.remove(currentObject)
    create3DText()
  }
}

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import * as CANNON from 'cannon-es'

let composer: EffectComposer
let world: CANNON.World
let physicsBody: CANNON.Body | null = null

const createModel = () => {
  const loader = new GLTFLoader()
  loader.load(
    'https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf',
    (gltf) => {
      currentObject = gltf.scene
      currentObject.scale.set(0.5, 0.5, 0.5)
      scene.add(currentObject)
      
      // 设置后期处理
      setupPostProcessing()
    },
    undefined,
    (error) => {
      console.error('模型加载失败:', error)
      // 回退立方体
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      currentObject = new THREE.Mesh(geometry, material)
      scene.add(currentObject)
    }
  )
}

const createPhysics = () => {
  // 初始化物理世界
  world = new CANNON.World()
  world.gravity.set(0, -9.82, 0)
  
  // 创建物理地面
  const groundBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    type: CANNON.Body.STATIC
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.addBody(groundBody)
  
  // 创建物理球体
  const radius = 1
  const sphereBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3(0, 10, 0)
  })
  world.addBody(sphereBody)
  physicsBody = sphereBody
  
  // 创建可视化球体
  const geometry = new THREE.SphereGeometry(radius)
  const material = new THREE.MeshStandardMaterial({ color: 0x00aaff })
  currentObject = new THREE.Mesh(geometry, material)
  scene.add(currentObject)
}

const createAdvancedParticles = () => {
  // 初始化物理世界
  world = new CANNON.World()
  world.gravity.set(0, -2, 0)
  
  // 创建物理地面
  const groundBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    type: CANNON.Body.STATIC
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.addBody(groundBody)
  
  // 创建粒子物理体和可视化粒子
  const particleCount = 200
  const particles: THREE.Points = new THREE.Points()
  const physicsParticles: CANNON.Body[] = []
  
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)
  
  // 初始化粒子
  for (let i = 0; i < particleCount; i++) {
    // 随机位置
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = Math.random() * 5 + 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    
    // 随机颜色
    colors[i * 3] = Math.random()
    colors[i * 3 + 1] = Math.random()
    colors[i * 3 + 2] = Math.random()
    
    // 随机大小
    sizes[i] = Math.random() * 0.2 + 0.1
    
    // 创建物理体
    const radius = sizes[i] * 0.5
    const particleBody = new CANNON.Body({
      mass: 0.1,
      shape: new CANNON.Sphere(radius),
      position: new CANNON.Vec3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      ),
      linearDamping: 0.3
    })
    world.addBody(particleBody)
    physicsParticles.push(particleBody)
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  
  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  })
  
  particles.geometry = geometry
  particles.material = material
  currentObject = particles
  scene.add(currentObject)
  
  // 鼠标交互
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  
  const onMouseMove = (event: MouseEvent) => {
    // 计算鼠标位置归一化坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    
    // 更新射线
    raycaster.setFromCamera(mouse, camera)
    
    // 为所有粒子添加排斥力
    const rayDirection = raycaster.ray.direction.clone().multiplyScalar(10)
    const rayOrigin = raycaster.ray.origin
    
    physicsParticles.forEach(particle => {
      const particlePos = particle.position
      const distance = rayOrigin.distanceTo(
        new THREE.Vector3(particlePos.x, particlePos.y, particlePos.z)
      )
      
      if (distance < 5) {
        const force = new CANNON.Vec3(
          particlePos.x - rayOrigin.x - rayDirection.x,
          particlePos.y - rayOrigin.y - rayDirection.y,
          particlePos.z - rayOrigin.z - rayDirection.z
        ).scale(10 / distance)
        particle.applyForce(force, new CANNON.Vec3(0, 0, 0))
      }
    })
  }
  
  window.addEventListener('mousemove', onMouseMove)
  
  // 清理函数
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
  })
}

const setupPostProcessing = () => {
  if (!renderer) return
  
  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
  )
  bloomPass.threshold = 0
  bloomPass.strength = 1.5
  bloomPass.radius = 0
  composer.addPass(bloomPass)
}

const createAnimation = () => {
  // 创建简单几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffff })
  currentObject = new THREE.Mesh(geometry, material)
  scene.add(currentObject)

  // 创建关键帧动画
  const positionKF = new THREE.KeyframeTrack(
    '.position',
    [0, 1, 2],
    [0, 0, 0, 2, 2, 2, 0, 0, 0]
  )
  
  const rotationKF = new THREE.KeyframeTrack(
    '.rotation[x]',
    [0, 1, 2],
    [0, Math.PI, 0]
  )
  
  const clip = new THREE.AnimationClip('Action', 2, [positionKF, rotationKF])
  mixer = new THREE.AnimationMixer(currentObject)
  const action = mixer.clipAction(clip)
  action.play()
}

const switchExample = (example: string) => {
  if (currentObject) {
    scene.remove(currentObject)
    currentObject = null
  }
  
  // 清理物理世界
  if (world) {
    world.bodies = []
    physicsBody = null
  }
  
  // 清理后期处理
  if (composer) {
    composer.dispose()
  }
  
  currentExample.value = example
  switch(example) {
    case 'cube': createCube(); break
    case 'sphere': createSphere(); break
    case 'torus': createTorus(); break
    case 'textured': createTextured(); break
    case 'particles': createParticles(); break
    case 'text3d': create3DText(); break
    case 'animation': createAnimation(); break
    case 'model': createModel(); break
    case 'physics': createPhysics(); break
    case 'advancedParticles': createAdvancedParticles(); break
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  // 更新物理模拟
  if (world) {
    world.step(1/60)
    if (physicsBody && currentObject) {
      currentObject.position.copy(physicsBody.position as any)
      currentObject.quaternion.copy(physicsBody.quaternion as any)
    }
  }
  
  if (currentObject) {
    currentObject.rotation.x += 0.01
    currentObject.rotation.y += 0.01
  }
  
  if (mixer) {
    mixer.update(clock.getDelta())
  }
  
  // 使用后期处理或直接渲染
  if (composer) {
    composer.render()
  } else {
    renderer.render(scene, camera)
  }
}

const handleResize = () => {
  if (!container.value) return
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

onMounted(() => {
  initScene()
  createCube()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
.example-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.example-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}
.example-group h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}
button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #45a049;
}
</style>
