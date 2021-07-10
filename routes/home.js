let express = require('express');
let router = express.Router();
let async = require('async');
let mybatisMapper = require('../common/mybatis').mybatisMapper;

/* GET home page. */
/**
 * @swagger
 *  /home:
 *    get:
 *      tags:
 *      - home
 *      description: 메인 홈. 알람 수, 카테고리 리스트, 키워드 리스트 조회
 *      parameters:
 *        - in: query
 *          name: userId
 *          required: false
 *          schema:
 *            type : integer
 *            description: 유저 ID
 *      responses:
 *       200:
 *        description: 메인 홈 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Home'
 */

router.route('/').get(function (req, res, next) {
  let user_id = (req.query.userId !== undefined) ? req.query.userId : -1;

  if (user_id == 0) {
    return res.status(200).json({
      "user_nickname" : "tester_a",
      "alarm_cnt": 4,
      "categorys": [{
        "category_id": 1,
        "category_name": "TOP10"
      }, {
        "category_id": 2,
        "category_name": "경제"
      }, {
        "category_id": 3,
        "category_name": "사회"
      }],
      "keywords": [{
        "category_id": 3,
        "category_name": "사회",
        "keyword_id": 1,
        "keyword_name": "택배 파업",
        "is_follow": true,
        "follow_cnt": 20,
        "follow_user_profiles": [
          "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png",
          "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png",
          "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        ],
        "view_cnt": 45,
        "comment_cnt": 23
      }, {
        "category_id": 2,
        "category_name": "경제",
        "keyword_id": 2,
        "keyword_name": "3기 신도시 청약",
        "is_follow": false,
        "follow_cnt": 15,
        "follow_user_profiles": [
          "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png",
          "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png",
          "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        ],
        "view_cnt": 45,
        "comment_cnt": 23
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

  function selHomeUserInfo(connection, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'selHomeUserInfo', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, homeUserInfo) {
      if (err) {
        connection.release();
        callback(err);
      } else {
        callback(null, connection, homeUserInfo);
      }
    });
  }

  function selHomeCategoryList(connection, homeUserInfo, callback) {
    let param;
    let query;
    try {
      param = {
      };
      query = mybatisMapper.getStatement('apiMapper', 'selHomeCategoryList', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, homeCategoryList) {
      if (err) {
        connection.release();
        callback(err);
      } else {
        callback(null, connection, homeUserInfo, homeCategoryList);
      }
    });
  }

  function selHomeKeywordList(connection, homeUserInfo, homeCategoryList, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'selHomeKeywordList', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, homeKeywordList) {
      connection.release();
      if (err) {
        callback(err);
      } else {
        callback(null, homeUserInfo, homeCategoryList, homeKeywordList);
      }
    });
  }

  function resultJSON(homeUserInfo, homeCategoryList, homeKeywordList, callback) {
    let result = {
      "user_nickname" : homeUserInfo[0].user_nickname,
      "alarm_cnt": homeUserInfo[0].alarm_cnt,
      "categorys": homeCategoryList,
      "keywords": homeKeywordList.map(function(i){
        return {
          "category_id": i.category_id,
          "category_name": i.category_name,
          "keyword_id": i.keyword_id,
          "keyword_name": i.keyword_name,
          "is_follow": Boolean(i.is_follow),
          "follow_cnt": i.follow_cnt,
          "follow_user_profiles": i.follow_user_profiles.split(";", 3),
          "view_cnt": parseInt(i.view_cnt),
          "comment_cnt": parseInt(i.comment_cnt)
        }
      })
    };
    callback(null, result);
  }

  async.waterfall([getConnection, selHomeUserInfo, selHomeCategoryList, selHomeKeywordList, resultJSON], function (err, result) {
    if (err) {
      let new_err = new Error('키워드 조회에 실패하였습니다');
      new_err.status = err.status;
      next(new_err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
