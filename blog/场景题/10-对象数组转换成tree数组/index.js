const entries = [{
      "province": "浙江", "city": "杭州", "name": "西湖"
  }, {
      "province": "四川", "city": "成都", "name": "锦里"
  }, {
      "province": "四川", "city": "成都", "name": "方所"
  }, {
      "province": "四川", "city": "阿坝", "name": "九寨沟"
  }];

  const level = ["province", "city", "name"];

  // result 得到树状结构的对象

  function transform(list, level) {
    const res = []
    list.forEach(item => {
      pushItem(res, item, 0)
    })
    function pushItem(arr, obj, i) {
      
    }
    return res
  }

  console.log(transform(entries, level))

