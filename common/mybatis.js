var mybatisMapper = require('mybatis-mapper');

// notice : start directory is root
mybatisMapper.createMapper(['./common/db_sql.xml']);

module.exports.mybatisMapper = mybatisMapper;