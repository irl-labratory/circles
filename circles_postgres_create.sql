CREATE SCHEMA IF NOT EXISTS circles;

CREATE  TABLE circles.circles ( 
	id                   serial  NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	CONSTRAINT pk_circles PRIMARY KEY ( id )
 );

CREATE  TABLE circles.events ( 
	id                   serial  NOT NULL  ,
	circle_id            integer  NOT NULL  ,
	event_date           date  NOT NULL  ,
	daypart              varchar    ,
	note                 varchar(600)    ,
	event_name           varchar(100)    ,
	CONSTRAINT pk_events PRIMARY KEY ( id )
 );

ALTER TABLE circles.events ADD CONSTRAINT daypart CHECK ( daypart IN ('morning', 'afternoon', 'evening') );

CREATE UNIQUE INDEX unq_events_circle_id ON circles.events ( circle_id, event_date, daypart );

CREATE  TABLE circles.users ( 
	id                   integer  NOT NULL  ,
	name                 varchar(120)  NOT NULL  ,
	email                varchar  NOT NULL  ,
	access_token         varchar    ,
	access_token_expiry  varchar    ,
	CONSTRAINT pk_users PRIMARY KEY ( id ),
	CONSTRAINT unq_users_email UNIQUE ( email ) 
 );

CREATE  TABLE circles.circle_users ( 
	user_id              integer  NOT NULL  ,
	circle_id            integer  NOT NULL  
 );

CREATE UNIQUE INDEX unq_circle_users ON circles.circle_users ( user_id, circle_id );

CREATE UNIQUE INDEX unq_circle_users_user_id ON circles.circle_users ( user_id, circle_id );

CREATE  TABLE circles.event_users ( 
	event_id             integer  NOT NULL  ,
	user_id              integer  NOT NULL  
 );

CREATE UNIQUE INDEX unq_event_users ON circles.event_users ( event_id, user_id );

ALTER TABLE circles.circle_users ADD CONSTRAINT fk_circle_users_circles FOREIGN KEY ( circle_id ) REFERENCES circles.circles( id );

ALTER TABLE circles.circle_users ADD CONSTRAINT fk_circle_users_users FOREIGN KEY ( user_id ) REFERENCES circles.users( id );

ALTER TABLE circles.event_users ADD CONSTRAINT fk_event_users_users FOREIGN KEY ( user_id ) REFERENCES circles.users( id );

ALTER TABLE circles.event_users ADD CONSTRAINT fk_event_users_events FOREIGN KEY ( event_id ) REFERENCES circles.events( id );

ALTER TABLE circles.events ADD CONSTRAINT fk_events_circles FOREIGN KEY ( circle_id ) REFERENCES circles.circles( id );

COMMENT ON COLUMN circles.events.event_date IS 'date of event';

COMMENT ON COLUMN circles.events.daypart IS 'can be morning, afternoon, evening, or null';

COMMENT ON COLUMN circles.events.note IS 'optional note for an event';

INSERT INTO circles.circles VALUES (1, 'Climb time!');
INSERT INTO circles.circles VALUES (2, 'Hack Hour');

 INSERT INTO circles.users VALUES (1,  'Jasmine', 'jnoor@test.com');
 INSERT INTO circles.users VALUES (2,  'John', 'jdonato@test.com');
 INSERT INTO circles.users VALUES (3,  'Billy', 'wmurphy@test.com');
 INSERT INTO circles.users VALUES (4,  'Nicky', 'nly@test.com');
 INSERT INTO circles.users VALUES (5,  'Kelvin', 'batman@test.com');
 INSERT INTO circles.users VALUES (6,  'Christian', 'cashley@test.com');
 INSERT INTO circles.users VALUES (7,  'Michael Angelo', 'ma@test.com');
 INSERT INTO circles.users VALUES (8,  'Ngoc', 'nz@test.com');

 INSERT INTO circles.circle_users VALUES (1,1);
 INSERT INTO circles.circle_users VALUES (2,1);
 INSERT INTO circles.circle_users VALUES (3,1);
 INSERT INTO circles.circle_users VALUES (4,1);
 INSERT INTO circles.circle_users VALUES (1,2);
 INSERT INTO circles.circle_users VALUES (2,2);
 INSERT INTO circles.circle_users VALUES (3,2);
 INSERT INTO circles.circle_users VALUES (4,2);
 INSERT INTO circles.circle_users VALUES (5,2);
 INSERT INTO circles.circle_users VALUES (6,2);
 INSERT INTO circles.circle_users VALUES (7,2);
 INSERT INTO circles.circle_users VALUES (8,2);

 INSERT INTO circles.events VALUES (1, 1, '2023-05-27', 'evening', '', '');
 INSERT INTO circles.events VALUES (2, 1, '2023-05-29', 'morning', '', 'lead climbing');
 INSERT INTO circles.events VALUES (3, 1, '2023-05-30', 'evening', '', '');
 INSERT INTO circles.events VALUES (4, 1, '2023-06-02', 'evening', '', '');
 INSERT INTO circles.events VALUES (5, 1, '2023-06-05', 'afternoon', '', 'top rope');
 INSERT INTO circles.events VALUES (6, 2, '2023-05-28', 'evening', 'Hack Night', '');
 INSERT INTO circles.events VALUES (7, 2, '2023-05-29', 'morning', '', 'SDI');
 INSERT INTO circles.events VALUES (8, 2, '2023-06-03', 'morning', '', '');
 INSERT INTO circles.events VALUES (9, 2, '2023-06-04', 'evening', 'Hack Night', '');

 INSERT INTO circles.event_users VALUES (1, 1);
 INSERT INTO circles.event_users VALUES (1, 2);
 INSERT INTO circles.event_users VALUES (2, 2);
 INSERT INTO circles.event_users VALUES (3, 3);
 INSERT INTO circles.event_users VALUES (3, 4);
 INSERT INTO circles.event_users VALUES (4, 1);
 INSERT INTO circles.event_users VALUES (4, 2);
 INSERT INTO circles.event_users VALUES (4, 3);
 INSERT INTO circles.event_users VALUES (4, 4);
 INSERT INTO circles.event_users VALUES (5, 4);
 INSERT INTO circles.event_users VALUES (6, 1);
 INSERT INTO circles.event_users VALUES (6, 2);
 INSERT INTO circles.event_users VALUES (6, 3);
 INSERT INTO circles.event_users VALUES (6, 4);
 INSERT INTO circles.event_users VALUES (6, 5);
 INSERT INTO circles.event_users VALUES (6, 6);
 INSERT INTO circles.event_users VALUES (6, 7);
 INSERT INTO circles.event_users VALUES (7, 1);
 INSERT INTO circles.event_users VALUES (7, 3);
 INSERT INTO circles.event_users VALUES (7, 5);
 INSERT INTO circles.event_users VALUES (7, 7);
 INSERT INTO circles.event_users VALUES (7, 8);
 INSERT INTO circles.event_users VALUES (8, 1);
 INSERT INTO circles.event_users VALUES (8, 2);
 INSERT INTO circles.event_users VALUES (8, 3);
 INSERT INTO circles.event_users VALUES (9, 5);