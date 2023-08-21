<template>
  <div class="about">
    <cd-menu :list="menu_list" @callback="callbackMenu">
      <template v-slot:scope="slot">
        <div class="aaa" @click.stop="aaaa(slot.data)">{{ slot.data.label }}</div>
      </template>
    </cd-menu>
  </div>
</template>

<script>
export default {
  name: "name",
  components: {
      'cd-menu': () => import("./Menu.vue")
  },
  data(){
    return{
      menu_list: [
        {
          label: '1',
          id: 1,
          level: 1,
          children: [
            { label: '1-1', value: 11, level: 2 },
            { label: '1-2', value: 12, level: 2 },
            { 
              label: '1-3', 
              value: 13,
              level: 2,
              children: [
                { label: '1-3-1', value: 131, level: 3 },
                { label: '1-3-2', value: 132, level: 3 },
                { 
                  label: '1-3-4', 
                  value: 133,
                  level: 3,
                  children: [
                    { label: '1-3-4-1', value: 1341, level: 4 },
                    { label: '1-3-4-2', value: 1342, level: 4 },
                    { 
                      label: '1-3-4-4', 
                      value: 1343,
                      level: 4,
                      children: [
                        { label: '1-3-4-11', value: 13411, level: 5 },
                        { label: '1-3-4-21', value: 13421, level: 5 },
                        { label: '1-3-4-41', value: 13431, level: 5 }
                      ]
                    }
                  ]
                }
              ]
            },

          ]
        }
      ]
    }
  },
  methods: {
    aaaa(data){
      console.log(data)
    },
    callbackMenu(data){
      console.log(444, data.label, data)
      const is_children = data.children
      if(!is_children) {
        this.$set(data, 'children', [])
      }
      data.children.push({ label: '数据测试', value: 10000, level: data.level + 1 })
    }
  }
}
</script>

<style>
.aaa {
  color: red
}
</style>