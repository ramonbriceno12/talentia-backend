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

      .footer {
        font-size: 12px;
        color: #666;
        margin-top: 20px;
      }

      .price-box {
        background: #fff9c4;
        padding: 20px;
        margin: 15px 0;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
      }

      .old-price {
        text-decoration: line-through;
        color: #d9534f;
        font-size: 20px;
      }

      .new-price {
        color: #28a745;
        font-size: 24px;
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
                <h2>¡Hola ${name}!</h2>
                <p style="font-size: 16px; color: #333;">
                  Hemos recibido tu información y tu currículum correctamente. 🎉  
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3 style="color: #333;">🎯 Checklist de Optimización Profesional</h3>
                <p style="font-size: 16px; color: #666;">
                  Te dejamos un <strong><a style="" href="https://talentiave.com/assets/pdf/Checklist_Optimizacion_Profesional.pdf">checklist en PDF</a></strong> con los pasos clave para mejorar tu perfil profesional.  
                  <strong>Si deseas que nosotros lo hagamos por ti, guiándote en cada paso, <a href="https://talentiave.com/actions/calendly-link?email=${email}&name=${name}">agenda una reunión con nosotros</a>.</strong>
                  ¡Será un placer conocerte y explorar nuevas oportunidades juntos!
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3>📢 ¡Tu perfil estará disponible pronto!</h3>
                <p style="font-size: 16px; color: #333;">
                  Actualmente, tu perfil está en proceso de revisión. En un plazo de <strong>2-3 días</strong>, 
                  optimizaremos tu bio y estarás publicado en la sección de talentos de <strong>Talentia</strong>.  
                  Puedes ver la sección aquí: 
                  <a href="https://talentiave.com/talents" style="color: #006bff; text-decoration: none;">Talentos Talentia</a>.  
                </p>

                <p style="font-size: 14px; color: #666;">
                  **Mientras tanto, ¿quieres mejorar aún más tu perfil?** 🚀 Echa un vistazo a nuestras opciones profesionales:
                </p>

                <h3>🚀 Mejora tu Perfil Profesional con Nuestros Planes</h3>

                <div class="price-box">
                  ✅ <strong>Actualización de CV</strong>  
                  <br>✏️ <span class="old-price">$30</span> → <span class="new-price">$15</span>  
                  <br>🔹 Optimización de contenido y formato profesional.
                  <br><a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color:white !important;">📆 Agendar Ahora</a>
                </div>

                <div class="price-box">
                  ✅ <strong>CV + LinkedIn + Portafolio</strong>  
                  <br>💼 <span class="old-price">$50</span> → <span class="new-price">$30</span>  
                  <br>🔹 Mejora tu presencia profesional en todas las plataformas clave.
                  <br><a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color:white !important;">📆 Agendar Ahora</a>
                </div>

                <div class="price-box">
                  ✅ <strong>Creación Completa (CV + LinkedIn + Portafolio Online)</strong>  
                  <br>🌐 <span class="old-price">$100</span> → <span class="new-price">$50</span>  
                  <br>🔹 Creamos todo desde cero con un portafolio web personalizado.
                  <br>🔹 <strong>¡Además, te ayudamos con tu búsqueda de empleo!</strong>  
                  <br>📌 Te guiamos en cada paso para aplicar a oportunidades que se ajusten a tu perfil.
                  <br><a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color:white !important;">📆 Agendar Ahora</a>
                </div>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

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
