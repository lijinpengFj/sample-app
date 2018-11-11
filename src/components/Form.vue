<template>
	<div class="content-item phone-view form-view" v-bind:key="params.key">
		<h2 class="form-view-title">{{ params.title }}</h2>
		<template v-for="item in inputItemGroups">
			<InputGroup
				v-bind:name="item.name"
				v-bind:label="item.label"
				v-model="item.value"
				v-bind:type="item.type"
				v-bind:required="item.required"
				v-bind:placeholder="item.placeholder"
				v-bind:error_tip="item.error_tip"
				v-bind:key="item.name"
			></InputGroup>
		</template>
		<div class="btn-con">
			<p class="btn-tip" v-show="params.btn_tip">{{ params.btn_tip }}</p>
			<button type="button" class="btn-full" v-on:click="onclickHandle" v-bind:class="{ enable: is_filled }">{{ params.btn_title }}</button>
		</div>
	</div>
	</div>
</template>

<script>
	import InputGroup from './InputGroup.vue'
	import verifys_factories from '../utils/verifys.js'
	export default {
		name: 'Form',
		props: ['params'],
		data: function(){
			return {
				inputItemGroups: this.params.inputGroups.slice()
			}
		},
		components: {
			InputGroup
		},
		computed: {
			is_filled: function(){//表单是否都已经填充了, required 为 false 的情况认定为已填充
				return !(this.inputItemGroups.some((item, index) => {
					if(item.required && !item.value){
						return true//有一个返回 true 循环结束
					}else{
						return false//所有都返回 false 循环结束
					}
				}))
			},
		},
		methods: {
			onclickHandle: function(){
				//先判断填充
				if(this.is_filled){
					//再判断有效性
					if(this.valid()){
						//业务逻辑，交给外部来做处理
						this.$emit('form', {
							head: 'submit',
							//组合数据
							data: this.combineData()
						})
					}
				}
			},
			/**
			 * 验证表单
			 * @return {Boolean}
			 */
			valid: function(){
				return !(this.inputItemGroups.some((groupItem, index) => {
					let verifys = groupItem.verifys || []
					return verifys.some((verifysItem) => {
						//单条的数据格式类似 { name: 'Fn', args: [12, 13],/*args 参数为非必填，顺序参照对应验证函数的实现（除了第一个参数以外的剩余参数）*/ text: '输入值大小有限制' }
						let itemName = verifysItem.name
	    				let itemText = verifysItem.text || ''
	    				let itemArgs = verifysItem.args
	    				let args = [itemName, groupItem.value]
	    				if(itemArgs){//拼装验证函数的参数
	    					args = args.concat(itemArgs)
	    				}
	    				if(!verifys_factories.apply(this, args)){
	    					// this.$set(groupItem, 'error_tip', itemText) 如果单独只更新 error_tip 必须调用 set 方法，存疑
	    					groupItem.error_tip = itemText
	    					groupItem.value = ''
	    					return true
	    				}else{
	    					return false
	    				}
					})
				}))
			},
			combineData: function(){
				var data = {
					js_form_key: this.params.key//传递到外部做 Form 的唯一标识
				};
				this.inputItemGroups.forEach((groupItem, index) => {
					let groupItemName = groupItem.name
					let groupItemValue = groupItem.value
					if(!(groupItemName in data)){
						data[groupItemName] = groupItemValue
					}else{
						//考虑数组的情况
						if(!data[groupItemName].push){
							//还没有变成数组
							data[groupItemName] = [data[groupItemName]]
						}
						data[groupItemName].push(groupItemValue)
					}
				})
				return data
			}
		}
	}
</script>

<style lang="less">
	@import "../less/common/common.less";
	@import "../less/common/function.less";
	@import "../less/common/animation.less";
	@import "../less/ui/btn.less";
	@import "../less/ui/anchor.less";
	.form-view-con{
		.widthHeight(384px, 780px);
		position: relative;
		.auto;
		.main-view{
			height: @primary;
			box-sizing: border-box;
			padding: 0 25px;
			padding-top: 160px;
			&.first-view{
				&.hide{
					display: none;
				}
			}
			&.second-view.hide{
				display: none;
			}
		}
		.form-con-content{
			.tc;
			position: relative;
		}
		.switchview-anchor, .switchview-anchor:link, .switchview-anchor:visited, .switchview-anchor:hover, .switchview-anchor:active{
			color:#ea9232;
			font-size: 16px;
		}
		.btn-con{
			margin-top: 30px;
			margin-bottom: 20px;
			position: relative;
			.btn-full{
				.widthHeight(335px, 40px);
				line-height: 40px;
				.tc;
				font-size: 16px;
			}
			.btn-tip{
				width: @primary;
				font-size: 12px;
				color: #ff1f1f;
				.tc;
				position: absolute;
				left: 0;
				bottom: calc(100% + 6px);
			}
		}
		.go-otherpage-group{
			font-size: 15px;
			color: #fff;
			.anchor{
				font-size: 15px;
			}
		}
		.form-tips{
			margin-top: -10px;
			font-size: 12px;
			color: rgba(255, 255, 255, 0.6);
		}
		.form-footer{
			position: absolute;
			width: @primary;
			left: 0;
			bottom: 60px;
			.tc;
			.form-footer-item{
				margin-top: 10px;
				font-size: 12px;
				color: rgba(255,255,255, 0.6);
				.anchor{
					font-size: 12px;
				}
			}
		}
		.form-view{
			&.hide{
				display: none;
			}
			.form-view-title{
				font-size: 29px;
				color: #fff;
				margin-bottom: 36px;
				font-weight: normal;
				.sub-title{
					font-size: 12px;
					color: rgba(255, 255, 255, 0.6);
				}
			}
		}
	}
</style>