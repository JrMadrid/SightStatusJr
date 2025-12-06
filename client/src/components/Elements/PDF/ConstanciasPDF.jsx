/* COMPONENTE QUE GUARDA EN PDF TODAS LAS CONSTANCIAS */
import fetchData from '../../../api/fetchConfig';
import pdfMake from 'pdfmake/build/pdfmake';
import { toast } from 'react-hot-toast';
import '../../css/PDF.css';

const PDFConstancias = async (eco) => {
  try {
    // Pedir todas las constancias a la API
    const url = `/informe/mantes/constancias/${eco}`;
    const constancias = await fetchData(url);
    if (!constancias || constancias.length === 0) throw new Error('No hay constancias disponibles');

    toast('Procesando constancias...', { position: 'bottom-right' });

    // Función para convertir buffer a Base64 + escala de grises + compresión
    const convertBufferToGrayscale = (buffer) => {
      return new Promise((resolve, reject) => {
        try {
          const uint8Array = new Uint8Array(buffer.data); // Convertir buffer a Uint8Array
          const blob = new Blob([uint8Array], { type: 'image/jpeg' });
          const reader = new FileReader();

          reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Reducir resolución para optimizar peso
              const scale = 0.7; // 70% del tamaño original
              canvas.width = img.width * scale;
              canvas.height = img.height * scale;

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Convertir a escala de grises
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const pixels = imageData.data;
              for (let i = 0; i < pixels.length; i += 4) {
                const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                pixels[i] = avg;
                pixels[i + 1] = avg;
                pixels[i + 2] = avg;
              }
              ctx.putImageData(imageData, 0, 0);

              // Convertir a JPEG con compresión 80%
              const grayscaleBase64 = canvas.toDataURL('image/jpeg', 0.8);
              resolve(grayscaleBase64);
            };

            img.onerror = reject;
          };

          reader.onerror = reject;
          reader.readAsDataURL(blob);
        } catch (error) {
          reject(error);
        }
      });
    };

    // Convertir todas las imágenes en paralelo
    const base64Images = await Promise.all(
      constancias.map((img) => convertBufferToGrayscale(img))
    );

    // Crear PDF con todas las imágenes
    const docDefinition = {
      pageSize: { width: 612, height: 792 }, // Tamaño carta
      pageMargins: [0, 0, 0, 0],
      content: base64Images.map((image, index) => ({
        image,
        width: 612,
        height: 792,
        alignment: 'center',
        pageBreak: index < base64Images.length - 1 ? 'after' : undefined,
      })),
    };

    pdfMake.createPdf(docDefinition).download(`Constancias_${eco}.pdf`);
    toast.success('Constancias descargadas correctamente', { position: 'bottom-right' });

  } catch (error) {
    console.error('Error al descargar constancias:', error);
    toast.error(error.message || 'Error al generar PDF');
  }
};

export default PDFConstancias;