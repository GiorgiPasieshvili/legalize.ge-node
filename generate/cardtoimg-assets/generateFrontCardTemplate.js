import * as fs from "fs";
const fontGalaktioni = fs.readFileSync("./assets/fonts/DMGalaktioni.ttf");
const base64Galaktioni = new Buffer.from(fontGalaktioni).toString('base64');

const generateCardTemplateGe = function () {
  return `
  <html>
  <style>
    @import url("http://cdn.web-fonts.ge/fonts/bpg-nino-mtavruli-bold/css/bpg-nino-mtavruli-bold.min.css");
    @import url("http://cdn.web-fonts.ge/fonts/bpg-square-banner-2013/css/bpg-square-banner-2013.min.css");
    @import url("http://cdn.web-fonts.ge/fonts/bpg-square-banner-caps-2013/css/bpg-square-banner-caps-2013.min.css");
    
    @font-face {
      font-family: 'DM Galaktioni';
        src: url('data:woff2;charset=utf-8;base64,${base64Galaktioni}') format('woff2');
      }

    body{
      width: 505px;
      height: 802.5px;
    }
   
    /* Card Styles */
    .card-side {
      font-family: "BPG Nino Mtavruli Bold", sans-serif;
      width: 500.775px;
      height: 802.5px;
      border: 2px solid #ddd;
      color: #161616;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    }

    .card-side * {
      font-family: inherit;
      font-weight: 400;
      margin: 0;
      padding: 0;
      line-height: 1;
    }
    
    .cannabis-img {
      position: absolute;
      right: -14%;
      top: -8%;
      width: 300px;
      height: 300px;
      opacity: 0.15;
      transform: rotate(210deg);
    }
    
    .cannabis-img2 {
      position: absolute;
      left: 9.5%;
      top: 11.5%;
      width: 180px;
      height: 180px;
      opacity: 0.26;
    }
    
    .statue-img {
      position: absolute;
      left: 16%;
      top: 4%;
      width: 100%;
      height: 100%;
      opacity: 0.26;
      z-index: -1;
    }
    
    .card-header {
      background-color: transparent;
      border: 0;
      padding: 50px 0 0 40px;
      margin-bottom: 5rem;
    }
    
    .card-header h3 {
      font-size: 27px;
      margin-bottom: 1rem;
    }
    
    .card-header span {
      font-size: 21px;
      color: #6EAC43;
    }
    
    .card-main {
      padding:0 40px;
      flex: 1;
    }
    
    .card-main span {
      font-family: "BPG Square Banner 2013", sans-serif;
      font-size: 12.5px;
      opacity: 0.5;
    }
    
    .card-main h4 {
      font-size: 27.5px;
      margin: 14px 0 60px;
    }
    
    .bedges {
      display: flex;
      flex-direction: column-reverse;
      position: absolute;
      left: 40px;
      bottom: 150px;
    }
    
    .bedges img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      background: #fff;
      margin-top: -1.5rem;
    }
    
    .profile-img {
      display: block;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      right: 60px;
      top: 435px;
      -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
      filter: grayscale(100%);
    }
    
    .qrcode-img {
      width: 105px;
      height: 105px;
      object-fit: cover;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-60%);
    }
    
    .card-footer {
      height: 135px;
      background-color: #6EAC43;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card-footer:last-child {
      border-radius: 0;
    }
    
    .card-footer h2{
      font-family: DM Galaktioni;
      font-size: 41px;
      font-weight: bold;
      // letter-spacing: 1px;
      color: #000;
      margin-bottom: 2.3rem;
    }
    
  </style>

  <body>
    <div class="card-side">
    <img class="cannabis-img" src="{{cannabisImg}}" alt="cannabis">
    <img class="cannabis-img2" src="{{cannabisImg2}}" alt="cannabis">
    <img class="statue-img" src="{{statueImg}}" alt="statue">
        <header class="card-header">
            <h3>{{name}}</h3>
            <span>{{status}}</span>
        </header>
        <main class="card-main">
            <div class="bedges">
              {{{badgeTags}}}
            </div>
            <img src="{{profileImg}}" class="profile-img"  alt="user">
        </main>
        <footer class="card-footer">
            <h2>კანაფის მოყვარულთა საზოგადოება</h2>
        </footer>
    </div>
  </body>
</html>`;
};

export default generateCardTemplateGe;
