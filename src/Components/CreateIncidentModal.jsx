import React, { useState } from 'react';

const CreateIncidentModal = ({ isOpen, onClose, children }) => {
	return (
		<div className={`modal ${isOpen ? 'open' : ''}`}>
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>
					Close
				</button>
				{children}
			</div>
		</div>
	);
};

export default CreateIncidentModal;
