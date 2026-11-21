const questions = [
    {
        question: "Hasil dari 2³ adalah ...",
        options: ["4", "6", "8", "9"],
        answer: 2
    },
    {
        question: "Jika log₂ 8 = x, maka nilai x adalah ...",
        options: ["2", "3", "4", "8"],
        answer: 1
    },
    {
        question: "Rumus luas persegi adalah ...",
        options: ["s × s", "2 × s", "4 × s", "p × l"],
        answer: 0
    },
    {
        question: "Turunan dari f(x) = x² adalah ...",
        options: ["x", "2x", "x³", "2"],
        answer: 1
    },
    {
        question: "Hasil dari log₁₀ 100 adalah ...",
        options: ["1", "2", "10", "100"],
        answer: 1
    },
    {
        question: "Nilai sin 30° adalah ...",
        options: ["0", "1/2", "√2/2", "1"],
        answer: 1
    },
    {
        question: "Rumus luas lingkaran adalah ...",
        options: ["2πr", "πr²", "πd", "r²"],
        answer: 1
    },
    {
        question: "Hasil dari 5! adalah ...",
        options: ["20", "60", "100", "120"],
        answer: 3
    },
    {
        question: "Rata-rata dari 4, 6, dan 8 adalah ...",
        options: ["5", "6", "7", "8"],
        answer: 1
    },
    {
        question: "Jika f(x) = 3x + 2, maka f(2) adalah ...",
        options: ["6", "7", "8", "9"],
        answer: 2
    },
    {
        question: "Hasil dari 3⁴ adalah ...",
        options: ["27", "64", "81", "243"],
        answer: 2
    },
    {
        question: "Jika 2x + 5 = 15, nilai x adalah ...",
        options: ["3", "5", "7", "10"],
        answer: 1
    },
    {
        question: "Hasil dari log₂ 32 adalah ...",
        options: ["3", "4", "5", "6"],
        answer: 2
    },
    {
        question: "Akar-akar persamaan x² - 5x + 6 = 0 adalah ...",
        options: [
            "1 dan 6",
            "2 dan 3",
            "-2 dan -3",
            "1 dan 5"
        ],
        answer: 1
    },
    {
        question: "Turunan pertama dari f(x) = 4x³ adalah ...",
        options: ["4x²", "8x", "12x²", "12x³"],
        answer: 2
    },
    {
        question: "Hasil dari ∫ 2x dx adalah ...",
        options: [
            "x² + C",
            "2x² + C",
            "x + C",
            "2 + C"
        ],
        answer: 0
    },
    {
        question: "Nilai cos 60° adalah ...",
        options: ["0", "1/2", "√3/2", "1"],
        answer: 1
    },
    {
        question: "Jika sin θ = 3/5, maka nilai cos θ (sudut lancip) adalah ...",
        options: ["2/5", "3/4", "4/5", "5/3"],
        answer: 2
    },
    {
        question: "Determinan matriks [[2, 3], [1, 4]] adalah ...",
        options: ["5", "8", "11", "14"],
        answer: 0
    },
    {
        question: "Hasil dari 7! adalah ...",
        options: ["720", "1.200", "5.040", "7.200"],
        answer: 2
    },
    {
        question: "Banyak cara menyusun 3 orang dalam satu barisan adalah ...",
        options: ["3", "6", "9", "12"],
        answer: 1
    },
    {
        question: "Peluang muncul angka genap pada sebuah dadu adalah ...",
        options: ["1/6", "1/3", "1/2", "2/3"],
        answer: 2
    },
    {
        question: "Rata-rata dari 5, 7, 8, 10, dan 10 adalah ...",
        options: ["7", "8", "9", "10"],
        answer: 1
    },
    {
        question: "Jika f(x) = 2x² - 3x + 1, maka f(2) adalah ...",
        options: ["2", "3", "4", "5"],
        answer: 1
    },
    {
        question: "Jumlah sudut dalam sebuah segitiga adalah ...",
        options: ["90°", "180°", "270°", "360°"],
        answer: 1
    },
    {
        question: "Hasil dari (x + 3)(x + 2) adalah ...",
        options: [
            "x² + 5x + 6",
            "x² + 6x + 5",
            "x² + x + 6",
            "x² + 5"
        ],
        answer: 0
    },
    {
        question: "Nilai dari √144 adalah ...",
        options: ["10", "11", "12", "14"],
        answer: 2
    },
    {
        question: "Jika barisan aritmetika memiliki suku pertama 3 dan beda 4, suku ke-5 adalah ...",
        options: ["15", "17", "19", "21"],
        answer: 2
    },
    {
        question: "Nilai maksimum dari f(x) = -x² + 4x adalah ...",
        options: ["2", "4", "6", "8"],
        answer: 1
    },
    {
        question: "Jika 3ˣ = 81, nilai x adalah ...",
        options: ["2", "3", "4", "5"],
        answer: 2
    }
];
let currentQuestion = 0;
let score = 0;
let answered = false;
let quizFinished = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const numberElement = document.getElementById("questionNumber");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const checkButton = document.getElementById("checkButton");
const nextButton = document.getElementById("nextButton");

