var express = require('express');
var router = express.Router();

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

router.get('/:keyword_id', function(req, res) {
  res.status(200).json({
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
});

module.exports = router;
