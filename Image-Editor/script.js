let filters = getDefaultFilters();
const filterContainer = document.querySelector(".filters");
const ImgInput = document.querySelector("#input-img");
const ImgCanvas = document.querySelector("#canvas-img")
const canvasCtx = ImgCanvas.getContext("2d");
const resetBtn = document.querySelector("#resetBtn");
const downloadBtn = document.querySelector("#downloadBtn");

let image = null;



createFilters();


ImgInput.addEventListener("change", e => {
    const file = e.target.files[0];

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        ImgCanvas.classList.remove("hidden");
        document.querySelector("#placeholder").classList.add("hidden");
        ImgCanvas.width = img.width;
        ImgCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    };
});

resetBtn.addEventListener("click", () => {
    filters = getDefaultFilters();
    filterContainer.innerHTML = "";
    createFilters();
    applyFilters();
});

downloadBtn.addEventListener("click", () => {
    downloadImage();
});



function createFilters() {
    Object.keys(filters).forEach(key => {
        const F = filters[key];

        const filterElement = createFilterElement(key, F.unit, F.value, F.min, F.max);

        // console.log(F.value);
        filterContainer.appendChild(filterElement);

    });
};

function createFilterElement(name, unit = "%", value, min, max) {
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
        filters[name].value = input.value;
        applyFilters();
    });

    return div;
};

function applyFilters() {
    if (!image) return;
    canvasCtx.filter = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturation.value}%)
        grayscale(${filters.grayscale.value}%)
        sepia(${filters.sepia.value}%)
        invert(${filters.invert.value}%)
        blur(${filters.blur.value}px)
        hue-rotate(${filters.hueRotate.value}deg)
    `;

    canvasCtx.clearRect(0, 0, ImgCanvas.width, ImgCanvas.height);
    canvasCtx.drawImage(image, 0, 0);
    return;
};

function getDefaultFilters() {
    return {
        brightness: { value: 100, min: 0, max: 200, unit: "%" },
        contrast: { value: 100, min: 0, max: 200, unit: "%" },
        saturation: { value: 100, min: 0, max: 200, unit: "%" },
        grayscale: { value: 0, min: 0, max: 100, unit: "%" },
        sepia: { value: 0, min: 0, max: 100, unit: "%" },
        invert: { value: 0, min: 0, max: 100, unit: "%" },
        blur: { value: 0, min: 0, max: 20, unit: "px" },
        hueRotate: { value: 0, min: 0, max: 360, unit: "deg" }
    };
};

function downloadImage() {
    if (!image) return;
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = ImgCanvas.toDataURL();
    link.click();
};