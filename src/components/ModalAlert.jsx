function ModalAlert({setModalAlert, modalAlert}) {
  const {message, action} = modalAlert;
  return (
    <>
      <div
        className='fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-95 out-modal p-8 flex place-content-center'
        onClick={e => {
          if(e.target.classList.contains('out-modal')) {
            setModalAlert({showing: false})
          }
        }}
      >
        <div className="flex rounded-md items-center bg-red-50 p-4 text-sm text-red-500 max-w-[300px] max-h-[200px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-3 h-10 w-10">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
          </svg>
          <div>
            <h4 className="font-bold">{message}</h4>
            <div className="mt-2 flex space-x-4">
              <button className="font-bold text-red-800" onClick={e => setModalAlert({showing: false})}>Cancel</button>
              <button
                className="font-bold"
                onClick={action}
              >Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalAlert