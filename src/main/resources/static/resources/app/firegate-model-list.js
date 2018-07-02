var ModelBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <ModelList data={this.state.data}/>
        );
    }
});

var ModelList = React.createClass({
    render: function () {
        var modelNodes = this.props.data.map(function (model) {
            return (
                <Model key={model.id} name={model.name} description={model.description}/>
            );
        });
        return (
            <table className="table table-bordered table-hover jsDataTable">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Model Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {modelNodes}
                </tbody>
            </table>
        );
    }
});

var Model = React.createClass({
    render: function () {
        return (
            <tr>
                <td>1</td>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
});


ReactDOM.render(
    <ModelBox url="/proxy/admin/firegate/model" pollInterval={2000}/>,
    document.getElementById('model-content')
);
