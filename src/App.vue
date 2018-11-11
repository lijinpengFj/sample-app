<template>
    <div id="app">
        <div class="main-con">
            <Form v-bind:params="formParams" v-on:form="onformHandle"></Form>
        </div>
    </div>
</template>

<script>
    import Form from './components/Form.vue'
    export default {
        name: 'app',
        data: function(){
            return {
                formParams: {
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
                            value: '123',
                            required: true,
                            error_tip: 'hei'
                        }
                    ],
                    btn_tip: '',
                    btn_title: '登录'
                }
            }
        },
        components: {
            Form
        },
        methods:{
            onformHandle: function(data){
                console.log(data)
            }
        }
    }
</script>

<style lang="less">
    @import './less/app.module.less';
</style>