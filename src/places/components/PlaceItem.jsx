import React, { useContext, useState } from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import MapRender from "../../shared/components/UIElements/Map/Map";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/loading/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/loading/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";

const PlaceItem = (props) => {
  const { error, isLoading, sendRequest, clearError} = useHttpClient();
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const openDeleteWarning = () => {
    setShowConfirmModal(true);
  };

  const closeDeleteWarning = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    console.log(auth.token);
      try {
        // const responseData = await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE', null, { Authorization : auth.token});
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, 'DELETE', null, { Authorization : auth.token});
        console.log(responseData);
        props.onDelete(props.id);
      } catch (error) {
        console.log(error);
      };
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancle={closeMapHandler}
        header={props.address}
        contentClass="place-item_modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <MapRender center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancle={closeDeleteWarning}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeDeleteWarning}>
              CANCLE
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undon thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            {/* <img src={'http://localhost:5000/' + props.image} alt={props.title} /> */}
            <img src={process.env.REACT_APP_ASSET_URL+ '/' + props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
            <div className="place-item__action">
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {auth.userId === props.creatorId && (
                <>
                  <Button to={`/places/${props.id}`}>EDIT</Button>
                  <Button danger onClick={openDeleteWarning}>
                    DELETE
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
