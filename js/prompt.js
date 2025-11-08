document.querySelectorAll('.prompt-box').forEach(box => {
  box.addEventListener('click', function () {
    const text = this.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      this.classList.add('copied');
      setTimeout(() => {
        this.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('コピーに失敗しました:', err);
      alert('コピーに失敗しました。手動でコピーしてください。');
    });
  });
});
