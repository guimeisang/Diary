/**
 * copy 字符串到粘贴板
 * 思路：
 * 1. 先建立一个textarea的dom，并且将str填写到value; 并且将其选中
 * 2. 执行copy命令
 * 3. 将选中内容添加到selection中
 * @param {string} str 
 */
const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if(selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

// example
copyToClipboard('Lorem ipsum') 