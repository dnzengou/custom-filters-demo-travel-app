define(["utils/transform", "views/common/linear-layout"], function(Transform, LinearLayout) {

    var HorizontalLayout = _.extend({}, LinearLayout, {
        direction: LinearLayout.Horizontal
    });

    return HorizontalLayout;

});