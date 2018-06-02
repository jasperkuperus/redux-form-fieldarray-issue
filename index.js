import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer as formReducer, reduxForm, Field, FieldArray, arraySwap } from 'redux-form';

// Create story with only Redux Form & Devtools
const store = createStore(
  combineReducers({ form: formReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Simple logger component, logs mounting and unmounting
class MountLogger extends React.Component {
  componentDidMount() {
    console.log(`%cMOUNT ${this.props.name}`, 'background-color: green; color: white;');
  }

  componentWillUnmount() {
    console.log(`%cUNMOUNT ${this.props.name}`, 'color: red;');
  }

  render() {
    return <div style={{ display: 'none' }}>Invisible Logger</div>;
  }
}

// Simple form with FieldArray
const ReduxForm = reduxForm({
  form: 'listForm',
})(props => (
  <div>
    <MountLogger name="OUTSIDE FIELD ARRAY" />
    <Field name="name" component="input" type="text" />

    <FieldArray
      name="items"
      component={({ fields }) => (
        <React.Fragment>
          <MountLogger name="INSIDE FIELD ARRAY" />

          <ul>
            {fields.map((fieldName, index) => (
              <li key={fields.get(index).id}>{fields.get(index).name}</li>
            ))}
          </ul>
        </React.Fragment>
      )}
    />
  </div>
));

// Simple component that exposes buttons to swap items
const SwapControl = connect(undefined, { arraySwap })(props => (
  <React.Fragment>
    <button onClick={() => props.arraySwap('listForm', 'items', 0, 1)}>Swap #1 and #2</button>
    <button onClick={() => props.arraySwap('listForm', 'items', 1, 2)}>Swap #2 and #3</button>
    <button onClick={() => props.arraySwap('listForm', 'items', 0, 2)}>Swap #1 and #3</button>
  </React.Fragment>
));

// Render the app...
ReactDOM.render((
  <Provider store={store}>
    <React.Fragment>
      <ReduxForm
        initialValues={{
          name: 'My List',
          items: [{
            id: 'a', name: 'Item 1',
          }, {
            id: 'b', name: 'Item 2',
          }, {
            id: 'c', name: 'Item 3',
          }]
        }}
      />

      <SwapControl />
    </React.Fragment>
  </Provider>
), document.getElementById('app'));
