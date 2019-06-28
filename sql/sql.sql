drop table question;
drop table script;
drop table info;
drop table analytics;

CREATE TABLE question ( 
  question_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  book_id bigint(20) NOT NULL,
  info_id  bigint(20) NOT NULL,
  order_no int(1) not null,
  question JSON,
  explanation JSON,
  type char(1),
  tag JSON,
  favorite char(1),
  PRIMARY KEY (question_id)
);

CREATE TABLE script ( 
  script_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  book_id bigint(20) NOT NULL,
  info_id  bigint(20) NOT NULL,
  script JSON,
  explanation JSON,
  type char(1) NOT NULL,
  tag JSON,
  PRIMARY KEY (script_id)
);

CREATE TABLE info ( 
  info_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  version char(3) NOT NULL,
  order_no int(3) not null,
  status char(1) NOT NULL,
  tag JSON,
  reg_date date NOT NULL,
  upd_date date,
  PRIMARY KEY (info_id)
);


CREATE TABLE analytics ( 
  analytics_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  target_id bigint(20) NOT NULL,
  target_type char(1) NOT NULL,
  version char(3) NOT NULL,
  solve_date date,
  data JSON,
  solve_cnt int(4),
  correct_cnt int(4),
  correct_late int(3), 
  PRIMARY KEY (analytics_id)
);
