var express = require('express');
var router = express.Router();

/* GET home page. */
/**
 * @swagger
 *  /alarm:
 *    get:
 *      tags:
 *      - alarm
 *      description: 알람 조회
 *      parameters:
 *        - in: query
 *          name: userId
 *          required: false
 *          schema:
 *            type : integer
 *            description: 유저 ID
 *      responses:
 *       200:
 *        description: 알람 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Alarm'
 */

router.get('/', function(req, res) {
  let user_id = (req.query.userId !== undefined) ? req.query.userId : -1;
  if (user_id == -1) {
    return res.status(200).json({
      "alarms": []
    });
  }

  return res.status(200).json({
    "alarms": [{
      "type": "keyword",
      "title": "키워드에 새소식이 도착했어요",
      "message":"따끈따끈한 새소식이 도착했어요",
      "create_datetime": "2021-07-10 14:00:00"
    }, {
      "type": "realtime",
      "title": "업데이트된 실시간 키워드를 확인하세요",
      "message":"다양한 키워드가 00님을 기다리고 있어요",
      "create_datetime": "2021-07-10 11:00:00"
    }, {
      "type": "hot",
      "title": "핫플로 등극한 북마크가 있어요!",
      "message":"북마크를 확인해보세요",
      "create_datetime": "2021-07-10 09:00:00"
    }]
  });
});

module.exports = router;
