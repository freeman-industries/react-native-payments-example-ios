# react-native-payments-example-ios
Clone this to try using react-native-payments on iOS.

# Setup

```
npm install

cd ios
pod install


npm run ios
```

# It works! What now?

Add it to your app!

Check out the full documentation at https://github.com/naoufal/react-native-payments.

Most people add Stripe / Braintree tokenization as a next step.

<div>
<img width="300px" src="https://user-images.githubusercontent.com/2470659/99592439-21bb3300-29e8-11eb-9516-2464ec21596a.png" />
<img width="300px" src="https://user-images.githubusercontent.com/2470659/99592430-1f58d900-29e8-11eb-816e-ea8ef297c598.png" />
</div>

# Stripe

Just add this block to your `config` object:

```diff
const config = [
	{
		supportedMethods: ['apple-pay'],
		data: {
			merchantIdentifier: 'merchant.com.react-native-payments.naoufal',
			supportedNetworks: ['visa', 'mastercard'],
			countryCode: 'US',
			currencyCode: 'USD',
+			paymentMethodTokenizationParameters: {
+				parameters: {
+					gateway: 'stripe',
+					'stripe:publishableKey': 'pk_test_asdfghjkl_qwertyuiop'
+				}
+			}
		}
	}
];
```

# Braintree

Just add this block to your `config` object:

```diff
const config = [
	{
		supportedMethods: ['apple-pay'],
		data: {
			merchantIdentifier: 'merchant.com.react-native-payments.naoufal',
			supportedNetworks: ['visa', 'mastercard'],
			countryCode: 'US',
			currencyCode: 'USD',
+			paymentMethodTokenizationParameters: {
+				parameters: {
+					gateway: 'braintree',
+					'braintree:tokenizationKey': 'sandbox_asdfghjkl_qwertyuiop'
+				}
+			}
		}
	}
];
```

# Raw Apple Pay Token

If you leave out both of the above, you'll instead get an Apple Pay token.