const search = {
    search_item: [
        { 
          type:"select", 
          label: "订单编号：", 
          prop: 'a', 
          col: 6,
          options: [
            { label: 11, value: 1 },
            { label: 22, value: 2 },
          ]
        },
        { type:"input", label: "客户姓名：", prop: 'b', col: 6 },
        { type:"date", label: "签约公司：", prop: 'c', col: 6 },
        { type:"select", label: "签约人：", prop: 'd', col: 6 },
        { type:"select", label: "资源转化人：", prop: 'e', col: 6 },
        { type:"select", label: "渠道开发人：", prop: 'f', col: 6 },
        { type:"select", label: "资源提供人：", prop: 'g', col: 6 },
        { type:"select", label: "学服：", prop: 'h', col: 6 },
        { type:"select", label: "订单来源：", prop: 'i', col: 6 },
        { type:"select", label: "渠道来源：", prop: 'j', col: 6 },
        { type:"select", label: "归属项目：", prop: 'k', col: 6 },
        { type:"select", label: "课程名称：", prop: 'l', col: 6 },
        { type:"select", label: "创建日期：", prop: 'm', col: 6 },
        { type:"select", label: "付款人姓名：", prop: 'n', col: 6 },
        { type:"select", label: "签约日期：", prop: 'o', col: 6 },
        { type:"select", label: "缴费日期：", prop: 'p', col: 6 },
        { type:"select", label: "审批状态：", prop: 'q', col: 6 },
      ],
      search_field: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
        p: '',
        q: ''
    }
}

export default search