import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className="£3">
				{"This Magic Brain will detect faces in your pictures"}
			</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input className="£4 pa2 w-70 center" type="text" onChange={onInputChange}/>
					<button 
						className="w-30 grow £4 link ph3 pv2 dib white bg-light-purple"
						onClick={onButtonSubmit}>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;