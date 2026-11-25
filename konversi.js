const units = {

    length: {
        km: 1000,
        hm: 100,
        dam: 10,
        m: 1,
        dm: 0.1,
        cm: 0.01,
        mm: 0.001,
        mikrometer: 0.000001,
        nanometer: 0.000000001,
        mil: 1609.344,
        inci: 0.0254
    },

    weight: {
        ton: 1000,
        kuintal: 100,
        kg: 1,
        hg: 0.1,
        dag: 0.01,
        gram: 0.001,
        dg: 0.0001,
        cg: 0.00001,
        mg: 0.000001
    },

    area: {
        "km²": 1000000,
        ha: 10000,
        "hm²": 10000,
        "dam²": 100,
        are: 100,
        "m²": 1,
        "dm²": 0.01,
        "cm²": 0.0001,
        "mm²": 0.000001
    },

    volume: {
        "m³": 1000,
        "dm³": 1,
        liter: 1,
        "cm³": 0.001,
        ml: 0.001,
        "mm³": 0.000001,
        "km³": 1000000000000,
        "hm³": 1000000000,
        "dam³": 1000000
    },

    time: {
        tahun: 31536000,
        minggu: 604800,
        hari: 86400,
        jam: 3600,
        menit: 60,
        detik: 1,
        milidetik: 0.001
    }

};

function updateUnits() {

    const category = document.getElementById("category").value;

    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");

    from.innerHTML = "";
    to.innerHTML = "";

    const selectedUnits = category === "temperature"
        ? ["Celsius", "Fahrenheit", "Kelvin", "Réaumur"]
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

function convertTemperature(value, from, to) {

    let celsius;

    switch (from) {

        case "Celsius":
            celsius = value;
            break;

        case "Fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;

        case "Kelvin":
            celsius = value - 273.15;
            break;

        case "Réaumur":
            celsius = value * 5 / 4;
            break;

    }

    switch (to) {

        case "Celsius":
            return celsius;

        case "Fahrenheit":
            return celsius * 9 / 5 + 32;

        case "Kelvin":
            return celsius + 273.15;

        case "Réaumur":
            return celsius * 4 / 5;

    }

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

        result = convertTemperature(value, from, to);

    } else {

        result = value * units[category][from] / units[category][to];

    }

    if (!Number.isFinite(result)) {

        alert("Konversi tidak dapat dilakukan!");

        return;

    }

    document.getElementById("conversionResult").textContent =
        `${value} ${from} = ${Number(result.toPrecision(10))} ${to}`;

}

updateUnits();
