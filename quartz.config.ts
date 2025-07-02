import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import fs from "fs"
const alibabaFont = fs.readFileSync("./quartz/static/AlibabaPuHuiTi-3-55-Regular.ttf")

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "MitsukiJoe's Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "jojuniori.github.io/quartz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        parseTags: true,
        parseArrows: true,
        parseBlockReferences: true,
        enableInHtmlEmbed: false,
        enableYouTubeEmbed: false,
        enableVideoEmbed: false,
        enableCheckbox: false,
        enableSoftLineBreaks: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({
        // 3. 传入字体配置
        fonts: [
          {
            name: "Alibaba PuHuiTi", // 在 CSS 中使用的字体名称
            data: alibabaFont,       // 读取到的字体文件数据
            weight: 400,
            style: "normal",
          },
        ],
        // 4. 修改 OG 图片的 React 组件
        Component: (props) => (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // 使用你配置的亮色主题
              backgroundColor: "#faf8f8",
              color: "#2b2b2b",
              // 直接使用上面定义的字体名称
              fontFamily: '"Alibaba PuHuiTi"',
            }}
          >
            <h1 style={{ fontSize: "60px", fontWeight: 500, marginBottom: "20px", textAlign: 'center', padding: '0 40px' }}>
              {props.title}
            </h1>
            <p style={{ fontSize: "28px", margin: 0, textAlign: 'center', padding: '0 40px', color: '#4e4e4e' }}>
              {props.description}
            </p>
            <p style={{ position: 'absolute', bottom: '40px', fontSize: '24px', color: '#b8b8b8' }}>
              {props.options.configuration.pageTitle}
            </p>
          </div>
        ),
      }),
    ],
  },
}

export default config
