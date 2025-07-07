import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ShareButton: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`share-button ${displayClass ?? ""}`}>
      <button id="share-btn" type="button">
        📋 复制短链接
      </button>
    </div>
  )
}

ShareButton.displayName = "ShareButton"
export default (() => ShareButton) satisfies QuartzComponentConstructor