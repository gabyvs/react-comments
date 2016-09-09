/*
 * Data Model
 * This should be at least in another file, ideally in a DB.
 */

var data = [
    { id: 1, author: 'Banana', text: 'This is Banana\'s comment' },
    { id: 2, author: 'Leo', text: 'This is Leo\'s comment' }
];
/*
 * In these components note the following:
 *
 * - div element, which is a native HTML element, its name starts with a lowercase letter
 * - CommentBox element, which is a custom React class name, starts with an uppercase letter
 * - className attribute is written in lowerCamelCase!
 *
 * Method render is passed to React.createClass to create a new React component.
 * Render returns a tree of React components that will eventually render to HTML.
 * Note that div tags here are not actual DOM nodes, but instantiations of React div components.
 */
    
/*
 * CommentBox component will use the other two components
 */
var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function (comment) {
        comment.id = Date.now();
        var comments = this.state.data;
        var newComments = comments.concat([ comment ]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ data: comments });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // This function executes exactly once during the lifecycle of a component
    getInitialState: function () {
        return { data: [] };
    },
    // method called by react after a component is rendered for the first time
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={ this.state.data }/>
                <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
            </div>
        );
    }
});

/*
 * Comment List is creating some comments directly in the template.
 * We are sending properties to the comment component.
 */
var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={ comment.author } keu={ comment.id }>
                    { comment.text }
                </Comment>
            );
        });
        return (
            <div className="commentList">
                { commentNodes }
            </div>
        );
    }
});

/*
 * So far, comment form is only a div
 */
var CommentForm = React.createClass({
    getInitialState: function () {
        return { author: '', text: '' };
    },
    handleAuthorChange: function (e) {
        this.setState({ author: e.target.value });
    },
    handleTextChange: function (e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault(); // do not reload everything :)
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) { return; }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    },
    // Note lowerCamelCase on events
    render: function () {
        return (
            <form className="commentForm" onSubmit={ this.handleSubmit }>
                <input type="text" placeholder="Your name" value={ this.state.author } onChange={ this.handleAuthorChange } />
                <input type="text" placeholder="Say something..." value={ this.state.text } onChange={ this.handleTextChange } />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

/*
 * This component will use node properties to render some information.
 * It can access node property value and node children...
 */
var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    { this.props.author }
                </h2>
                { this.props.children }
            </div>
        );
    }
});

/*
 * ReactDOM.render will instantiate the root component, start the framework and inject the markup into a raw DOM element,
 * which is provided as a second argument.
 * This method should be called only once all the components have been defined.
 */
ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={ 2000 } />,
    document.getElementById('content')
);