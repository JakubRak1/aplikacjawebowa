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
/* Table: category                                              */
/*==============================================================*/
create table category (
   category_id          SERIAL not null,
   car_id               INT4                 null,
   category_name        CHAR(100)            not null,
   constraint PK_CATEGORY primary key (category_id)
);

/*==============================================================*/
/* Index: category_PK                                           */
/*==============================================================*/
create unique index category_PK on category (
category_id
);

/*==============================================================*/
/* Index: "car-cat_FK"                                          */
/*==============================================================*/
create  index "car-cat_FK" on category (
car_id
);

/*==============================================================*/
/* Table: part                                                  */
/*==============================================================*/
create table part (
   part_id              SERIAL not null,
   category_id          INT4                 not null,
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

/*==============================================================*/
/* Index: "cat-part_FK"                                         */
/*==============================================================*/
create  index "cat-part_FK" on part (
category_id
);

alter table category
   add constraint "FK_CATEGORY_CAR-CAT_CAR" foreign key (car_id)
      references car (car_id)
      on delete restrict on update restrict;

alter table part
   add constraint "FK_PART_CAT-PART_CATEGORY" foreign key (category_id)
      references category (category_id)
      on delete restrict on update restrict;

INSERT INTO car (car_brand,car_name,car_year,car_engine,car_fuel,car_img) VALUES
  ('testowa_marka', 'testowa_nazwa', '1995','testowy_silnik','testowa_beznzyna','testowy_adress_img');

INSERT INTO category (car_id,category_name) VALUES
  (1, 'testowa_cat');

INSERT INTO part (category_id,part_name,part_desc,part_img) VALUES
  (1, 'testowa_aprt','testowa_opis','testowy_addres_img_2');