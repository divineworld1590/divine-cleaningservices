// AOS init
AOS.init({ duration: 900, once: true });

// Particle canvas fixed to hero box
(function(){
  const canvas = document.getElementById('particle-canvas');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let particles = [];

  function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(n = 70){
    particles = [];
    const rect = hero.getBoundingClientRect();
    for (let i=0;i<n;i++){
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: Math.random() * 2 + 0.4,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        color: ['#f4d35e','#0d3b66','#ffffff'][Math.floor(Math.random()*3)]
      });
    }
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width/dpr, canvas.height/dpr);
    const rect = hero.getBoundingClientRect();
    for (const p of particles){
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = rect.width + 10;
      if (p.x > rect.width + 10) p.x = -10;
      if (p.y < -10) p.y = rect.height + 10;
      if (p.y > rect.height + 10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', ()=>{ resizeCanvas(); spawn(80); animate(); });
  window.addEventListener('resize', ()=>{ resizeCanvas(); spawn(80); });
})();
