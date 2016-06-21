import ItemDate from '../../../live-style-guide/specs/Shared/ItemDate/ItemDate';
import moment from 'moment';
const expect = require("chai").expect;
describe('ItemDate test', function() {
    it('should convert string to date', function() {
        //format in which REACT.NET send us dates
        var ISOFormattedStringDate = '2015-08-07T06:29:42.120Z';
        expect(ItemDate.convertStringToDate(ISOFormattedStringDate) instanceof Date).to.be.ok;
    });

    it('should return a formatted date', function() {
        /**
         * @param {String} locale
         */
        var localized = function localized(locale) {
            var pastDate = new Date(2014, 3, 21, 11, 11, 11, 11).toISOString();
            var futureDate = new Date(2016, 3, 21, 11, 11, 11, 11).toISOString();
            var hasNoStartAndNoEnd = {
                StartTime: null,
                EndTime: null
            };
            var hasNoEnd = {
                StartTime: pastDate,
                EndTime: null
            };
            var hasEnd = {
                StartTime: pastDate,
                EndTime: futureDate
            };
            var dateFormat = 'LL';
            expect(
                ItemDate.get.call({
                    props: {
                        Locale: locale
                    }
                }, hasNoStartAndNoEnd)
            ).to.equal('anytime');
            expect(ItemDate.get.call({
                props: {
                    Locale: locale
                }
            }, hasNoEnd)).to.equal([
                'since',
                ' ',
                moment(hasNoEnd.StartTime).locale(locale).format(dateFormat)
            ].join(''));
            expect(ItemDate.get.call({
                props: {
                    Locale: locale
                }
            }, hasEnd)).to.equal([
                'until',
                ' ',
                moment(hasEnd.EndTime).locale(locale).format(dateFormat)
            ].join(''));
        };
        localized('en-CA');
        localized('fr-CA');
    });
});