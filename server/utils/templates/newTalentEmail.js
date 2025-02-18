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
        font-family: Arial, sans-serif;
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
      }

      .button {
        background: #349390;
        color: white;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 5px;
        display: inline-block;
        margin-top: 15px;
        font-size: 16px;
        font-weight: bold;
      }

      .plan-box {
        background: #f9f9f9;
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 15px;
      }

      .plan-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }

      .plan-description {
        font-size: 14px;
        color: #555;
        margin-bottom: 10px;
      }

      .plan-features {
        text-align: left;
        padding-left: 20px;
        font-size: 14px;
        color: #333;
      }

      .plan-features li {
        margin-bottom: 5px;
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
                <h2>¡Hola ${name}!</h2>
                <p style="font-size: 16px; color: #333;">
                  Hemos recibido tu información y tu currículum correctamente. 🎉  
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3>📢 ¡Tu perfil estará disponible pronto!</h3>
                <p style="font-size: 16px; color: #333;">
                  Actualmente, tu perfil está en proceso de revisión. En breve, 
                  optimizaremos tu bio y estarás publicado en la sección de talentos de <strong>Talentia</strong>.  
                  Puedes ver la sección aquí: 
                  <a href="https://talentiave.com/talents" style="color: #006bff; text-decoration: none;">Talentos Talentia</a>.  
                </p>

                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                <h3>🚀 Mejora tu Perfil Profesional</h3>

                <!-- Plan Talento -->
                <table role="presentation" class="plan-box" width="100%">
                  <tr>
                    <td>
                      <div class="plan-title">🎯 Plan Talento</div>
                      <p class="plan-description">🔥 Optimiza tu perfil y destaca entre los mejores talentos.</p>
                      <ul class="plan-features">
                        <li>✅ Revisión y optimización de CV</li>
                        <li>✅ Mejora de perfil en LinkedIn</li>
                        <li>✅ Asesoría en portfolio y presencia online</li>
                        <li>✅ Entrenamiento para entrevistas</li>
                        <li>✅ Acceso a oportunidades exclusivas</li>
                        <li>✅ Recomendaciones personalizadas de vacantes</li>
                      </ul>
                      <a href="https://calendly.com/contacto-talentiave/" class="button" style="color:white !important;">📆 Agendar sesión</a>
                    </td>
                  </tr>
                </table>

                <!-- Plan Reclutador -->
                <table role="presentation" class="plan-box" width="100%">
                  <tr>
                    <td>
                      <div class="plan-title">📢 Plan Reclutador</div>
                      <p class="plan-description">🚀 Publicamos tu vacante y encontramos a los mejores candidatos.</p>
                      <ul class="plan-features">
                        <li>✅ Publicación de oferta en nuestra plataforma</li>
                        <li>✅ Difusión en redes sociales y canales especializados</li>
                        <li>✅ Selección y filtrado de candidatos</li>
                        <li>✅ Entrevistas pre-filtro y evaluación de habilidades</li>
                        <li>✅ Contacto directo con los mejores perfiles</li>
                        <li>✅ Reporte detallado de los mejores candidatos</li>
                      </ul>
                      <a href="https://calendly.com/contacto-talentiave/" class="button" style="color:white !important;">📆 Agendar sesión</a>
                    </td>
                  </tr>
                </table>

                <!-- Plan Empresa -->
                <table role="presentation" class="plan-box" width="100%">
                  <tr>
                    <td>
                      <div class="plan-title">🏢 Plan Empresa</div>
                      <p class="plan-description">💼 Gestionamos todas tus vacantes y encontramos el talento ideal para tu empresa.</p>
                      <ul class="plan-features">
                        <li>✅ Gestión completa del proceso de selección</li>
                        <li>✅ Creación y difusión de todas tus ofertas</li>
                        <li>✅ Evaluación técnica y cultural de candidatos</li>
                        <li>✅ Optimización del proceso de contratación</li>
                        <li>✅ Asesoría en estrategias de reclutamiento</li>
                        <li>✅ Soporte continuo y seguimiento post-contratación</li>
                      </ul>
                      <a href="https://calendly.com/contacto-talentiave/" class="button" style="color:white !important;">📆 Agendar sesión</a>
                    </td>
                  </tr>
                </table>

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
