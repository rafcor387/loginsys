import mysql.connector
from faker import Faker
import random

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'testaiuda'
}

# Conexión a la base de datos
cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

# Generador de datos aleatorios usando Faker
faker = Faker()

# Función para insertar datos en la tabla testReg
def insert_data():
    for i in range(1, 13):  # Itera por los 12 meses
        for _ in range(1, 50):  # Inserta 10 registros por mes
            ventas = random.randint(1, 200)
            cantidad = random.randint(50, 500)
            mes = i
            if ventas < cantidad:
                query = "INSERT INTO testReg (id, ventas, cantidad, mes) VALUES (%s, %s, %s, %s)"
                cursor.execute(query, (i, ventas, cantidad, mes))
    cnx.commit()

# Ejecutar la función insert_data
insert_data()

# Cerrar la conexión a la base de datos
cursor.close()
cnx.close()