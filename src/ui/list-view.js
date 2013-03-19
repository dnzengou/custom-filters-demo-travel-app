define(["mobileui/views/scroll-view",
        "mobileui/views/layout-view",
        "mobileui/views/layout-params"], function(ScrollView, LayoutView, LayoutParams) {
    
    var ListView = ScrollView.extend({
        initialize: function() {
            ListView.__super__.initialize.call(this);
            this._itemRendererFactory = null;
            this._viewItems = {};
            this.setContentView(
                new LayoutView().setLayout("vertical")
                    .setParams(new LayoutParams()
                        .matchParentWidth()
                        .matchChildrenHeight()));
            this._initModel();
        },

        _initModel: function() {
            if (!this.model)
                return;
            this.listenTo(this.model, "add", this._onModelAdd);
            this.listenTo(this.model, "remove", this._onModelRemove);
            this.listenTo(this.model, "sort", this._onModelSort);
            this.model.each(this._onModelAdd, this);
        },

        setCollection: function(model) {
            if (this.model) {
                _.each(this._viewItems, function(view) {
                    view.remove();
                });
                this._viewItems = null;
                this.stopListening(this.model);
                this.model = null;
            }
            this.model = model;
            this._initModel();
            return this;
        },

        _onModelAdd: function(model) {
            if (!this._itemRendererFactory || this._viewItems[model.cid])
                return;
            var view = this._itemRendererFactory(model);
            if (!view)
                return;
            this._viewItems[model.cid] = view;
            var prevView = this.previousItemView(model);
            if (prevView)
                this.contentView().after(view, prevView);
            else
                this.contentView().append(view);
        },

        previousItemView: function(model) {
            if (!this.model)
                return null;
            var index = this.model.indexOf(model);
            if (index == -1)
                return null;
            for (var i = index - 1; i >= 0; --i) {
                var prevItem = this.model.at(i),
                    view = this._viewItems[prevItem.cid];
                if (view)
                    return view;
            }
            return null;
        },

        _onModelRemove: function(model) {
            var view = this._viewItems[model.cid];
            if (!view)
                return;
            view.remove();
        },

        _onModelSort: function() {
            // implement this.
        },

        itemRendererFactory: function() {
            return this._itemRendererFactory;
        },

        setItemRendererFactory: function(factory) {
            this._itemRendererFactory = factory;
            return this;
        },

        render: function() {
            this.$el.addClass("js-list-view");
            return ListView.__super__.render.call(this);
        }
    });

    return ListView;
});