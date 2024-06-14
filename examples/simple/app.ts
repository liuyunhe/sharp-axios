import axios from '../../src/index'

axios({
  method: 'get',
  url: '/api/simple/get',
  data: {
    a: 1,
    b: 2
  },
}).then((res) => {
  console.log(res.data)
})
