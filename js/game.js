// 問題データ
const questions = [
  {
    type: 'quiz',
    question: 'AI（人工知能）に対して指示や質問を伝える文章のことを何と呼ぶ？',
    options: ['トークン', 'プロンプト', 'コンテキスト', 'ハルシネーション'],
    correct: 1,
    explanation: '正解は「プロンプト」です。プロンプトは「促す、引き出す」という意味で、AIに何を作成してほしいかを明確に伝えるための入力文です。'
  },
  {
    type: 'quiz',
    question: 'ChatGPTやClaudeなど、大規模なテキストデータから学習したAIモデルのことを何と呼ぶ？',
    options: ['チャットボット', 'LLM（大規模言語モデル）', '生成AI', 'ファインチューニング'],
    correct: 1,
    explanation: '正解は「LLM（大規模言語モデル）」です。Large Language Modelの略で、自然な文章の生成や理解が可能なAIモデルです。'
  },
  {
    type: 'quiz',
    question: 'AIが事実に基づかない情報を生成してしまう現象を何と呼ぶ？',
    options: ['トークン', 'ハルシネーション', 'コンテキスト', '出力形式'],
    correct: 1,
    explanation: '正解は「ハルシネーション」です。「幻覚」を意味する言葉で、AIが自信を持って間違った情報を提示することがあります。'
  },
  {
    type: 'quiz',
    question: 'AIに生成してほしい内容の形式や構造を指定することを何と呼ぶ？',
    options: ['プロンプト', 'コンテキスト', '出力形式', 'ファインチューニング'],
    correct: 2,
    explanation: '正解は「出力形式」です。「表形式で出力」「箇条書きで出力」など、具体的な形式を指示することで、使いやすい結果を得られます。'
  },
  {
    type: 'quiz',
    question: '既存のAIモデルを特定のタスクや分野に特化させるために、追加のデータで再学習させることを何と呼ぶ？',
    options: ['ハルシネーション', 'ファインチューニング', 'トークン', '生成AI'],
    correct: 1,
    explanation: '正解は「ファインチューニング」です。専門的な用途に最適化する技術で、特定の分野に特化したAIを作成できます。'
  },
  {
    type: 'prompt',
    question: '中学2年生の理科「電流と電圧」の単元について、5問の選択式小テストを作成するプロンプトを書いてください。',
    hint: '<strong>ヒント：</strong>問題数、形式、難易度などの条件を明確に指定しましょう。',
    example: '中学2年生の理科「電流と電圧」の単元について、以下の条件で小テストを作成してください。\n\n【条件】\n- 問題数：5問\n- 形式：4択の選択問題\n- 難易度：基礎レベル\n- 各問題に解答と簡潔な解説を付ける',
    keywords: ['問題数', '形式', '選択', '解答', '解説']
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answers = [];

function startGame() {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameContainer').classList.add('active');
  currentQuestionIndex = 0;
  score = 0;
  answers = [];
  loadQuestion();
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
  document.getElementById('totalQuestions').textContent = questions.length;

  if (question.type === 'quiz') {
    document.getElementById('quizCard').style.display = 'block';
    document.getElementById('promptCard').classList.remove('active');
    document.getElementById('questionTitle').textContent = question.question;
    
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    question.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.className = 'option';
      li.innerHTML = `
        <input type="radio" name="answer" id="option${index}" value="${index}">
        <label for="option${index}">${option}</label>
      `;
      li.addEventListener('click', () => selectOption(index));
      optionsList.appendChild(li);
    });

    document.getElementById('feedback').classList.remove('show', 'correct', 'incorrect');
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('checkBtn').style.display = 'none';
    selectedAnswer = null;
  } else {
    document.getElementById('quizCard').style.display = 'none';
    document.getElementById('promptCard').classList.add('active');
    document.getElementById('promptTitle').textContent = question.question;
    document.getElementById('promptHint').innerHTML = question.hint;
    document.getElementById('promptExample').textContent = question.example;
    document.getElementById('promptInput').value = '';
    document.getElementById('promptFeedback').classList.remove('show', 'correct', 'incorrect');
    document.getElementById('promptNextBtn').disabled = true;
    document.getElementById('promptCheckBtn').disabled = false;
  }
}

function selectOption(index) {
  selectedAnswer = index;
  document.querySelectorAll('.option').forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
    opt.querySelector('input').checked = (i === index);
  });
  document.getElementById('nextBtn').disabled = false;
}

function checkAnswer() {
  if (selectedAnswer === null) return;
  
  const question = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.correct;
  const feedback = document.getElementById('feedback');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackText = document.getElementById('feedbackText');

  if (isCorrect) {
    score++;
    feedback.classList.add('show', 'correct');
    feedbackTitle.textContent = '✓ 正解です！';
    feedbackTitle.style.color = 'var(--success)';
  } else {
    feedback.classList.add('show', 'incorrect');
    feedbackTitle.textContent = '✗ 不正解です';
    feedbackTitle.style.color = 'var(--error)';
  }
  feedbackText.textContent = question.explanation;

  // 選択肢の色を変更
  document.querySelectorAll('.option').forEach((opt, i) => {
    opt.classList.remove('selected');
    if (i === question.correct) {
      opt.classList.add('correct');
    } else if (i === selectedAnswer && !isCorrect) {
      opt.classList.add('incorrect');
    }
  });

  document.getElementById('nextBtn').disabled = false;
  document.getElementById('checkBtn').style.display = 'none';
  answers.push({ question: currentQuestionIndex, answer: selectedAnswer, correct: isCorrect });
}

