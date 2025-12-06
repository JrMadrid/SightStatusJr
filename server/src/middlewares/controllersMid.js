/* MIDDLEWARE PARA LOS CONTROLLERS */
import multer from "multer";

/* Validar las sesiones activas */
// Validar si el usuario tiene sesión iniciada
export const requireUserSession = async (req, res, next) => {
  if (req.session.login === true) {
    next(); // Continua con el siguiente middleware o controlador
  } else {
    res.redirect(''); // Redirige si no ha iniciado sesión
  }
};

// Validar si el usuario tiene sesión de admininistrador
export const requireAdminSession = async (req, res, next) => {
  if (req.session.admin === true) {
    next(); // Continua con el siguiente middleware o controlador
  } else {
    res.redirect(''); // Redirige si no ha iniciado sesión como administrador
  }
};

/* Manejar subida de archivos con Multer */
const almacenamientoMemoria = multer.memoryStorage(); // memoryStorage para guardar el archivo en buffer para evitar crear archivos temporales en disco

// Filtro de imágenes permitidas
const filtroFotos = (req, archivo, cb) => {
  const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/avif", "image/x-webp"]; // Tipos MIME permitidos
  if (!tiposPermitidos.includes(archivo.mimetype)) {
    return cb(new Error("Solo se permiten imágenes PNG, JPG, WEBP o AVIF"), false); // Archivo no permitido
  }
  cb(null, true); // Aceptar archivo
};

// Subir solo imágenes
const Foto = multer({
  storage: almacenamientoMemoria, // Guardar archivo en memoria
  fileFilter: filtroFotos, // Validar tipo MIME
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

// Filtro de solo PDF
const filtroPDF = (req, archivo, cb) => {
  if (archivo.mimetype !== "application/pdf") {
    return cb(new Error("Solo se permiten archivos PDF"), false); // Archivo no permitido
  }
  cb(null, true);
};

// Subir PDF
const PDF = multer({
  storage: almacenamientoMemoria, // Guardar archivo en memoria
  fileFilter: filtroPDF, // Validar que sea PDF
  limits: { fileSize: 10 * 1024 * 1024 } // Límite de 10MB
});

export const subir = {
  Foto,
  PDF
};