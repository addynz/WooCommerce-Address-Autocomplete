// Addy Autocomplete plugin for WooCommerce
// VERSION: 1.1.4
(function () {

    jQuery(document).ready(function () {
        jQuery.ui.autocomplete.prototype._renderItem = function (ul, item) {
            switch (item.id) {
                case -1:
                    return jQuery("<li></li>")
                       .data("item.autocomplete", item)
                       .append('<a style="text-decoration: underline; color: #005EA9 !important;">' + item.label + '</a>')
                       .appendTo(ul);
                case 0:
                    return jQuery("<li></li>")
                       .data("item.autocomplete", item)
                       .append('<b>' + item.label + '</b>')
                       .appendTo(ul);
                default:
                    var term = this.term.split(' ').join('|');
                    var re = new RegExp("(" + term + ")", "gi");
                    var t = item.label.replace(re, "<b>$1</b>");

                    return jQuery("<li></li>")
                       .data("item.autocomplete", item)
                       .append("<a>" + t + "</a>")
                       .appendTo(ul);
            };
        };

        jQuery.ui.autocomplete.prototype._resizeMenu = function () {
            var ul = this.menu.element;
            ul.outerWidth(this.element.outerWidth());
        }

        function AddyComplete(apiKey, addressField) {
            var me = this;
            me.onDisable = null;
            me.onPopulate = null;
            var addressFields = null;
            var hiddenFields = null;
            var options = null;

            var checkCountry = function () {
                if (addressFields && addressFields.country && options.nzCountryValue) {
                    if (addressFields.country.val() === options.nzCountryValue) {
                        enableAutocomplete();
                    } else {
                        disableAutocomplete();
                    }
                }
            }

            var createGuid = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            var sessionId = createGuid();

            me.setOptions = function (addressOptions) {
                options = jQuery.extend({
                    maxResults: 10,
                    excludePostBox: false,
                    missingAddressLabel: "Can't find your address? Click to type it in manually",
                    notFoundLabel: "No address found",
                    nzCountryValue: "NZ"
                }, addressOptions);

                checkCountry();
            }

            me.setAddressFields = function (fields) {
                addressFields = fields;
                checkCountry();

                if (addressFields && addressFields.country) {
                    addressFields.country.change(
                        function () { checkCountry(); }
                    );
                }
            }

            me.setHiddenFields = function (fields) {
                hiddenFields = fields;
                if (hiddenFields && addressField.val() === "") {
                    setVisibility(false);
                }
            }

            var firstAddressId = -1;
            var loadedAddressId = 0;
            me.setOptions({});

            var setVisibility = function (visible) {
                if (hiddenFields) {
                    jQuery.each(hiddenFields, function (index, field) {
                        if (visible) {
                            field.show();
                        } else {
                            field.hide();
                        }
                    });
                }
            }

            // Disable the autocomplete search caused by an error (IE: invalid API key)
            // or when the address could not be found by the user
            var disableAutocomplete = function () {
                addressField.attr("autocomplete", "off");
                addressField.autocomplete("disable");
                addressField.attr("placeholder", "");
                setVisibility(true);
                loadedAddressId = -1;

                if (me.onDisable) {
                    me.onDisable();
                }
            }

            var enableAutocomplete = function () {
                addressField.attr("autocomplete", "on");
                addressField.autocomplete("enable");
            }

            var setAddressNotFound = function () {
                if (!addressField.val()) return;

                jQuery.ajax({
                    url: "https://www.addy.co.nz/api/addressnotfound?=" + addressField.val() + '&session=' + sessionId + '&key=' + apiKey,
                    dataType: "jsonp",
                    cache: false,
                    success: function () { },
                    error: function () { },
                });
            }

            var fetchAddress = function (id) {
                loadedAddressId = id;

                jQuery.ajax({
                    url: "https://www.addy.co.nz/api/address/" + id + '?session=' + sessionId + '&key=' + apiKey,
                    dataType: "jsonp",
                    cache: false,
                    success: function (data) {

                        if (me.onPopulate) {
                            me.onPopulate(data);
                        } else if (addressFields) {
                            var fields = addressFields;

                            if (fields.address) fields.address.val(data.displayline);
                            if (fields.suburb) fields.suburb.val(data.suburb);
                            if (fields.city) fields.city.val(data.city);
                            if (fields.postcode) fields.postcode.val(data.postcode);
                            if (fields.line1) fields.line1.val(data.address1);
                            if (fields.line2) fields.line2.val(data.address2);
                            if (fields.line3) fields.line3.val(data.address3);
                            if (fields.line4) fields.line4.val(data.address4);

                            if (fields.region) {
                                var regionCode = {
                                    'Auckland': 'AK',
                                    'Bay Of Plenty': 'BP',
                                    'Canterbury': 'CT',
                                    'Gisborne': 'GI',
                                    'Hawke\'s Bay': 'HB',
                                    'Manawatu-Wanganui': 'MW',
                                    'Marlborough': 'MB',
                                    'Nelson': 'NS',
                                    'Northland': 'NL',
                                    'Otago': 'OT',
                                    'Southland': 'SL',
                                    'Taranaki': 'TK',
                                    'Tasman': 'TM',
                                    'Waikato': 'WA',
                                    'Wellington': 'WE',
                                    'West Coast': 'WC',
                                    'Chatham Islands': null
                                };

                                fields.region.select2().val(regionCode[data.region]).trigger('change');
                            }
                            
                            if (fields.address1 && fields.address2) {
                                if (data.address4 || data.address2.indexOf("RD ") === 0) {
                                    fields.address1.val(data.address1);
                                    fields.address2.val(data.address2);
                                } else {
                                    fields.address1.val(data.displayline);
                                    fields.address2.val('');
                                }
                            }
                        }
                        setVisibility(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        disableAutocomplete();
                    },
                });
            }

            var addressSearch = function (request, response) {
                jQuery.ajax({
                    url: "https://www.addy.co.nz/api/search?session=" + sessionId + "&key=" + apiKey + "&expostbox=" + options.excludePostBox + "&max=" + options.maxResults + "&s=" + request.term,
                    dataType: "jsonp",
                    cache: false,
                    success: function (data) {
                        firstAddressId = 0;

                        if (data.addresses.length === 0) {
                            data.addresses.push({ id: 0, a: options.notFoundLabel });
                        } else {
                            firstAddressId = data.addresses[0].id;
                        }
                        if (data.matched === 0) {
                            data.addresses.push({ id: -1, a: options.missingAddressLabel });
                        }

                        response(jQuery.map(data.addresses, function (record) {
                            return { label: record.a, id: record.id }
                        }));
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        firstAddressId = 0;
                        disableAutocomplete();
                    },
                });
            }

            var selectAddress = function (event, ui) {
                event.preventDefault();

                if (ui.item) {
                    if (ui.item.id < 1) {
                        if (ui.item.id === -1) {
                            setAddressNotFound();
                            disableAutocomplete();
                        }
                        return;
                    }
                    fetchAddress(ui.item.id);
                }
            }

            addressField.autocomplete({
                source: addressSearch,
                minLength: 3,
                select: selectAddress,
                autoFocus: true,
                open: function () {
                    jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                    loadedAddressId = 0;
                },
                close: function () {
                    jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                },
            }).blur(function () {
                // Select the first address when the focus is lost (ie: tab pressed)
                if (loadedAddressId === 0) {
                    if (firstAddressId > 0) {
                        fetchAddress(firstAddressId);
                    } else if (firstAddressId === -1) {
                        // The results were blurred before the addresses showed up, show the pop-up
                        addressField.autocomplete('search');
                    }
                }
                setVisibility(true);
            });
        };

        if (addyConfig && addyConfig.key) {
            if (jQuery("#shipping_address_1")) {
                var addyShipping = new AddyComplete(addyConfig.key, jQuery('#shipping_address_1'));

                addyShipping.setAddressFields({
                    address1: jQuery("#shipping_address_1"),
                    address2: jQuery("#billing_address_2"),
                    city: jQuery("#shipping_city"),
                    region: jQuery("#shipping_state"),
                    postcode: jQuery("#shipping_postcode"),
                    country: jQuery("#shipping_country")
                });

                if (addyConfig.hidePostCode && addyConfig.hidePostCode === "yes") {
                    addyShipping.setOptions({
                        excludePostBox: true
                    });
                }
            }

            if (jQuery("#billing_address_1")) {
                var addyBilling = new AddyComplete(addyConfig.key, jQuery('#billing_address_1'));

                addyBilling.setAddressFields({
                    address1: jQuery("#billing_address_1"),
                    address2: jQuery("#billing_address_2"),
                    city: jQuery("#billing_city"),
                    region: jQuery("#billing_state"),
                    postcode: jQuery("#billing_postcode"),
                    country: jQuery("#billing_country")
                });
            }
        }
    });
})();
