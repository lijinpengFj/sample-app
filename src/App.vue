<template>
    <div id="app">
        <div class="main-con">
            <InputGroup name="phone" label="手机号" v-bind:required="status" placeholder="请输入手机号" error_tip="出错了" v-model="value"></InputGroup>
            <p>{{ value }}</p>
        </div>
    </div>
</template>

<script>
    import InputGroup from './components/InputGroup.vue'
    export default {
        name: 'app',
        data: function(){
            return {
                status: true,
                value: 'text'
            }
        },
        components: {
            InputGroup
        }
    }
</script>

<style lang="less">
    @import './less/app.module.less';
</style>