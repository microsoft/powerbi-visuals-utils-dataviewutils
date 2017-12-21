export var DataRoleHelper;
(function (DataRoleHelper) {
    function getMeasureIndexOfRole(grouped, roleName) {
        if (!grouped || !grouped.length) {
            return -1;
        }
        let firstGroup = grouped[0];
        if (firstGroup.values && firstGroup.values.length > 0) {
            for (let i = 0, len = firstGroup.values.length; i < len; ++i) {
                let value = firstGroup.values[i];
                if (value && value.source) {
                    if (hasRole(value.source, roleName)) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }
    DataRoleHelper.getMeasureIndexOfRole = getMeasureIndexOfRole;
    function getCategoryIndexOfRole(categories, roleName) {
        if (categories && categories.length) {
            for (let i = 0, ilen = categories.length; i < ilen; i++) {
                if (hasRole(categories[i].source, roleName)) {
                    return i;
                }
            }
        }
        return -1;
    }
    DataRoleHelper.getCategoryIndexOfRole = getCategoryIndexOfRole;
    function hasRole(column, name) {
        let roles = column.roles;
        return roles && roles[name];
    }
    DataRoleHelper.hasRole = hasRole;
    function hasRoleInDataView(dataView, name) {
        return dataView != null
            && dataView.metadata != null
            && dataView.metadata.columns
            && dataView.metadata.columns.some((c) => c.roles && c.roles[name] !== undefined); // any is an alias of some
    }
    DataRoleHelper.hasRoleInDataView = hasRoleInDataView;
    function hasRoleInValueColumn(valueColumn, name) {
        return valueColumn
            && valueColumn.source
            && valueColumn.source.roles
            && (valueColumn.source.roles[name] === true);
    }
    DataRoleHelper.hasRoleInValueColumn = hasRoleInValueColumn;
})(DataRoleHelper || (DataRoleHelper = {}));
//# sourceMappingURL=dataRoleHelper.js.map