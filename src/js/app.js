import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"

import Layout from "./containers/Layout"
import store from "./store"

const app = document.getElementById( 'app' );

ReactDom.render(
	<Provider store={store}><Layout /></Provider>,
	app
);