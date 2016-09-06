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
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

/*
 * So far, comment list is only a div
 */
var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello World! I'm a comment list
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
 * ReactDOM.render will instantiate the root component, start the framework and inject the markup into a raw DOM element,
 * which is provided as a second argument.
 * This method should be called only once all the components have been defined.
 */
ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);