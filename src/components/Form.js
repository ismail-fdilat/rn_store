import * as React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';

function Form(props) {
  const {data, errors, onValidate, setError, children} = props;
  const [oldData, setOldData] = React.useState(data);

  React.useEffect(() => {
    if (!isEqual(data, oldData)) {
      const validate = onValidate(data);
      const keyDataChange = Object.keys(data).filter(
        (value) => data[value] !== oldData[value],
      );
      let dataError = clone(errors);
      keyDataChange.map((value) => {
        if (validate[value]) {
          dataError[value] = validate[value];
        }
        if (!validate[value] && dataError[value]) {
          dataError = omit(dataError, value);
        }
      });
      setError(dataError);
      setOldData(data);
    }
  }, [data, errors, oldData, onValidate, setError]);
  return children;
}

Form.propTypes = {
  data: PropTypes.object.isRequired,
  onValidate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Form.defaultProps = {
  errors: {},
};

export default Form;
