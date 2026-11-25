let expression = "";
let isDegree = true;

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

function append(value) {
    expression += value;
    display.value = expression;
}

function clearScreen() {
    expression = "";
    display.value = "";
    historyDisplay.textContent = "";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression;
}

function toggleMode() {
    isDegree = !isDegree;
    document.getElementById("modeButton").textContent =
        isDegree ? "DEG" : "RAD";
}

function factorial(n) {
    if (!Number.isInteger(n) || n < 0 || n > 170) {
        throw new Error("Faktorial hanya untuk bilangan bulat 0-170");
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

function calculate() {
    try {
        if (!expression) return;

        let exp = expression;

        if (!/^[0-9+\-*/().%!^a-zA-Z]+$/.test(exp)) {
            throw new Error("Ekspresi tidak valid");
        }

        exp = exp.replace(/\bpi\b/g, "Math.PI");
        exp = exp.replace(/\be\b/g, "Math.E");
        exp = exp.replace(/sqrt\(/g, "Math.sqrt(");
        exp = exp.replace(/log\(/g, "Math.log10(");
        exp = exp.replace(/ln\(/g, "Math.log(");

        const angle = isDegree ? "Math.PI/180" : "1";

        exp = exp.replace(/sin\(/g,
            `Math.sin((${angle})*`);
        exp = exp.replace(/cos\(/g,
            `Math.cos((${angle})*`);
        exp = exp.replace(/tan\(/g,
            `Math.tan((${angle})*`);

        exp = exp.replace(/\^/g, "**");

        // Faktorial
        exp = exp.replace(/(\d+(?:\.\d+)?)!/g,
            "factorial($1)");

        // Validasi karakter setelah transformasi
        if (!/^[0-9+\-*/().,\sA-Za-z_]+$/.test(exp)) {
            throw new Error("Ekspresi tidak valid");
        }

        // Evaluasi ekspresi dengan scope matematika terbatas
        const result = Function(
            "Math",
            "factorial",
            `"use strict"; return (${exp})`
        )(Math, factorial);

        if (!Number.isFinite(result)) {
            throw new Error("Hasil tidak terdefinisi");
        }

        historyDisplay.textContent = expression + " =";
        expression = String(Number(result.toPrecision(12)));
        display.value = expression;

    } catch (error) {
        display.value = "Error";
        expression = "";
        console.error(error);
    }
}
