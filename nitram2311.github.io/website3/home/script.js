// Music toggle (jetzt mit MP3, Rest bleibt ORIGINAL)
(function(){
    const soundBtn = document.getElementById('soundToggle');

    // HIER deine MP3 laden
    const music = new Audio("sounds/last_christmas.mp3");
    music.loop = true;
    music.volume = 1.0;

    let playing = false;

    soundBtn.addEventListener('click', ()=>{   
        playing = !playing;
        soundBtn.setAttribute('aria-pressed', String(playing));

        if(playing){
            music.play();
            soundBtn.classList.add('active');
        } else {
            music.pause();
            music.currentTime = 0;
            soundBtn.classList.remove('active');
        }
    });
})();
    

// Snow generator (UNVERÄNDERT GELASSEN)
(function(){
    const container = document.getElementById('snowContainer');
    const maxFlakes = 36; // adjust for performance
    const shapes = ["\u2744","\u2745","\u2746","\u2730","\u2603","*"]; // snow symbols
    const w = container.clientWidth || window.innerWidth;
    function rand(min,max){ return Math.random()*(max-min)+min; }

    for(let i=0;i<maxFlakes;i++){
        const f = document.createElement('div');
        f.className='flake';
        f.textContent = shapes[Math.floor(Math.random()*shapes.length)];
        const size = Math.floor(rand(10,28));
        f.style.fontSize = size+'px';
        f.style.left = rand(0,100)+'%';
        // animation timing
        const duration = rand(10,30);
        f.style.transition = 'transform '+duration+'s linear';
        f.style.opacity = (rand(0.4,1)).toFixed(2);
        const delay = rand(0,10);
        f.style.transform = `translate3d(0,-10vh,0)`;
        container.appendChild(f);

        (function(el,d,dl){
            setTimeout(()=>{
                const endX = rand(-12,12);
                const endY = 120 + rand(0,30);
                el.style.transform = `translate3d(${endX}vw,${endY}vh,0)`;
                el.style.transitionDuration = d+'s';
            }, dl*1000);
        })(f,duration,delay);

        f.addEventListener('transitionend', function(){
            setTimeout(()=>{
                elReset(this);
            }, 300);
        });
    }

    function elReset(el){
        el.style.transition = 'none';
        el.style.left = rand(0,100)+'%';
        el.style.transform = 'translate3d(0,-12vh,0)';
        setTimeout(()=>{
            const duration = rand(10,30);
            const endX = rand(-12,12);
            const endY = 120 + rand(0,30);
            el.style.transition = `transform ${duration}s linear`;
            el.style.transform = `translate3d(${endX}vw,${endY}vh,0)`;
        }, 80 + Math.random()*1200);
    }

    window.addEventListener('resize', ()=>{
        // noop for now; flakes use viewport units
    });
})();
