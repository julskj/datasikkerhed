// små ikoner til nogle af scenerne
const icons = {
  shieldCheck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  skull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`
};

// hele flowet i scenariet
const scenes = {
  start: {
    id: 'start',
    title: '"FØR DU KLIKKER"',
    subtitle: 'SPIS ELLER BLIV SPIST',
    color: 'green',
    icon: 'shieldCheck',
    choices: [
      { label: 'START', next: 'scene1' }
    ]
  },

  scene1: {
    id: 'scene1',
    topTitle: 'SCENE 1',
    title: '"DU SIDDER I DIT KLASSELOKALE OG MODTAGER EN MAIL FRA IBA AFDELINGEN"',
    subtitle: '"Opdater dine SU-oplysninger nu for at undgå SU-stop!"',
    color: 'green',
    choices: [
      { label: 'A: KLIK LINK', next: 'scene2a' },
      { label: 'B: IGNORER', next: 'scene2b' },
      { label: 'C: TJEK AFSENDER', next: 'scene2c' }
    ]
  },

  scene2a: {
    id: 'scene2a',
    topTitle: 'SCENE 2A',
    title: 'INDTAST LOGIN OPLYSNINGER',
    color: 'red',
    choices: [
      { label: 'A: INDTAST INFO', next: 'end-red' },
      { label: 'B: GÅ TILBAGE', next: 'end-yellow' }
    ]
  },

  scene2b: {
    id: 'scene2b',
    topTitle: 'SCENE 2B',
    title: 'DU IGNORERER MAILEN',
    color: 'green',
    choices: [
      { label: 'NÆSTE', next: 'end-green' }
    ]
  },

  scene2c: {
    id: 'scene2c',
    topTitle: 'SCENE 2C',
    title: 'TJEK AFSENDER',
    bullets: ['Mærkelig mailadresse', 'Små stavefejl'],
    color: 'blue',
    choices: [
      { label: 'NÆSTE', next: 'end-purple' }
    ]
  },

  'end-red': {
  id: 'end-red',
  topTitle: 'SLUTNING 1',
  title: 'DU BLEV HACKET',
  bullets: ['Data stjålet', 'Konto kompromitteret'],
  footerHTML: '<strong>HVAD GIK GALT?</strong><br>Du klikkede uden at tænke. Phishing-mails udnytter presset situatuoner.<br><br><strong>HVAD KUNNE DU HAVE GJORT?</strong><br>Stoppe op og tjekke afsender og link først.',
  color: 'red',
  icon: 'skull',
  choices: [
    { label: 'PRØV IGEN', next: 'start' }
  ]
},

'end-yellow': {
  id: 'end-yellow',
  topTitle: 'SLUTNING 2',
  title: 'DU HANDLEDE SIKKERT',
  bullets: ['Tjekkede IBA\'s officielle side med oplysninger om SU meddelse', 'Undgik phishing'],
  footerHTML: '<strong>HVAD GIK GALT?</strong><br>Phishing-siden lignede den ægte.<br><br><strong>HVAD KUNNE DU HAVE GJORT?</strong><br>Altid tjekke URL’en først.',
  color: 'yellow',
  icon: 'shieldCheck',
  choices: [
    { label: 'PRØV IGEN', next: 'start' }
  ]
},

'end-green': {
  id: 'end-green',
  topTitle: 'SLUTNING 3',
  title: 'DU HANDLEDE SIKKERT',
  bullets: ['Ignorerede mistænkelig mail', 'Undgik phishing'],
  footerHTML: '<strong>HVAD GIK GALT FOR HACKEREN?</strong><br>Du faldt ikke for presset.<br><br><strong>HVAD KUNNE DU HAVE GJORT?</strong><br>Du kunne også have rapporteret mailen til IT-afdelingen.',
  color: 'green',
  icon: 'shieldCheck',
  choices: [
    { label: 'PRØV IGEN', next: 'start' }
  ]
},

'end-purple': {
  id: 'end-purple',
  topTitle: 'SLUTNING 4',
  title: 'DU BLEV OVERVÅGET',
  bullets: ['Data opsnappet', 'Usikkert netværk'],
  footerHTML: '<strong>HVAD GIK GALT?</strong><br>Du var opmærksom på at tjekke afsenderen, men sad på offentligt wifi uden beskyttelse.<br><br><strong>HVAD KUNNE DU HAVE GJORT?</strong><br>Bruge et sikkert netværk eller VPN.',
  color: 'purple',
  icon: 'eye',
  choices: [
    { label: 'PRØV IGEN', next: 'start' }
  ]
}
};

let currentSceneId = 'start';
let sceneContainer;

// bygger scenen op igen hver gang brugeren klikker videre
function renderScene(sceneId) {
  if (!scenes[sceneId]) {
    console.error('Scene findes ikke:', sceneId);
    return;
  }

  const scene = scenes[sceneId];
  sceneContainer.classList.add('fade-out');

  setTimeout(() => {
    sceneContainer.innerHTML = '';
    sceneContainer.className = `scene-card theme-${scene.color}`;

    // ikon hvis scenen har et
    if (scene.icon && icons[scene.icon]) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'scene-card__icon';
      iconDiv.innerHTML = icons[scene.icon];
      sceneContainer.appendChild(iconDiv);
    }

    // lille titel øverst
    if (scene.topTitle) {
      const topTitle = document.createElement('div');
      topTitle.className = 'scene-card__top-title';
      topTitle.textContent = scene.topTitle;
      sceneContainer.appendChild(topTitle);
    }

    // hovedtitel
    const title = document.createElement('h1');
    title.className = 'scene-card__title';
    title.textContent = scene.title;
    sceneContainer.appendChild(title);

    // tekst under titlen
    if (scene.subtitle) {
      const subtitle = document.createElement('h2');
      subtitle.className = 'scene-card__subtitle';
      subtitle.textContent = scene.subtitle;
      sceneContainer.appendChild(subtitle);
    }

    // punkter hvis scenen har dem
    if (scene.bullets && scene.bullets.length > 0) {
      const bulletsContainer = document.createElement('div');
      bulletsContainer.className = 'scene-card__bullets';

      const ul = document.createElement('ul');

      scene.bullets.forEach((bulletText) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="bullet-point">•</span> ${bulletText}`;
        ul.appendChild(li);
      });

      bulletsContainer.appendChild(ul);
      sceneContainer.appendChild(bulletsContainer);
    }

    // læring / forklaring nederst
    if (scene.footerHTML) {
      const footer = document.createElement('div');
      footer.className = 'scene-card__footer';
      footer.innerHTML = scene.footerHTML;
      sceneContainer.appendChild(footer);
    }

    // valg man kan klikke på
    if (scene.choices && scene.choices.length > 0) {
      const choicesContainer = document.createElement('div');
      choicesContainer.className = `choices-container ${scene.choices.length > 2 ? 'stack-col' : ''}`;

      scene.choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.type = 'button';

        const bgLayer = document.createElement('div');
        bgLayer.className = 'choice-btn__bg';

        const textLayer = document.createElement('div');
        textLayer.className = 'choice-btn__text';
        textLayer.textContent = choice.label;

        btn.appendChild(bgLayer);
        btn.appendChild(textLayer);

        btn.addEventListener('click', () => {
          handleChoice(choice.next);
        });

        choicesContainer.appendChild(btn);
      });

      sceneContainer.appendChild(choicesContainer);
    }

    sceneContainer.classList.remove('fade-out');
  }, 300);
}

function handleChoice(nextSceneId) {
  currentSceneId = nextSceneId;
  renderScene(currentSceneId);
}

document.addEventListener('DOMContentLoaded', () => {
  sceneContainer = document.getElementById('scene-container');
  renderScene(currentSceneId);
});