let mathChart;

const functionNames = {
    linear: "Grafik Fungsi Linear",
    quadratic: "Grafik Fungsi Kuadrat",
    cubic: "Grafik Fungsi Kubik",
    exponential: "Grafik Fungsi Eksponen",
    logarithm: "Grafik Fungsi Logaritma",
    absolute: "Grafik Fungsi Nilai Mutlak",
    sine: "Grafik Fungsi Sinus",
    cosine: "Grafik Fungsi Cosinus",
    tangent: "Grafik Fungsi Tangen"
};

function calculateFunction(x, type, a, b, c) {

    switch (type) {

        case "linear":
            return a * x + b;

        case "quadratic":
            return a * x * x + b * x + c;

        case "cubic":
            return a * x * x * x + b * x + c;

        case "exponential":
            return a * Math.exp(b * x) + c;

        case "logarithm":
            if (x <= 0) return null;
            return a * Math.log(x) + b;

        case "absolute":
            return a * Math.abs(x - b) + c;

        case "sine":
            return a * Math.sin(x) + b;

        case "cosine":
            return a * Math.cos(x) + b;

        case "tangent": {
            const value = Math.tan(x);
            if (!Number.isFinite(value) || Math.abs(value) > 10) {
                return null;
            }
            return a * value + b;
        }

        default:
            return null;
    }
}

function getEquation(type, a, b, c) {

    switch (type) {

        case "linear":
            return `y = ${a}x + ${b}`;

        case "quadratic":
            return `y = ${a}x² + ${b}x + ${c}`;

        case "cubic":
            return `y = ${a}x³ + ${b}x + ${c}`;

        case "exponential":
            return `y = ${a}e^(${b}x) + ${c}`;

        case "logarithm":
            return `y = ${a} ln(x) + ${b}`;

        case "absolute":
            return `y = ${a}|x - ${b}| + ${c}`;

        case "sine":
            return `y = ${a} sin(x) + ${b}`;

        case "cosine":
            return `y = ${a} cos(x) + ${b}`;

        case "tangent":
            return `y = ${a} tan(x) + ${b}`;

        default:
            return "";
    }
}

function updateGraph() {

    const type = document.getElementById("functionType").value;

    const a = Number(document.getElementById("aValue").value);
    const b = Number(document.getElementById("bValue").value);
    const c = Number(document.getElementById("cValue").value);

    if (![a, b, c].every(Number.isFinite)) {
        alert("Masukkan angka yang valid!");
        return;
    }

    const points = [];

    for (let x = -10; x <= 10.001; x += 0.1) {

        const roundedX = Number(x.toFixed(2));
        const y = calculateFunction(roundedX, type, a, b, c);

        points.push({
            x: roundedX,
            y: y !== null && Number.isFinite(y) ? y : null
        });
    }

    document.getElementById("graphTitle").textContent =
        functionNames[type];

    document.getElementById("equation").textContent =
        getEquation(type, a, b, c);

    document.getElementById("graphDescription").textContent =
        type === "sine" || type === "cosine" || type === "tangent"
            ? "Grafik trigonometri menggunakan satuan radian."
            : "Grafik memperlihatkan perubahan nilai fungsi terhadap variabel x.";

    const ctx = document.getElementById("mathChart");

    if (mathChart) {
        mathChart.destroy();
    }

    mathChart = new Chart(ctx, {

        type: "scatter",

        data: {
            datasets: [{
                label: functionNames[type],
                data: points,
                showLine: true,
                borderColor: "#2563eb",
                backgroundColor: "#2563eb",
                borderWidth: 2.5,
                pointRadius: 0,
                pointHoverRadius: 4,
                tension: 0,
                spanGaps: false
            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "nearest"
            },

            scales: {

                x: {
                    type: "linear",
                    min: -10,
                    max: 10,
                    title: {
                        display: true,
                        text: "Sumbu X"
                    },
                    grid: {
                        color: "#e2e8f0"
                    }
                },

                y: {
                    type: "linear",
                    title: {
                        display: true,
                        text: "Sumbu Y"
                    },
                    grid: {
                        color: "#e2e8f0"
                    }
                }

            },

            plugins: {
                legend: {
                    display: true
                },

                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `x: ${context.parsed.x.toFixed(2)}, y: ${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            }

        }

    });

}

function resetGraph() {

    document.getElementById("functionType").value = "linear";
    document.getElementById("aValue").value = 1;
    document.getElementById("bValue").value = 2;
    document.getElementById("cValue").value = 1;

    updateGraph();
}

document.addEventListener("DOMContentLoaded", function() {
    updateGraph();
});