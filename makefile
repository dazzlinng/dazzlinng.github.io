.PHONY: help serve build clean install check

# 默认目标
help:
	@echo "Academic-Pages 可用命令:"
	@echo ""
	@echo "  make serve    - 启动本地开发服务器 (http://localhost:4000)"
	@echo "  make build    - 构建网站到 _site 目录"
	@echo "  make clean    - 清理生成的文件"
	@echo "  make install  - 安装/更新依赖"
	@echo "  make check    - 检查环境配置"
	@echo ""

# 启动开发服务器
serve:
	@echo "🚀 启动 Jekyll 开发服务器..."
	@echo "📱 访问地址: http://localhost:4000"
	@echo "💡 按 Ctrl+C 停止服务器"
	@echo ""
	bundle exec jekyll serve -l -H localhost

# 构建网站
build:
	@echo "🔨 构建网站..."
	bundle exec jekyll build
	@echo "✅ 构建完成: _site/"

# 清理生成的文件
clean:
	@echo "🧹 清理生成的文件..."
	rm -rf _site .jekyll-cache .jekyll-metadata
	@echo "✅ 清理完成"

# 安装依赖
install:
	@echo "📦 安装依赖..."
	bundle install
	@echo "✅ 依赖安装完成"

# 检查环境
check:
	@echo "🔍 检查环境配置..."
	@echo ""
	@echo "Ruby 版本:"
	@ruby --version
	@echo ""
	@echo "Bundler 版本:"
	@bundle --version
	@echo ""
	@echo "Jekyll 版本:"
	@bundle exec jekyll --version
	@echo ""
	@echo "✅ 环境检查完成"