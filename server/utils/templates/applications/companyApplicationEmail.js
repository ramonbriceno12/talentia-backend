const companyApplicationEmailTemplate = (companyName, jobTitle, talentName, talentEmail) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nueva Aplicación Recibida - Talentia</title>
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
              <h2>📨 ¡Nueva Aplicación Recibida!</h2>
              <p>Hola, <strong>${companyName}</strong>, has recibido una nueva aplicación para el puesto de <strong>${jobTitle}</strong>.</p>
              <p>El talento <strong>${talentName} - ${talentEmail}</strong> ha aplicado a tu vacante. Revisa su perfil y currículum para determinar si cumple con los requisitos del puesto.</p>

              <hr style="margin: 20px 0;border:none;border-top:1px solid #ddd;" />

              <h3>🔎 Revisa la aplicación</h3>
              <p>Puedes acceder a la aplicación directamente desde tu panel de control en Talentia:</p>
              <a href="https://talentiave.com/company/dashboard" class="button">Ver aplicación</a>

              <hr style="margin: 20px 0;border:none;border-top:1px solid #ddd;" />

              <h3>🚀 Encuentra más talentos con nuestro <strong>Plan Empresa</strong></h3>
              <div class="plan-box">
                <div class="plan-title">🎯 Plan Empresa</div>
                <ul class="plan-features">
                  <li>✅ Acceso a una base de datos de talentos calificados.</li>
                  <li>✅ Publicación ilimitada de vacantes.</li>
                  <li>✅ Herramientas avanzadas de filtrado y búsqueda.</li>
                  <li>✅ Soporte prioritario para reclutadores.</li>
                  <li>✅ Promoción de vacantes destacadas.</li>
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

module.exports = companyApplicationEmailTemplate;