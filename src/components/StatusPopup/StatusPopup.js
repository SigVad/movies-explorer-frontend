import './StatusPopup.css';

function StatusPopup({textError, message, isOpen}) {
  
  if ((isOpen && message) || (isOpen && textError)){
    return (
      <>
      <section className='popup'>
      { message !== '' && (
        <div className="popup__container">
          <h2 className="popup__title popup__title-message">Message:</h2>
          <span className="popup__text popup__text-message">
            {message}
          </span>
        </div>
          )
      }
      { textError !== '' && (
        <div className="popup__container">
          <h2 className="popup__title">Error:</h2>
          <span className="popup__text">
            {textError}
          </span>
        </div>
        )
      }
      </section>
      </>
    )} 
}

export default StatusPopup;