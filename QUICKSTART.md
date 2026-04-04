# Carousel Grids - 快速开始

## 安装步骤

1. 修改 composer.json 中的 vendor 名称（替换 `your-vendor`）
2. 安装依赖并编译：

```bash
cd flarum-ext-carousel-grids
npm install
npm run build
```

3. 将插件复制到 Flarum 的 extensions 目录
4. 在 Flarum 后台启用插件

## 使用说明

1. 进入后台 → Extensions → Carousel Grids
2. 设置每行显示的列数（1-6）
3. 点击"添加项目"创建 grid
4. 填写信息：
   - 标题（必填）
   - 简介（必填）
   - 背景图片 URL（必填）
   - Logo URL（可选）
   - 链接 URL（可选）
   - Logo 位置（顶部/左侧）
5. 拖拽项目可调整顺序
6. 前台首页会自动显示轮播效果（3秒切换）

## 功能特性

- ✅ 响应式设计（移动端自动单列）
- ✅ 拖拽排序
- ✅ 自动轮播（3秒）
- ✅ 背景图 + Logo 组合
- ✅ 点击跳转新窗口
- ✅ 中英文界面

## 文件结构

```
flarum-ext-carousel-grids/
├── js/src/
│   ├── admin/
│   │   ├── index.js
│   │   └── components/
│   │       ├── CarouselGridsPage.js
│   │       └── CarouselGridEditModal.js
│   └── forum/
│       ├── index.js
│       └── components/
│           └── CarouselGrids.js
├── resources/
│   ├── less/
│   │   ├── admin.less
│   │   └── forum.less
│   └── locale/
│       ├── en.yml
│       └── zh-CN.yml
├── composer.json
├── extend.php
└── package.json
```
