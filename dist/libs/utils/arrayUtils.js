export var findItemFromList = function (list, value, propertyName) {
    var item = null;
    if (list) {
        // If propertyName being compare to has not been passed, set it as 'id'.
        if (propertyName === undefined) {
            propertyName = "id";
        }
        for (var i = 0; i < list.length; i++) {
            var listItem = list[i];
            if (listItem[propertyName] == value) {
                item = listItem;
                break;
            }
        }
    }
    return item;
};
