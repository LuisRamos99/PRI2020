<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arqweb/index.html">
            
            
            <html>
                <head>
                    <title>Arqueossítios do NW português</title>
                </head>
                <body bgcolor="#ccffff">
                    <h2>Arqueossítios do NW português</h2>
                    <h3>Índice</h3>
                    <ol>
                        <xsl:apply-templates mode="indice" select="//ARQELEM">
                            <xsl:sort lang="PT" select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>             
                </body>    
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="paginas" select="//ARQELEM">
            <xsl:sort lang="PT" select="IDENTI"/>
        </xsl:apply-templates>
    </xsl:template>
    
    
    
    
    
    
    
    <!--     Templates para o indice      -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li style="margin-top:20px">
            <a href="http://localhost:7777/arqs/{position()}">
                <xsl:value-of select="IDENTI"/>
                -
                <xsl:value-of select="CONCEL"/>             
            </a>
        </li>
    </xsl:template>
    
    
    <!--     Templates para o conteudo      -->
    
    <xsl:template match="ARQELEM" mode="paginas">
        <xsl:result-document href="arqweb/{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body bgcolor="#ccffff">
                    
                    <xsl:if test="IMAGEM">
                        <img src="../imagens/{IMAGEM/@NOME}" style="float: right; margin-right: 10%; margin-top: 2%; width: 30%"/>
                    </xsl:if>
                    
                    <h1><xsl:value-of select="IDENTI"/></h1>
                              
                    <p><b>Tipo</b>: <xsl:value-of select="TIPO/@ASSUNTO"/></p>
                                     
                    <p><b>Descrição</b>: <xsl:apply-templates select="DESCRI"/></p>
                    
                    <xsl:if test="LUGAR!=''">
                        <p><b>Lugar</b>: <xsl:value-of select="LUGAR"/></p>
                    </xsl:if>
                    
                    <p><b>Freguesia</b>: <xsl:value-of select="FREGUE"/></p>
                    
                    <p><b>Concelho</b>: <xsl:value-of select="CONCEL"/></p>
                    
                    <p><b>Latitude</b>: <xsl:value-of select="LATITU"/></p>
                    
                    <p><b>Longitude</b>: <xsl:value-of select="LONGIT"/></p>
                    
                    <p><b>Altitude</b>: <xsl:value-of select="ALTITU"/></p>
                    
                    <xsl:if test="CODADM">
                        <p><b>Codadm</b>: <xsl:value-of select="CODADM"/></p>
                    </xsl:if>
                    
                    <xsl:if test="CRONO">
                        <p><b>Cronologia</b>: <xsl:value-of select="CRONO"/></p>
                    </xsl:if>
                    
                    <xsl:if test="ACESSO">
                        <p><b>Acesso</b>: <xsl:apply-templates select="ACESSO"/></p>
                    </xsl:if>
                    
                    <xsl:if test="QUADRO">
                        <p><b>Quadro</b>: <xsl:apply-templates select="QUADRO"/></p>
                    </xsl:if>
                    
                    <xsl:if test="TRAARQ">
                        <p><b>Trabalhos arqueológicos</b>: <xsl:value-of select="TRAARQ"/></p>
                    </xsl:if>
                    
                    <xsl:if test="INTERE">
                        <p><b>Interesse</b>: <xsl:value-of select="INTERE"/></p>
                    </xsl:if>
                    
                    <xsl:if test="DESARQ">
                        <p><b>Descrição arqueológica</b>: <xsl:apply-templates select="DESARQ"/></p>
                    </xsl:if>
                    
                    <xsl:if test="INTERP">
                        <p><b>Interpretação</b>:  <xsl:apply-templates select="INTERP"/></p>
                    </xsl:if>
                    
                    <xsl:if test="DEPOSI">
                        <p><b>Depósito</b>: <xsl:value-of select="DEPOSI"/></p>
                    </xsl:if>
                    
                    <xsl:if test="BIBLIO">
                        <p><b>Bibliografia</b>:</p>
                    </xsl:if>
                    <ul>
                        <xsl:for-each select="BIBLIO">
                            <li><xsl:apply-templates select="."/><br/></li>
                        </xsl:for-each>
                    </ul>
                    
                    <p><b>Autor</b>: <xsl:value-of select="AUTOR"/></p>
                    
                    <xsl:apply-templates select="DATA"/>
                    
                    <address style="text-align: center; font-size:20; margin-bottom:30px;">
                        [<a href="http://localhost:7777/arqs/*">Voltar ao indice</a>]
                    </address>
                </body> 
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    <!--     Templates para a tag LIGA      -->
    
    <xsl:template match="LIGA">
        <xsl:choose>
            <xsl:when test="@TERMO='povoado fortificado'">
                <i style="color: red">
                    <xsl:value-of select="."/>
                </i>
            </xsl:when>
            <xsl:when test="@TERMO='tégula'">
                <i style="color: blue">
                    <xsl:value-of select="."/>
                </i>
            </xsl:when>
            <xsl:otherwise>
                <i style="color: green">
                    <xsl:value-of select="."/>
                </i>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    
    <!--     Templates para a data     -->
    
    <xsl:template match="DATA">
        <b style="font-size:16; float:right; margin:10px">
            (<xsl:value-of select="."/>)
        </b>     
    </xsl:template>
    
    
</xsl:stylesheet>