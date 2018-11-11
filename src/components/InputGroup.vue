<template>
	<div class="input-group">
        <label v-bind:for="name" class="label">{{ label }}</label>
        <div class="input-con clearfix">
            <input v-bind:type="type" v-bind:name="name" v-bind:required="required" class="input" v-bind:placeholder="placeholder" v-bind:value="value" v-on:input="oninputHandle" autocomplete="off">
            <div class="input-bottom"></div>
            <a href="javascript:void(0);" class="delete fr" v-show="delete_show"></a>
        </div>
        <p class="tip" v-show="error_tip_show">{{ error_tip_show }}</p>
    </div>
</template>

<script>
    export default {
		name: 'InputGroup',
	    props: {
	    	name: String,
	    	label: String,
	    	value: {
	    		type: String, 
	    		default: ''
	    	},
	    	type: {
	    		type: String,
	    		default: 'text'
	    	},
	    	required: {
	    		type: Boolean,
	    		default: false
	    	},
	    	placeholder: {
	    		type: String,
	    		default: ''
	    	},
	    	error_tip: {
	    		type: String,
	    		default: ''
	    	}
	    },
	    computed: {//计算属性
			delete_show: function(){
				return !!this.value
			},
			error_tip_show: function(){
				if(this.value){
					return ''
				}else{
					return this.error_tip
				}
			}
		},
		methods: {
			oninputHandle: function(event){
				this.$emit('input', event.target.value)
			}
		}
	}
</script>

<style lang="less">
	@import "../less/common/common.less";
	@import "../less/common/function.less";
	@import "../less/common/animation.less";
    .input-group{
		margin-bottom: 20px;
		.tl;
		.label{
			font-size: 13px;
			color: rgba(255, 255, 255, 0.6);
		}
		.input-con{
			position: relative;
			.Lheight(40px);
			z-index: 1;
			.input{
				box-sizing: border-box;
				&.smaller{
					padding-right: 80px;
				}
				position: absolute;
				left: 0;
				top: 0;
				.widthHeight;
				font-size: 18px;
				color: #fff;
				.placeholder-color(rgba(255, 255, 255, 0.3));
				box-shadow: none;
				&[readonly]{
					border-bottom: 1px solid rgba(255, 255, 255, 0.2);
				}
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
				  -webkit-appearance: none;
				}
				&[type="number"]{
				  -moz-appearance: textfield;
				}
			}
			.input + .input-bottom{
				position: absolute;
				left: 0;
				bottom: 0;
				height: 1px;
				width: @primary;
				background-color: rgba(255, 255, 255, 0.2);
			}
			.input:focus + .input-bottom{
				background-color: #ea9232;
				.linear-gradient(-90deg, #8f510d 0%, #ea9232 100%);
			}
		}
		.delete{
			display: none !important;
			position: relative;
			z-index: 2;
			cursor: pointer;
			display: inline-block;
			.widthHeight(15px, 20px);
			background: url('../assets/common/delete.png') center center no-repeat;
			margin-top: 10px;
			&:focus{
				outline: 1px dashed rgba(255,255, 255, 0.4);
			}
		}
		.switchtype-anchor{
			position: relative;
			z-index: 2;
			cursor: pointer;
			display: inline-block;
			.widthHeight(20px, 40px);
			margin-left: 20px;
			background: url('../assets/common/switch_close.png') center center no-repeat;
			&.open{
				background: url('../assets/common/switch_open.png') center center no-repeat;
			}
		}
		.sendcode-btn{
			position: relative;
			z-index: 2;
			margin-left: 15px;
			font-size: 13px;
			color: rgba(255, 255, 255, 0.6);
			cursor: default;
			&.enable{
				color: #fff;
				cursor: pointer;
				&:link, &:visited, &:hover, &:active{
					color: #fff;
				}
			}
			&.loading{
				cursor: default;
				color: rgba(255, 255, 255, 0.6);
				&:link, &:visited, &:hover, &:active{
					color: rgba(255, 255, 255, 0.6);
				}
			}
		}
		.phone-country{
			width: 45px;
			height: 24px;
			line-height: 24px;
			margin-top: 8px;
			background-color: #fff;
			.border-radius(2px);
			.tc;
			position: relative;
			z-index: 2;
			.select-header{
				font-size: 13px;
				color: #ea9232;
			}
			.select-list{
				top: calc(100% + 5px);
				width: 180px;
				background-color: #fff;
				.border-radius(2px);
				.item{
					color: #19162c;
					&:hover, &.selected{
						color: #ea9232;
					}
				}
			}
			&::after{
				content: '';
				display: inline-block;
				.widthHeight(1px, 16px);
				background-color: rgba(255, 255, 255, 0.2);
				position: absolute;
				top: 50%;
				margin-top: -8px;
				right: -6px;
			}
		}
		.phone-input{
			padding-left: 56px;
		}
		.tip{
			margin-top: 5px;
			font-size: 12px;
			color: #ff1f1f;
		}
	}
</style>