-- Crear la base de datos
CREATE DATABASE Proyecto_StockEase;
GO


-- Usar la base de datos creada
USE Proyecto_StockEase;
GO

-- Crear roles
CREATE ROLE Administrador;
CREATE ROLE Empleado;

-- Comentario: Los roles Administrador y Empleado representan los distintos niveles de acceso en el sistema StockEase.

-- Otorgar privilegios a los roles
GRANT SELECT, INSERT, UPDATE, DELETE TO Administrador;
GRANT SELECT, INSERT, UPDATE, DELETE TO Empleado;

-- Comentario: Se otorgan los mismos privilegios básicos de selección, inserción, actualización y eliminación para ambos roles.

-- Otorgar privilegios adicionales al rol Administrador
GRANT CREATE USER TO Administrador;
GRANT CREATE TABLE TO Administrador;
GRANT CREATE VIEW TO Administrador;
GRANT CREATE PROCEDURE TO Administrador;

-- Comentario: El rol Administrador obtiene privilegios adicionales para gestionar usuarios, tablas, vistas y procedimientos almacenados.

-- Otorgar privilegios específicos del inventario al rol Empleado
GRANT SELECT ON Products TO Empleado;
GRANT SELECT ON InventoryMovements TO Empleado;

-- Comentario: Se otorgan permisos de selección en las tablas de Productos e InventoryMovements al rol Empleado para que pueda consultar información del inventario.

-- Otorgar permisos de reportes a ambos roles
GRANT SELECT ON Reports TO Administrador;
GRANT SELECT ON Reports TO Empleado;

-- Comentario: Se otorgan permisos de selección en la tabla de Reportes tanto al Administrador como al Empleado.

-- Crear la tabla de Usuarios
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Role NVARCHAR(50) CHECK (Role IN ('admin', 'employee')) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
-- Comentario: Esta tabla almacena información de los usuarios, incluyendo su rol de administrador o empleado.

-- Crear la tabla de Categorías
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
-- Comentario: Esta tabla almacena las categorías de productos.

-- Crear la tabla de Productos
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    Description NVARCHAR(MAX),
    CategoryID INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
-- Comentario: Esta tabla almacena información detallada de los productos, incluyendo su categoría relacionada.

-- Crear la tabla de MovimientosInventario
CREATE TABLE InventoryMovements (
    MovementID INT PRIMARY KEY IDENTITY(1,1),
    Type NVARCHAR(20) CHECK (Type IN ('entry', 'exit')) NOT NULL,
    Date DATE NOT NULL,
    Quantity INT NOT NULL,
    ProductID INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
-- Comentario: Esta tabla registra los movimientos de inventario, incluyendo entradas y salidas de productos.

-- Crear la tabla de Reportes
CREATE TABLE Reports (
    ReportID INT PRIMARY KEY IDENTITY(1,1),
    Type NVARCHAR(20) CHECK (Type IN ('inventory', 'sales')) NOT NULL,
    Date DATE NOT NULL,
    UserID INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
-- Comentario: Esta tabla almacena información sobre los reportes generados, incluyendo el tipo y la fecha.

-- Crear una tabla intermedia para relacionar muchos a muchos entre Productos y Categorías
CREATE TABLE ProductCategories (
    ProductID INT,
    CategoryID INT,
    PRIMARY KEY (ProductID, CategoryID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
-- Comentario: Esta tabla permite establecer relaciones múltiples entre productos y categorías.
