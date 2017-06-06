CREATE TABLE category
  (
  id int primary key,
  name varchar(100),
  url varchar(200)
  );

  CREATE TABLE article
  (
  name varchar(100),
  url varchar(200),
  cid int
  );