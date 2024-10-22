paypal.Buttons({
    createOrder: function(data, actions) {
                        return fetch('/demo/checkout/api/paypal/order/create/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
                            return orderData.id;
                        });
                    },                        
    onApprove: function(data, actions) {
                        return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
        
                            var errorDetail = Array.isArray(orderData.details) && orderData.details[0];
        
                            if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                return actions.restart();
                            }
        
                            if (errorDetail) {
                                var msg = 'Disculpa, tu transacción no pudo ser procesada.';
                                if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                                if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                                return alert(msg);
                            }
        
                            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                            var transaction = orderData.purchase_units[0].payments.captures[0];
                            alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
        
                        });
                    }
    }).render('#paypal-button-container');