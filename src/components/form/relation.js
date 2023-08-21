export function relationHidden(params = {}){
    const hidden_obj = params.config.relation_hidden
    // 是否存在被控制的对象
    const relation_hidden = hidden_obj && Array.isArray(hidden_obj) && hidden_obj.length > 0
    if(!relation_hidden) {
        return false
    }
    // 处理交互
    hidden_obj.forEach(item => {
        params.hidden[item.key] = item.value[params.value]
    })
}

export function relationDisabled(params = {}){
    const disabled_obj = params.config.relation_disabled
    // 是否存在被控制的对象
    const relation_disabled = disabled_obj && Array.isArray(disabled_obj) && disabled_obj.length > 0
    if(!relation_disabled) {
        return false
    }
    // 处理交互
    disabled_obj.forEach(item => {
        console.log(item.value)
        params.disabled[item.key] = item.value[params.value]
    })
}