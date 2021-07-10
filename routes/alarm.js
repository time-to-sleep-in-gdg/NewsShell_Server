let express = require('express');
let router = express.Router();
let async = require('async');
let mybatisMapper = require('../common/mybatis').mybatisMapper;

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

 router.route('/').get(function (req, res, next) {
  let user_id = (req.query.userId !== undefined) ? req.query.userId : -1;
  if (user_id == -1) {
    return res.status(200).json({
      "alarms": []
    });
  }

  if (user_id == 0) {
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
  }


  function getConnection(callback) {
    req.database.getConnection(function (err, connection) {
      if (err) {
        callback(err);
      } else {
        callback(null, connection);
      }
    });
  }

  function selAlarmList(connection, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'selAlarmList', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, alarmListResult) {
      connection.release();
      if (err) {
        callback(err);
      } else {
        callback(null, alarmListResult);
      }
    });
  }

  function resultJSON(alarmListResult, callback) {
    let result = {
      "alarms": alarmListResult
    };
    callback(null, result);
  }

  async.waterfall([getConnection, selAlarmList, resultJSON], function (err, result) {
    if (err) {
      let new_err = new Error('알람 목록 조회에 실패하였습니다');
      new_err.status = err.status;
      next(new_err);
    } else {
      res.json(result);
    }
  });
  
});

module.exports = router;
