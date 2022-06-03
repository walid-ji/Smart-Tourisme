import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import AlbumBackground from "../../assets/img/BackgroundAlbum.jpg";
// core components

function AlbumHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        if (pageHeader.current)
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${AlbumBackground})`,
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">{props.title}</h1>
          </Container>
        </div>
      </div>
    </>
  );
}

export default AlbumHeader;
