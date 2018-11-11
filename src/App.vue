<template>
    <div id="app">
        <div class="main-con tc">
            <img alt="Vue logo" src="./assets/logo.png">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    export default {
        name: 'app',
        components: {
            HelloWorld
        }
    }
</script>

<style lang="less">
    @import './less/app.module.less';
</style>