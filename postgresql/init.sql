/*==============================================================*/
/* Table: car                                                   */
/*==============================================================*/
create table car (
   car_id               SERIAL not null,
   car_brand            CHAR(100)            not null,
   car_name             CHAR(100)            not null,
   car_year             NUMERIC(4)           not null,
   car_engine           CHAR(100)            not null,
   car_fuel             CHAR(100)            not null,
   car_img              CHAR(255)            null,
   constraint PK_CAR primary key (car_id)
);

/*==============================================================*/
/* Index: car_PK                                                */
/*==============================================================*/
create unique index car_PK on car (
car_id
);

/*==============================================================*/
/* Index: Relationship_1_FK                                     */
/*==============================================================*/
create  index Relationship_1_FK on car (
car_id
);

/*==============================================================*/
/* Table: part                                                  */
/*==============================================================*/
create table part (
   part_id              SERIAL not null,
   car_id               INT4                 null,
   part_name            CHAR(100)            not null,
   part_desc            TEXT                 not null,
   part_img             CHAR(255)            null,
   constraint PK_PART primary key (part_id)
);

/*==============================================================*/
/* Index: part_PK                                               */
/*==============================================================*/
create unique index part_PK on part (
part_id
);

alter table part
   add constraint FK_PART_RELATIONS_CAR foreign key (car_id)
      references car (car_id)
      on delete restrict on update restrict;

INSERT INTO car (car_brand,car_name,car_year,car_engine,car_fuel,car_img) VALUES
  ('FSO Polonez', 'Polonez', 1978,'R4 Pinto 2,0 l','Benzyna','polonez.jpg'),
  ('FIAT', 'Fiat 126p', 1973,'R2 652 cm','Benzyna','maluch.jpg');

INSERT INTO part (car_id,part_name,part_desc,part_img) VALUES
  (1, 'Opony zimowe','Opony zimowe BrumBrum 185/70 R13','polonez-opony.jpg'),
  (1, 'Rozrusznik','Rozrusznik Polonez OE CS367','polonez-rozrusznik.jpg'),
  (2, 'Alternator','Alternator FIAT 126p 650','maluch-alternator.jpg'),
  (2, 'Zabierak','Zabierak Półosi Fiat 126P Maluch Oryginał','maluch-zabierak.jpg'),
  (2, 'Plyn chlodniczy','Plyn chlodniczy o samku malin','');