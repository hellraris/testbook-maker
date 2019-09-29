drop table TESTBOOK;
drop table QUESTION;
drop table ANALYTICS;


CREATE TABLE BOOK ( 
  book_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  user_id varchar(30) NOT NULL,
  title varchar(100) NOT NULL,
  description varchar(200),
  tag JSON,
  favorite char(1),
  version int(4),
  del_flg char(1),
  reg_date date NOT NULL,
  upd_date date,
  PRIMARY KEY (testbook_id)
);

CREATE TABLE QUESITON_LIST ( 
  book_id bigint(20) NOT NULL,
  list JSON,
  PRIMARY KEY (book_id)
);

CREATE TABLE QUESTION_SET ( 
  question_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  book_id bigint(20) NOT NULL,
  title varchar(100),
  version int(4),
  scripts JSON,
  subquestions JSON,
  explanations JSON,
  files JSON,
  reg_date date NOT NULL,
  upd_date date,
  PRIMARY KEY (question_id)
);

CREATE TABLE ANALYTICS ( 
  user_id varchar(20) NOT NULL,
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
