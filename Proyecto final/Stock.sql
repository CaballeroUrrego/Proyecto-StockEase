-- 1. Crear la base de datos llamada Stock
CREATE DATABASE Stock;
GO

-- 2. Seleccionar la base de datos Stock para trabajar en ella
USE Stock;
GO

-- 3. Crear la tabla Roles (opcional, para definir tipos de usuario)
CREATE TABLE Roles (
    id_rol INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
GO

-- 4. Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    cedula VARCHAR(20),
    id_rol INT NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);
GO

-- 5. Crear la tabla Categorias
CREATE TABLE Categorias (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
GO

-- 6. Crear la tabla Productos: cada producto pertenece a una categoría.
CREATE TABLE Productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT FK_Productos_Categorias FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);
GO

-- 7. Crear la tabla Ventas: cada venta es realizada por un usuario.
CREATE TABLE Ventas (
    id_venta INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATETIME NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_Ventas_Usuarios FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
GO

-- 8. Crear la tabla DetalleVenta: cada registro detalla un producto vendido en una venta.
CREATE TABLE DetalleVenta (
    id_detalle INT IDENTITY(1,1) PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_DetalleVenta_Ventas FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta),
    CONSTRAINT FK_DetalleVenta_Productos FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
GO

-- 9. Crear la tabla Movimientos: registra los movimientos de inventario realizados por los usuarios sobre productos.
CREATE TABLE Movimientos (
    id_movimiento INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,  -- Ejemplo: 'entrada', 'salida'
    fecha DATETIME NOT NULL,
    CONSTRAINT FK_Movimientos_Usuarios FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    CONSTRAINT FK_Movimientos_Productos FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
GO
