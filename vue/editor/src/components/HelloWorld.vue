<template lang="html">
    <div class="">
        <editor
        :content="content"
        :path="path"
        v-model="result"></editor>
        <input type="button" name="name" value="submit" @click="submit">
        <div v-html="result"></div>
    </div>
</template>

<script>
import Editor from './Editor'
export default {
    data() {
        return {
            // input content to editor
            content: '',
            // output content from editor
            result: '',
            // set image upload api url
            
            //path: '/api/v1/help/upload/wangEditorH5File'
            path: 'http://192.168.103.79:8088/api/image/upload?type=1&token=Ks8h_PqrytbpAn5qaQ49A7iRBH-8tgFN'
        }
    },
    methods: {
        submit() {
            console.log(this.result)
        }
    },
    components: {
        'editor': Editor
    }
}
</script>

<style lang="css">
</style>