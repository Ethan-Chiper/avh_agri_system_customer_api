/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
const { customAlphabet } = require('nanoid');
const moment = require('moment');
// const Request = require('request');

const Utils = {
    /**
     * getNanoId
     * @returns
     */
    getNanoId: () => {
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        let randomId = customAlphabet(alphabet, 12);
        return randomId();
    },

    /**
     * Integer Value
     * @returns
     */
    number: () => {
        let alphabet = '1234567890';
        let uniqueId = customAlphabet(alphabet, 12);
        return uniqueId();
    },

    /**
     * Today Date
     * @returns
     */
    todayDate: () => {
        return moment().format('YYYY-MM-DD');
    },

    /**
     * End Date
     * @returns
     */
    endDate: () => {
        let endDate = moment().subtract(1, 'day').add(1, 'year').format('YYYY-MM-DD');
        return endDate;
    },
    /**
     * Function for checking whether the data is empty
     * @param data
     * @returns {boolean}
     */
    isEmpty: (data) => {
        if (data === null || data === undefined) {
            return true;
        }
        if (typeof data === 'string' && data.replace(/ /g, '').length > 0) {
            return false;
        }
        if (typeof data === 'number') {
            return false;
        }
        if (typeof data === 'boolean') {
            return false;
        }
        if (Array.isArray(data) && data.length > 0) {
            return false;
        }
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            return false;
        }
        return true;
    },
    /***
     * date option
     */
    dateFinder: (data) => {
        let query = {};
        let toDate = moment().endOf('day').toDate();
        let previousDay = moment().startOf('day').subtract(1, 'day').toDate();
        let thisWeek = moment().startOf('week').toDate();
        let thisMonth = moment().startOf('month').toDate();
        let thisYear = moment().startOf('year').toDate();

        if (data?.date_option) {
            let fromDate;
            switch (data?.date_option) {
                case 'weekly': {
                    fromDate = thisWeek;
                    query = { $gte: fromDate, $lte: toDate };
                    break;
                }
                case 'monthly': {
                    fromDate = thisMonth;
                    query = { $gte: fromDate, $lte: toDate };
                    break;
                }
                case 'yearly': {
                    fromDate = thisYear;
                    query = { $gte: fromDate, $lte: toDate };
                    break;
                }
                case 'yesterday': {
                    fromDate = previousDay;
                    toDate = moment().endOf('day').subtract(1, 'day').toDate();
                    query = { $gte: fromDate, $lt: toDate };
                    break;
                }
                default: {
                    fromDate = new Date(moment().startOf('day'));
                    query = { $gte: fromDate, $lte: toDate };
                    break;
                }
            }
        }
        if (data?.from_date) {
            let startTime = new Date(data?.from_date);
            startTime.setHours('00');
            startTime.setMinutes('00');
            startTime.setSeconds('00');
            query = { $gte: startTime };
        }

        if (data?.to_date) {
            let endTime = new Date(data?.to_date);
            endTime.setHours('23');
            endTime.setMinutes('59');
            endTime.setSeconds('59');
            query = { $lte: endTime };
        }
        if (data?.from_date && data?.to_date) {
            let startTime = new Date(data?.from_date);
            startTime.setHours('00');
            startTime.setMinutes('00');
            startTime.setSeconds('00');

            let endTime = new Date(data?.to_date);
            endTime.setHours('23');
            endTime.setMinutes('59');
            endTime.setSeconds('59');

            query = { $gte: startTime, $lt: endTime };
        }
        return query;
    },
    /**
     * random alphanumeric
     * @param {*} length
     * @returns
     */
    generateRandomAlphanumeric: (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    /**
     * getCurrentmonth
     * @returns
     */
    getCurrentMonth: () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        // Monthly check (current month)
        const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
        const currentMonthEnd = new Date(currentYear, currentMonth, 0);
        let dateCondition = {
            createdAt: {
                $gte: currentMonthStart,
                $lt: currentMonthEnd
            }
        };
        return dateCondition;
    },
    /**
     *findDateConditionByFrequency get filter
     * @param {*} frequency
     * @returns
     */
    findDateConditionByFrequency: (frequency) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        // Monthly check (current month)
        const currentMonthStart = new Date(currentYear, currentMonth - 1, 1);
        const currentMonthEnd = new Date(currentYear, currentMonth, 0);

        // Quarterly check (last 15 days of the last quarter)
        let lastQuarterStart;
        let lastQuarterEnd;

        if (currentMonth >= 1 && currentMonth <= 3) {
            // Q1: last quarter is Q4 of the previous year
            lastQuarterStart = new Date(currentYear - 1, 11, 17); // December 17
            lastQuarterEnd = new Date(currentYear - 1, 11, 31); // December 31
        } else if (currentMonth >= 4 && currentMonth <= 6) {
            // Q2: last quarter is Q1 of the current year
            lastQuarterStart = new Date(currentYear, 2, 17); // March 17
            lastQuarterEnd = new Date(currentYear, 2, 31); // March 31
        } else if (currentMonth >= 7 && currentMonth <= 9) {
            // Q3: last quarter is Q2 of the current year
            lastQuarterStart = new Date(currentYear, 5, 16); // June 16
            lastQuarterEnd = new Date(currentYear, 5, 30); // June 30
        } else {
            // Q4: last quarter is Q3 of the current year
            lastQuarterStart = new Date(currentYear, 8, 16); // September 16
            lastQuarterEnd = new Date(currentYear, 8, 30); // September 30
        }

        // Half-Yearly check (last 30 days of the last half-year)
        let lastHalfYearStart;
        let lastHalfYearEnd;

        if (currentMonth >= 1 && currentMonth <= 6) {
            // First half: last half-year is the second half of the previous year
            lastHalfYearStart = new Date(currentYear - 1, 11, 2); // December 2
            lastHalfYearEnd = new Date(currentYear - 1, 11, 31); // December 31
        } else {
            // Second half: last half-year is the first half of the current year
            lastHalfYearStart = new Date(currentYear, 5, 1); // June 1
            lastHalfYearEnd = new Date(currentYear, 5, 30); // June 30
        }

        // Yearly check (only for December of the previous year)
        const lastYearStart = new Date(currentYear - 1, 11, 1); // December 1 of last year
        const lastYearEnd = new Date(currentYear - 1, 11, 31); // December 31 of last year

        // Define the date condition based on the frequency
        let dateCondition = {};

        if (frequency === 'Monthly') {
            // Check within the current month
            dateCondition = {
                createdAt: {
                    $gte: currentMonthStart,
                    $lt: currentMonthEnd
                }
            };
        } else if (frequency === 'Quarterly') {
            // Check only the last 15 days of the last quarter
            dateCondition = {
                createdAt: {
                    $gte: lastQuarterStart,
                    $lt: lastQuarterEnd
                }
            };
        } else if (frequency === 'Halfyearly') {
            // Check only the last 30 days of the last half-year
            dateCondition = {
                createdAt: {
                    $gte: lastHalfYearStart,
                    $lt: lastHalfYearEnd
                }
            };
        } else if (frequency === 'Yearly') {
            // Check only December of the last year
            dateCondition = {
                createdAt: {
                    $gte: lastYearStart,
                    $lt: lastYearEnd
                }
            };
        }
        return dateCondition;
    },
    /**
     *
     * @param {*} clientId
     * @param {*} userLat
     * @param {*} userLon
     * @returns
     */
    checkIfInsideSquareArea: async (site, userLat, userLon) => {
        try {
            const { lat1, lat2, lat3, lat4, lon1, lon2, lon3, lon4 } = site?.geo_location;
            // Find the min and max bounds for latitude and longitude
            const minLat = Math.min(lat1, lat2, lat3, lat4);
            const maxLat = Math.max(lat1, lat2, lat3, lat4);
            const minLon = Math.min(lon1, lon2, lon3, lon4);
            const maxLon = Math.max(lon1, lon2, lon3, lon4);

            // Check if user location is inside the square area
            const isInside = userLat >= minLat && userLat <= maxLat && userLon >= minLon && userLon <= maxLon;
            if (isInside) {
                return {
                    error: false,
                    message: 'User is inside the square area',
                    data: isInside
                };
                // Call check-in function here if needed
            } else {
                return {
                    error: true,
                    message: 'User is outside the square area',
                    data: undefined
                };
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                data: {}
            };
        }
    },
    /**
	 * network call
	 * @param {*} options 
	 * @returns 
	 */
	networkCall: async (options) => {
		try {
			let postData = {};

			if (Utils.isEmpty(options?.url)) {
				return {
					error: 'please provide a url',
					message: undefined
				};
			}
			postData['url'] = options?.url;
			postData['timeout'] = options?.timeout || 120_000;

			// headers prepare for http request
			if (Utils.isEmpty(options?.headers)) {
				postData['headers'] = {
					'Content-Type': 'application/json'
				};
			} else {
				let headers = {'Content-Type': 'application/json'};
				for (let key in options?.headers) {
					headers[key] = options?.headers[key];
				}
				postData['headers'] = headers;
			}

			// to decide method for http request
			postData['method'] = options?.method || 'GET';

			if (!Utils.isEmpty(options?.body)) {
				try {
					postData['body'] = JSON.stringify(options?.body);
				} catch (error) {
					return {error: 'unable to stringify body'};
				}
			}

			if (!Utils.isEmpty(options?.formData)) {
				postData['formData'] = options?.formData;
			}

			if (options?.admin) {
				postData['headers']['x-consumer-username'] = 'admin_' + options.admin?.id;
			}

			// FORM data handling
			if (!Utils.isEmpty(options?.form)) {
				postData['form'] = options?.form;
			}
			let errorData;
			let bodyData;
			await new Promise((resolve) => {
				Request(postData, (error, response, body) => {
					errorData = error;
					bodyData = body;
					resolve(error, response, body);
				});
			});
			return {error: errorData, body: bodyData};
		} catch (error) {
			// eslint-disable-next-line no-constant-binary-expression
			return {error: error, message: 'Something went wrong' || error?.message};
		}
	},
};

module.exports = Utils;
