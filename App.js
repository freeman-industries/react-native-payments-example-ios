/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ApplePayButton, PaymentRequest } from 'react-native-payments';

export default class App extends Component {
	state = {
		debug: ''
	}

	debug = text => {
		this.setState({
			debug: text
		})
	}

	showPaymentSheet = (succeed = true) => {
		const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
		paymentRequest.show().then(paymentResponse => {
			const card_token = paymentResponse.details.paymentToken;

			if(succeed) {
				paymentResponse.complete('success')
				this.debug(`Payment request completed with card token ${card_token}`);
			} else {
				paymentResponse.complete('failure')
				this.debug('Payment request failed');
			}
		}).catch(error => {
			if(error.message === 'AbortError') {
				this.debug('Payment request was dismissed');
			}
		});
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<Text style={styles.title}>
						Native Apple Pay Button
					</Text>
					<ApplePayButton
						type="plain"
						style="black"
						onPress={() => this.showPaymentSheet(true)}
					/>
					<Text style={styles.title}>
						Any tappable component
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this.showPaymentSheet(true)}
					>
						<Text style={styles.buttonText}>
							Tap me
						</Text>
					</TouchableOpacity>
					<Text style={styles.title}>
						Try an error...
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this.showPaymentSheet(false)}
					>
						<Text style={styles.buttonText}>
							This will fail
						</Text>
					</TouchableOpacity>
					<Text style={styles.title}>
						What's next?
					</Text>
					<Text style={styles.details}>
						Thanks for trying out react-native-payments! There are so many options you can pass to PaymentRequest, so check out the main documentation.
					</Text>
					<Text style={styles.details}>
						You can also pass in paymentMethodTokenizationParameters to automatically convert the Apple Pay token to either Stripe or Braintree format.
					</Text>
					{
						this.state.debug.length > 0
						&& <View style={styles.debug}>
							<Text style={styles.debugText}>
								{this.state.debug}
							</Text>
						</View>
					}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const METHOD_DATA = [
	{
		supportedMethods: ['apple-pay'],
		data: {
			// You need to change this Merchant ID to get a token out of Apple Pay.
			// There is no way around this - you need an Apple Developer account!
			// There are more instructions in the react-native-payments README.
			merchantIdentifier: 'merchant.com.your-app.namespace',
			supportedNetworks: ['visa', 'mastercard', 'amex'],
			countryCode: 'US',
			currencyCode: 'USD',
			
			// // S T R I P E    S U P P O R T
			// // uncomment this block to activate automatic Stripe tokenization.
			// // try putting your key pk_test... in here and see how the token format changes.
			// paymentMethodTokenizationParameters: {
			// 	parameters: {
			// 		gateway: 'stripe',
			// 		'stripe:publishableKey': Config.STRIPE_KEY,
			// 	},
			// },

			// // B R A I N T R E E    S U P P O R T
			// // uncomment this block to activate automatic Braintree tokenization.
			// // try putting your key sandbox_asdfghjkl... in here and see how the token format changes.
			// paymentMethodTokenizationParameters: {
			// 	parameters: {
			// 		gateway: 'braintree',
			// 		'braintree:tokenizationKey': Config.BRAINTREE_KEY,
			// 	},
			// },
		},
	},
];

const DETAILS = {
	id: 'basic-example',
	displayItems: [
		{
			label: 'Movie Ticket',
			amount: { currency: 'USD', value: '15.00' },
		},
	],
	total: {
		label: 'Freeman Industries',
		amount: { currency: 'USD', value: '15.00' },
	},
};

const MARGIN = 20;

const styles = {
	container: {
		margin: MARGIN,
		flex: 1,
		alignItems: 'stretch'
	},
	title: {
		margin: MARGIN,
		marginTop: MARGIN * 3 / 2,
		color: '#4000FF',
		fontSize: 24,
		textAlign: 'center'
	},
	button: {
		backgroundColor: '#4000FF',
		padding: MARGIN,
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: '#FFFFFF',
	},
	debug: {
		marginTop: 'auto',
		backgroundColor: '#301139',
		padding: MARGIN,
		borderRadius: 3
	},
	debugText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontFamily: 'Menlo',
	},
	details: {
		marginBottom: MARGIN,
		fontSize: 16
	},
}