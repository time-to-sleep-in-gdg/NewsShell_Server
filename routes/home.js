var express = require('express');
var router = express.Router();

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
 *          name: categoryId
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리 ID
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

router.get('/', function(req, res) {
  res.status(200).json({
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
        "reaction_cnt": 6
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
        "reaction_cnt": 6
      }]
  });
});

module.exports = router;
