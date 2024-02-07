CREATE DATABASE quiz;

USE quiz;

CREATE user 'user'@'localhost' IDENTIFIED BY 'YOURPASSWORD';
REVOKE ALL PRIVILEGES ON *.* FROM 'user'@'localhost';
GRANT EXECUTE ON quiz.* TO 'user'@'localhost';

DROP TABLE IF EXISTS questions;

CREATE TABLE questions(id SERIAL PRIMARY KEY, question CHAR(255) NOT NULL, answer1 CHAR(255) NOT NULL, answer2 CHAR(255) NOT NULL, answer3 CHAR(255) NOT NULL, answer4 CHAR(255) NOT NULL, correct CHAR(255) NOT NULL);

DROP PROCEDURE IF EXISTS SelectAllQ;
DELIMITER //
CREATE PROCEDURE SelectAllQ()
BEGIN
SELECT (SELECT COUNT(*) FROM questions q2 WHERE q1.id>=q2.id)-1 AS rowindex, q1.id, q1.question, q1.answer1, q1.answer2, q1.answer3, q1.answer4 FROM questions q1;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS SelectAllQandA;
DELIMITER //
CREATE PROCEDURE SelectAllQandA()
BEGIN
SELECT (SELECT COUNT(*) FROM questions q2 WHERE q1.id>=q2.id)-1 AS rowindex, q1.* FROM questions q1;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS InsertQandA;
DELIMITER //
CREATE PROCEDURE InsertQandA(IN _q CHAR(255), IN _a1 CHAR(255), IN _a2 CHAR(255), IN _a3 CHAR(255), IN _a4 CHAR(255), IN _c CHAR(255), OUT _id BIGINT UNSIGNED)
BEGIN
DECLARE var_numrows INT UNSIGNED;
SELECT COUNT(*) INTO var_numrows FROM questions;
IF var_numrows < 5 THEN
	INSERT INTO questions VALUES(null, _q, _a1, _a2, _a3, _a4, _c);
	IF ROW_COUNT() > 0 THEN
		SELECT LAST_INSERT_ID() INTO _id;
	END IF;
END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS UpdateQandA;
DELIMITER //
CREATE PROCEDURE UpdateQandA(IN _id BIGINT UNSIGNED, IN _q CHAR(255), IN _a1 CHAR(255), IN _a2 CHAR(255), IN _a3 CHAR(255), IN _a4 CHAR(255), IN _c CHAR(255))
BEGIN
UPDATE questions SET question=_q, answer1=_a1, answer2=_a2, answer3=_a3, answer4=_a4, correct=_c WHERE id=_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS DeleteQandAWhereId;
DELIMITER //
CREATE PROCEDURE DeleteQandAWhereId(IN _id BIGINT UNSIGNED)
BEGIN
DELETE FROM questions WHERE id=_id;
END //
DELIMITER ;

