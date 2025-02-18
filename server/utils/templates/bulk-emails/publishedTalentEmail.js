const talentVisibilityEmailTemplate = (talentName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>🎉 ¡Tu Perfil Está Público en Talentiave! 🚀</title>
    <style>
      body, .email-container {
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #244c56 !important;
        text-align: center;
        font-family: Arial, sans-serif;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 600px;
        margin: auto;
        text-align: center;
      }

      .button {
        background: #349390;
        color: white;
        text-decoration: none;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
        font-weight: bold;
        margin-top: 15px;
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

      .highlight {
        font-size: 26px;
        font-weight: bold;
        color: #d9534f;
      }

      .footer {
        font-size: 12px;
        color: #666;
        margin-top: 25px;
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-container" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding: 20px;">
          <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td>
                <h2>🎉 ¡Felicidades, ${talentName}! 🎉</h2>
                <p>Tu perfil ahora es visible en <strong><a href="https://talentiave.com/talents">Talentiave</a></strong>, conectándote con empresas que buscan talento como el tuyo. 🚀</p>
                
                <p>💡 Para destacar aún más y aumentar tus posibilidades de ser contactado, revisa estos puntos clave:</p>
                <ul class="plan-features">
                  <li>✅ Asegúrate de que tu CV está optimizado y actualizado.</li>
                  <li>✅ Potencia tu perfil de LinkedIn con palabras clave estratégicas.</li>
                  <li>✅ Muestra un portafolio sólido si eres diseñador, desarrollador o marketero.</li>
                  <li>✅ Prepárate para entrevistas con un enfoque profesional.</li>
                </ul>

                <h3>📈 ¿Quieres maximizar tus oportunidades laborales?</h3>

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

                <p>⚡ ¡Aprovecha tu visibilidad en Talentiave y da el siguiente paso en tu carrera! 🚀</p>

                <p class="footer">© ${new Date().getFullYear()} Talentia. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

module.exports = talentVisibilityEmailTemplate;
