const sceneContainer = document.getElementById("scene-container");

const scenes = {
  start: {
    title: "FØR DU KLIKKER",
    subtitle: "Cyber Security Simulation",
    color: "green",
    choices: [{ label: "START", next: "scene1" }]
  },

  scene1: {
    title: "DU HAR MODTAGET EN MAIL",
    subtitle: "Opdater dine SU-oplysninger nu",
    color: "green",
    choices: [
      { label: "A: KLIK LINK", next: "scene2a" },
      { label: "B: IGNORER", next: "scene2b" },
      { label: "C: TJEK AFSENDER", next: "scene2c" }
    ]
  },

  scene2a: {
    title: "FAKE LOGIN SIDE",
    color: "red",
    choices: [
      { label: "INDTAST INFO", next: "end1" },
      { label: "GÅ TILBAGE", next: "end2" }
    ]
  },

  scene2b: {
    title: "DU IGNORERER MAILEN",
    color: "green",
    choices: [{ label: "NÆSTE", next: "end3" }]
  },

  scene2c: {
    title: "TJEK AFSENDER",
    color: "blue",
    choices: [{ label: "NÆSTE", next: "end4" }]
  },

  end1: { title:"DU BLEV HACKET", color:"red", choices:[{label:"PRØV IGEN", next:"start"}]},
  end2: { title:"DU HANDLEDE SIKKERT", color:"yellow", choices:[{label:"PRØV IGEN", next:"start"}]},
  end3: { title:"DU HANDLEDE SIKKERT", color:"green", choices:[{label:"PRØV IGEN", next:"start"}]},
  end4: { title:"DU BLEV OVERVÅGET", color:"purple", choices:[{label:"PRØV IGEN", next:"start"}]}
};

function renderScene(id) {
  const scene = scenes[id];
  if (!scene) return;

  sceneContainer.innerHTML = "";

  const main = document.createElement("div");
  main.className = `scene-main ${scene.color}`;

  const title = document.createElement("h1");
  title.textContent = scene.title;
  main.appendChild(title);

  if (scene.subtitle) {
    const sub = document.createElement("p");
    sub.textContent = scene.subtitle;
    main.appendChild(sub);
  }

  const choicesWrap = document.createElement("div");

  scene.choices.forEach(choice => {
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = choice.label;

    btn.onclick = () => renderScene(choice.next);

    choicesWrap.appendChild(btn);
  });

  main.appendChild(choicesWrap);
  sceneContainer.appendChild(main);

  // preview
  const previewWrap = document.createElement("div");
  previewWrap.className = "preview";

  scene.choices.forEach(choice => {
    const next = scenes[choice.next];
    if (!next) return;

    const box = document.createElement("div");
    box.className = `preview-box ${next.color}`;
    box.textContent = next.title;

    previewWrap.appendChild(box);
  });

  sceneContainer.appendChild(previewWrap);
}

renderScene("start");