import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
//importing from local files
import HomePage from './views/homePage'
import ArticlesPage from './views/articlesPage'
//Syntax for importing from a file that is not 'default'
import {ArticleCollection} from './models/newsModels'


var app = function() {
	var NewsRouter = Backbone.Router.extend({
		routes: {
			'home': 'handleHome',
			'details/:id': 'handleDetail',
			'search/:query': 'handleNewsSearch',
			'*defaultRoute': 'handleRedirect'
		},

		handleHome: function() {
			// ReactDOM.render will mount a React component onto the actual DOM
			ReactDOM.render(<HomePage />,document.querySelector('.container'))
		},

		handleRedirect: function() {
			location.hash = 'home'
		},

		handleNewsSearchWithPromise: function(query) {
			var collectionInstance = new ArticleCollection()
			var promise = collectionInstance.fetch({
				data:{
					'q':query,
					'api-key': collectionInstance._key
				}
			}) 
			//Wrong way
			// promise.then(ReactDOM.render(<ArticlesPage cohort='awesome' student='kenji'/>, document.querySelector('.container')))	


			//Right way
			promise.then(function(){
				// ReactDOM.render mounts the Articles Page comment
				// any key-value pairs that we assign to the component upon rendering
				// will go onto that components props object
				// {} below is necessary when putting a JS name into JSX
				ReactDOM.render(<ArticlesPage 
					articleColl={collectionInstance}
					/>, document.querySelector('.container'))
			})	

		},

		handleNewsSearch: function(query) {
			var collectionInstance = new ArticleCollection()
			collectionInstance.fetch({
				data:{
					'q':query,
					'api-key': collectionInstance._key
				}
			}) 
				ReactDOM.render(<ArticlesPage 
					articleColl={collectionInstance}
					/>, document.querySelector('.container'))
		}
	})
	new NewsRouter 
	Backbone.history.start()
}



// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export var app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..