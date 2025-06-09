PROYECTO 3ER BIMESTRE - SISTEMA BANCARIO

Luis Antonio García Morales - 2020322(Product Owner & Scrum Master, Desarrollador Backend) Angel David Noj Mazariegos - 2023001 (Desarrollador Backend) Juan Sebastian Ortigoza Cheley - 2020405  (Desarrollador Frontend) Luis Eduardo Vásquez Pérez - 2020289 (Desarrollador Frontend)

DESCRIPCIÓN GENERAL
Este proyecto consiste en la creación de un sistema bancario completo con dos roles principales:
- Administrador
- Cliente

Cada rol tiene diferentes funciones dentro del sistema, cumpliendo con los requisitos funcionales y visuales definidos en clase.

FUNCIONALIDADES DEL SISTEMA

ADMINISTRADOR:
- Inicia sesión con:
  Usuario: ADMINB
  Contraseña: ADMINB
- Puede crear, editar, eliminar y visualizar clientes
- No puede modificar el DPI ni la contraseña de un cliente
- Visualiza el saldo y los últimos 5 movimientos de cada cliente
- Puede ver las cuentas con más movimientos en orden ascendente o descendente
- Administra productos o servicios exclusivos para los clientes
- Realiza depósitos a cuentas (solo modificables por cantidad)
- Puede revertir un depósito si no han pasado más de 60 segundos

CLIENTE:
- No puede crear su propia cuenta, solo el administrador puede
- Puede iniciar sesión con sus datos
- Visualiza su saldo actual y el historial de movimientos
- Puede editar su nombre, dirección, nombre de trabajo e ingresos mensuales
- Puede realizar transferencias a otras cuentas conociendo el número de cuenta
- Límite de Q2000 por transferencia
- Límite diario de Q10,000 en transferencias
- Puede agregar cuentas favoritas con alias para transferencias rápidas
- Puede visualizar su saldo en otras monedas mediante una API de divisas

ESTRUCTURA DEL PROYECTO

BACKEND (Node.js y MongoDB)
- Modelos: User, Deposit, Transfer, Product, Purchase, Movement
- Controladores para cada entidad
- Rutas protegidas por JWT
- Validaciones y restricciones en cada operación

FRONTEND (React.js)
- Interfaz separada para cliente y administrador
- Login protegido y rutas privadas
- Panel administrativo y vista del cliente
- Conversión de divisas en tiempo real

INSTRUCCIONES DE USO

1. Clonar el repositorio
   git clone [URL del repositorio]

2. Backend
   - Ir a la carpeta backend
   - Ejecutar: npm install
   - Crear el archivo .env con la configuración de la base de datos y el JWT
   - Ejecutar: npm run dev

3. Frontend
   - Ir a la carpeta frontend
   - Ejecutar: npm install
   - Ejecutar: npm run dev

4. Acceder a la aplicación desde el navegador
   http://localhost:3000

RESTRICCIONES Y VALIDACIONES

- El ingreso mensual mínimo para crear una cuenta es Q100
- El número de cuenta debe generarse automáticamente y ser único
- El administrador no puede modificar ni eliminar otros administradores
- Todos los movimientos deben reflejarse en el historial del usuario
