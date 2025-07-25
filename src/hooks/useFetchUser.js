import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };

  // Eliminar usuario de la API
  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario eliminado correctamente");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo eliminar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al eliminar el usuario");
    }
  };

  // Editar usuario en la API
  const handleEditar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${usuarioEditando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario editado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        setUsuarioEditando(null); // Limpiar estado de edición
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo editar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al editar los datos");
    }
  };

  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    //console.log("actualizando en useEffect");
  }, []);

  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    handleEliminar,
    handleEditar,
    usuarios,
    loading,
    fetchUsuarios,
    usuarioEditando,
    setUsuarioEditando,
  };
};

export default useFetchUser;
