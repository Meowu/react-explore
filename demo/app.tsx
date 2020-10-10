import React from 'react';
import ReactDom from 'react-dom';

const Greet = () => (<div>Hello World！</div>);

ReactDom.render(<Greet />, document.getElementById('app'));
