let size = 0;
let current = 1;
let startTime = 0;
let timer = null;

function startGame(n) {
  size = n;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('controls').style.display = 'block';
  generateGrid();
}

function generateGrid() {
  const game = document.getElementById('game');
  const result = document.getElementById('result');
  result.textContent = '';
  game.innerHTML = '';
  current = 1;

  const numbers = Array.from({length: size * size}, (_, i) => i + 1);
  // 洗牌算法
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  game.style.gridTemplateColumns = `repeat(${size}, 60px)`;

  numbers.forEach(num => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = num;
    cell.addEventListener('click', () => handleClick(cell, num));
    game.appendChild(cell);
  });
}

function handleClick(cell, num) {
  if (num === current) {
    cell.classList.add('correct');
    if (current === 1) startTime = Date.now();
    if (current === size * size) {
      const total = ((Date.now() - startTime) / 1000).toFixed(2);
      document.getElementById('result').textContent = `✅ 完成！用时 ${total} 秒`;
    }
    current++;
  } else {
    cell.classList.add('wrong');
    setTimeout(() => cell.classList.remove('wrong'), 100);
  }
}

function resetGrid() {
  generateGrid();
}

function goBack() {
  document.getElementById('menu').style.display = 'block';
  document.getElementById('controls').style.display = 'none';
  document.getElementById('game').innerHTML = '';
  document.getElementById('result').textContent = '';
}
