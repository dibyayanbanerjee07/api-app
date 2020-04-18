import {
  Card,
  CardContent
} from '@material-ui/core';
import React from 'react';

import ParameterForm from './components/ParameterForm';

const App = () => {
  return (
    <Card>
      <CardContent>
        <ParameterForm />
      </CardContent>
    </Card>
  );
}

export default App;
