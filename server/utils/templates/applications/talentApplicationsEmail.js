const talentAppliedEmailTemplate = (talentName, companyName, jobTitle) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Aplicación Exitosa - Talentia</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #244c56;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h2, h3 {
      color: #244c56;
    }
    p {
      color: #555;
      font-size: 16px;
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      background-color: #349390;
      color: white !important;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 5px;
      margin-top: 15px;
      font-weight: bold;
    }
    .plan-box {
      background: #f9f9f9;
      border-radius: 10px;
      padding: 15px;
      text-align: left;
      margin: 15px auto;
      width: 90%;
      max-width: 500px;
      border: 1px solid #ddd;
    }
    .plan-title {
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }
    .plan-features {
      color: #555;
      padding-left: 20px;
      font-size: 14px;
    }
    .footer {
      font-size: 12px;
      color: #ccc;
      margin-top: 25px;
      text-align: center;
    }
  </style>
</head>
<body>
  <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;background:white;border-radius:10px;padding:20px;">
          <tr>
            <td align="center">
              <h2>🎉 ¡Aplicación Exitosa!</h2>
              <p>Hola, <strong>${talentName}</strong>, hemos recibido tu aplicación para el puesto de <strong>${jobTitle}</strong> en <strong>${companyName}</strong>.</p>
              <p>Tu información ya está en manos de la empresa. Ellos revisarán tu perfil y te contactarán si tu experiencia y habilidades coinciden con lo que están buscando.</p>

              <hr style="margin: 20px 0;border:none;border-top:1px solid #ddd;" />

              <h3>🔎 Próximos pasos</h3>
              <p>Mientras tanto, puedes seguir explorando otras oportunidades increíbles en nuestro sitio web:</p>
              <a href="https://talentiave.com/talents" class="button">Ver más ofertas</a>

              <hr style="margin: 20px 0;border:none;border-top:1px solid #ddd;" />

              <h3>🚀 Destaca aún más con nuestro <strong>Plan Premium</strong></h3>
              <div class="plan-box">
                <div class="plan-title">🎯 Plan Talento</div>
                <ul class="plan-features">
                  <li>✅ Optimización profesional de CV y LinkedIn.</li>
                  <li>✅ Asesoría personalizada para entrevistas.</li>
                  <li>✅ Acceso exclusivo a vacantes destacadas.</li>
                  <li>✅ Recomendaciones personalizadas.</li>
                  <li>✅ Mayor visibilidad ante empresas.</li>
                </ul>
                <a href="https://calendly.com/contacto-talentiave/" class="button">📆 Agendar sesión</a>
              </div>

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

module.exports = talentAppliedEmailTemplate;
