define(["mobileui/views/layer-view",
        "mobileui/views/gesture-detector"],
function(LayerView, GestureDetector) {

    var GestureView = LayerView.extend({

        initialize: function() {
            GestureView.__super__.initialize.call(this);
            this._gestureDetector = new GestureDetector(this);
        },

        render: function() {
            this.$el.addClass("js-gesture-view");
            return GestureView.__super__.render.call(this);
        }

    });

    return GestureView;
});