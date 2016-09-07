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
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={ this.props.data }/>
                <CommentForm />
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
    render: function () {
        return (
            <div className="commentForm">
                Hello World! I'm a comment form
            </div>
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
    <CommentBox data={ data } />,
    document.getElementById('content')
);