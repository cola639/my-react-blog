import React from "react";
import "./footer.less";

function Footer(props) {
  return (
    <div className="footer">
      <footer className="container footer__brand">
        <p className="footer__copyright">
          Copyright © www.gzgxh.top All Rights Reserved.
        </p>
        <a href="/">备案号：鄂ICP备18005731号-2</a>
      </footer>
    </div>
  );
}

export default Footer;
