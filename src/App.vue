<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="我的商城">
			<span slot="left" @click="goBack" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

    <!-- 中间的 路由 router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>

    <!-- 底部的Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-wsc" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-wsc" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-wsc" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-wsc" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				flag: false
			}
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			}
		},
		created () {
			this.flag = this.$route.path === '/home'? false : true
		},

		watch: {
			// 此处不能用箭头函数
			"$route.path": function(newVal) {
				if (newVal ===  "/home") {
					this.flag = false
				}else {
					this.flag = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 让顶部栏的优先级高一些，防止下面的列表遮挡住
	.mint-header {
		z-index: 99;
	}
  .app-container {
    padding-top: 30px;
		padding-bottom: 50px;
		overflow-x: hidden;
		position: relative;
  }

	.v-enter {
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
		// top: 30px;
	}
	.v-enter-active,
	.v-leave-active {
		transition: all .5s ease;
	}

	// 改类名解决 tabbar 类名无法切换的问题
	.mui-bar-tab .mui-tab-item-wsc.mui-active {
    color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-wsc {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
	}

	.mui-bar-tab .mui-tab-item-wsc .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
	}
.mui-bar-tab .mui-tab-item-wsc .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
	}
</style>
