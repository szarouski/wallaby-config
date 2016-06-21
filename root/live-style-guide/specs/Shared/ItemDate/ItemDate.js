import moment from 'moment';

var dateFormat = 'LL';
/**
 * @class ItemDate
 */
var ItemDate = {
    /**
     * @param {Date} date
     * @param {String} locale
     * @returns {*|{currency}}
     */
    /**
     * @param {Object} itemData
     * @returns {String}
     */
    get: function getDate(itemData) {
        var Locale = this.props.Locale;
        if (!itemData.StartTime && !itemData.EndTime) {
            return 'anytime';
        } else if (!itemData.EndTime) {
            var since = 'since';
            return since + ' ' + ItemDate.getFormattedDate(itemData.StartTime, Locale);
        }
        var until = 'until';
        return until + ' ' + ItemDate.getFormattedDate(itemData.EndTime, Locale);
    },
    getFormattedDate: function getFormattedDate(date, locale) {
        return moment(date).locale(locale).format(dateFormat);
    },
    /**
     * @param {String} stringDate
     * @returns {Date}
     */
    convertStringToDate: function convertStringToDate(stringDate) {
        return moment(stringDate).toDate();
    }
};
export default ItemDate;