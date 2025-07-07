function setupShareButton() {
  const shareBtn = document.getElementById("share-btn")
  if (shareBtn) {
    const originalText = shareBtn.textContent
    shareBtn.addEventListener("click", async () => {
      try {
        const currentUrl = window.location.href
        const apiUrl = "https://is.gd/create.php?format=simple&url=" + encodeURIComponent(currentUrl)

        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`is.gd API failed with status: ${response.status}`)
        }
        const shortUrl = await response.text()

        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shortUrl)
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = shortUrl
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
        }
        shareBtn.textContent = "✅ 已复制!"
      } catch (error) {
        console.error("生成短链接失败:", error)
        shareBtn.textContent = "❌ 失败"
      } finally {
        setTimeout(() => {
          if (originalText) {
            shareBtn.textContent = originalText
          }
        }, 2000)
      }
    })
  }
}

document.addEventListener("DOMContentLoaded", setupShareButton)
document.addEventListener("nav", setupShareButton) 