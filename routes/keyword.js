var express = require('express');
var router = express.Router();

/* GET home page. */
/**
 * @swagger
 *  /keyword/{keywordId}:
 *    get:
 *      tags:
 *      - keyword
 *      description: 메인 키워드. 
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
          "article_summary": "요약요약요약",
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
          "article_summary": "요약요약요약",
          "is_bookmark": false,
          "is_hot": false,
          "company": "경향 신문",
          "reporter_name": "홍길동",
          "create_datetime": "2021-07-07 14:00:00",
          "link": "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        }, {
          "article_id": 13,
          "article_title": "제목",
          "article_summary": "요약요약요약",
          "is_bookmark": false,
          "is_hot": false,
          "company": "경향 신문",
          "reporter_name": "홍길동",
          "create_datetime": "2021-07-07 14:00:00",
          "link": "https://t1.kakaocdn.net/kakaocorp/corp_thumbnail/Kakao.png"
        }]
      },
      "graph": {
        "gender": {},
        "age": {},
        "reaction": {},
        "cloud_text": []
      }
  });
});

module.exports = router;
