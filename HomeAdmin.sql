use railway;

create table users(
	IdUser int auto_increment primary key,
    Pass varchar(80) not null,
    TypeDoc varchar(255) not null,
    NumDoc int unsigned unique not null,
    NameUser varchar(255) not null,
	BirthDate date not null,
    Phone int unsigned not null,
    Email varchar(255) not null,
    NumHouse tinyint unsigned not null,
	RoleUser varchar(255) not null,
	StatusUser boolean not null,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Idvoting(
	IdVoting int auto_increment primary key,
    ProposalVoting varchar(255) not null,
    DescriptionVoting varchar(255) not null,
    DateStartVoting date not null,
    DateEndVoting date not null,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Vote(
	IdVote int auto_increment primary key,
	OptionVote varchar(255),
    DateHourVote datetime not null,
	Idvoting int not null, foreign key(Idvoting) references Idvoting (IdVoting),
    IdUser int not null, foreign key(IdUser) references users (IdUser)
);


create table PayAdmin(
	IdPayAdmin int auto_increment primary key,
    IdUser int not null, foreign key(IdUser) references users (IdUser),
    RegistDate date not null,
    StatusPayAdmin boolean not null,
    FIlePayAdmin blob not null,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table CommonArea(
	IdCommonArea int auto_increment primary key,
    NameCommonArea varchar(255) not null,
    IdUser int not null, foreign key(IdUser) references users (IdUser),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Service(
	IdService int auto_increment primary key,
    NameService varchar(255) not null,
    DescriptionService varchar(255) not null,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table acquire(
	IdUser int not null, foreign key(IdUser) references users (IdUser),
	IdService int not null, foreign key(IdService) references Service (IdService),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Vehicle(
	Plate varchar(255) primary key,
    StatusVehicle boolean not null,
    TypeVehicle varchar(255) not null,
	IdUser int not null, foreign key(IdUser) references users (IdUser),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table SpaceP(
	IdSpace tinyint auto_increment primary key,
    Slot tinyint unsigned not null,
	StatusSpaceP boolean not null,
    TypeSpace varchar(255) not null,
	IdVehicle varchar(255) not null, foreign key(IdVehicle) references Vehicle (Plate),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- insert de prueba
INSERT INTO users (Pass,TypeDoc, NumDoc, NameUser, BirthDate, Phone, Email, NumHouse, RoleUser, StatusUser)
VALUES
  ( 'iijtpbp841/*','DNI' ,12345678, 'Juan Pérez', '1990-05-15', 987654321, 'juan.perez@example.com', 25, 'Usuario Normal', true),
  ('$irnvpe845198/','Carnet de Extranjería', 87654321, 'María Gómez', '1985-11-30', 987654321, 'maria.gomez@example.com', 10, 'Administrador', true),
  ( 'andexfognwp54981','Pasaporte', 54321678, 'Pedro Martínez', '1988-07-20', 987654321, 'pedro.martinez@example.com', 30, 'Usuario Normal', false),
  ( '/prtjboinmorn51965165*' ,'DNI', 98765432, 'Laura Fernández', '1995-02-10', 987654321, 'laura.fernandez@example.com', 15, 'Usuario Normal', true);

INSERT INTO PayAdmin (IdUser, RegistDate, StatusPayAdmin, FIlePayAdmin)
VALUES
  (1, '2023-05-10', true, 'datos_binarios_del_archivo1'),
  (2, '2023-05-09', true, 'datos_binarios_del_archivo2'),
  (3, '2023-05-11', false, 'datos_binarios_del_archivo3'),
  (4, '2023-05-08', true, 'datos_binarios_del_archivo4');

INSERT INTO CommonArea (NameCommonArea, IdUser)
VALUES
  ('Sala de Reuniones', 1),
  ('Piscina', 2),
  ('Gimnasio', 3),
 ('Área de BBQ', 4);
  
INSERT INTO Service(NameService, DescriptionService)
VALUES
  ('Reparación', 'Servicio de reparación y mantenimiento'),
  ('Asesoría', 'Servicio de asesoría y consultoría'),
  ('Instalación', 'Servicio de instalación y configuración'),
  ('Soporte Técnico', 'Servicio de soporte técnico y resolución de incidencias');  
  
INSERT INTO acquire (IdUser, IdService)
VALUES
	(1, 2),
	(2, 3),
	(3, 4),
	(4, 1);
  
INSERT INTO Vehicle(Plate, StatusVehicle, TypeVehicle, IdUser)
VALUES
  (12345, true, 'Automóvil', 1),
  (67890, true, 'Motocicleta', 2),
  (24680, false, 'Automóvil', 3),
  (13579, true, 'Bicicleta', 4);

INSERT INTO SpaceP (Slot,TypeSpace, StatusSpaceP,IdVehicle)
VALUES
  (1,'Estacionamiento',true, 12345),
  (2,'Garaje', false,67890),
  (3,'Parqueadero', true,24680),
  (4,'Bodega', false,13579);

-- Insertar datos en la tabla "Idvoting"
INSERT INTO Idvoting (ProposalVoting, DescriptionVoting, DateStartVoting, DateEndVoting)
VALUES
  ('Aprobación de Cuota Mensual', 'Votación para aprobar la cuota mensual de mantenimiento', '2023-05-15', '2023-05-20');

-- Insertar datos en la tabla "Vote"
INSERT INTO Vote (OptionVote, DateHourVote, Idvoting, IdUser)
VALUES
  ('Aprobar', '2023-05-16 10:30:00', 1, 1);

INSERT INTO Vote (OptionVote, DateHourVote, Idvoting, IdUser)
VALUES
  ('No aprobar', '2023-05-17 09:45:00', 1, 2);

INSERT INTO Vote (OptionVote, DateHourVote, Idvoting, IdUser)
VALUES
  ('Aprobar', '2023-05-18 14:20:00', 1, 3);

INSERT INTO Vote (OptionVote, DateHourVote, Idvoting, IdUser)
VALUES
  ('Aprobar', '2023-05-19 16:00:00', 1, 4);

-- visualizar datos
select * from acquire;
select * from commonarea;
select * from PayAdmin;
select * from service;
select * from spacep;
select * from users;
select * from vehicle;
select * from idvoting;
select * from vote;


SELECT * FROM users WHERE Email='maria.gomez@example.com' AND Pass='$irnvpe845198/' AND StatusUser = 1;

UPDATE users SET StatusUser = 1 WHERE IdUser = 5;

SELECT * FROM PayAdmin inner join users on PayAdmin.IdUser = users.IdUser;