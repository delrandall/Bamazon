create database Bamazon;

create table Bamazon.Products (
	ItemID INTEGER(4) NOT NULL,  
    ProductName VARCHAR(255) NOT NULL,
    DepartmentName VARCHAR(100) NOT NULL,
    Price DECIMAL(8.2),
    StockQuantity INTEGER(6),
    PRIMARY KEY (ItemID));
    
SELECT * FROM Bamazon.Products;

INSERT INTO Bamazon.Products (ItemID, ProductName, DepartmentName, Price, StockQuantity)
VALUES 
(1,"Clarity Defender® PLUS Automotive Windshield Treatment", "Auto", 1999, 10),
(2, "Miller Beer in plastic bottles with clay nanoparticles", "Grocery", 999, 40),
(3,	"Body Armor with Fabric Coating",	"Armor",	500,	5),
(4,	"lithium iron phosphate battery",	"Home Tools",	7664,	10),
(5,	"Verigene system with DNA-coated gold nanoparticles",	"Pharmacy",	99999,	2),
(6,	"Palm-Tree Wax",	"Auto",	1999,	20),
(7,	"Nanosolar Panel Set (400 Watt Off Grid)",	"Home",	143572,	8),
(8,	"Pregnancy Test with Gold Nanoparticles",	"Pharmacy",	1298,	30),
(9,	"48 Tennis Balls with butyl rubber and vermiculite (bucket)",	"Sports",	4999,	30),
(10, "Nosebleed Bandage with Aluminosilicate Nanoparticles (1 large)", "Pharmacy",	2400,	10)



