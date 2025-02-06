-------- Crear la base de datos para el proyecto InventarioStockEse
------CREATE DATABASE inventario_StockEse;
-------- Seleccionar la base de datos recién creada para su uso
------USE inventario_StockEse;

-------- Tabla de Roles: Contiene los diferentes roles de los usuarios (Ejemplo: Admin, Vendedor, etc.)
------CREATE TABLE rol (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada rol, auto incrementable
------    nombre VARCHAR(50) NOT NULL -- Nombre del rol, no puede ser nulo
------);

-------- Tabla de Usuarios: Contiene la información de los usuarios del sistema
------CREATE TABLE usuario (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada usuario, auto incrementable
------    nombre VARCHAR(100) NOT NULL, -- Nombre completo del usuario
------    email VARCHAR(100) UNIQUE NOT NULL, -- Correo electrónico del usuario, debe ser único
------    contrasena VARCHAR(255) NOT NULL, -- Contraseña del usuario, se almacenará de forma cifrada
------    rolId INT NOT NULL, -- ID del rol que asigna permisos al usuario
------    FOREIGN KEY (rolId) REFERENCES rol(id) -- Relación con la tabla de roles
------);

-------- Tabla de Categorías: Contiene las diferentes categorías de productos
------CREATE TABLE categoria (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada categoría, auto incrementable
------    nombre VARCHAR(100) NOT NULL -- Nombre de la categoría, no puede ser nulo
------);

-------- Tabla de Productos: Contiene la información de los productos disponibles en el inventario
------CREATE TABLE producto (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada producto, auto incrementable
------    nombre VARCHAR(100) NOT NULL, -- Nombre del producto
------    precio DECIMAL(10,2) NOT NULL, -- Precio unitario del producto, con 2 decimales
------    stock INT NOT NULL, -- Cantidad disponible del producto en el inventario
------    categoriaId INT NOT NULL, -- ID de la categoría a la que pertenece el producto
------    FOREIGN KEY (categoriaId) REFERENCES categoria(id) -- Relación con la tabla de categorías
------);

-------- Tabla de Inventario: Controla el stock de productos, permitiendo tener múltiples registros de inventarios
------CREATE TABLE inventario (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada registro de inventario, auto incrementable
------    productoId INT NOT NULL, -- ID del producto que se está registrando en el inventario
------    cantidad INT NOT NULL, -- Cantidad del producto en el inventario
------    FOREIGN KEY (productoId) REFERENCES producto(id) -- Relación con la tabla de productos
------);

-------- Tabla de Proveedores: Contiene la información de los proveedores que abastecen los productos
------CREATE TABLE proveedor (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada proveedor, auto incrementable
------    nombre VARCHAR(100) NOT NULL -- Nombre del proveedor
------);

-------- Tabla de relación Producto-Proveedor: Relaciona los productos con sus proveedores
------CREATE TABLE productoProveedor (
------    productoId INT NOT NULL, -- ID del producto
------    proveedorId INT NOT NULL, -- ID del proveedor
------    PRIMARY KEY (productoId, proveedorId), -- Clave primaria compuesta por productoId y proveedorId
------    FOREIGN KEY (productoId) REFERENCES producto(id), -- Relación con la tabla de productos
------    FOREIGN KEY (proveedorId) REFERENCES proveedor(id) -- Relación con la tabla de proveedores
------);

-------- Tabla de Clientes: Contiene la información de los clientes que realizan compras
----CREATE TABLE cliente (
----  id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada cliente, auto incrementable
----   nombre VARCHAR(100) NOT NULL -- Nombre del cliente
----);

-------- Tabla de Ventas: Registra las ventas realizadas a los clientes
------CREATE TABLE venta (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada venta, auto incrementable
------    clienteId INT NOT NULL, -- ID del cliente que realizó la compra
------    fecha DATE NOT NULL, -- Fecha de la venta
------    FOREIGN KEY (clienteId) REFERENCES cliente(id) -- Relación con la tabla de clientes
------);

-------- Tabla de Detalle de Venta: Detalles de los productos que se vendieron en cada transacción
------CREATE TABLE detalleVenta (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada detalle de venta, auto incrementable
------    ventaId INT NOT NULL, -- ID de la venta a la que pertenece este detalle
------    productoId INT NOT NULL, -- ID del producto que se vendió
------    cantidad INT NOT NULL, -- Cantidad de productos vendidos
------    precioUnitario DECIMAL(10,2) NOT NULL, -- Precio unitario del producto en el momento de la venta
------    FOREIGN KEY (ventaId) REFERENCES venta(id), -- Relación con la tabla de ventas
------    FOREIGN KEY (productoId) REFERENCES producto(id) -- Relación con la tabla de productos
------);

-------- Tabla de Fotos de Productos: Almacena las URLs de las fotos asociadas a cada producto
------CREATE TABLE foto (
------    id INT PRIMARY KEY IDENTITY(1,1), -- ID único para cada foto, auto incrementable
------    productoId INT NOT NULL, -- ID del producto al que pertenece la foto
------    url VARCHAR(255) NOT NULL, -- URL de la imagen del producto
------    FOREIGN KEY (productoId) REFERENCES producto(id) -- Relación con la tabla de productos
------);


------  select * from rol;

------  -- Insertar roles en la tabla Rol
------INSERT INTO rol (nombre)
------VALUES ('Administrador'), ('Cliente');


-------- Tabla de Carrito
------CREATE TABLE Carrito (
------    id INT PRIMARY KEY IDENTITY,
------    cliente_id INT NOT NULL,
------    fecha DATE NOT NULL DEFAULT GETDATE(),
------    FOREIGN KEY (cliente_id) REFERENCES Cliente(id)
------);

-------- Tabla de DetalleCarrito
------CREATE TABLE DetalleCarrito (
------    id INT PRIMARY KEY IDENTITY,
------    carrito_id INT NOT NULL,
------    producto_id INT NOT NULL,
------    cantidad INT NOT NULL,
------    FOREIGN KEY (carrito_id) REFERENCES Carrito(id),
----    FOREIGN KEY (producto_id) REFERENCES Producto(id)
);






-- Ver todos los registros de la tabla 'Cliente'
SELECT * FROM Cliente;
EXEC sp_columns Cliente;




select *from cliente




