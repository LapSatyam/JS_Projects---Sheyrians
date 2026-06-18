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

Object.keys(filters).forEach(key => {
    const F = filters[key];

    const filterElement = createFilterElement(key, F.unit, F.value, F.min, F.max);

    // console.log(F.value);
    filterContainer.appendChild(filterElement);

});










function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.textContent = name;

    div.appendChild(p);
    div.appendChild(input);

    return div;
};