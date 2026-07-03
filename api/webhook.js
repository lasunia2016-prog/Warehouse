import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sdagwbhgpmqggxblairs.supabase.co";
const supabaseKey = "sb_publishable_YYQCQ4KspjPKcQ0pQ8EJhA_3kiiB1A2"; // RECUERDA PONER TU CLAVE
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const mensajeCliente = req.body.Body || "";
  const numeroCliente = req.body.From || "Desconocido";

  let twiml = '';

  // Verificamos si el cliente está enviando el formulario lleno
  const esFormulario = mensajeCliente.toLowerCase().includes("producto:") && 
                       mensajeCliente.toLowerCase().includes("cantidad:");

  if (esFormulario) {
    // Extraemos los datos línea por línea
    const lineas = mensajeCliente.split('\n');
    let prod = "No especificado";
    let cant = "1";
    let urg = "Normal";

    lineas.forEach(linea => {
      const l = linea.toLowerCase();
      if(l.startsWith("producto:")) prod = linea.substring(9).trim();
      if(l.startsWith("cantidad:")) cant = linea.substring(9).trim();
      if(l.startsWith("urgencia:")) urg = linea.substring(9).trim();
    });

    // Guardamos los datos exactos en Supabase
    await supabase.from('consultas').insert([{
      cliente: numeroCliente.replace('whatsapp:', ''),
      nombre: "Cliente WhatsApp",
      producto: prod,
      cantidad: cant,
      urgencia: urg,
      estado: "Nueva",
      mensaje: mensajeCliente
    }]);

    twiml = `
      <Response>
        <Message>¡Excelente! Hemos registrado tu solicitud por ${cant} unidades de ${prod}. Te contactaremos en el siguiente día hábil. ¡Gracias!</Message>
      </Response>
    `;
  } else {
    // Si escribe normal, le mandamos el formulario de respuesta
    twiml = `
      <Response>
        <Message>¡Hola! Te comunicas fuera de nuestro horario. Para ingresar tu consulta a nuestro sistema, por favor copia el siguiente texto, complétalo y envíalo:

Producto: 
Cantidad: 
Urgencia: </Message>
      </Response>
    `;
  }

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}