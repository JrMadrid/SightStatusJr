/* MIDDLEWARE PARA LOS MULTER */
import multer from "multer";

// Manejador de errores de multer
export const multerErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    // Errores de tamaño de archivo (válido para fotos y PDFs)
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "El archivo supera el tamaño permitido."
      });
    }
    // Errores de tipo (filter): imágenes o PDFs incorrectos
    if (err.message && err.message.includes("Solo se permiten")) {
      return res.status(400).json({ message: err.message });
    }
    // Errores inesperados
    return res.status(500).json({ message: "Error interno del servidor" });
  });
};