function showQuestion() {
    answered = false;
    quizFinished = false;

    const q = questions[currentQuestion];

    numberElement.textContent =
        `Soal ${currentQuestion + 1} dari ${questions.length}`;

    scoreElement.textContent = `Skor: ${Math.round(score)}`;

    questionElement.textContent = q.question;

    feedbackElement.textContent = "";
    feedbackElement.style.color = "";

    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "quiz-option";

        label.innerHTML = `
            <input type="radio" name="answer" value="${index}">
            ${String.fromCharCode(65 + index)}. ${option}
        `;

        optionsElement.appendChild(label);
    });

    checkButton.style.display = "inline-block";
    nextButton.style.display = "none";
}

checkButton.addEventListener("click", function() {
    if (answered) return;

    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        feedbackElement.textContent =
            "Pilih salah satu jawaban terlebih dahulu!";
        feedbackElement.style.color = "#dc2626";
        return;
    }

    answered = true;

    const userAnswer = Number(selected.value);
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        score += 100 / questions.length;

        feedbackElement.textContent =
            "Benar! Jawabanmu tepat.";

        feedbackElement.style.color = "#16a34a";
    } else {
        feedbackElement.textContent =
            `Belum tepat. Jawaban yang benar adalah ${
                String.fromCharCode(65 + correctAnswer)
            }. ${questions[currentQuestion].options[correctAnswer]}`;

        feedbackElement.style.color = "#dc2626";
    }

    scoreElement.textContent = `Skor: ${Math.round(score)}`;

    document.querySelectorAll(
        'input[name="answer"]'
    ).forEach(input => {
        input.disabled = true;
    });

    checkButton.style.display = "none";
    nextButton.style.display = "inline-block";

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Lihat Hasil";
    } else {
        nextButton.textContent = "Soal Berikutnya";
    }
});

nextButton.addEventListener("click", function() {

    if (quizFinished) {
        currentQuestion = 0;
        score = 0;
        quizFinished = false;

        nextButton.textContent = "Soal Berikutnya";
        showQuestion();
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizFinished = true;

    const finalScore = Math.round(score);

    numberElement.textContent = "Kuis Selesai";
    scoreElement.textContent = `Skor: ${finalScore}`;

    questionElement.textContent =
        `Kamu memperoleh ${finalScore} dari 100 poin!`;

    optionsElement.innerHTML = "";

    feedbackElement.textContent =
        finalScore >= 80
            ? "Hebat! Pemahaman matematikamu sangat baik."
            : finalScore >= 60
            ? "Bagus! Terus tingkatkan kemampuanmu."
            : "Tetap semangat! Coba pelajari materinya lagi.";

    checkButton.style.display = "none";
    nextButton.textContent = "Ulangi Kuis";
    nextButton.style.display = "inline-block";
}

showQuestion();