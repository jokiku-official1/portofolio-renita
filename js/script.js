const projects = [
  {
    title: "Food Menu Application",
    description: "Aplikasi menu makanan yang menampilkan pilihan menu dan harga dengan tampilan sederhana.",
    image: "img/food-menu.jpg",
    artwork: "food",
  },
  {
    title: "Mathematics Formula",
    description: "Aplikasi kumpulan rumus matematika untuk membantu pengguna menemukan dan memahami rumus.",
    image: "img/math-formula.jpg",
    artwork: "formula",
  },
  {
    title: "Tourist Destination",
    description: "Aplikasi informasi tempat wisata untuk mengenalkan destinasi menarik beserta informasinya.",
    image: "img/tourist-destination.jpg",
    artwork: "travel",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const artworkMarkup = {
    food: '<div class="food-sheet"><span>MENU / CONCEPT</span><b>good<br /><em>food.</em></b><div class="food-shapes"><i></i><i></i><i></i></div><small>A LITTLE TASTE OF DESIGN</small></div>',
    formula: '<div class="formula-sheet"><span>THINK / TRY / SOLVE</span><b>Make<br />it <em>make<br />sense.</em></b><div class="formula-symbol">∑ × ÷ =</div><small>IDEAS INTO LOGIC</small></div>',
    travel: '<div class="travel-sheet"><span>TAKE THE SCENIC ROUTE</span><b>Somewhere<br /><em>new.</em></b><div class="sun"></div><div class="hills"></div><small>EXPLORE / DISCOVER / REPEAT</small></div>',
  };
  const createProjectCard = (project, index) => {
    const item = document.createElement("article");
    item.className = `work-item${index % 2 ? " reverse" : ""} reveal`;

    const number = document.createElement("div");
    number.className = "work-number";
    number.textContent = String(index + 1).padStart(2, "0");
    item.append(number);

    const link = document.createElement("a");
    link.className = `work-image project-open ${project.artwork || "custom"}`;
    link.href = "#project-viewer";
    link.dataset.title = project.title;
    link.dataset.description = project.description;
    link.dataset.artwork = project.artwork || "custom";
    link.setAttribute("aria-label", `Perbesar ${project.title}`);

    if (project.image) {
      const image = document.createElement("img");
      image.className = "project-photo";
      image.src = project.image;
      image.alt = project.title;
      image.addEventListener("error", () => image.remove(), { once: true });
      link.append(image);
    }

    const artwork = document.createElement("div");
    artwork.className = "project-art";
    if (artworkMarkup[project.artwork]) {
      artwork.innerHTML = artworkMarkup[project.artwork];
    } else {
      const sheet = document.createElement("div");
      sheet.className = "project-generic-sheet";
      const label = document.createElement("span");
      label.textContent = "PROJECT / PREVIEW";
      const title = document.createElement("b");
      title.textContent = project.title;
      sheet.append(label, title);
      artwork.append(sheet);
    }
    link.append(artwork);

    const openLabel = document.createElement("span");
    openLabel.className = "image-index";
    openLabel.textContent = "OPEN PROJECT ↗";
    link.append(openLabel);
    item.append(link);

    const details = document.createElement("div");
    details.className = "work-description";
    const type = document.createElement("span");
    type.className = "work-type";
    type.textContent = `DIGITAL PROJECT / ${String(index + 1).padStart(2, "0")}`;
    const title = document.createElement("h3");
    title.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.description;
    const year = document.createElement("span");
    year.className = "work-year";
    year.textContent = project.year;
    details.append(type, title, description, year);
    item.append(details);
    return item;
  };

  const projectList = document.getElementById("project-list");
  if (projectList) projectList.replaceChildren(...projects.map(createProjectCard));

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }),
    );
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.14 },
    );
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("visible"));
  }

  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav a");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
          }
        }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const modal = document.getElementById("project-viewer");
  const art = modal.querySelector(".modal-art");
  const title = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll(".project-open").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const previewElements = Array.from(link.children)
        .filter((child) => !child.classList.contains("image-index"))
        .map((child) => child.cloneNode(true));
      art.replaceChildren(...previewElements);
      art.className = `modal-art ${link.dataset.artwork}`;
      title.textContent = link.dataset.title;
      description.textContent = link.dataset.description;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }),
  );
  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  const message = document.getElementById("message");
  const counter = document.getElementById("counter");
  if (message && counter) {
    const update = () => (counter.textContent = `${message.value.length} / 300`);
    message.addEventListener("input", update);
    update();
  }
  const form = document.getElementById("contactForm");
  if (form)
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const content = message.value.trim();
      const recipient = "your-email@example.com";
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${content}`);
      document.getElementById("form-note").textContent = "Membuka aplikasi email...";
      location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });

  if (matchMedia("(pointer:fine)").matches)
    document.querySelectorAll(".work-image").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
});
