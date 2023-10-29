let questions = [];
let currentQuestion;

// CSVデータをフェッチする
fetch('data.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error("データのロードに問題が発生しました。");
        }
        return response.text();
    })
    .then(data => {
        questions = data.split('\n').slice(1).map(row => {
            const [rarity, question, answer] = row.split(',');
            return { rarity, question, answer };
        });
    })
    .catch(error => {
        console.error("エラー:", error);
    });

function getQuestionByRarity(rarity) {
    return questions.filter(q => q.rarity === rarity);
}

function getRandomRarity() {
    const rand = Math.random() * 100;
    if (rand < 60) return 'N';
    if (rand < 80) return 'R';
    if (rand < 97) return 'SR';
    return 'UR';
}

document.getElementById('generate-button').addEventListener('click', () => {
    const rarity = getRandomRarity();
    document.getElementById('inputName').value = `会話カード（${rarity}）`;

    const availableQuestions = getQuestionByRarity(rarity);
    if (availableQuestions.length > 0) {
        currentQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        document.getElementById('outputArea').value = currentQuestion.question;
    } else {
        document.getElementById('outputArea').value = "該当する質問がありません";
    }
});

document.getElementById('reset-button').addEventListener('click', () => {
    if (currentQuestion && currentQuestion.answer) {
        alert(currentQuestion.answer);
    } else {
        alert("まだ質問が選択されていません");
    }
});
