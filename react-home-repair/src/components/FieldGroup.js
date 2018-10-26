import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';

const FieldGroup = ({ validation, error, value, type, id, label, help, ...props }) => {
	return (
		<FormGroup style={ error? {marginBottom: 0} : {} } validationState={error ? "error": null } controlId={id}>
			{label && <ControlLabel>{label}</ControlLabel>}
			<FormControl value={value} type={type ? type: "text"} onChange={props.onChange} {...props} />
			{error && <FormControl.Feedback />}
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
}

export default FieldGroup;