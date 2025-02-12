const resumeImprovementEmailTemplate = (talentName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>🔥 Oferta Especial: Mejora tu Perfil Profesional 🚀</title>
    <style>
      body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px; }
      .container { background: white; padding: 30px; border-radius: 10px; max-width: 650px; margin: auto; }
      .button { background: #244c56; color: white; text-decoration: none; padding: 15px 25px; font-size: 20px; border-radius: 5px; display: inline-block; font-weight: bold; margin-top: 15px; }
      .logo-container { text-align: center; padding-bottom: 20px; }
      .logo { width: 160px; display: block; margin: 0 auto; }
      .footer { font-size: 14px; color: #666; margin-top: 25px; }
      .highlight { font-size: 26px; font-weight: bold; color: #d9534f; }
      .price-box { background: #fff9c4; padding: 20px; margin: 15px 0; border-radius: 8px; font-size: 20px; font-weight: bold; }
      .old-price { text-decoration: line-through; color: #d9534f; font-size: 22px; }
      .new-price { color: #28a745; font-size: 26px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>🚨 ¡Oferta Especial para Ti, ${talentName}! 🚨</h2>
      <p>Hemos analizado tu perfil y tiene una efectividad de <span class="highlight">${Math.floor(Math.random() * 20) + 1}%</span>. Esto podría estar limitando tus oportunidades laborales. 📉</p>
      
      <p>🔎 Razones por las que podrías estar perdiendo oportunidades:</p>
      <ul style="text-align: left; display: inline-block; font-size: 18px;">
        <li>❌ Tu CV no tiene las palabras clave que buscan las empresas.</li>
        <li>❌ Falta de estructura y presentación profesional.</li>
        <li>❌ LinkedIn sin optimizar ni llamar la atención de reclutadores.</li>
        <li>❌ Portafolio inexistente o poco atractivo.</li>
      </ul>

      <h3>🔥 ¡Aprovecha esta promoción por tiempo limitado! 🔥</h3>

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
        <br><a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color:white !important;">📆 Agendar Ahora</a>
      </div>

      <p>⚡ ¡No dejes pasar esta oferta! Mejora tu perfil y aumenta tus oportunidades laborales. 🚀</p>

      <p class="footer">© ${new Date().getFullYear()} Talentia. Todos los derechos reservados.</p>
    </div>
  </body>
  </html>
`;

module.exports = resumeImprovementEmailTemplate;
