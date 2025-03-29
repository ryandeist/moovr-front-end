import { useState } from "react";
import { Routes, Route } from "react-router";
import JobList from "./components/JobList/JobList";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import JobDetail from "./components/JobDetail/JobDetail";
import JobForm from "./components/JobForm/JobForm";
import BoxDetail from "./components/BoxDetail/BoxDetail";
import BoxForm from "./components/BoxForm/BoxForm";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import ItemForm from "./components/ItemForm/ItemForm";
import DeleteWarning from "./components/DeleteWarning/DeleteWarning";

const App = () => {
  // state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteHandler, setDeleteHandler] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  const openDeleteModal = (message, onConfirm) => {
    setDeleteMessage(message);
    setDeleteHandler(() => async () => {
      await onConfirm();
      closeDeleteModal();
    });
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteHandler(null);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jobs" element={<ProtectedRoute><JobList openDeleteModal={openDeleteModal} /></ProtectedRoute>} />
        <Route path="/jobs/:jobId" element={<ProtectedRoute><JobDetail openDeleteModal={openDeleteModal} /></ProtectedRoute>} />
        <Route path="/jobs/add-job" element={<ProtectedRoute><JobForm /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/edit-job" element={<ProtectedRoute><JobForm isEditingJob={true} /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/:boxId" element={<ProtectedRoute><BoxDetail openDeleteModal={openDeleteModal} /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/add-box" element={<ProtectedRoute><BoxForm /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/:boxId/edit-box" element={<ProtectedRoute><BoxForm isEditingBox={true} /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/:boxId/:itemId" element={<ProtectedRoute><ItemDetail openDeleteModal={openDeleteModal} /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/:boxId/add-item" element={<ProtectedRoute><ItemForm /></ProtectedRoute>} />
        <Route path="/jobs/:jobId/:boxId/:itemId/edit-item" element={<ProtectedRoute><ItemForm isEditingItem={true} /></ProtectedRoute>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <DeleteWarning
        show={showDeleteModal}
        message={deleteMessage}
        onConfirm={deleteHandler}
        onCancel={closeDeleteModal}
      />
    </>
  )
};

export default App;
