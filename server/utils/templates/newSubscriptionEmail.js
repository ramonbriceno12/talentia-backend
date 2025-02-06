const newSubscriptionEmail = (name, email) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tu Checklist Gratuito 📥</title>
    <style>
      body, .email-container {
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #244c56 !important;
        text-align: center;
      }

      .logo-container {
        padding: 30px 0;
        background-color: #244c56;
      }

      .logo {
        width: 150px;
        height: auto;
      }

      .email-content {
        width: 100%;
        max-width: 600px;
        background: white;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        font-family: Arial, sans-serif;
      }

      .button {
        background: #244c56;
        color: white;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 5px;
        display: inline-block;
        margin-top: 20px;
        font-size: 16px;
        font-weight: bold;
      }

      .calendly-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #006bff;
        color: white;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }

      .calendly-button img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

      .footer {
        font-size: 12px;
        color: #666;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-container" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" class="logo-container">
          <img src="http://talentiave.com/img/LOGO-01.png" alt="Talentia Logo" class="logo">
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px;">
          <table role="presentation" class="email-content" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td>
                <h2 style="color: #333;">¡Hola ${name}!</h2>
                <p style="font-size: 16px; color: #333;">
                  Gracias por solicitar tu **Checklist de Optimización Profesional**. 🎉  
                </p>

                <p style="font-size: 14px; color: #666;">
                  En este documento encontrarás estrategias clave para mejorar tu perfil profesional, destacar frente a los reclutadores y aumentar tus oportunidades laborales.
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3 style="color: #333;">📥 Descarga tu Checklist</h3>
                <p style="font-size: 14px; color: #666;">
                  Haz clic en el siguiente botón para descargar el checklist en PDF:
                </p>

                <a href="https://talentiave.com/assets/pdf/Checklist_Optimizacion_Profesional.pdf" class="button" style="color: white !important;">
                  📥 Descargar Checklist
                </a>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3 style="color: #333;">💡 ¿Necesitas ayuda para implementarlo?</h3>
                <p style="font-size: 14px; color: #666;">
                  Sabemos que aplicar todos estos cambios puede ser abrumador. Si quieres ayuda personalizada para optimizar tu CV y mejorar tu presencia profesional,  
                  **te invitamos a una sesión 1-1 gratuita** con nuestro equipo.
                </p>

                <p style="font-size: 14px; color: #666;">
                  Haz clic en el siguiente botón para elegir un horario disponible:
                </p>

                <a href="https://talentiave.com/actions/calendly-link?email=${email}&name=${name}" class="calendly-button" style="color: white !important;">
                  📅 Agendar una reunión
                </a>

                <p style="font-size: 14px; color: #666; margin-top: 10px;">
                  **📌 <strong>Descripción de la reunión:</strong>** En esta sesión gratuita de 20-30 minutos, analizaremos tu perfil y te brindaremos sugerencias para mejorar tu CV, optimizar tu LinkedIn y aumentar tus oportunidades laborales.
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <a href="https://talentiave.com" class="button" style="color: white !important;">Visitar Talentia</a>

                <p class="footer">
                  © ${new Date().getFullYear()} Talentia. Todos los derechos reservados.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

module.exports = newSubscriptionEmail;
