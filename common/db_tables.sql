DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `follow`;
DROP TABLE IF EXISTS `keyword`;
DROP TABLE IF EXISTS `alarm`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `bookmark`;

create table `article` (
  id int(11) not null PRIMARY KEY,
  keyword_id int(11) not null,
  title varchar(200)  default null,
  summary varchar(1000) default null,
  link_url varchar(200)  default null,
  company varchar(80)  default null,
  reporter_name varchar(20)  default null,
  comment_cnt int(20) default 0,
  create_datetime TIMESTAMP default CURRENT_TIMESTAMP,
  graph_gender_f int(11) default 0,
  graph_gender_m int(11) default 0,
  graph_age10 int(11) default 0,
  graph_age20 int(11) default 0,
  graph_age30 int(11) default 0,
  graph_age40 int(11) default 0,
  graph_age50 int(11) default 0,
  graph_age60 int(11) default 0,
  graph_reaction_like int(11) default 0,
  graph_reaction_hate int(11) default 0,
  modified TIMESTAMP default CURRENT_TIMESTAMP
);

create table `follow` ( 
  id int(11) not null PRIMARY KEY,
  user_id int(11) not null,
  keyword_id int(11) not null,
  is_follow boolean default true,
  modified TIMESTAMP default CURRENT_TIMESTAMP
);

create table `keyword` (
  id int(11) not null PRIMARY KEY,
  name varchar(200)  default null,
  category_id int(11) not null,
  category_name varchar(200)  default null,
  view_cnt int(20) default 0,
  word_cloud varchar(1000) default null,
  modified TIMESTAMP default CURRENT_TIMESTAMP
);

create table `alarm` (
  id int(11) not null PRIMARY KEY,
  user_id int(11) not null,
  type varchar(20) default null,
  title varchar(200) default null,
  message varchar(200) default null,
  is_view boolean default false,
  create_datetime TIMESTAMP default CURRENT_TIMESTAMP,
  modified TIMESTAMP default CURRENT_TIMESTAMP
);

create table `user` (
  id int(11) not null PRIMARY KEY,
  password varchar(100) default null,
  nickname varchar(200) default null,
  profile_url varchar(1000) default null,
  subscription_start TIMESTAMP null,
  subscription_end TIMESTAMP null,
  modified TIMESTAMP default CURRENT_TIMESTAMP
);

create table `bookmark` (
  id int(11) not null PRIMARY KEY,
  user_id int(11) not null,
  article_id int(11) not null,
  is_bookmark boolean default true,
  modified TIMESTAMP default CURRENT_TIMESTAMP
);

-- After insert data
ALTER TABLE `article` MODIFY COLUMN id int(11) auto_increment NOT NULL;
ALTER TABLE `article` auto_increment=10;
ALTER TABLE `follow` MODIFY COLUMN id int(11) auto_increment NOT NULL;
ALTER TABLE `follow` auto_increment=10;
ALTER TABLE `keyword` MODIFY COLUMN id int(11) auto_increment NOT NULL;
ALTER TABLE `keyword` auto_increment=10;
ALTER TABLE `alarm` MODIFY COLUMN id int(11) auto_increment NOT NULL;
ALTER TABLE `alarm` auto_increment=10;
ALTER TABLE `user` MODIFY COLUMN id int(11) auto_increment NOT NULL;
ALTER TABLE `user` auto_increment=10;
ALTER TABLE `bookmark` MODIFY COLUMN id int(11) auto_increment NOT NULL;
ALTER TABLE `bookmark` auto_increment=10;
