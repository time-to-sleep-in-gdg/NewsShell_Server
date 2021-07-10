let express = require('express');
let router = express.Router();
let async = require('async');
let mybatisMapper = require('../common/mybatis').mybatisMapper;

/* GET home page. */
/**
 * @swagger
 *  /keyword/{keywordId}:
 *    get:
 *      tags:
 *      - keyword
 *      description: 메인 키워드. 키워드 상세, 타임라인, 기사 목록 조회.
 *      parameters:
 *        - in: path
 *          name: keywordId
 *          required: true
 *          schema:
 *            type : integer
 *            description: 키워드 ID
 *        - in: query
 *          name: userId
 *          required: false
 *          schema:
 *            type : integer
 *            description: 유저 ID
 *      responses:
 *       200:
 *        description: 메인 키워드 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Keyword'
 */

router.route('/:keyword_id').get(function (req, res, next) {   //.get('/:keyword_id', function(req, res) {
  let keyword_id = parseInt(req.params.keyword_id);
  let user_id = (req.query.userId !== undefined) ? req.query.userId : -1;

  if (keyword_id == 0) {
    return res.status(200).json({
      "alarm_cnt": 4,
      "category_name": "경제",
      "keyword_id": 2,
      "keyword_name": "3기 신도시 청약",
      "last_updated_at": "2021-07-07 14:00:00",
      "is_follow": false,
      "follow_cnt": 15,
      "follow_user_profiles": [
        "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png",
        "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png",
        "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
      ],
      "timeline": {
        "new_article": {
          "article_id": 11,
          "article_title": "제목",
          "article_summary": "요약요약요약\n요약요약요약\n요약요약요약",
          "is_bookmark": false,
          "is_hot": false,
          "company": "경향 신문",
          "reporter_name": "홍길동",
          "create_datetime": "2021-07-07 14:00:00",
          "link": "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        },
        "articles": [{
          "article_id": 12,
          "article_title": "제목",
          "article_summary": "요약요약요약\n요약요약요약\n요약요약요약",
          "is_bookmark": false,
          "is_hot": false,
          "company": "경향 신문",
          "reporter_name": "홍길동",
          "create_datetime": "2021-07-06 14:00:00",
          "link": "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        }, {
          "article_id": 13,
          "article_title": "제목",
          "article_summary": "요약요약요약\n요약요약요약\n요약요약요약",
          "is_bookmark": false,
          "is_hot": false,
          "company": "경향 신문",
          "reporter_name": "홍길동",
          "create_datetime": "2021-07-05 14:00:00",
          "link": "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        }]
      },
      "graph": {
        "gender": {
          "female": 10,
          "male": 20
        },
        "age": {
          "age10": 0,
          "age20": 20,
          "age30": 10,
          "age40": 10,
          "age50": 34,
          "age60": 34
        },
        "reaction": {
          "like": 44,
          "hate": 33
        },
        "word_cloud_url": "http://drive.google.com/uc?export=view&id=1EJ_QsWTFRaEbm2PEiPh8jbEjlFefPRDR"
      }
    });
  }

  // FUNC
  function getConnection(callback) {
    req.database.getConnection(function (err, connection) {
      if (err) {
        callback(err);
      } else {
        callback(null, connection);
      }
    });
  }

  function selKeywordInfo(connection, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id,
        keyword_id: keyword_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'selKeywordInfo', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, keywordInfo) {
      if (err) {
        connection.release();
        callback(err);
      } else {
        callback(null, connection, keywordInfo);
      }
    });
  }

  function selTimelineList(connection, keywordInfo, callback) {
    let param;
    let query;
    try {
      param = {
        user_id: user_id,
        keyword_id: keyword_id
      };
      query = mybatisMapper.getStatement('apiMapper', 'selTimelineList', param, {language: 'sql', indent: '  '});

    } catch (err) {
      connection.release();
      callback(err);
    }

    connection.query(query, function (err, timelineList) {
      connection.release();
      if (err) {
        callback(err);
      } else {
        callback(null, keywordInfo, timelineList);
      }
    });
  }

  function resultJSON(keywordInfo, timelineList, callback) {
    let timelineListRe = timelineList.map(function(i){
      i.is_bookmark = Boolean(i.is_bookmark);
      i.is_hot = Boolean(i.is_hot);
      return i
    });
    let result = {
      "alarm_cnt": keywordInfo[0].alarm_cnt,
      "category_name": keywordInfo[0].category_name,
      "keyword_id": keywordInfo[0].keyword_id,
      "keyword_name": keywordInfo[0].keyword_name,
      "last_updated_at": keywordInfo[0].last_updated_at,
      "is_follow": Boolean(keywordInfo[0].is_follow),
      "follow_cnt": parseInt(keywordInfo[0].follow_cnt),
      "follow_user_profiles": keywordInfo[0].follow_user_profiles.split(";", 3),
      "timeline": {
        "new_article": timelineListRe[0],
        "articles": timelineListRe.slice(1)
      },
      "graph": {
        "gender": {
          "female": parseInt(keywordInfo[0].graph_gender_f),
          "male": parseInt(keywordInfo[0].graph_gender_m)
        },
        "age": {
          "age10": parseInt(keywordInfo[0].graph_age10),
          "age20": parseInt(keywordInfo[0].graph_age20),
          "age30": parseInt(keywordInfo[0].graph_age30),
          "age40": parseInt(keywordInfo[0].graph_age40),
          "age50": parseInt(keywordInfo[0].graph_age50),
          "age60": parseInt(keywordInfo[0].graph_age60),
        },
        "reaction": {
          "like": parseInt(keywordInfo[0].graph_reaction_like),
          "hate": parseInt(keywordInfo[0].graph_reaction_hate),
        },
        "word_cloud_url": keywordInfo[0].word_cloud_url
      }
    };
    callback(null, result);
  }

  async.waterfall([getConnection, selKeywordInfo, selTimelineList, resultJSON], function (err, result) {
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
