/* PERMISOS DE ACCESO */
export const access = (user, module, action) => {
  const rules = {
    users: {
      view: [1], // SUPER ADMINISTRADOR 
      edit: [1] // SUPER ADMINISTRADOR
    },
    sucursales: {
      view: [1, 2, 3, 4], // SUPER ADMINISTRADOR, ADMINISTRADOR, APLICATIVO, USUARIO
      edit: [1, 2] // SUPER ADMINISTRADOR, ADMINISTRADOR
    },
    dispositivos: {
      view: [1, 2, 3, 4], // SUPER ADMINISTRADOR, ADMINISTRADOR, APLICATIVO, USUARIO
      edit: [1, 2] // SUPER ADMINISTRADOR, ADMINISTRADOR
    },
    mantenimientos: {
      view: [1, 2, 3, 4], // SUPER ADMINISTRADOR, ADMINISTRADOR, APLICATIVO, USUARIO
      edit: [1, 2], // SUPER ADMINISTRADOR, ADMINISTRADOR
      add: [4] // GEOGRAFIA
    },
    informes: {
      view: [1, 2, 3, 4], // SUPER ADMINISTRADOR, ADMINISTRADOR, APLICATIVO, USUARIO
      edit: [1], // SUPER ADMINISTRADOR
      add: [4] // GEOGRAFIA
    },
    manuales: {
      view: [1, 2, 3, 4], // SUPER ADMINISTRADOR, ADMINISTRADOR, APLICATIVO, USUARIO
      edit: [1] // SUPER ADMINISTRADOR
    },
  };

  return rules[module]?.[action]?.includes(user.id);
};