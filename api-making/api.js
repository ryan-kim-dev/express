const express = require('express');
const app = express();
const uuidAPIKey = require('uuid-apikey');
const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

// console.log(uuidAPIKey.create());
const key = {
  apiKey: 'Y5VW9EX-WXFMMAE-PMX670A-RYM2PS1',
  uuid: 'f177c4bb-e75f-4a29-b53a-6381c7a82b64',
};

app.get('/api/users/:apikey/:type', async (req, res) => {
  let { apikey, type } = req.params;
  if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
    res.send('올바르지 않은 api 키 입니다.');
  } else {
    if (type === 'seoul') {
      let data = [
        { name: '김철수', city: 'seoul' },
        { name: '이철수', city: 'seoul' },
      ];
      res.send(data);
    } else if (type === 'jeju') {
      let data = [
        { name: '이동근', city: 'jeju' },
        { name: '박동근', city: 'jeju' },
      ];
      res.send(data);
    } else {
      res.send('해당 도시의 사용자 정보가 없습니다.');
    }
  }
});

app.get('/api/sales/:apikey/:year', async (req, res) => {
  let { apikey, year } = req.params;
  if (!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
    res.send('올바르지 않은 api 키 입니다.');
  } else {
    if (year === '2021') {
      let data = [
        { product: 'car', amount: 204020 },
        { product: 'notebook', amount: 12520 },
      ];
      res.send(data);
    } else if (year === '2022') {
      let data = [
        { product: 'car', amount: 432520 },
        { product: 'notebook', amount: 7689520 },
      ];
      res.send(data);
    } else {
      res.send('해당 연도의 매출 정보가 없습니다.');
    }
  }
});
