const DeleteWarning = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-opacity-100 flex justify-center items-center backdrop-blur-xs">
            <div className="bg-white p-5 rounded-xl border-4 shadow-lg text-center w-[90%] max-w-md">
                <h2 className="text-xl font-semibold mb-4">{message}</h2>
                <div className="flex justify-center gap-4">
                    <button onClick={onConfirm} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg">
                        Yes, Delete
                    </button>
                    <button onClick={onCancel} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteWarning;