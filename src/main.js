import './style.css'

// ライト/ダーク トグル（pinion ⇄ pinion-dark）。
// 初期 data-theme は index.html の head インラインスクリプトが確定済み。
const root = document.documentElement
const btn = document.getElementById('theme-toggle')
const sun = document.getElementById('icon-sun')
const moon = document.getElementById('icon-moon')

const isDark = () => root.dataset.theme === 'pinion-dark'

function syncIcons() {
  const dark = isDark()
  // dark 時は「ライトへ」を示す sun、light 時は「ダークへ」を示す moon を表示
  if (sun) sun.classList.toggle('hidden', !dark)
  if (moon) moon.classList.toggle('hidden', dark)
}

// ロゴ色調をテーマで反転: dark → -light.png（白ロゴ）/ light → -dark.png（黒ロゴ）
function syncLogos() {
  const variant = isDark() ? 'light' : 'dark'
  document.querySelectorAll('img.logo-mark').forEach((img) => {
    const src = img.getAttribute('src') || ''
    img.setAttribute('src', src.replace(/-(?:light|dark)\.png/, `-${variant}.png`))
  })
}

function sync() {
  syncIcons()
  syncLogos()
}

sync()

btn?.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'pinion' : 'pinion-dark'
  try { localStorage.setItem('theme', root.dataset.theme) } catch (e) {}
  sync()
})
