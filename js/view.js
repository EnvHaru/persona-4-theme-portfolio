/* =====================================================================
   VIEW — everything that draws to the screen. No app logic lives here;
   the Controller tells the View what to show.
   ===================================================================== */

const View = {

  reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,

  els: {
    screens:     {},   // filled in init()
    menuItems:   [],
    wipe:        document.getElementById("wipe"),
    featGrid:    document.getElementById("feat-grid"),
    repoGrid:    document.getElementById("repo-grid"),
    repoStatus:  document.getElementById("repo-status"),
    skillsBody:  document.getElementById("skills-body"),
    sfx:         document.getElementById("sfx-select"),
    bgMusic:     document.getElementById("bg-music"),
    musicToggle: document.getElementById("music-toggle"),
    cursor:      document.getElementById("cursor"),
    clock:       document.getElementById("clock"),
  },

  init() {
    document.querySelectorAll(".screen").forEach(s => {
      this.els.screens[s.id.replace("screen-", "")] = s;
    });
    this.els.menuItems = [...document.querySelectorAll(".menu-item")];
    document.querySelectorAll("[data-ransom]").forEach(el => this.ransomize(el));
    if (this.els.sfx) this.els.sfx.volume = 0.45;
    if (this.els.bgMusic) this.els.bgMusic.volume = 0.35;
    
    this.injectGlitchStyles();
    this.startClock();
    this.startParallax();
    this.startCursor();
    document.body.classList.add("loaded");
  },

  injectGlitchStyles() {
    if (document.getElementById("glitch-style")) return;
    const style = document.createElement("style");
    style.id = "glitch-style";
    style.textContent = `
      @keyframes screenGlitch {
        0% { transform: translate(0, 0) skew(0deg); filter: none; }
        15% { transform: translate(-8px, 4px) skew(-2deg); filter: hue-rotate(90deg) contrast(180%) invert(10%); }
        30% { transform: translate(6px, -4px) skew(3deg); filter: hue-rotate(-90deg) saturate(200%); }
        45% { transform: translate(-4px, -2px) skew(-1deg); filter: contrast(200%); }
        60% { transform: translate(5px, 3px) skew(2deg); filter: hue-rotate(180deg) invert(20%); }
        75% { transform: translate(-3px, 1px) skew(-2deg); filter: none; }
        100% { transform: translate(0, 0) skew(0deg); filter: none; }
      }
      @keyframes cardShake {
        0%, 100% { transform: translate(0, 0) scale(1); }
        20% { transform: translate(-10px, 0) scale(0.98); }
        40% { transform: translate(10px, 0) scale(1.02); }
        60% { transform: translate(-6px, 0) scale(0.99); }
        80% { transform: translate(6px, 0) scale(1.01); }
      }
      body.glitch-active #shell {
        animation: screenGlitch 0.4s ease-in-out !important;
      }
      .card-locked-shake {
        animation: cardShake 0.4s ease-in-out !important;
        border-color: #ffe600 !important;
        box-shadow: 0 0 25px rgba(255, 230, 0, 0.8) !important;
      }
      .glitch-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: #0d0d0d;
        color: #ffe600;
        border: 3px solid #ffe600;
        padding: 16px 30px;
        font-family: monospace, sans-serif;
        font-weight: 900;
        font-size: 1.1rem;
        letter-spacing: 2px;
        z-index: 999999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.15s ease, transform 0.15s ease;
        box-shadow: 8px 8px 0px #000, 0 0 30px rgba(255, 230, 0, 0.7);
        text-transform: uppercase;
        text-align: center;
      }
      .glitch-toast.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      .hud-music-btn {
        background: #0b0b0d;
        color: #ffe600;
        border: 1px solid #ffe600;
        padding: 4px 10px;
        font-family: inherit;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transform: skewX(-8deg);
        transition: background .15s, color .15s, transform .15s;
      }
      .hud-music-btn:hover {
        background: #ffe600;
        color: #0b0b0d;
        transform: skewX(-8deg) scale(1.05);
      }
      .hud-music-btn.muted {
        opacity: 0.65;
        border-color: #888;
        color: #ccc;
      }
    `;
    document.head.appendChild(style);
  },

  triggerGlitch(cardEl, customMsg) {
    document.body.classList.add("glitch-active");
    if (cardEl) cardEl.classList.add("card-locked-shake");

    let toast = document.getElementById("glitch-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "glitch-toast";
      toast.className = "glitch-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = customMsg || "⚠ ACCESS DENIED<br><span style='font-size:0.8em;color:#fff;'>PRIVATE ENTERPRISE SYSTEM</span>";
    toast.classList.add("show");

    this.playSelect();

    setTimeout(() => {
      document.body.classList.remove("glitch-active");
      if (cardEl) cardEl.classList.remove("card-locked-shake");
      toast.classList.remove("show");
    }, 600);
  },

  hash(str) {
    let h = 9;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 387420489);
    return (h ^ h >>> 9) >>> 0;
  },

  ransomize(el) {
    const text = el.dataset.ransom || el.textContent;
    el.textContent = "";
    [...text].forEach((c, i) => {
      const span = document.createElement("span");
      span.className = "ch display";
      span.textContent = c;
      const h = this.hash(text + i);
      const rot = (h % 17) - 8;
      const scale = 0.86 + ((h >> 3) % 30) / 100;
      const dy = ((h >> 5) % 9) - 4;
      const t = `rotate(${rot}deg) scale(${scale}) translateY(${dy}px)`;
      span.style.setProperty("--t", t);
      span.style.transform = t;
      const variant = (h >> 7) % 10;
      if (variant === 0) span.classList.add("box");
      else if (variant === 1) span.classList.add("boxw");
      else if (variant === 2) span.classList.add("red");
      el.appendChild(span);
    });
  },

  showScreen(name) {
    const s = this.els.screens;
    Object.values(s).forEach(sc => sc.classList.remove("active"));
    if (s[name]) {
      s[name].classList.add("active");
      s[name].scrollTop = 0;
    }
    document.body.dataset.screen = name;
  },

  setMenuSelection(index) {
    this.els.menuItems.forEach((m, j) => m.classList.toggle("sel", j === index));
  },

  wipe(swap, done) {
    if (this.reducedMotion) { swap(); done(); return; }
    const w = this.els.wipe;
    w.classList.remove("go"); void w.offsetWidth;
    w.classList.add("go");
    setTimeout(swap, 340);
    setTimeout(done, 720);
  },

  playSelect() {
    try {
      if (this.els.sfx) {
        this.els.sfx.currentTime = 0;
        const p = this.els.sfx.play();
        if (p && p.catch) p.catch(() => {});
      }
    } catch {}
  },

  updateMusicUI(isPlaying) {
    if (!this.els.musicToggle) return;
    const iconPlaying = this.els.musicToggle.querySelector(".icon-playing");
    const iconMuted = this.els.musicToggle.querySelector(".icon-muted");
    const statusText = this.els.musicToggle.querySelector(".music-status-text");

    if (isPlaying) {
      if (iconPlaying) iconPlaying.style.display = "inline-block";
      if (iconMuted) iconMuted.style.display = "none";
      if (statusText) statusText.textContent = "BGM ON";
      this.els.musicToggle.classList.remove("muted");
    } else {
      if (iconPlaying) iconPlaying.style.display = "none";
      if (iconMuted) iconMuted.style.display = "inline-block";
      if (statusText) statusText.textContent = "BGM OFF";
      this.els.musicToggle.classList.add("muted");
    }
  },

  cardThumb(src) {
    return `<div class="thumb"><img src="${src}" alt="" loading="lazy"
      onerror="this.closest('.thumb').remove()"></div>`;
  },

  splitTitle(title) {
    const first = title.split(" ")[0];
    return `<em>${first}</em>${title.slice(first.length)}`;
  },

  renderFeatured(list) {
    if (this.els.featGrid.childElementCount) return;
    list.forEach((f, i) => {
      const a = document.createElement("a");
      a.className = "card feat";
      
      if (f.live && f.url && f.url !== "javascript:void(0)") {
        a.href = f.url;
        a.target = "_blank";
        a.rel = "noopener";
      } else {
        a.href = "javascript:void(0)";
        a.addEventListener("click", e => {
          e.preventDefault();
          this.triggerGlitch(a);
        });
      }

      a.style.setProperty("--tilt", ((this.hash(f.title) % 5) - 2) * 0.8 + "deg");
      a.style.setProperty("--d", i * 70 + "ms");
      a.innerHTML = `
        ${this.cardThumb(f.img)}
        <span class="lang" style="--lc:${f.color}">${f.tag}</span>
        <h3>${f.live ? '<span class="live-dot"></span>' : ""}${this.splitTitle(f.title)}</h3>
        <p>${f.desc}</p>
        <div class="meta"><span>${f.live ? "LIVE NOW" : "RESTRICTED"}</span><span class="go">${f.cta}</span></div>`;
      this.els.featGrid.appendChild(a);
    });
  },

  renderRepos(repos, statusText, model) {
    this.els.repoStatus.textContent = statusText;
    this.els.repoGrid.innerHTML = "";
    repos.forEach((r, i) => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = r.html_url; a.target = "_blank"; a.rel = "noopener";
      a.style.setProperty("--tilt", ((this.hash(r.name) % 5) - 2) * 0.8 + "deg");
      a.style.setProperty("--d", i * 70 + "ms");
      a.style.setProperty("--lc", model.langColors[r.language] || "#ffe600");
      const pretty = r.name.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const img = model.projectImages[r.name] || `assets/projects/${r.name}.png`;
      a.innerHTML = `
        ${this.cardThumb(img)}
        <span class="lang">${r.language || "Repo"}</span>
        <h3>${this.splitTitle(pretty)}</h3>
        <p>${r.description || "No description yet, but the code speaks for itself."}</p>
        <div class="meta">
          <span>★ ${r.stargazers_count || 0}</span>
          <span class="go">View on GitHub →</span>
        </div>`;
      this.els.repoGrid.appendChild(a);
    });
  },

  renderSkills(groups) {
    groups.forEach(g => {
      const div = document.createElement("div");
      div.className = "skill-group";
      div.innerHTML = `<h3>${g.group}</h3>`;
      g.items.forEach(([name, value]) => {
        const row = document.createElement("div");
        row.className = "skill-row";
        row.innerHTML = `
          <span class="name">${name}</span>
          <div class="skill-bar"><div class="fill" data-v="${value}"></div></div>
          <span class="lv">${value}</span>`;
        div.appendChild(row);
      });
      this.els.skillsBody.appendChild(div);
    });
  },

  animateSkillBars() {
    const fills = this.els.skillsBody.querySelectorAll(".fill");
    fills.forEach(f => { f.style.width = "0"; });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fills.forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.v + "%"; }, i * 60));
    }));
  },

  startClock() {
    setInterval(() => {
      if (this.els.clock) {
        this.els.clock.textContent =
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " · WIB";
      }
    }, 1000);
  },

  startParallax() {
    if (this.reducedMotion) return;
    const stripes = document.getElementById("bg-stripes");
    const halftone = document.getElementById("bg-halftone");
    const arts = [...document.querySelectorAll(".menu-art")];
    let tx = 0, ty = 0, cx = 0, cy = 0;
    addEventListener("mousemove", e => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      if (stripes) stripes.style.transform = `translate(${cx * 22}px, ${cy * 14}px)`;
      if (halftone) halftone.style.transform = `translate(${cx * -34}px, ${cy * -22}px)`;
      arts.forEach(a => {
        if (a.isConnected)
          a.style.transform = `translate(${cx * 14}px, ${cy * 9}px) scale(1.04)`;
      });
      requestAnimationFrame(loop);
    };
    loop();
  },

  startCursor() {
    if (!matchMedia("(pointer:fine)").matches || this.reducedMotion) return;
    const cur = this.els.cursor;
    if (!cur) return;
    document.body.classList.add("cursor-on");
    let x = -100, y = -100, visible = false;

    addEventListener("mousemove", e => {
      x = e.clientX; y = e.clientY;
      if (!visible) { cur.style.display = "block"; visible = true; }
      const t = e.target;
      const overLink = t.closest &&
        t.closest("a,button,.card,.menu-item,.back-hint,.contact-chip,#big-name");
      cur.classList.toggle("link", !!overLink);
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
      cur.style.display = "none"; visible = false;
    });

    const tick = () => {
      cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
};