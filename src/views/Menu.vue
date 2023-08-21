<template>
    <ul v-if="list && list.length > 0" class="menu-list">
        <li v-for="item in list" :key="item.id" @click.stop="changeMenu(item)">
            <div class="name">
                <h4 :style="{'padding-left': item.level * 10 + 'px'}">{{ item.label }}</h4>
                <slot name="scope" :data="item"></slot>
            </div>
            <template v-if="item.children && item.children.length > 0">
                <cd-menu :list="item.children" @callback="changeMenu">
                    <template v-slot:scope="slot">
                        <slot name="scope" :data="slot.data"></slot>
                    </template>
                </cd-menu>
            </template>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Menu",
    components: {
        'cd-menu': () => import("./Menu.vue")
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {}
    },
    methods: {
        changeMenu(data){
            this.$emit("callback", data)
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}
.menu-list {
   li {
       list-style: none;
   }
}
.name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background-color: #ccc;
    }
    > h4 {
        width: 100px;
        -webkit-box-sizing: border-box;
        height: 24px;
        overflow: hidden;
    }
}
</style>