/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "envharu",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "envharu@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "MEDIA 99 NUSANTARA",
      tag: "News Portal", color: "#e60012", live: true,
      url: "https://media99nusantara.com/", cta: "Visit Website →",
      img: "assets/projects/media99.png",
      desc: "Modern digital news portal platform delivering real-time news, articles, and Nusantara information with fast and responsive content delivery.",
    },
    {
      title: "PT Mutiara Generasi Mandiri",
      tag: "Corporate Web", color: "#3178c6", live: true,
      url: "https://ptmgm.co.id/", cta: "Visit Website →",
      img: "assets/projects/ptmgm.png",
      desc: "Official corporate landing page for PT Mutiara Generasi Mandiri, displaying business profiles, enterprise units, interactive services, and partnership details.",
    },
    {
      title: "MGM Studio (Bengkel Mobil)",
      tag: "Automotive Web", color: "#f1e05a", live: true,
      url: "https://mgmstudio.ptmgm.co.id/", cta: "Visit Website →",
      img: "assets/projects/mgmstudio.png",
      desc: "Official website for MGM Studio auto workshop, presenting vehicle maintenance services, service packages, and operational location info.",
    },
    {
      title: "Aplikasi Kasir POS MGM Studio",
      tag: "Internal System / POS", color: "#ff8c00", live: false,
      url: "javascript:void(0)", cta: "Private Enterprise System",
      img: "assets/projects/mgmpos.png",
      desc: "Internal Point of Sale (POS) and operational management system customized for MGM Studio auto workshop to handle transactions, service queues, and spare part inventory.",
    },
    {
      title: "MGM Coffee",
      tag: "F&B / Cafe", color: "#6f4e37", live: true,
      url: "https://mgmcoffee.ptmgm.co.id/", cta: "Visit Website →",
      img: "assets/projects/mgmcoffee.png",
      desc: "Digital brand website and interactive menu catalog for MGM Coffee, featuring coffee variants, cafe ambiance, promotions, and location details.",
    },
    {
      title: "MGM Resto",
      tag: "F&B / Restaurant", color: "#e34c26", live: true,
      url: "https://mgmresto.ptmgm.co.id/", cta: "Visit Website →",
      img: "assets/projects/mgmresto.png",
      desc: "Landing page for MGM Resto featuring an appealing and responsive culinary menu catalog to help visitors view dish offerings effortlessly.",
    },
    {
      title: "Batagor Kaki Lima",
      tag: "Culinary Brand", color: "#3dff6e", live: true,
      url: "https://batagorkakilima.ptmgm.co.id/", cta: "Visit Website →",
      img: "assets/projects/batagor.png",
      desc: "Promotional landing page for Batagor Kaki Lima culinary brand, showcasing traditional Indonesian street food identity in a sleek, modern web format.",
    },
    {
      title: "Teh Putri",
      tag: "F&B / Tea Brand", color: "#2ecc71", live: true,
      url: "https://tehputri.ptmgm.co.id/", cta: "Visit Website →",
      img: "assets/projects/tehputri.png",
      desc: "Digital brand website and interactive product showcase for Teh Putri, displaying authentic tea beverages, refreshing flavor variants, and outlet locations.",
    },
    {
      title: "Aplikasi Kasir Teh Putri",
      tag: "Internal System / POS", color: "#e67e22", live: false,
      url: "javascript:void(0)", cta: "Private Enterprise System",
      img: "assets/projects/tehputripos.png",
      desc: "Internal Point of Sale (POS) & inventory management system tailored for Teh Putri outlets to process daily sales transactions, track stock, and generate revenue logs.",
    },
    {
      title: "Hamim Group",
      tag: "Corporate Web", color: "#00add8", live: true,
      url: "https://hamimgroup.co.id/", cta: "Visit Website →",
      img: "assets/projects/hamim.png",
      desc: "Corporate landing page for Hamim Group, displaying business unit portfolio, corporate vision & mission, and group networks.",
    },
    {
      title: "ENV-FOUNDATION",
      tag: "Founder & Community", color: "#9b59b6", live: true,
      url: "https://env-team.media99nusantara.com/", cta: "Visit Platform →",
      img: "assets/projects/envfoundation.png",
      desc: "Technology hub and organization founded by Env.Haru to support web developer collaboration, digital innovation, and open-source software project development.",
    },
  ],

  featuredRepoNames: [
    "media99nusantara",
    "ptmgm-landing",
    "mgmstudio-web",
    "mgmstudio-pos-system",
    "mgmcoffee-web",
    "mgmresto-web",
    "batagorkakilima-web",
    "tehputri-web",
    "tehputri-pos-system",
    "hamimgroup-web",
    "env-foundation",
  ],

  fallbackRepos: [
    {
      name: "indonesia-address-parser-api", language: "JavaScript", stargazers_count: 5,
      html_url: "https://github.com/EnvHaru/indonesia-address-parser-api",
      description: "A lightweight RESTful API service to parse and validate regional Indonesian administrative address structures (Provinsi, Kota/Kabupaten, Kecamatan, Desa).",
    },
    {
      name: "express-auth-boilerplate", language: "TypeScript", stargazers_count: 3,
      html_url: "https://github.com/EnvHaru/express-auth-boilerplate",
      description: "Production-ready Express.js and TypeScript starter kit featuring JWT authentication, refresh tokens, Bcrypt password hashing, and role-based access control.",
    },
    {
      name: "laravel-inventory-system", language: "PHP", stargazers_count: 4,
      html_url: "https://github.com/EnvHaru/laravel-inventory-system",
      description: "An enterprise inventory management solution built with Laravel, MySQL, and Bootstrap. Features stock tracking, PDF invoice generation, and audit logging.",
    },
    {
      name: "portfolio-v2-persona", language: "HTML", stargazers_count: 2,
      html_url: "https://github.com/EnvHaru/portfolio-v2-persona",
      description: "Interactive arcade HUD retro portfolio built with pure JavaScript, custom CSS, and responsive UI components.",
    },
  ],

  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26", Go: "#00ADD8",
    Java: "#b07219", C: "#555", "C++": "#f34b7d", Vue: "#41b883",
  },

  skills: [
    { group: "Software & Full-Stack Web", items: [
      ["JavaScript (ES6+) / TypeScript", 92], ["Node.js · Express.js · NestJS", 88],
      ["React.js · Next.js · Vue.js", 85], ["PHP · Laravel", 82],
      ["HTML5 · CSS3 · Tailwind CSS", 90], ["RESTful APIs & GraphQL", 86],
    ]},
    { group: "Backend & Databases", items: [
      ["PostgreSQL · MySQL", 86], ["MongoDB · Redis", 80],
      ["Database Design & ORM (Prisma/Sequelize)", 84], ["System Architecture & Clean Code", 85],
      ["Python (Scripting & Automation)", 78], ["Go (Basic Microservices)", 70],
    ]},
    { group: "Tools & Infrastructure", items: [
      ["Git & GitHub / GitLab", 90], ["Docker & Containerization", 78],
      ["Linux Server Administration", 80], ["Nginx · Web Hosting & Deployment", 82],
      ["CI/CD Pipelines", 75], ["Figma (UI/UX Prototyping)", 80],
    ]},
    { group: "Languages / Spoken Languages", items: [
      ["Indonesian (Native Speaker)", 100], ["English (Professional Working Proficiency)", 88], ["Mandarin (Basic Proficiency)", 40],
    ]},
  ],

  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};