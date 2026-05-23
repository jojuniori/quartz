---
{"publish":true,"created":"2026-05-23","tags":["clippings","Windows11","系统优化","ViVeTool","LowLatencyProfile"],"cssclasses":""}
---


# Win11-低延迟配置提升响应速度

![[知识/系统/_assets/win11-low-latency-profile/cover.jpg]]

## 一句话总结

Windows 11 正在测试 **Low Latency Profile**：在打开应用、开始菜单、右键菜单等交互发生时，短时间提高 CPU 响应，让界面更快给反馈。代价是交互后的几秒内 CPU 频率和功耗会更积极一些。

## 核心信息

| 项目 | 内容 |
| --- | --- |
| 功能名 | Low Latency Profile |
| 作用 | 提升系统交互响应速度，减少 UI 延迟 |
| Feature ID | `60716524`、`61391826` |
| 工具 | ViVeTool 或 ViVeTool GUI |
| 适用范围 | 文章提到至少需要 Windows 11 Insider Beta；24H2 / 25H2 后续预览版更可能具备 |
| 主要代价 | 交互时短时间更积极地拉高 CPU 频率 |

## 适用前提

原文提到至少需要 Windows 11 预览体验计划的 **Beta** 频道。

![[知识/系统/_assets/win11-low-latency-profile/beta-channel.avif]]

如果是 **Windows 11 Enterprise LTSC 2024**，它基于 24H2 / Build 26100，理论上可以尝试，但关键看系统 build 是否已经包含这两个 Feature ID。判断方式：

```powershell
winver
```

如果是 `Windows 11 Enterprise LTSC 2024` 且 OS Build 为 `26100.x`，属于可尝试范围；build 太旧时，ViVeTool 可能查不到或启用后无效果。

## 启用方法

### 方法一：ViVeTool 命令行

用管理员权限打开 PowerShell 或 Windows Terminal，进入 ViVeTool 所在目录后执行：

```powershell
vivetool /enable /id:60716524,61391826
```

然后重启系统。

### 方法二：ViVeTool GUI

也可以用图形界面工具，分别输入 Feature ID：

- `60716524`
- `61391826`

![[知识/系统/_assets/win11-low-latency-profile/vivetool-gui.avif]]

## 查询与回滚

启用前可以先查询 Feature 是否存在：

```powershell
vivetool /query /id:60716524
vivetool /query /id:61391826
```

如果启用后感觉功耗、温度或稳定性不满意，可以回滚：

```powershell
vivetool /disable /id:60716524,61391826
```

回滚后同样建议重启。

## 演示视频

![[知识/系统/_assets/win11-low-latency-profile/demo.mp4]]

## 为什么它会更流畅

这个功能的思路不是让 CPU 长时间满血运行，而是在用户交互的短窗口里临时提高响应优先级和 CPU 频率，让应用启动、菜单弹出、右键菜单等操作更快完成。

![[知识/系统/_assets/win11-low-latency-profile/scott-hanselman.avif]]

Scott Hanselman 的观点是：现代操作系统本来就会做类似事情，包括 macOS 和 Linux。系统为了降低交互延迟，临时提升 CPU 速度、优先处理交互任务，并不算“作弊”。

## 我的判断

- 桌面台式机、插电笔记本：值得尝试，尤其是对开始菜单、右键菜单、应用启动延迟敏感时。
- 轻薄本电池模式：谨慎测试，观察温度、风扇和续航变化。
- 工作机 / 生产环境：先确认可回滚，再开启；最好记录当前 build 和启用前状态。
- LTSC：不是天然不能用，关键取决于 build 是否包含对应 Feature ID。

## 操作清单

- [ ] 运行 `winver` 记录系统版本和 OS Build。
- [ ] 下载 ViVeTool：`https://github.com/thebookisclosed/ViVe/releases`。
- [ ] 查询 `60716524`、`61391826` 是否存在。
- [ ] 管理员执行启用命令。
- [ ] 重启后观察开始菜单、右键菜单、应用启动速度。
- [ ] 若不满意，执行 disable 命令回滚。

## 备注

- 原文发布于 2026-05-12，整理于 2026-05-23。
- 媒体文件已保存到本地 vault：`知识/系统/_assets/win11-low-latency-profile/`。
- 这篇是操作整理笔记，不是全文转载；功能状态以当前 Windows build 和 ViVeTool 查询结果为准。
