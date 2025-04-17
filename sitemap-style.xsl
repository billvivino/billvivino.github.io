<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
      exclude-result-prefixes="s">

  <xsl:output method="html" indent="yes"/>

  <!-- =====  TEMPLATE  ===== -->
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap</title>
        <style>
          body{font-family:Arial,Helvetica,sans-serif;margin:1rem}
          table{border-collapse:collapse;font-size:0.9rem}
          th,td{border:1px solid #999;padding:6px 10px}
          th{background:#f0f0f0;text-align:left}
        </style>
      </head>
      <body>
        <h1>Sitemap</h1>
        <table>
          <tr><th>URL</th><th>Last&nbsp;mod</th></tr>
          <xsl:for-each select="s:urlset/s:url">
            <tr>
              <td><xsl:value-of select="s:loc"/></td>
              <td><xsl:value-of select="s:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>