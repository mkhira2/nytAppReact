import React from 'react'
import Banner from './components/banner'

var ArticlesPage = React.createClass({

	componentWillMount: function() {
		var boundUpdater = function() {
			this.setState({
				loaded: true,
				//overwrites collection with itself
				//taking advantage of re-rendering triggered by setState
				collection: this.state.collection
			})
		}.bind(this)
		// we replace `this` in the anonymous function with the current
		// meaning of this, which is an articles page component

		// .on() same as event listener
		// a component mounts the first time it is rendered onto the DOM
			// this happens on ReactDOM.render()
		// a component may render many times after it has been mounted

		// any time the article coll gets data from a server, we will run
		// a function that sets state on this top level component
		// ***setting state will trigger a re-render of the component 
		// and all of its children***

		// this sets up a 'subscription' to the sync event
		this.props.articleColl.on('sync', boundUpdater)
	},

	getInitialState: function() {
		return {
			collection: this.props.articleColl,
			loaded: false
		}
	},

	render: function(){
		return (
			<div className="articles-page">
				<Banner />
				<SearchResults collection={this.state.collection} />
			</div>
		)
	}
})

var SearchResults = React.createClass({

	_makeArticles: function() {
		var newArray = []
		for (var i = 0; i < this.props.collection.models.length; i++) {
			newArray.push(<Article model={this.props.collection.models[i]} />)
		}
		return newArray
	},

	render: function(){
		return (
			<div>
				{this._makeArticles()}
			</div>
		)
	}
})

var Article = React.createClass({

	_toggleParagraph: function() {
		this.setState({
			pShowing: this.state.pShowing ? false : true
		})
		
		// if (this.state.pShowing) {
		// 		this.setState({
		// 			pShowing: false
		// 	})
		// }
		// else {
		// 	this.setState({
		// 		pShowing: true
		// 	})
		// }
	},

	getInitialState: function() {
		return {
			pShowing: false
		}
	},

	render: function() {
		var paraStyle = {
			display: 'none'

		}
		var buttonSymbol = '+'

		if (this.state.pShowing) {
			paraStyle.display = 'block'
			buttonSymbol = '-'
		}

		return (
			<div className="article">
				<h3>{this.props.model.get('headline').main}</h3>
				<button onClick={this._toggleParagraph}> {buttonSymbol} </button>
				<p style={paraStyle}>{this.props.model.get('lead_paragraph')}</p>
			</div>
		)
	}
})



export default ArticlesPage