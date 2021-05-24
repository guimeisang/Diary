var axios = require('axios');
let params = {
  index: 0
}
var config = {
  method: 'get',
  url: 'http://0.0.0.0:8989/api',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params,
};

let queueSize = 20

for(var i = 0; i < queueSize; i++) {
  ((i) => {axios({
    ...config,
    params: {
      index: i
    }
  })
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  })})(i)
}