<template>
    <div id="app">
        <div class="main-con">
            <div class="form-view-con">
            <div class="main-view first-view" id="js-first-view">
                <div class="form-con">
                    <div class="form-con-content">
                        <Form v-bind:params="phoneParams" v-bind:key="phoneParams.key" v-on:form="onformHandle" v-show="is_phone"></Form>
                        <Form v-bind:params="emailParams" v-bind:key="emailParams.key" v-on:form="onformHandle" v-show="is_email"></Form>
                        <div class="tl">
                            <a href="javascript:void(0);" class="switchview-anchor anchor" v-on:click="onswitchClickHandle">{{ switch_title }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import Form from './components/Form.vue'
    export default {
        name: 'app',
        data: function(){
            return {
                phoneParams: {
                    key: 'phone',
                    title: '使用手机号登录',
                    inputGroups: [
                        {
                            name: 'phone',
                            label: '手机号',
                            value: '',
                            required: true,
                            placeholder: '请输入手机号',
                            verifys:[
                                {
                                    name: 'isnum',
                                    text: '请输入正确的手机号'
                                }
                            ]
                        },{
                            name: 'password',
                            label: '密码',
                            type: 'password',
                            value: '',
                            required: true,
                            error_tip: ''
                        }
                    ],
                    btn_tip: '',
                    btn_title: '登录'
                },
                emailParams: {
                    key: 'email',
                    title: '使用邮箱登录',
                    inputGroups: [
                        {
                            name: 'email',
                            label: '邮箱',
                            value: '',
                            required: true,
                            placeholder: '请输入邮箱',
                            verifys:[
                                {
                                    name: 'ismail',
                                    text: '请输入正确的邮箱'
                                }
                            ]
                        },{
                            name: 'password',
                            label: '密码',
                            type: 'password',
                            value: '',
                            required: true,
                            error_tip: ''
                        }
                    ],
                    btn_tip: '',
                    btn_title: '登录'
                },
                cur_key: 'phone',
                switch_title: '使用邮箱登录'
            }
        },
        components: {
            Form
        },
        computed: {
            is_phone: function(){
                return this.cur_key == this.phoneParams.key
            },
            is_email: function(){
                return this.cur_key == this.emailParams.key
            }
        },
        methods:{
            onformHandle: function(data){
                alert('doSomething');
                console.log(data)
            },
            onswitchClickHandle: function(){
                var key, text
                if(this.cur_key == this.phoneParams.key){
                    key = this.emailParams.key
                    text = this.phoneParams.title
                }else{
                    key = this.phoneParams.key
                    text = this.emailParams.title
                }
                this.cur_key = key
                this.switch_title = text
            }
        }
    }
</script>

<style lang="less">
    @import "./less/common/common.less";
    @import "./less/common/function.less";
    @import "./less/common/animation.less";
    @import "./less/common/reset.less";
    @import "./less/common/international.less";
    .main-con{
        .widthHeight(100%, 780px);
        background: url('./assets/bg.png') center center no-repeat;
        position: relative;
    }
</style>