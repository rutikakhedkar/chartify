import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Emoji3DApp = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const emojiRef = useRef(null);
  const isMouseDown = useRef(false);
  const mouseStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: 0, y: 0 });

  const emojiPalette = [
    '😊', '😂', '😍', '😎', '😢', '😡', '🥺', '🥳', '🤔', '🤩'
  ];

  // Initialize Three.js scene, camera, and renderer
  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Create and add lighting
    const light = new THREE.AmbientLight(0x404040, 1.5);  // Soft white light
    scene.add(light);
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Camera positioning
    camera.position.z = 5;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (emojiRef.current) {
        // Continuously update the rotation based on user interaction
        emojiRef.current.rotation.x += (rotationStart.current.y - emojiRef.current.rotation.x) * 0.1;
        emojiRef.current.rotation.y += (rotationStart.current.x - emojiRef.current.rotation.y) * 0.1;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    // Mouse event listeners for rotating emoji
    const handleMouseDown = (e) => {
      if (!emojiRef.current) return; // Check if emoji exists before interacting

      isMouseDown.current = true;
      mouseStart.current = { x: e.clientX, y: e.clientY };
      rotationStart.current = { x: emojiRef.current.rotation.x, y: emojiRef.current.rotation.y };
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown.current || !emojiRef.current) return; // Check if emoji exists

      const dx = e.clientX - mouseStart.current.x;
      const dy = e.clientY - mouseStart.current.y;
      rotationStart.current = {
        x: rotationStart.current.x + dy * 0.01,
        y: rotationStart.current.y + dx * 0.01
      };
      mouseStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    // Add event listeners for mouse interactions
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, []);

  // Handle emoji selection and create 3D emoji
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    if (emojiRef.current) {
      sceneRef.current.remove(emojiRef.current); // Remove any previous emoji
    }

    // Create a 3D object for the selected emoji
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.CanvasTexture(createEmojiCanvas(emoji));
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const emojiMesh = new THREE.Mesh(geometry, material);
    sceneRef.current.add(emojiMesh);
    emojiRef.current = emojiMesh;
  };

  // Function to create a canvas with the emoji rendered on it
  const createEmojiCanvas = (emoji) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '100px Arial';
    ctx.fillText(emoji, 10, 100);
    return canvas;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Choose an Emoji</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {emojiPalette.map((emoji, index) => (
          <button
            key={index}
            style={{ fontSize: '40px', margin: '10px' }}
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      {selectedEmoji && <p>You selected: {selectedEmoji}</p>}
    </div>
  );
};

export default Emoji3DApp;
