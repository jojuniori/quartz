import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ShareButton: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`share-button ${displayClass ?? ""}`}>
      <button id="share-btn" type="button">
        📋 复制短链接
      </button>
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const shareBtn = document.getElementById('share-btn');
            
            shareBtn.addEventListener('click', async function() {
              try {
                // 使用 is.gd API 生成短链接
                const currentUrl = window.location.href;
                const apiUrl = 'https://is.gd/create.php?format=simple&url=' + encodeURIComponent(currentUrl);
                
                const response = await fetch(apiUrl);
                const shortUrl = await response.text();
                
                // 复制到剪贴板
                if (navigator.clipboard) {
                  await navigator.clipboard.writeText(shortUrl);
                  shareBtn.textContent = '✅ 已复制!';
                  setTimeout(() => {
                    shareBtn.textContent = '📋 复制短链接';
                  }, 2000);
                } else {
                  // 备用方案
                  const textArea = document.createElement('textarea');
                  textArea.value = shortUrl;
                  document.body.appendChild(textArea);
                  textArea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textArea);
                  shareBtn.textContent = '✅ 已复制!';
                  setTimeout(() => {
                    shareBtn.textContent = '📋 复制短链接';
                  }, 2000);
                }
              } catch (error) {
                console.error('生成短链接失败:', error);
                shareBtn.textContent = '❌ 失败';
                setTimeout(() => {
                  shareBtn.textContent = '📋 复制短链接';
                }, 2000);
              }
            });
          });
        `
      }} />
      <style dangerouslySetInnerHTML={{
        __html: `
          .share-button {
            margin: 1rem 0;
          }
          
          #share-btn {
            background: #007acc;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
          }
          
          #share-btn:hover {
            background: #005a9e;
          }
          
          #share-btn:active {
            transform: translateY(1px);
          }
        `
      }} />
    </div>
  )
}

ShareButton.displayName = "ShareButton"
export default (() => ShareButton) satisfies QuartzComponentConstructor