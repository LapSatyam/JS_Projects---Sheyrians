let filters = getDefaultFilters();
const filterContainer = document.querySelector("#filters");
const ImgInput = document.querySelector("#input-img");
const ImgCanvas = document.querySelector("#canvas-img")
const placeholder = document.querySelector("#placeholder")
const canvasCtx = ImgCanvas.getContext("2d");
const resetBtn = document.querySelector("#resetBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const presetsContainer = document.querySelector("#presets");


const presets = {
    vivid: {
        brightness: 110,
        contrast: 120,
        saturation: 140,
        grayscale: 0,
        opacity: 100,
        sepia: 0,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 80,
        grayscale: 0,
        opacity: 100,
        sepia: 40,
        invert: 0,
        blur: 0,
        hueRotate: 340
    },

    warm: {
        brightness: 105,
        contrast: 105,
        saturation: 120,
        grayscale: 0,
        opacity: 100,
        sepia: 25,
        invert: 0,
        blur: 0,
        hueRotate: 350
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 110,
        grayscale: 0,
        opacity: 100,
        sepia: 0,
        invert: 0,
        blur: 0,
        hueRotate: 20
    },

    dramatic: {
        brightness: 90,
        contrast: 150,
        saturation: 130,
        grayscale: 0,
        opacity: 100,
        sepia: 0,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        grayscale: 100,
        opacity: 100,
        sepia: 0,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },

    noir: {
        brightness: 90,
        contrast: 170,
        saturation: 0,
        grayscale: 100,
        opacity: 100,
        sepia: 10,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 90,
        grayscale: 0,
        opacity: 100,
        sepia: 15,
        invert: 0,
        blur: 0,
        hueRotate: 0
    },

    retro: {
        brightness: 105,
        contrast: 95,
        saturation: 120,
        grayscale: 0,
        opacity: 100,
        sepia: 35,
        invert: 0,
        blur: 0,
        hueRotate: 330
    },

    summer: {
        brightness: 115,
        contrast: 110,
        saturation: 140,
        grayscale: 0,
        opacity: 100,
        sepia: 15,
        invert: 0,
        blur: 0,
        hueRotate: 350
    },

    cinematic: {
        brightness: 95,
        contrast: 130,
        saturation: 85,
        grayscale: 0,
        opacity: 100,
        sepia: 10,
        invert: 0,
        blur: 0,
        hueRotate: 20
    },

    dreamy: {
        brightness: 115,
        contrast: 90,
        saturation: 110,
        grayscale: 0,
        opacity: 100,
        sepia: 10,
        invert: 0,
        blur: 2,
        hueRotate: 0
    },

    oldPhoto: {
        brightness: 100,
        contrast: 90,
        saturation: 70,
        grayscale: 20,
        opacity: 100,
        sepia: 60,
        invert: 0,
        blur: 1,
        hueRotate: 0
    },

    cyberpunk: {
        brightness: 105,
        contrast: 140,
        saturation: 170,
        grayscale: 0,
        opacity: 100,
        sepia: 0,
        invert: 0,
        blur: 0,
        hueRotate: 280
    }
};

let image = null;


createFilters();


ImgInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        ImgCanvas.classList.remove("hidden");
        placeholder.classList.add("hidden");
        ImgCanvas.width = img.width;
        ImgCanvas.height = img.height;

        applyFilters();

        URL.revokeObjectURL(img.src);
    };
});

resetBtn.addEventListener("click", resetFilters);

downloadBtn.addEventListener("click", downloadImage);

Object.keys(presets).forEach(createPresetBtn);

function createFilters() {
    Object.keys(filters).forEach(key => {
        const F = filters[key];

        const filterElement = createFilterElement(key, F.value, F.min, F.max);

        // console.log(F.value);
        filterContainer.appendChild(filterElement);

    });
};

function createFilterElement(name, value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.className = "range-red"
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.textContent = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", e => {
        filters[name].value = Number(input.value);
        applyFilters();
    });

    return div;
};

function applyFilters() {
    if (!image) return;
    canvasCtx.clearRect(0, 0, ImgCanvas.width, ImgCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturation.value}%)
        grayscale(${filters.grayscale.value}%)
        opacity(${filters.opacity.value}%)
        sepia(${filters.sepia.value}%)
        invert(${filters.invert.value}%)
        blur(${filters.blur.value}px)
        hue-rotate(${filters.hueRotate.value}deg)
    `;

    canvasCtx.drawImage(image, 0, 0);
};

function getDefaultFilters() {
    return {
        brightness: { value: 100, min: 0, max: 200, unit: "%" },
        contrast: { value: 100, min: 0, max: 200, unit: "%" },
        saturation: { value: 100, min: 0, max: 200, unit: "%" },
        grayscale: { value: 0, min: 0, max: 100, unit: "%" },
        opacity: { value: 100, min: 0, max: 100, unit: "%" },
        sepia: { value: 0, min: 0, max: 100, unit: "%" },
        invert: { value: 0, min: 0, max: 100, unit: "%" },
        blur: { value: 0, min: 0, max: 20, unit: "px" },
        hueRotate: { value: 0, min: 0, max: 360, unit: "deg" }
    };
};

function resetFilters() {
    filters = getDefaultFilters();
    filterContainer.innerHTML = "";
    createFilters();
    applyFilters();
}

function downloadImage() {
    if (!image) return;
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = ImgCanvas.toDataURL();
    link.click();
};

function createPresetBtn(name) {
    const btn = document.createElement("button");
    btn.classList.add("presetBtn");
    btn.textContent = name;
    btn.addEventListener("click", () => {
        applyPreset(name);
    });

    presetsContainer.appendChild(btn);
};

function applyPreset(name) {
    const preset = presets[name];

    for (const key in preset) {
        filters[key].value = preset[key];
        document.getElementById(key).value = preset[key];
    };

    applyFilters();
};