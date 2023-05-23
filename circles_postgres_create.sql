CREATE SCHEMA IF NOT EXISTS circles;

CREATE  TABLE circles.circles ( 
	id                   integer  NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	CONSTRAINT pk_circles PRIMARY KEY ( id )
 );


CREATE  TABLE circles.events ( 
	id                   integer  NOT NULL  ,
	circle_id            integer  NOT NULL  ,
	event_date           date  NOT NULL  ,
	daypart              varchar    ,
	note                 varchar(600)    ,
	CONSTRAINT pk_events PRIMARY KEY ( id )
 );

ALTER TABLE circles.events ADD CONSTRAINT daypart CHECK ( daypart IN ('morning', 'afternoon', 'evening') );

CREATE  TABLE circles.users ( 
	id                   integer  NOT NULL  ,
	username             varchar(100)  NOT NULL  ,
	name                 varchar(100)    ,
	email                varchar  NOT NULL  ,
	CONSTRAINT pk_users PRIMARY KEY ( id )
 );

CREATE  TABLE circles.circle_users ( 
	user_id              integer    ,
	circle_id            integer    
 );

CREATE UNIQUE INDEX unq_circle_users ON circles.circle_users ( user_id, circle_id );

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

COMMENT ON COLUMN circles.events.daypart IS 'can be morning, afternoon, evening, or null';

COMMENT ON COLUMN circles.events.note IS 'optional note for an event';
