// AIサービス情報
const aiServiceInfo = {
  chatgpt: {
    icon: '🤖',
    name: 'ChatGPT',
    desc: 'OpenAI 提供の強力かつ多目的な対話型AI。文章生成・テスト作成・資料要約・翻訳など幅広い用途で安定した動作。プラグインや画像認識にも対応。',
    link: 'https://chat.openai.com/',
    linkLabel: 'ChatGPT（公式サイト）'
  },
  gemini: {
    icon: '💎',
    name: 'Gemini',
    desc: 'Google が開発したAI。検索と連携し最新情報に強い。日本語での長文処理や画像解析も得意。Google アカウントで使える。',
    link: 'https://gemini.google.com/',
    linkLabel: 'Gemini（Google公式）'
  },
  claude: {
    icon: '🧠',
    name: 'Claude',
    desc: 'Anthropic 社開発。長文読解・文書要約・創造的アイデア出しに適性。プライバシー配慮にも強みがあり、教育現場でも注目されるAI。',
    link: 'https://claude.ai/',
    linkLabel: 'Claude（Anthropic）'
  }
};

// イベント登録
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('ai-service-modal');
  const modalDetails = document.getElementById('modalDetails');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function () {
      const key = card.dataset.service;
      const info = aiServiceInfo[key];
      if (info) {
        modalDetails.innerHTML =
          `<h3>
            <span>${info.icon}</span>${info.name}
          </h3>
          <div>${info.desc}</div>
          <a href="${info.link}" target="_blank" rel="noopener noreferrer" class="modal-link-button">${info.linkLabel} ↗</a>`;
        modal.style.display = 'flex';
        // Trap focus
        closeModalBtn.focus();
      }
    });
    
    // キーボード操作用
    card.addEventListener('keydown', function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Escキーで閉じる
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === "flex" && (e.key === "Escape" || e.key === "Esc")) {
      modal.style.display = 'none';
    }
  });
});
