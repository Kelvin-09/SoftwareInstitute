define(['react', 'view/public', 'action/resource'], function (React, templatePublic, actionResource) {
    var TitleLine = templatePublic.TitleLine,
        Shortcut = templatePublic.Shortcut,
        Pager = templatePublic.Pager;

    var resourceLink = '#/browse/resource?pageSize=20&pageRequest={#page}';

    var ResourceItem = React.createClass({
        getInitialState: function () {
            return {
                id: this.props.item.id,
                title: this.props.item.title,
                path: this.props.item.path,
                updateTime: this.props.item.update_time
            }
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState({
                id: nextProps.id,
                title: nextProps.title,
                path: nextProps.path,
                updateTime: nextProps.updateTime
            });
        },
        render: function () {
            return (
                <li><a href={this.state.path}>{this.state.title} {this.state.updateTime}</a></li>
            );
        }
    });
    var ResourceList = React.createClass({
        mixins: [actionResource],
        getData: function (pageSize, pageRequest) {
            this.ResourceList(function (err, data) {
                if (err) {
                    location.hash = '#notFound/' + err;
                    return ;
                }
                this.setState({
                    resourceList: data.data ? data.data : [],
                    resourceCount: data.count ? data.count : 0
                });
            }.bind(this), pageSize, pageRequest);
        },
        getInitialState: function () {
            return {
                pageSize : this.props.query.pageSize,
                pageRequest : this.props.query.pageRequest,
                resourceList: [],
                resourceCount: 0
            };
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState({
                pageSize : nextProps.query.pageSize,
                pageRequest : nextProps.query.pageRequest,
                resourceList: [],
                resourceCount: 0
            }, function () {
                this.getData(this.state.pageSize, this.state.pageRequest);
            });
        },
        componentWillMount: function () {
            this.getData(this.state.pageSize, this.state.pageRequest);
        },
        render: function () {
            var resourceItems = [], tempResourceList = this.state.resourceList;
            for (var i = 0, l = tempResourceList.length; i < l; ++i) {
                resourceItems.push(
                    <ResourceItem item={tempResourceList[i]}/>
                );
            }
            return (
                <div>
                    <Shortcut/>
                    <TitleLine/>
                    <ul>
                        {resourceItems}
                    </ul>
                    <Pager current={this.state.pageRequest} max={this.state.resourceCount} link={resourceLink}/>
                </div>
            );
        }
    });
    return ResourceList;
});