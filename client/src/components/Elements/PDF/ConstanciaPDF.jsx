/* COMPONENTE QUE GUARDA EN PDF LA CONSTANCIA SELECCIONADA */
import jsPDF from 'jspdf';
import { Toaster, toast } from 'react-hot-toast';
import { FormatearFecha } from '../../Elements/date';
import '../../css/PDF.css';

const PDFConstancia = ({ imageBlob, eco, title, fechaco }) => {
  const fechacons = FormatearFecha(fechaco);

  // Función para generar el PDF a partir del blob (sin filtros ni conversiones)
  const downloadPDF = async () => {
    try {
      if (!imageBlob) {
        alert('No se pudo obtener la constancia. Intente nuevamente.');
        return;
      }

      // Crear URL temporal de la imagen
      const imageURL = URL.createObjectURL(imageBlob);

      // Crear documento PDF tamaño carta
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter', // tamaño carta
      });

      // Dimensiones del PDF
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Insertar la imagen ocupando toda la página
      pdf.addImage(imageURL, 'JPEG', 0, 0, pageWidth, pageHeight);

      // Generar nombre del archivo
      const filename = `${title.replace(/\s+/g, '_')}_${eco}_${fechacons}.pdf`;

      // Guardar PDF
      pdf.save(filename);

      // Liberar URL temporal
      URL.revokeObjectURL(imageURL);

      // Notificación
      toast.success(`Documento guardado correctamente (${fechacons})`, {
        position: 'bottom-right',
      });

    } catch (error) {
      console.error('Error al generar el PDF:', error);
      toast.error(error.message || 'Error al generar el documento');
    }
  };

  return (
    <>
      <button onClick={downloadPDF} className="pdfSelected">
        Guardar Documento
      </button>
      <Toaster />
    </>
  );
};

export default PDFConstancia;