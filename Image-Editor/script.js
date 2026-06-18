const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },

    hueRotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    }
};
const filterContainer = document.querySelector(".filters");
const ImgInput = document.querySelector("#input-img");
const ImgCanvas = document.querySelector("#canvas-img")
const canvasCtx = ImgCanvas.getContext("2d");

let image = null;


Object.keys(filters).forEach(key => {
    const F = filters[key];

    const filterElement = createFilterElement(key, F.unit, F.value, F.min, F.max);

    // console.log(F.value);
    filterContainer.appendChild(filterElement);

});


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
})







function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.className = "range-red w-full"
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
        applyFilters(name);
    });

    return div;
};

function applyFilters(name) {
    canvasCtx.filter = `${name}(${filters[name].value}${filters[name].unit})`;
    canvasCtx.drawImage(image, 0, 0);
};