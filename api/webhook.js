import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sdagwbhgpmqggxblairs.supabase.co";
const supabaseKey = "sb_publishable_YYQCQ4KspjPKcQ0pQ8EJhA_3kiiB1A2"; // Asegúrate de poner tu clave real aquí
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Twilio envía los datos en estos campos
  const mensajeCliente = req.body.Body || "Consulta sin texto";
  const numeroCliente = req.body.From || "Desconocido";

  // Insertar usando SOLO las columnas que confirmaste que existen
  const { error } = await supabase
    .from('consultas')
    .insert([
      {
        cliente: numeroCliente.replace('whatsapp:', ''), 
        nombre: "Cliente WhatsApp",
        producto: mensajeCliente, 
        cantidad: "1",
        urgencia: "Hoy",
        estado: "Nueva",
        mensaje: mensajeCliente
      }
    ]);

  if (error) {
    console.error("Error en Supabase:", error);
  }

  // Respuesta de vuelta a tu celular
  const twiml = `
    <Response>
      <Message>¡Hola! Tu consulta sobre "${mensajeCliente}" entró en nuestro sistema. Como estás fuera de horario laboral, un ejecutivo te atenderá el siguiente día hábil. ¡Gracias!</Message>
    </Response>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}