 const Html = ({ body, styles, title, script }) => `
 <!DOCTYPE html>
 <html>
   <head>
     <title>${title}</title>
     ${styles}
   </head>
   <body>
     <div id="main">${body}</div>
     <script type='text/javascript' src='${script}'></script>
   </body>
 </html>
`;

export default Html;