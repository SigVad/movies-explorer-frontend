import './StatusPopup.css';

function StatusPopup({textError, message, isOpen, }) {
  
  if ((isOpen && message) || (isOpen && textError)){
    return (
      <>
      <section className='popup'>
      { message !== '' && (
        <p 
          className="popup__text popup__text-message" 
          // type="button" 
          // onClick={}
          >
          {message}
        </p>
       )
      }
      { textError !== '' && (
        <p className="popup__text">
          {textError}
        </p>
      )
      }
      </section>
      </>
    )} 
}

export default StatusPopup;