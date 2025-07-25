import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

const CardUser = ({ user, handleEliminar, handleEditar }) => {

  // Función de edición: pasamos el usuario al momento de editar
  const handleEditarUsuario = () => {
    handleEditar(user);
  };

  // Función de eliminación: pide confirmación antes de eliminar
  const handleEliminarUsuario = () => {
    Alert.alert(
      "Confirmación",
      `¿Estás seguro que deseas eliminar a ${user.nombre}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => handleEliminar(user.id)
        }
      ]
    );
  };

  return ( 
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{user.nombre}</Text>
          <Text style={styles.cardText}>Edad: {user.edad}</Text>
          <Text style={styles.cardText}>Correo: {user.correo}</Text>
          {/* Botones para editar y eliminar */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEditarUsuario}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminarUsuario}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
   );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3D2E',
    marginBottom: 5
  },
  cardText: {
    fontSize: 16,
    color: '#3B2C24'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#5C3D2E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#D9534F', // Rojo para eliminar
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default CardUser;