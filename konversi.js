
const units = {
    length: {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001
    },

    weight: {
        ton: 1000,
        kg: 1,
        gram: 0.001,
        mg: 0.000001
    },

    area: {
        "km²": 1000000,
        "m²": 1,
        "cm²": 0.0001
    },

    volume: {
        "m³": 1000,
        liter: 1,
        ml: 0.001
    },

    time: {
        jam: 3600,
        menit: 60,
        detik: 1
    }
};

function updateUnits() {
    const category = document.getElementById("category").value;
    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");

    from.innerHTML = "";
    to.innerHTML = "";

    const selectedUnits = category === "temperature"
        ? ["Celsius", "Fahrenheit", "Kelvin"]
        : Object.keys(units[category]);

    selectedUnits.forEach(unit => {
        from.add(new Option(unit, unit));
        to.add(new Option(unit, unit));
    });

    if (category === "temperature") {
        to.value = "Fahrenheit";
    } else {
        to.selectedIndex = Math.min(1, selectedUnits.length - 1);
    }

    document.getElementById("conversionResult").textContent =
        "Hasil konversi akan muncul di sini.";
}

function convertUnit() {
    const category = document.getElementById("category").value;
    const input = document.getElementById("inputValue");
    const value = Number(input.value);

    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;

    if (input.value.trim() === "" || !Number.isFinite(value)) {
        alert("Masukkan angka yang valid!");
        return;
    }

    let result;

    if (category === "temperature") {
        let celsius;

        if (from === "Celsius") celsius = value;
        if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
        if (from === "Kelvin") celsius = value - 273.15;

        if (to === "Celsius") result = celsius;
        if (to === "Fahrenheit") result = celsius * 9 / 5 + 32;
        if (to === "Kelvin") result = celsius + 273.15;
    } else {
        result = value * units[category][from] / units[category][to];
    }

    document.getElementById("conversionResult").textContent =
        `${value} ${from} = ${Number(result.toPrecision(10))} ${to}`;
}

updateUnits();