function checkPrompt() {
  const question = questions[currentQuestionIndex];
  const userPrompt = document.getElementById('promptInput').value.trim();
  const feedback = document.getElementById('promptFeedback');
  const feedbackTitle = document.getElementById('promptFeedbackTitle');
  const feedbackText = document.getElementById('promptFeedbackText');

  if (userPrompt.length < 20) {
    feedback.classList.add('show', 'incorrect');
    feedbackTitle.textContent = 'プロンプトが短すぎます';
    feedbackTitle.style.color = 'var(--error)';
    feedbackText.textContent = 'もう少し詳しく条件を指定してください。';
    return;
  }

  // キーワードチェック
  let foundKeywords = 0;
  question.keywords.forEach(keyword => {
    if (userPrompt.includes(keyword)) {
      foundKeywords++;
    }
  });

  const keywordRate = foundKeywords / question.keywords.length;
  let isCorrect = false;
  let message = '';

  if (keywordRate >= 0.8) {
    isCorrect = true;
    score++;
    feedback.classList.add('show', 'correct');
    feedbackTitle.textContent = '✓ 優秀なプロンプトです！';
    feedbackTitle.style.color = 'var(--success)';
    message = '必要な条件が適切に含まれています。';
  } else if (keywordRate >= 0.5) {
    feedback.classList.add('show');
    feedbackTitle.textContent = '△ もう少し改善できます';
    feedbackTitle.style.color = 'var(--warning)';
    message = `条件の一部が不足しています。以下の点を確認してください：${question.keywords.filter(k => !userPrompt.includes(k)).join('、')}`;
  } else {
    feedback.classList.add('show', 'incorrect');
    feedbackTitle.textContent = '✗ 条件が不足しています';
    feedbackTitle.style.color = 'var(--error)';
    message = `以下の要素を含めるように改善してください：${question.keywords.join('、')}`;
  }

  feedbackText.innerHTML = message + '<br><br><strong>参考例：</strong><br>' + question.example.replace(/\n/g, '<br>');
  document.getElementById('promptNextBtn').disabled = false;
  document.getElementById('promptCheckBtn').disabled = true;
  answers.push({ question: currentQuestionIndex, answer: userPrompt, correct: isCorrect });
}

function nextQuestion() {
  // 現在の問題がクイズ問題で、まだチェックされていない場合は自動的にチェック
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion && currentQuestion.type === 'quiz') {
    const alreadyChecked = answers.some(a => a.question === currentQuestionIndex);
    if (!alreadyChecked && selectedAnswer !== null) {
      checkAnswer();
      return; // checkAnswer()内でanswersに追加されるので、次回呼ばれたときに次へ進む
    }
  }
  
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('gameContainer').classList.remove('active');
  document.getElementById('resultScreen').classList.add('active');

  const totalQuestions = questions.length;
  const correctAnswers = score;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const scorePoints = Math.round((correctAnswers / totalQuestions) * 100);

  document.getElementById('scoreText').textContent = scorePoints;
  document.getElementById('correctCount').textContent = correctAnswers;
  document.getElementById('totalCount').textContent = totalQuestions;
  document.getElementById('accuracyRate').textContent = accuracy + '%';

  // レベル判定
  let level, levelText, levelClass, message;
  if (scorePoints >= 90) {
    level = 'expert';
    levelText = 'エキスパート';
    levelClass = 'level-expert';
    message = '素晴らしい！AIの理解と活用スキルが非常に高いです。';
  } else if (scorePoints >= 70) {
    level = 'advanced';
    levelText = '上級者';
    levelClass = 'level-advanced';
    message = '優秀です！AIを効果的に活用できています。';
  } else if (scorePoints >= 50) {
    level = 'intermediate';
    levelText = '中級者';
    levelClass = 'level-intermediate';
    message = '良好です。さらに学習を続けてスキルアップしましょう。';
  } else {
    level = 'beginner';
    levelText = '初級者';
    levelClass = 'level-beginner';
    message = '基礎から学び直すと良いでしょう。ホームページの解説を参考にしてください。';
  }

  document.getElementById('resultMessage').textContent = message;
  const badge = document.getElementById('levelBadge');
  badge.textContent = levelText;
  badge.className = 'level-badge ' + levelClass;

  // 詳細結果
  let detailsHtml = '<h4>問題別の結果</h4><ul>';
  questions.forEach((q, index) => {
    const answer = answers[index];
    const isCorrect = answer ? answer.correct : false;
    const icon = isCorrect ? '✓' : '✗';
    const resultClass = isCorrect ? 'result-correct' : 'result-incorrect';
    detailsHtml += `<li><span class="${resultClass}">${icon}</span>問題${index + 1}: ${q.type === 'quiz' ? q.question : q.question.substring(0, 30) + '...'}</li>`;
  });
  detailsHtml += '</ul>';
  document.getElementById('resultDetails').innerHTML = detailsHtml;
}

function restartGame() {
  document.getElementById('resultScreen').classList.remove('active');
  startGame();
}
