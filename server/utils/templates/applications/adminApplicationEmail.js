const adminApplicationEmailTemplate = (talentName, jobTitle, companyName) => `
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
              <h2>📨 Nueva Aplicación Recibida</h2>
              <p>Se ha recibido una nueva aplicación en Talentia:</p>

              <div style="text-align: left; margin: 20px 0;">
                <p><strong>Talent:</strong> ${talentName}</p>
                <p><strong>Puesto:</strong> ${jobTitle}</p>
                <p><strong>Empresa:</strong> ${companyName}</p>
              </div>

              <p>Puedes revisar los detalles de la aplicación en el siguiente enlace:</p>
              <a href="https://talentiave.com/admin/applications" class="button">Ver aplicación</a>

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

module.exports = adminApplicationEmailTemplate;