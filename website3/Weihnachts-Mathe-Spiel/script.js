    // --- Einstellungen ---
    const SETTINGS = {
      timeLimit: 60, // Sekunden
      spawnEvery: 1400, // ms
      initialPresents: 1,
    };

    // State
    let score = 0; let timeLeft = SETTINGS.timeLimit; let running = false;
    let spawnTimer = null, gameTimer = null; let currentAnswer = null; let mode = '+'; // + - * /

    const game = document.getElementById('game');
    const questionEl = document.getElementById('question');
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    const startBtn = document.getElementById('startBtn');
    const modeBtn = document.getElementById('modeBtn');

    function randomInt(a,b){return Math.floor(Math.random()*(b-a+1))+a}

    function makeQuestion(){
      const a = randomInt(1,12);
      const b = randomInt(1,12);
      let q, ans;
      if(mode==='+'){ q = `${a} + ${b}`; ans = a+b }
      if(mode==='-'){ q = `${a+b} - ${a}`; ans = b }
      if(mode==='*'){ q = `${a} × ${b}`; ans = a*b }
      if(mode==='/'){ const numerator = a*b; q = `${numerator} ÷ ${a}`; ans = b }
      currentAnswer = ans; questionEl.textContent = q;
      return ans;
    }

    function spawnPresent(value, leftPx){
      const div = document.createElement('div');
      div.className = 'present panel';
      div.style.left = (leftPx || randomInt(20, game.clientWidth-120)) + 'px';
      div.style.top = '-120px';
      div.style.background = `linear-gradient(135deg, hsl(${value*20 % 360} 60% 40%), hsl(${(value*20+40)%360} 60% 30%))`;
      div.innerHTML = `<div class="label">${value}</div>`;
      div.dataset.value = value;
      div.addEventListener('click', onPresentClick);
      game.appendChild(div);
      // drop animation
      const speed = randomInt(4500,9000);
      const start = performance.now();
      function anim(t){
        const dt = t-start; const progress = Math.min(1, dt/speed);
        div.style.top = (progress*(game.clientHeight-150)-120) + 'px';
        div.style.transform = `rotate(${(progress*360)%360}deg) scale(${0.9+0.1*Math.sin(progress*10)})`;
        if(progress<1) requestAnimationFrame(anim); else {
          // reached ground -> remove
          div.remove();
        }
      }
      requestAnimationFrame(anim);
      return div;
    }

    function onPresentClick(e){
      if(!running) return;
      const val = Number(e.currentTarget.dataset.value);
      if(val===currentAnswer){ score += 10; timeLeft += 2; // Belohnung
        // kleine Erfolgseffekte
        e.currentTarget.style.transform = 'scale(1.15)';
      } else { score -= 5; timeLeft = Math.max(0, timeLeft-3); e.currentTarget.style.opacity=0.6; }
      updateHUD();
      e.currentTarget.remove();
      // Neue Frage nach Klick
      makeQuestion();
      // optional sofort ein neues Geschenk spawnen
      const choices = generateChoices(currentAnswer);
      shuffleArray(choices);
      choices.forEach((c,i)=> spawnPresent(c, 40 + i*120));
    }

    function updateHUD(){ scoreEl.textContent = score; timeEl.textContent = timeLeft; }

    function generateChoices(answer){
      const arr = [answer];
      while(arr.length<4){
        const delta = randomInt(1,8);
        const sign = Math.random()<0.5? -1:1;
        const candidate = Math.max(0, answer + sign*delta);
        if(!arr.includes(candidate)) arr.push(candidate);
      }
      return arr;
    }

    function shuffleArray(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]} }

    function startGame(){
      // reset
      score = 0; timeLeft = SETTINGS.timeLimit; running=true; updateHUD(); startBtn.textContent='Stop';
      // first Q
      makeQuestion();
      // spawn initial
      const choices = generateChoices(currentAnswer);
      shuffleArray(choices);
      choices.forEach((c,i)=> spawnPresent(c, 40 + i*110));
      // spawn loop
      spawnTimer = setInterval(()=>{
        const choices = generateChoices(currentAnswer);
        shuffleArray(choices);
        const x = randomInt(20, Math.max(80, game.clientWidth-120));
        spawnPresent(choices[0], x);
      }, SETTINGS.spawnEvery);

      gameTimer = setInterval(()=>{
        timeLeft--; updateHUD();
        if(timeLeft<=0) stopGame();
      }, 1000);
    }

    function stopGame(){ running=false; clearInterval(spawnTimer); clearInterval(gameTimer); startBtn.textContent='Start';
      // remove presents
      document.querySelectorAll('.present').forEach(n=>n.remove());
      // Ergebnis-Meldung
      alert(`Spiel beendet! Punkte: ${score}`);
    }

    startBtn.addEventListener('click', ()=>{
      if(running) stopGame(); else startGame();
    });

    modeBtn.addEventListener('click', ()=>{
      const modes = ['+','-','*','/'];
      mode = modes[(modes.indexOf(mode)+1) % modes.length];
      modeBtn.textContent = 'Modus: ' + mode;
    });

    // optional: hübsche Schneeflocken
    function createSnow(count=30){
      const snow = document.getElementById('snow');
      for(let i=0;i<count;i++){
        const s = document.createElement('i');
        const size = randomInt(6,22);
        s.style.left = Math.random()*100 + '%';
        s.style.opacity = (0.4 + Math.random()*0.7);
        s.style.fontSize = size + 'px';
        s.textContent = '❅';
        const dur = randomInt(8000,22000);
        s.animate([{transform:'translateY(-20px)'},{transform:`translateY(${game.clientHeight+20}px)`}],{duration:dur,iterations:Infinity,delay:randomInt(0,2000)})
        snow.appendChild(s);
      }
    }
    createSnow(40);

    // make responsive: clear intervals when leaving
    window.addEventListener('blur', ()=>{ /* optional pause */ });

    // Accessibility hint: allow keyboard answers in future