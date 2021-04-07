import React from "react";
import "../css/RestaurantPageImage.css";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100vh",
    backgroundColor: "brown"
  },
};



class RestaurantPageImage extends React.Component {
  constructor() {
    super();
    this.state = {
      galleryModalIsOpen: false
    };
  }

  toggle = () => {
    let temp = this.state.galleryModalIsOpen;
    this.setState({ galleryModalIsOpen: !temp });
  };

  

  render() {
    let { galleryModalIsOpen } = this.state;
    let { restaurant } = this.props;
    let image = restaurant.map((item) => item.thumb[0]);
    let thumb = restaurant.map((item) => item.thumb);
    thumb = thumb[0];
    return (
      <div id="restaurantImage">
        <img src={image ? `../${image}` : ""} alt="breakfast" />

        <div id="buttonDiv">
          <button onClick={this.toggle}>Click to See Image Gallery</button>
        </div>
        <Modal isOpen={galleryModalIsOpen} style={customStyle} ariaHideApp={false}>
          <div>
            <div style={{marginBottom:"20px",display:"flex",flexDirection:"row-reverse"}}>
              <IconButton onClick={() => this.toggle()}>
                          <CloseIcon/>
                    </IconButton>
            </div>
            <Carousel showThumbs={false} showIndicators={false}>
              {thumb ? thumb.map((item,idx) => {
                    return (
                      <div key={idx}>
                        <img src={`../${item}`} alt="sample" style={{ height:"90vh",objectFit:"contain"}}/>
                      </div>
                    );
                  }) : null
              }
            </Carousel>
          </div>
        </Modal>
        
      </div>
    );
  }
}

export default RestaurantPageImage;
