<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head><title>Sitemap</title></head>
      <body>
        <h1>Sitemap</h1>
        <table border="1" cellpadding="3">
          <tr><th>URL</th><th>Last mod</th></tr>
          <xsl:for-each select="urlset/url">
            <tr>
              <td><xsl:value-of select="loc"/></td>
              <td><xsl:value-of select="lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>