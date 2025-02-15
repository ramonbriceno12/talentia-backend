const resumeImprovementEmailTemplate = (talentName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>🔥 Oferta Especial: Mejora tu Perfil Profesional 🚀</title>
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
                <h2>🚨 ¡Oferta Especial para Ti, ${talentName}! 🚨</h2>
                <p>Hemos analizado tu perfil y tiene una efectividad de <span class="highlight">${Math.floor(Math.random() * 20) + 1}%</span>. Esto podría estar limitando tus oportunidades laborales. 📉</p>
                
                <p>🔎 Razones por las que podrías estar perdiendo oportunidades:</p>
                <ul class="plan-features">
                  <li>❌ Tu CV no tiene las palabras clave que buscan las empresas.</li>
                  <li>❌ Falta de estructura y presentación profesional.</li>
                  <li>❌ LinkedIn sin optimizar ni llamar la atención de reclutadores.</li>
                  <li>❌ Portafolio inexistente o poco atractivo.</li>
                </ul>

                <h3>🔥 ¡Aprovecha esta oportunidad y mejora tu perfil! 🔥</h3>

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
                      <a href="https://calendly.com/contacto-talentiave/optimizacion-de-perfil-profesional" class="button">📆 Agendar sesión</a>
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
                      <a href="https://calendly.com/contacto-talentiave/30min" class="button">📆 Agendar sesión</a>
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
                      <a href="https://calendly.com/contacto-talentiave/company-onboarding-meeting" class="button">📆 Agendar sesión</a>
                    </td>
                  </tr>
                </table>

                <p>⚡ ¡No dejes pasar esta oportunidad! Mejora tu perfil y aumenta tus oportunidades laborales. 🚀</p>

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

module.exports = resumeImprovementEmailTemplate;
