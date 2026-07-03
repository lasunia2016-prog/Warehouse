import { createClient } from "@supabase/supabase-js";

// Conexión a tu base de datos
const supabaseUrl = "https://sdagwbhgpmqggxblairs.supabase.co";
const supabaseKey = "sb_publishable_YYQCQ4KspjPKcQ0pQ8EJhA_3kiiB1A2"; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Asegurarnos de que solo acepte peticiones POST (cuando Twilio envía datos)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Twilio manda la info del mensaje en req.body
  const mensajeCliente = req.body.Body || "Consulta sin texto";
  const numeroCliente = req.body.From || "Desconocido";

  // 1. Guardar el mensaje en tu base de datos (Supabase)
  const { error } = await supabase
    .from('consultas')
    .insert([
      {
        cliente: numeroCliente.replace('whatsapp:', ''), // Limpiamos el texto "whatsapp:"
        nombre: "Cliente WhatsApp",
        producto: mensajeCliente, // Para esta demo, guardamos el mensaje principal aquí
        cantidad: "1",
        urgencia: "Esta semana",
        estado: "Nueva",
        mensaje: mensajeCliente,
        // Generamos la hora actual de Chile
        recibido: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }) 
      }
    ]);

  if (error) {
    console.error("Error guardando en Supabase:", error);
  }

  // 2. Crear la respuesta automática para WhatsApp usando el formato XML (TwiML)
  const twiml = `
    <Response>
      <Message>¡Hola! Hemos recibido tu mensaje: "${mensajeCliente}". Como nos contactas fuera del horario laboral, tu consulta quedó registrada de forma automática en nuestro sistema. Te contactaremos mañana a primera hora hábil. ¡Gracias!</Message>
    </Response>
  `;

  // 3. Enviar la respuesta de vuelta a Twilio
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml);
}