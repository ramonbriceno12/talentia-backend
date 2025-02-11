const talentEmailTemplate = (name, email) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email</title>
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
        padding: 10px 20px;
        border-radius: 5px;
        display: inline-block;
        margin-top: 20px;
      }

      .calendly-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #006bff;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
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
                <h2 style="">¡Hola ${name}!</h2>
                <p style="font-size: 16px; color: #333;">
                  Hemos recibido tu información y tu currículum correctamente. 🎉  
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3 style="color: #333;">🎯 Checklist de Optimización Profesional</h3>
                <p style="font-size: 21px; color: #666;">
                  Te dejamos un **checklist en PDF** con los pasos clave para mejorar tu perfil profesional.  
                  <strong>Si deseas que nosotros lo hagamos por ti, guiándote en cada paso, <a href="https://talentiave.com/actions/calendly-link?email=${email}&name=${name}">agenda una reunión con nosotros</a>.</strong>
                  ¡Será un placer conocerte y explorar nuevas oportunidades juntos!
                </p>
                <p style="font-size: 21px; color: #333;">
                  Actualmente, tu perfil está en proceso de revisión. En un plazo de **2-3 días**, optimizaremos tu bio y estarás publicado en la sección de talentos de **Talentia**.  
                  Puedes ver la sección aquí: <a href="https://talentiave.com/talents" style="color: #006bff; text-decoration: none;">Talentos Talentia</a>.  
                </p>
                
                <p style="font-size: 14px; color: #666;">
                  Haz clic en el siguiente botón para elegir un horario disponible:
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <a href="https://talentiave.com/assets/pdf/Checklist_Optimizacion_Profesional.pdf" class="button" style="color: white !important;">
                  📥 Descargar Checklist
                </a>
                <br>
                <a href="https://talentiave.com/actions/calendly-link?email=${email}&name=${name}" class="calendly-button" style="color: white !important;">
                  📅 Agendar una reunión
                </a>

                <p style="font-size: 14px; color: #666; margin-top: 10px;">
                  **📌 <strong>Descripción de la reunión:</strong>** La sesión de 20-30 minutos es una oportunidad para recibir asesoramiento personalizado. Nuestro experto analizará tu perfil y te brindará sugerencias para optimizar tu CV, mejorar tu presencia en línea y aumentar tus oportunidades laborales.
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

module.exports = talentEmailTemplate;
