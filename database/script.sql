CREATE DATABASE gaia;

USE gaia;

-- CRIANDO AS TABELAS 
CREATE TABLE Proprietario (
idProprietario	INT PRIMARY KEY AUTO_INCREMENT,
nome 		VARCHAR (45) NOT NULL,
email 		VARCHAR (100) NOT NULL UNIQUE,
telFixo 	VARCHAR (10),
telCel		VARCHAR (11),
cpf			CHAR (11) UNIQUE NOT NULL,
cep 		CHAR (8) NOT NULL,
uf			CHAR (2) NOT NULL,
cidade  	VARCHAR (45) NOT NULL,
bairro		VARCHAR (45) NOT NULL,
logradouro 	VARCHAR (45) NOT NULL,
numero 		VARCHAR (6) NOT NULL,
complemento VARCHAR (45),
senha 		VARCHAR (40) NOT NULL
);

create table funcionario(
idFuncionario	int auto_increment,
nome  varchar (45),
email varchar (100) not null unique,
senha varchar (40) not null,
fkProprietario int,
foreign key (fkProprietario) references proprietario (idProprietario),
primary key (idFuncionario, fkProprietario)
);

CREATE TABLE Plantacao (
idPlantacao		INT PRIMARY KEY AUTO_INCREMENT,
nomePlantacao	VARCHAR (45),
fkProprietario 	int,
foreign key (fkProprietario) references proprietario (idProprietario)
);

create table Cargo (
fkFuncionario int,
foreign key (fkFuncionario) references funcionario (idFuncionario),
fkPlantacao int,
foreign key (fkPlantacao) references Plantacao (idPlantacao),
fkProprietario int,
foreign key (fkProprietario) references Proprietario (idProprietario),
primary key (fkfuncionario, fkPlantacao, fkProprietario)
);

CREATE TABLE Setor(
idSetor		INT PRIMARY KEY AUTO_INCREMENT,
nomeSetor	CHAR(3),
fkPlantacao INT,
FOREIGN KEY (fkPlantacao) REFERENCES Plantacao (idPlantacao)
);

create table Alerta (
idAlerta int primary key auto_increment,
statusAlerta varchar(45),
temperatura int
);

CREATE TABLE Metrica(
idMetricas 	INT PRIMARY KEY AUTO_INCREMENT,
temperatura int,
umidade 	int,
hora		DATETIME DEFAULT CURRENT_TIMESTAMP,
fkSetor		INT,
FOREIGN KEY (fkSetor) REFERENCES Setor (idSetor),
fkAlerta	int,
FOREIGN KEY (fkAlerta) REFERENCES Alerta (idAlerta)
);

-- DADOS PARA SABER QUAIS AS PLATAÇÕES DO PROPRIETÁRIO
select 
	Proprietario.nome,
    plantacao.idPlantacao,
    plantacao.nomePlantacao    
 from Proprietario join Plantacao on proprietario.idProprietario = Plantacao.fkProprietario where proprietario.email = 'EMAILAQUI';
 
 -- DADOS PARA SABER QUAL PLANTACAO O FUNCIONARIO TEM ACESSO
 select 
	funcionario.email,
    plantacao.idPlantacao,
    plantacao.nomePlantacao
from funcionario join cargo on funcionario.idFuncionario = cargo.fkFuncionario
	join plantacao on cargo.fkPlantacao = plantacao.idPlantacao where funcionario.email = 'EMAILAQUI';
    
-- DADOS PARA SABER QUAIS SETORES DE UMA DETERMINADA PLANTAÇÃO
select 
	setor.nomeSetor,
    setor.idSetor
from Plantacao join setor on plantacao.idPlantacao = setor.fkPlantacao where idPlantacao = 'IDAQUI';

-- PROCURANDO SE É UM FUNCIONÁRIO
select idFuncionario from funcionario where email = 'EMAILAQUI';
